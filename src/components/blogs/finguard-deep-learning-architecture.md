# Building FinGuard: What Three Architecture Rewrites Taught Me About Deep Learning

**FinGuard** did not start as a three-layer architecture. It started as an XGBoost classifier trained on transaction features. It had 94% accuracy. It also missed 60% of coordinated fraud rings. This is the story of what I built to fix that.

## Why a Single Model Fails at Fraud

The fundamental problem with treating fraud detection as a standard classification problem is the **independence assumption**. A single transaction might look legitimate in isolation. But if you zoom out and see the same card used at three merchants within two minutes across different cities, the picture changes.

Fraud operates in *structures* — rings, mule accounts, shared behavioural patterns. A model that sees transactions as isolated feature vectors is architecturally blind to this.

## Layer 1: Graph Neural Networks for Ring Detection

I modelled the transaction network as a graph: accounts as nodes, transactions as edges with feature vectors covering amount, time, and merchant category. **PyTorch Geometric GraphSAGE** learned neighbourhood aggregations that flagged accounts with anomalous structural positions — high betweenness centrality in short-time subgraphs, clusters of rapid fund movement.

The GNN job: **detect who is involved in a fraud ring**, not whether a single transaction is fraudulent.

> GraphSAGE over full GCN because the transaction graph is dynamic — new nodes appear constantly. GraphSAGE inductive learning generalises to unseen nodes without retraining.

## Layer 2: Transformer Sequence Model for Behavioural Anomalies

A cardholder transaction history is a sequence with temporal and semantic structure. A Transformer with **positional encoding over time-deltas** learned normal behavioural patterns per account — typical merchant categories, spending velocity, time-of-day distributions.

Anomaly detection was residual-based: the model predicts the next transaction feature distribution, and large deviations score as behavioural anomalies.

## Layer 3: XGBoost Ensemble

Both upstream models output probability scores and learned embeddings. XGBoost sees these as features — along with raw transaction metadata — and produces the final risk score. This layer learned the *interaction* between structural risk (GNN) and behavioural risk (Transformer).

This is where calibration happened. The deep models were high-recall but noisy. XGBoost learned when both signals agreed and when one should dominate.

## SHAP: The Layer That Made Deployment Possible

A fraud model that flags a transaction without explaining why will never be trusted by a compliance team. **SHAP TreeExplainer** on the XGBoost layer produced per-prediction feature attributions in under 5ms.

The alert interface showed analysts concrete attribution scores for behavioural velocity, network centrality, and amount deviation — a workable investigation lead, not a black-box verdict.

## What Three Rewrites Actually Teach You

Each rewrite forced me to understand *why* the previous architecture failed — not just that it did. Version 1 had no structural awareness. Version 2 had structural awareness but no behavioural context. Version 3 had both, plus a calibration layer and explainability.

The lesson: **architecture decisions are hypotheses about what causes the problem you are solving.** Test them explicitly.
