---
intro: A taxi fare estimator that prices a NYC trip before it happens, by predicting trip time with XGBoost and feeding it through the official rate card. It started as a notebook with 99% R² that turned out to be target leakage.
caption: A fare request flows from the Dashboard through the FastAPI service, which geocodes and routes it, then through the Feature builder, Trip-time model and Rate-card engine to a Fare quote, with offline training writing the model artifacts and calibration underneath.
---

## About

This is a fare estimator with a FastAPI backend and a map dashboard. You give it a pickup, a drop-off and a time. It returns a price with a range, a surcharge breakdown, a fare-by-hour curve and weather what-ifs. NYC is calibrated on a year of TLC yellow taxi trips.

The original notebook scored 99% R². Its features included trip duration and metered distance, which are only known after the trip, so the model was reading the answer. The real question became: **how well can you price a taxi trip using only what is known at booking time?**

## Architecture

The **Dashboard** sends a POST to `/api/predict` on the **FastAPI service**. The service resolves addresses with **Photon / Nominatim** and gets a road route and distance from **OSRM**. The **Feature builder** turns route distance, coordinates and time into features. It looks up historical speeds per H3 hexagon and hour from the **Model artifacts**, adds holidays, and pulls hourly weather and permitted events from the **Context feeds** (Open-Meteo and NYC events).

The **Trip-time model** (XGBoost) predicts minutes with traffic. The **Rate-card engine** applies the city's tariff from **City rate cards + calibration**: meter, flat fares and surcharges. The result is a **Fare quote** with a range, returned to the Dashboard as JSON. Offline, the **Training pipeline** reads **TLC trip records** and writes the model, speed tables and calibration.

## How it's implemented

### Predict time, not fare

The model predicts trip duration. A fare is then computed from distance and duration with the official rate card. The fare rules are public and deterministic, so there is no point learning them. A new city only needs a rate card.

### City-agnostic features

Locations are H3 hexagons at resolution 7. Traffic comes from historical speed tables keyed by city, hexagon and hour. Weather, events and holidays come from each city's providers. The same `features.py` code is used in `train.py` and at serving time, so training and serving can't drift apart.

### Rate cards as JSON

`tariff.py` is a generic engine. `cities/nyc.json` encodes the TLC rules: meter, the $70 JFK flat fare, overnight and rush-hour surcharges, congestion surcharge, CBD toll and airport fees. Training learns corrections from real trips: how the meter charges slow traffic, driven vs routed distance, the app price premium, and prediction intervals.

### Honest evaluation

I fixed the notebook bugs: the scaler re-fitted on test data, swapped `r2_score` arguments and a random split. The split is now out-of-time: train Sep 2025 to Jun 2026, validate Jul 2026, test Aug 2026. Training writes to `artifacts_new/` and only swaps it in when it finishes, so a crashed run can't break the app.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Python 3.11 | One language for training and serving |
| Framework | FastAPI, Uvicorn, Pydantic | Typed request and response models, docs at `/docs` |
| Data/ML | XGBoost, pandas, H3, shapely, holidays | Fast tree model on tabular features, global hexagon grid |
| Storage | JSON and CSV files in `artifacts/` and `cities/` | Small enough to ship inside the container |
| Infra | Docker (python:3.11-slim), optional MLflow | One-command deploy, run tracking when needed |
| Testing | Out-of-time held-out month | No unit tests yet; evaluation is on Aug 2026 trips |

## Results

All numbers are on the held-out Aug 2026 NYC month. Baseline uses the road distance between taxi-zone centres. Best uses the zone pair's historical median distance.

| Measure | Baseline | Best |
|---|---|---|
| Street-hail fare MAE | $3.56 | **$2.96** |
| Street-hail fare R² | 0.878 | **0.914** |
| App-booked fare MAE | $5.67 | **$5.60** |
| Trip-time model MAE | - | **3.7 min** |
| Rate card MAE, given true distance and time | - | **$0.77** |

Street-hail fares can be priced to about $3 before the trip. App fares are upfront prices set by the app, and even with the true distance and time they don't get much better than $5.60. A model trained on 20k trips per month scores almost the same, so the limit is what's knowable before the trip, not data volume.

## What I'd do differently

- Add unit tests for the rate-card engine and the API. Right now the only check is the held-out evaluation.
- Evaluate with real addresses. The test set only has taxi zones, so both distance estimates are coarser than what the app actually uses.
- Self-host OSRM and Photon. The public servers are rate-limited demo services.
- Calibrate a second city with local trip data. Today other cities use speed patterns learned in NYC.
