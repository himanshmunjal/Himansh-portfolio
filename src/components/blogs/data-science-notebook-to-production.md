# From Notebook to Nowhere: The Real Reason Data Science Projects Fail

The **Taxi Fare Prediction** project was the first time I built a machine learning system with the explicit goal of deployment — not just a strong validation score. What I discovered broke some fundamental assumptions I had carried from university coursework.

## The Notebook Trap

Most ML projects I had built before lived entirely in Jupyter notebooks. Clean data in, model out, nice plots. The problem: **notebooks are presentations, not systems.** They do not version state, they cannot be scheduled, they do not expose endpoints, and they assume a human is watching.

The moment I tried to automate the Taxi Fare pipeline with **Prefect**, I realised I had been building software that required me to press Run All — and that is not a product.

## Experiment Tracking Changes How You Think

Before MLflow, I kept a mental note of which hyperparameters I had tried. I would overwrite model files without logging anything. When I finally integrated **MLflow tracking**, something clicked: I could see my own reasoning history.

Every run had: input features, hyperparameters, metrics, artifact path. I could compare XGBoost vs CatBoost across 40 runs in a table. This did not just help me pick the best model — it made me more systematic because I knew I was being tracked.

> A model whose training process is not logged is a liability. You cannot debug what you cannot trace.

## FastAPI Is the Right Default

Wrapping a model in **FastAPI** for real-time prediction was the first time a model felt *real* to me. A POST request comes in with pickup and dropoff coordinates and time features. JSON comes back with a fare estimate. Under 50ms.

The key insight: **model serving and model training are different engineering problems.** Training is a batch compute job. Serving is a latency-sensitive web service. They deserve separate codebases.

## Docker Made the Fear Go Away

I had avoided Docker for a year because it felt like ops territory. Containerising the FastAPI app changed my mind entirely. The environment *is* the code. No more "it works on my machine."

The discipline of writing a clean `Dockerfile` forced me to audit my dependencies, remove dead imports, and understand exactly what my app actually needed to run.

## What the Production Mindset Actually Is

It is not about specific tools. It is a set of questions you ask from day one:

- How will this be triggered?
- How will failures be caught and reported?
- How will I know if the model starts degrading?
- Who else needs to run this, and can they?

Asking these questions before writing any model code changes what you build.
