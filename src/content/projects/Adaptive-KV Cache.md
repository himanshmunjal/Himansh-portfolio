---
intro: A drop-in KV cache for Hugging Face models that never evicts a token but stores each one at FP16, INT8 or INT4 based on a running importance score. Tokens can move back up to higher precision if they matter again later.
caption: Prompts flow from the Eval Harness through the Generation Loop into the HF Transformer, whose new keys and values pass through the Importance Tracker, Tiering Policy, Quantizer and Tier Store before Dequant & Reorder hands them back for attention, with metrics written to Results.
---

## About

This was my semester project on KV cache compression. During generation a transformer keeps the keys and values of every past token, and that cache grows with context length. The methods I surveyed either evict tokens (H2O, KeyDiff) or quantize every token to the same bit-width (AQUA-KV). Eviction is permanent: if a dropped token matters later, it is gone.

I tried a middle path. Keep every token, give it more or fewer bits based on how important it looks right now, and re-check as generation goes on. The core question: **can I cut KV cache memory by 20-40% while keeping perplexity within 1% of an FP16 cache, without throwing any tokens away?**

## Architecture

The Eval Harness builds prompts from WikiText-2, LongBench and a needle-in-a-haystack test. The Generation Loop feeds them into the HF Transformer and reads back logits one token at a time. Each attention layer owns a cache. New keys and values enter at FP16, and the Importance Tracker keeps a decayed score per token. Every 16 tokens the Tiering Policy ranks them: sink tokens, the recent window and the top 30% stay FP16, the next 30% go to INT8, the rest to INT4.

The Quantizer turns those tiers into integer codes plus scales, held in the Tier Store. On each forward pass, Dequant & Reorder expands them back to FP16 and sorts tokens into position order so the causal mask stays correct. Text, NLL, speed, cache bytes and tier counts go to Results as JSON and CSV.

## How it's implemented

### A cache that plugs into transformers

I subclassed the transformers `Cache` API, so model code is untouched. I wrote my own Generation Loop because the attention-based scoring modes need softmax weights fed back into the cache each step, and `model.generate()` has no hook for that.

### Importance scoring without attention weights

The default score is KeyDiff-style key diversity: how far a token's key points from the mean key. It needs no attention matrix, so it works with FlashAttention. H2O-style attention mass and VATP-style attention times value norm are options. Scores use an EMA, so they can fall and rise again. That is what lets a token return to FP16.

### Different quantization for keys and values

Keys carry per-channel outliers; values are closer to uniform per token. So I quantize keys per channel in chunks of 16 or 32 tokens, and values per token. INT4 codes are packed two per byte. A flag switches keys back to per-token for an ablation.

### Re-tiering without extra rounding error

Values that stay in the same tier keep their existing bytes, so they don't pick up rounding drift each pass. Since nothing is evicted, positions have no gaps and this is a plain gather. I also memoize the dequantized tiers between passes, which nearly doubled adaptive decode speed.

### Fixing the evaluation before trusting it

I found three bugs in my own harness. LongBench truncation dropped the question. NIAH had one number in the haystack, so it was trivial; I added three decoys. Neither script used the chat template. A sanity-check mode forces everything to FP16 to separate harness error from quantization error.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Python 3.11 | Standard for HF model research |
| Framework | PyTorch, transformers | Cache API swaps the KV cache without model changes |
| Data/ML | datasets; Qwen2.5-1.5B-Instruct, Phi-3-mini-4k-instruct | Small open models with public benchmarks |
| Storage | In-memory tensor tiers; JSON/CSV results | Real low-bit tensors keep memory numbers honest |
| Infra/CI | RunPod GPU via a setup script; no CI | One rented GPU was enough |
| Testing | pytest on tiny random-init models | Full pipeline tested offline, no downloads |

## Results

Baseline is the stock FP16 `DynamicCache` and Best is my adaptive cache, except the key-error row, which compares per-token against per-channel key quantization.

| Measure | Baseline | Best |
|---|---|---|
| KV cache size, Qwen2.5-1.5B, 2048-token prompt | 62.4 MB | **37.3 MB** |
| KV cache size, Phi-3-mini, 2048-token prompt | 855.6 MB | **512.6 MB** |
| WikiText-2 perplexity, Qwen2.5-1.5B | **9.371** | 9.387 |
| WikiText-2 perplexity, Phi-3-mini | **6.119** | 6.121 |
| Key reconstruction MAE, Qwen2.5-1.5B | 1.621 | **1.340** |
| LongBench narrativeqa F1, Qwen2.5-1.5B | **0.182** | 0.164 |
| Decode speed, Qwen2.5-1.5B, 2048-token prompt | **43.1 tok/s** | 22.1 tok/s |

Memory dropped about 40% on both models while perplexity moved 0.16% and 0.02%, so I hit my target. The cost is speed: I dequantize to FP16 before every matmul, so decoding got slower.

## What I'd do differently

- Write a fused kernel that runs attention on packed INT4/INT8 codes, so memory savings become speed.
- Support batches and per-head tiering; all heads share one tier per token today.
- Validate per-channel keys per model: key error fell 17.3% on Qwen but 0.2% on Phi-3.
- Use more LongBench samples; at 30, the Qwen F1 drop is hard to separate from noise.
