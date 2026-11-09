---
intro: A batch analytics pipeline over 13.0M public GitHub events from early 2015 that measures which first-time open-source contributors come back for a second pull request, and why.
caption: Raw events flow from GH Archive through Source adapters, SQL layers and the Analysis stage, with each step writing to storage, and end in an HTML dashboard, a Streamlit app and a JSON API.
---

## About

Most people who open a first pull request in an open-source repo never open a second. Maintainers are often told that fast replies fix this. The core question was **does a fast first response make a first-time contributor more likely to return, or do responsive repos just retain people for other reasons?**

I used GH Archive dumps for January to March 2015: 13.0M events, 1.14M pull requests, and 17,378 first-time contributors across 297 repos. The North Star metric is the share who open a second PR in the same repo within 30 days. All results are associations, not causal effects.

## Architecture

**GH Archive** hourly files (or, optionally, **BigQuery** or **Own parquet**) go into the **Source adapters**. They keep six event types and write **Raw events**: one parquet file per hour in a fixed 17-column schema. The **SQL layers**, eight numbered DuckDB scripts, remove duplicates, flag bots, build each PR's lifecycle and first response, and write **Fact tables** to `warehouse.duckdb` and parquet.

The **Analysis stage** reads only those exports. It computes the funnel, retention, Kaplan-Meier curves, Cox models, propensity-score matching and a per-repo scorecard, then writes **Reports** (JSON, CSV, PNG). Three read-only front ends use them: an **HTML dashboard**, a **Streamlit app**, and a FastAPI **JSON API** that also serves the fact tables.

## How it's implemented

### One event schema at the seam

Every adapter writes the same 17-column schema, and a new source is one registered class. Nothing downstream knows where data came from, so the SQL exists once, in DuckDB's dialect. BigQuery is only an extract source.

### Free, resumable ingest

2023 hourly files are about 120 MB; 2015 files are 5 to 15 MB, so three months fit on a laptop. The extractor streams each gzip file, writes one parquet per hour atomically, skips finished hours and retries with backoff, which mattered when it crashed midway on a urllib3 timeout.

### Plain, parameterised SQL

The eight `.sql` files run in order, with the date window, bot regex and lookback filled in from one YAML config. Bots are excluded by login pattern and by behaviour (over 400 events a day). A `sanity` command runs six queries that must each return zero.

### Avoiding immortal-time bias

Whether a PR got a reply within 24 hours is only known after 24 hours. So I used a landmark design: only contributors who hadn't returned by then are included, and their clock starts there. The naive model is reported alongside, labelled as biased.

### Within-repo versus between-repo

The pooled Cox model showed a strong effect, but matching within each repo disagreed. I added a repo-stratified Cox model and a repo-level correlation, which showed the association is about which repo someone joined, not how fast their own PR got a reply.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Python 3.11 + SQL | One language end to end |
| Framework | Click CLI, FastAPI, Streamlit | Each stage runs on its own; front ends only read files |
| Data/ML | DuckDB, pandas, lifelines, statsmodels, scikit-learn | Survival models and matching, not prediction |
| Storage | Parquet (zstd) + a DuckDB file | No server or credentials needed, and BI tools can read it |
| Infra/CI | Makefile, YAML configs | `make all` runs the whole chain; a second config handles the 297-repo run |
| Testing | pytest on a synthetic scenario + 6 sanity queries | Every expected value can be checked by hand |

## Results

| Measure | Baseline | Best |
|---|---|---|
| 30-day return rate, by first-response speed | 27.0% (no response) | **43.6%** (reply under 1h) |
| 30-day return after the 24h mark, by PR status | 17.5% (closed unmerged) | **28.9%** (merged) |
| Hazard ratio for a reply within 24h | 1.69 (pooled Cox) | **0.99** (Cox stratified by repo, CI 0.91 to 1.07) |
| Covariate balance, max standardized mean difference | 0.13 (before matching) | **0.03** (after matching) |

Overall, 34.8% returned within 30 days. Repos that answered more PRs within 24 hours kept more contributors (Spearman 0.42, 291 repos), but within a repo a faster reply was not linked to that author returning, so a responsiveness experiment should randomise by repo, not by PR.

## What I'd do differently

- Pull 12 months through BigQuery to measure 90-day return, the original target; three months only allowed 30 days of follow-up.
- Explain why within-repo matching shows a small negative effect (-2.8 points) while the stratified Cox model shows none.
- Add repo language from the GitHub API; the events carry none.
- Run the tests and sanity checks in CI instead of by hand.
