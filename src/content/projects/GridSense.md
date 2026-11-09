---
intro: GridSense forecasts the next 24 hours of electricity demand for four grid zones built from 309 real metered clients in Portugal, and flags abnormal hours with an LSTM autoencoder. A blend of an encoder-decoder LSTM and LightGBM beats the seasonal-naive baselines by 21 to 31% on MAE, with calibrated 95% bands.
caption: UCI meter readings, Lisbon weather and holidays go through Zone builder and Feature pipeline into the LSTM forecaster, LightGBM forecaster and Anomaly autoencoder, whose saved models are loaded by the FastAPI service and shown on the React dashboard.
---

## About

Grid operators plan generation a day ahead, so they need an hourly forecast for tomorrow, and they need to know when today's load stops looking normal. GridSense does both for four zones built from the UCI ElectricityLoadDiagrams dataset: 309 Portuguese clients metered every 15 minutes from 2012 to 2014.

I rebuilt an earlier version, which cloned one household into four zones, around one question: **does a deep model actually beat "same hour yesterday" or "same hour last week" on real aggregate load, and by how much?** Every model is scored against those baselines on the same windows, so the answer is a number rather than an assumption.

## Architecture

The **UCI meter readings** are converted to hourly kWh, and the **Zone builder** groups clients by the shape of their weekly profile into four zones: evening-peak, baseload 24/7, weekday-business and mixed. It also injects labelled anomaly events into 1% of hours. **Lisbon weather and holidays** are joined in, and the **Feature pipeline** builds 48-hour past windows and 24-hour known-future covariates, split 70/15/15 by time.

Three models train on those windows: the **LSTM forecaster** (encoder-decoder with MC Dropout), the **LightGBM forecaster**, and the **Anomaly autoencoder**, which is trained on normal load only. Training writes **Saved models**: weights, blend weights, band widths and thresholds. The **FastAPI service** loads them and serves `/forecast`, `/anomalies`, `/zones` and `/health`, and the **React dashboard** draws the forecast with its band, the anomaly feed and a heatmap per zone.

## How it's implemented

### Zones by load shape, not by guesswork

Plain KMeans isolated one weekday-only client in its own cluster, so I switched to explicit rules on the normalised weekly profile, measured on training data only. I dropped three feeder-sized meters and repaired UCI's documented DST artefacts.

### A forecaster that knows tomorrow

The encoder reads the past 48 hours. The decoder walks the 24 target hours with what is already known about them: lag-24h and lag-168h demand, calendar features, holidays and a temperature forecast. Archived forecasts don't exist for 2012 to 2014, so I add seeded 1.5 °C Gaussian noise to the future temperature. Using the true temperature would leak information.

### Two models, one blend

LightGBM is trained on the LSTM's exact windows, so the comparison is fair. The served forecast is a weighted average, with the weight chosen on validation MAE. The LSTM weight came out between 0.15 and 0.5, so neither model wins alone. The 95% band is calibrated on validation from MC Dropout spread, so its coverage is checked rather than assumed.

### Anomalies scored per hour

The autoencoder reconstructs 48-hour windows of normal load. Each hour's score is its mean error across every window that covers it, so one spiked hour isn't diluted 48 times. The threshold maximises F1 over 20 fresh injections into the validation load, because a single split has only 8 to 17 events.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Python 3.11, JavaScript | One language for data, models and API |
| Data | pandas, `holidays`, Open-Meteo archive | Real load, local-time weather and Portuguese holidays |
| ML | PyTorch (LSTM, autoencoder), LightGBM | A deep model and a strong tree baseline on the same windows |
| Storage | Zone CSVs, saved weights, `metrics.json` | The API reads exactly what training wrote |
| Serving | FastAPI, React + Vite + Recharts | Small API and a live chart per zone |
| Testing | Seasonal-naive baselines, ablations, 20-run Monte Carlo | Every claim is relative to a baseline |

## Results

Test split (last 15% of 2012 to 2014), every 24-hour-ahead window.

| Measure | Baseline | Best |
|---|---|---|
| MAPE, evening-peak zone | 4.67% (same hour yesterday) | **3.39%** (blend) |
| MAPE, weekday-business zone | 5.14% (same hour last week) | **3.56%** (blend) |
| MAE reduction vs the better naive baseline | 0% | **21.5 to 30.7%** across zones |
| 95% band coverage | 95% target | **94.6 to 96.7%** |
| Anomaly F1, mean over 20 injections | 0.727 (evening-peak) | **0.930** (weekday-business) |
| Incidents with at least one flagged hour | 82.7% (mixed) | **96.4%** (weekday-business) |

The blend beat both the LSTM and LightGBM alone in every zone, and the bands are close to their target. All numbers come from `results/metrics.json` and `results/confusion_matrices.json`.

## What I'd do differently

- Use real archived weather forecasts instead of simulated noise on observed temperature.
- Test the anomaly detector on real incidents. The injected spikes and dropouts are synthetic, so its F1 is an upper bound.
- Make the API consume a live feed. It currently replays the end of each zone CSV as if it were live.
