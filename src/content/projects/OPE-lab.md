---
intro: OPE-lab is a counterfactual-evaluation lab that asks whether you can trust an offline A/B test, by grading eight off-policy estimators against a real randomised ground truth from the Open Bandit Dataset (ZOZOTOWN fashion recommendations). The finding is that overlap decides almost everything, and that nominal 95% intervals usually aren't.
caption: Open Bandit logs are ingested to Parquet, split by time, and passed through Reward models and a Policy zoo into the Pipeline cache, where the OPEvaluator scores every estimator against the Ground truth from the random log; Experiments E1 to E6 write results that feed the Reports and the Streamlit app.
---

## About

Off-policy estimators (DM, IPW, SNIPW, DR, SNDR, Switch-DR, DR-shrinkage) promise to tell you how a new recommender policy would have done, using only logs from the old one, but they are usually tested on simulations. The Open Bandit Dataset also ran a uniformly random policy in the same week, which gives an unbiased ground truth.

So **if I grade every estimator against that ground truth, which ones can actually be trusted, at what log size, and for which decision?** I scored accuracy, confidence-interval coverage, overlap, reward-model robustness, pairwise decisions and the optimizer's curse, and ran two campaigns (men and women) as a replication. The reward is a click only, so nothing here is a business-lift claim.

## Architecture

The raw **Open Bandit logs** go through **Ingest**, which writes Parquet with a shared item vocabulary and groups the three slot rows of each impression. **Chronological splits** keep a train window for models and an evaluation window for scoring. **Reward models** (LightGBM and simpler slot+item models) are fit on the train window only, and the **Policy zoo** builds 20 target policies from them.

The **Pipeline cache** streams per-policy importance weights, predicted rewards and policy values in chunks into memory-mapped arrays. The **Ground truth** for each policy comes from the random log in the evaluation window, with its own confidence interval. The **OPEvaluator** runs the estimators on samples drawn from the cache, and **Experiments E1 to E6** sweep log size, overlap, reward-model quality, pairwise decisions and policy selection. Their results go to Parquet, then to the **Reports** (scorecard, figures, decision guide) and the **Streamlit app**. DVC tracks every stage.

## How it's implemented

### Everything is arrays

`OPEvaluator` takes `reward, action, pscore, pi_e` and an optional `q_hat`, so it works on any logged-bandit data. Estimators, policies and reward models are plug-ins; a new estimator is one `register` call.

### Influence terms, not just point estimates

Each estimator returns per-sample influence terms. Standard errors, cluster-robust errors per impression, paired policy differences and a fast bootstrap all come from that one object, including for the self-normalised estimators. That is how I could show the coverage shortfall comes from heavy-tailed weights rather than dependence between slots: the cluster-robust errors matched the plain ones.

### A cache so experiments are cheap

Per-policy statistics are computed once and stored as memory-mapped `.npy` files. Experiments only gather rows, so 200 replicates by 20 policies by 8 estimators over a 2.3M-row pool take about 90 seconds. That made it possible to run full sweeps instead of a few hand-picked cases.

### Validity first

Splits are by time, reward models only see the train window, and the ground truth's own uncertainty is carried into every metric.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Python 3.11 | NumPy and the bandit tooling live here |
| Data and ML | pandas, NumPy, LightGBM, joblib | Array-first estimators and parallel replicates |
| Storage | Parquet, memory-mapped `.npy` cache | Fast row gathering over 2.3M rows |
| Pipeline | DVC stages, `params.yaml` | Every result can be rebuilt from raw data |
| App and infra | Streamlit, Docker | The scorecard is browsable without rerunning anything |
| Testing | pytest, 52 tests including agreement with `obp` | Estimators match a reference library |

## Results

Men's campaign at n = 100k, median over the 20-policy zoo, unless noted.

| Measure | Baseline | Best |
|---|---|---|
| Relative RMSE vs ground truth | 0.53 (DM) | **0.11** (IPW clipped at 20) |
| Coverage of nominal 95% interval | 0.00 (DM) | **0.93** (DR) |
| Pairwise decision accuracy | 0.69 (DM) | **0.97** (IPW clipped at 20) |
| Rank correlation with true policy values | 0.07 (IPW clipped at 20) | **0.79** (Switch-DR) |
| Winner's value inflation (optimizer's curse) | +224% at n = 10k | **+24 to 33%** at n = 200k |

No single estimator wins: clipped IPW has the lowest error and best pair accuracy but ranks the best policies last, while DM and Switch-DR rank well with the worst error and coverage. A LightGBM reward model trained on the logging policy's data scored an AUC of 0.49 (men) and 0.55 (women) on the random log, about chance, which explains why DR gained nothing over IPW. All numbers come from `results/` and `reports/decision_guide.md`.

## What I'd do differently

- Use a longer window or more platforms; one week and one site limit how far the findings generalise.
- Train a reward model on randomised data, since the logging-policy model is what sinks DM and DR here.
- Model the three slots of an impression jointly instead of as independent rows.
