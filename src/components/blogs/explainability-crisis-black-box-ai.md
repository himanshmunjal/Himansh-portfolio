# The Explainability Crisis: Why Black-Box AI Is Failing High-Stakes Industries

Artificial intelligence is being deployed at scale inside financial institutions, hospitals, hiring platforms, and criminal justice systems. In most of these environments, the models making critical decisions **cannot explain themselves**.

## The Illusion of Post-Hoc Explainability

SHAP and LIME are the industry default for model explanation. I have used both extensively — SHAP TreeExplainer in FinGuard, attention visualisation in DisasterTweet AI. They are genuinely useful. They are also **fundamentally approximations**.

SHAP computes Shapley values by averaging model outputs over feature perturbations. For complex, highly non-linear models such as deep neural networks and large ensembles, the perturbation space is so large that values are *estimated* — not computed. A SHAP explanation for a 200-layer network is a linear approximation of a non-linear function.

> The danger is not that SHAP is wrong. It is that SHAP is *confidently presented* in contexts where its approximation error is material to the decision.

## Where This Becomes a Systemic Risk

**Credit scoring**: A rejection score with SHAP attributions tells you which features mattered. It does not tell you if the model learned a proxy for a protected attribute. SHAP cannot detect discriminatory encodings it does not know to look for.

**Medical diagnosis**: A model that flags a patient for high sepsis risk because of feature X gives a physician an actionable signal — if feature X is clinically meaningful. If the model learned a correlation between feature X and a data collection artefact, the explanation is coherent but wrong.

**Hiring**: NLP-based resume screening systems can produce confident classification outputs with sensible-looking feature attributions while systematically downranking certain linguistic styles or educational backgrounds.

## The Honest Path Forward: Inherently Interpretable Models

The research community is increasingly arguing that **interpretability should be a design constraint, not a retrofit**. Monotone GAMs, decision trees with bounded depth, sparse linear models with semantic features — these are inherently interpretable because their decision logic is human-readable by construction.

The counterargument is performance. For many tasks, interpretable models trade accuracy for transparency. But in high-stakes domains, that tradeoff may be the ethically correct one.

## What Trustworthy AI Actually Looks Like

Trustworthy AI requires three things that most deployments do not have:

- **Explanation fidelity measurement**: How accurate is the explanation relative to the model's actual reasoning? This is rarely quantified.
- **Explanation stability**: Does the same input always produce the same explanation? LIME is famously unstable across runs.
- **Stakeholder-appropriate explanations**: A compliance officer and an end user need different information. Most systems provide one format for everyone.

The explainability problem is not solved. We have built useful tools and mistaken them for solutions.
