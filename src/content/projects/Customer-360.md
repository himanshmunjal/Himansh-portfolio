---
intro: A PostgreSQL Customer 360 warehouse built on the real Olist e-commerce dataset and loaded incrementally from messy daily files, with an SCD Type 2 customer dimension, a BigQuery port checked against Postgres, and a small model that ranks orders by bad-review risk.
caption: The Olist dataset is replayed as daily landing files, the incremental ingest loads them through raw, silver and dw layers in a Postgres warehouse, and the mart views and ml schema feed a Streamlit dashboard and a bad-review model, while a BigQuery pipeline loads a sample that a parity check compares against Postgres.
---

## About

Most warehouse demos load a clean snapshot once. Real feeds arrive late, twice, out of order, and with corrections. I turned the Olist dataset (99,441 orders, 2016 to 2018) into a backfill plus 116 daily files with all of those problems, then built a warehouse that has to handle them.

The core question: **however the data arrives, does the warehouse end up identical to a one-shot rebuild, down to the surrogate keys?** Once that held, I used the warehouse to model which orders will get a 1-2 star review.

## Architecture

The Olist dataset goes into the Landing simulator, which writes Landing files and checks that replaying them reproduces every order. The Incremental ingest checksums each file, skips files it has already seen, and loads each run in one transaction. In the Postgres warehouse, rows land in raw (bronze), which is append-only. Only the keys a batch touched are refreshed into silver, and the SCD2 logic and fact upserts build the dw star schema.

The mart views feed the Streamlit dashboard. The ml schema gives order features to the Bad-review model and stores its risk scores. Separately, a sample goes through the BigQuery pipeline into BigQuery (emulator), and a Parity check compares its tables with Postgres.

## How it's implemented

### Snapshots, not change events

Orders arrive as status snapshots. For each touched key, silver picks the winner from the full bronze history: newest business timestamp first, then newest batch, then a fixed tiebreak. That way a stale snapshot that arrives late never overwrites a newer status, and batch order doesn't change the result.

### SCD2 that survives late data

"Close the current row, insert a new one" breaks when a change belongs in the middle of history. Instead, for each touched person I rebuild their location history into versions, reconcile it with `dim_customer`, and re-point facts that now fall into another version. Surrogate keys are a hash of `(person, valid_from)`, so a rebuilt version keeps its key.

### Late customers and bad files

An order whose customer hasn't arrived waits in `mart.pending_orders` and loads in the run where the customer lands. A redelivered batch with new content replaces its old rows. A bad file mid-run rolls the whole transaction back.

### Proving convergence

`pipeline/fingerprint.py` hashes every table. The tests build warehouses day by day, all at once, and in random order, and require identical hashes. Removing the fact re-key step makes them fail.

### A model judged on time

The model uses only what is known at carrier handoff. I chose it with forward-chaining validation over three windows and touched a June 2018 test set once. My first attempt overfitted one unusual quarter, so I dropped gradient boosting for logistic regression.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Python 3.11 and SQL | Transformations are set-based SQL; Python runs them |
| Storage | PostgreSQL 16 in Docker | Transactions and constraints enforce the SCD2 rules |
| Cloud port | BigQuery SQL on an emulator | Same design without Postgres features |
| Data and ML | pandas, scikit-learn | A small, explainable model |
| Output | Streamlit and Plotly | Six pages read from mart views |
| Infra and CI | Makefile, GitHub Actions | CI runs a smoke test on every push |
| Testing | pytest, 22 SQL assertions | Behaviour tests per data hazard |

## Results

| Measure | Baseline | Best |
|---|---|---|
| Bad-review ROC-AUC, test set | 0.495 (random) | **0.637** (logistic regression) |
| Bad reviews caught in riskiest 10% | 8.7% (random) | **25.1%** |
| Mean ROC-AUC, time-based validation | 0.603 (gradient boosting) | **0.674** (logistic regression) |
| One-week query, 2M-row table | 126.2 ms (no index) | **3.3 ms** (covering index) |
| Load time | about 3 min (full rebuild) | **about 1.3 s** per daily batch |
| Tables differing from one-shot rebuild | n/a | **0 of 9** |

The model gives 2.5x lift in the top decile, which is enough to direct outreach but modest. Even the actual delivery delay only reaches 0.683 AUC, so most bad reviews can't be predicted from logistics data alone.

## What I'd do differently

- Run the BigQuery version on a real project. The emulator can't run `MERGE`, so it uses delete-then-insert, and cost and pruning are untested.
- Run the Airflow DAG for real; it compiles but has never been scheduled.
- Alert on how long orders stay pending, instead of letting them wait silently.
- Add carrier and weather data, since the main causes of delay are invisible to the model.
