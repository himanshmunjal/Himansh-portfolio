---
intro: A controlled study of whether attention helps recurrent models recognise human activity from wearable sensors, run as 1,320 training runs across 8 models, 3 datasets and 30 leave-subjects-out folds with a decision rule fixed in advance. Attention gave no measurable gain over a plain BiGRU, so the paper is reported as an empirical study, not a method paper.
caption: Raw sensor data from UCI-HAR, WISDM and PAMAP2 is windowed by Preprocessing, split by the LOSO fold builder, trained in parallel by the Training runner over 8 models and 5 seeds, and the results table feeds Efficiency profiling, the Statistics engine and the Paper and figures.
---

## About

Recent human activity recognition (HAR) papers add channel and temporal attention to recurrent networks and report accuracy gains, usually on a single train/test split, with one run and no cost accounting. I set out to propose a spectral-gated dual-attention BiGRU (SG-DA-BiGRU): a CNN-free BiGRU with channel attention, a 33-parameter gate fed by FFT descriptors, and temporal attention.

Before the final runs, I committed to a rule: it is a method paper only if the gate beats the same model without it after Holm correction and is not significantly worse than any baseline. **Do attention gains survive subject-independent evaluation, multiple seeds and paired statistics?** They didn't, so the write-up became a study of what actually drives the scores.

## Architecture

**Raw sensor data** from UCI-HAR, WISDM and PAMAP2 is downloaded by script. **Preprocessing** cuts 2.56-second windows with 50% overlap, uses one label mapping per dataset, and for PAMAP2 uses all three IMUs at 50 Hz. The **LOSO fold builder** creates 10, 12 and 8 leave-subjects-out folds, holds out at least two training subjects for validation, and fits normalisation on training subjects only.

The **Training runner** splits 1,320 runs into 264 jobs (dataset by model by variant by fold, each covering five seeds) and runs them in parallel, sized to the GPU memory, RAM and cores. Every run lands in the **Results table**. **Efficiency profiling** measures parameters, FLOPs and latency in one pass, the **Statistics engine** runs the tests, and both feed the **Paper and figures**.

## How it's implemented

### Eight models, one pipeline

All models share the training loop, hidden size, depth and head, except DeepConvLSTM, which uses its published configuration. Four arms are ablations of the proposed model, so full against no gate isolates the spectral gate exactly.

### An audit before the final run

I found and fixed seven pipeline problems, including window-level validation leakage, latency measured on mixed hardware, PAMAP2 using one IMU at 100 Hz, and per-fold label encoding. The first protocol then picked checkpoints on validation loss, and 43.5% of runs stopped at epoch 3 or earlier. Selecting on validation macro-F1 raised the median selected epoch from 4 to 9.

### Statistics that can say "no difference"

Seeds are averaged within each fold and never treated as independent samples. The primary test is a two-sided Wilcoxon signed-rank on pooled fold-level macro-F1, Holm-corrected over seven comparisons. A Bayesian test with a region of practical equivalence of plus or minus 0.01 can then show that two models are equivalent, rather than just "not significantly different".

### One resumable command

`scripts/run_all.sh` runs every stage, starting with a one-epoch smoke test of every model. It resumes from the results table after a crash and retries a failed job once.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Python 3.10+, Bash | One script runs the whole study end to end |
| ML | PyTorch, 8 recurrent and conv-recurrent models | Identical training loop for a fair comparison |
| Data | UCI-HAR, WISDM v1.1, PAMAP2 as NumPy arrays | Three public benchmarks with subject ids |
| Statistics | SciPy, Wilcoxon + Holm, bootstrap, Bayesian signed-rank | Tests for both difference and equivalence |
| Infra | Parallel job runner, per-dataset YAML configs | 27.6 GPU-hours on an RTX 3050 laptop GPU |
| Output | CSV tables, LaTeX paper, 22-slide deck | Every number traces to `raw_results.csv` |

## Results

Pooled macro-F1 over 30 leave-subjects-out folds, each fold averaged over 5 seeds.

| Measure | Baseline | Best |
|---|---|---|
| Pooled macro-F1, proposed SG-DA-BiGRU vs plain BiGRU | **0.816** (BiGRU) | 0.815 (proposed) |
| Pooled macro-F1, best model overall | 0.816 (BiGRU) | **0.832** (CNN+BiGRU, DeepConvLSTM) |
| Gate vs no gate, change in macro-F1 | 0 (no gate) | **+0.0008** (95% CI -0.005 to +0.007) |
| Probability the gate is practically equivalent to no gate | n/a | **99.5%** |
| Share of fold-score variance explained by held-out subjects | 0.4 to 1.5% (by model) | **94 to 96%** |
| GPU latency per batch of 32 | **1.64 ms** (no gate) | 4.21 ms (with gate) |

Which subjects are held out matters far more than which of the eight models is used, and fixed-split rankings agreed poorly with LOSO rankings (Kendall's tau from -0.14 to 0.43). CNN+BiGRU is the best practical choice: the top score with the fewest FLOPs. All numbers come from `results/tables/` and the README.

## What I'd do differently

- Tune hyper-parameters per model with nested cross-validation, instead of one shared configuration.
- Test on datasets with more sensor positions and longer windows, where attention may have more to work with.
- Measure the FFT's cost on embedded hardware, since the gate made GPU inference 2.6 times slower.
