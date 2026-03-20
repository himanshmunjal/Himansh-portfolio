# Fine-Tuning RoBERTa for Disaster Tweet Triage — What the Papers Do Not Tell You

Every NLP tutorial makes fine-tuning look like four lines of code. Load a pretrained model, pass your dataset, call `trainer.train()`, evaluate. **DisasterTweet AI** was the project that showed me how much complexity that abstraction hides.

## Why Disaster Tweets Are a Hard NLP Problem

The dataset was not a clean sentiment corpus. It was multi-class across categories like **SOS, medical emergency, infrastructure damage, resource request, and misinformation** — collected during actual disasters from Twitter.

The problems:

- **Extreme label imbalance.** SOS and medical emergency tweets were rare. Misinformation was everywhere.
- **Informal language.** Abbreviations, hashtags, broken grammar, code-switching.
- **Temporal noise.** Old retweets mixed with real-time signals.
- **High false-negative cost.** Missing a genuine SOS is a qualitatively different error from misclassifying a resource request.

## Why RoBERTa Beat BERT Here

I tested BERT-base, DistilBERT, and RoBERTa-base with identical fine-tuning configs. RoBERTa won on F1 across every minority class, not just the aggregate metric.

The reason traces back to pretraining: **RoBERTa was trained with dynamic masking and no Next Sentence Prediction**, which made it better at learning token-level semantics. For single-tweet classification with noisy text, that matters.

> DistilBERT was faster by ~40%, but its F1 on the SOS class was 8 points lower. For a life-safety application, that gap is not a tradeoff — it is a disqualifier.

## The Urgency Ranking Algorithm

Classification alone was not enough. A system that outputs a flat list of SOS tweets is not useful to a first responder in a flood zone. I needed ranked urgency.

The formula combined:

- **Model confidence** — softmax probability for the predicted class.
- **Severity keyword score** — weighted presence of terms like trapped, bleeding, collapse.
- **Recency decay** — exponential penalty for tweets older than N minutes.

This produced a single urgency score per tweet that the Streamlit dashboard displayed as a live-updating priority queue.

## The Open Problems

- **Domain shift**: A model trained on Hurricane Harvey tweets underperforms on earthquake or wildfire data. Disaster NLP models need continual fine-tuning on new events.
- **Label noise**: Human annotators disagreed on 18% of examples in my validation set. That disagreement is real ambiguity, not annotation error.
- **The ethics of false negatives**: I weighted the SOS class loss penalty during training. But how much? There is no clean answer — it is a policy decision embedded in a technical parameter.

This project convinced me that crisis informatics is one of the most important and underserved areas in applied NLP research.
