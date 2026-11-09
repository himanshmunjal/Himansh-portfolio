---
intro: CodeSense is a retrieval-augmented question-answering system for GitHub repositories: it parses code into functions, classes and a call graph, then answers plain-English questions about the code, citing file, function and line.
caption: A GitHub repo is cloned and parsed by a Celery worker into Redis, a call graph and Qdrant, while questions from the React UI pass through FastAPI, a query classifier, retrievers, a reranker and a Groq LLM to become a cited answer.
---

## About

CodeSense lets me point at a GitHub repository and ask things like "what calls this function?". It parses Python, JavaScript, TypeScript, Java and Go with tree-sitter, indexes every function and class, and answers with `file:function:line` citations I can check.

Most RAG-over-code setups split files into fixed-size text chunks, which cuts functions in half and ignores who calls whom. The question I built this around was: **can a retriever that treats code as both meaning and structure answer real codebase questions more reliably than plain text search, and can I show that with measurements instead of demos?**

## Architecture

Ingestion and querying are separate paths. To ingest a repo, the React UI sends a request to FastAPI, which puts an ingest job on Redis. A Celery worker picks it up, clones the GitHub repo, and passes the source files to the tree-sitter parser. The parser extracts entities and builds a call graph, which is saved to disk as the Call graph. The Embedders turn each chunk into a 384-dimensional bge-small vector and a 128-dimensional node2vec vector, and both are written to Qdrant.

For a question, FastAPI sends the text to the Query classifier, an LLM call that labels it lookup, relational, analytical or summarization. The Retrievers then pick a strategy: semantic search in Qdrant, call-graph traversal, or clustering for analytical questions. The Reranker (a MiniLM cross-encoder) keeps the top 5, and the Groq LLM writes the Cited answer from those sources only.

## How it's implemented

### AST chunks instead of token windows

Each function, method or class is one chunk and is never split. I also index one module-level chunk per file, because code outside any function (database clients, app setup) was otherwise invisible and produced wrong answers.

### Routing by query type

"What calls X" has nothing to do with text similarity, so relational questions go to a networkx traversal instead of vector search. The extra LLM call adds latency but avoids confident, irrelevant matches.

### Swapping the embedding model on evidence

I started with `microsoft/codebert-base` and hand-written mean pooling. Measured, its top 20 candidates for a real query all scored 0.94 to 0.965, relevant or not. I switched to `BAAI/bge-small-en-v1.5` through `sentence-transformers` and recalibrated the refusal threshold from 0.65 to 0.5.

### A shared prompt budget

Whole-file chunks once pushed a request to about 24,000 tokens against an 8,000 tokens-per-minute limit. A flat per-source cap truncated small files, so I spend one character budget across sources in rank order instead.

### Ingestion off the request path

Parsing a large repo takes minutes, so it runs in a Celery process with Redis as the broker, and re-ingesting an unchanged commit returns at once.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Python 3.11, JavaScript | ML ecosystem; browser UI |
| Framework | FastAPI, React + Vite | Async routes with Pydantic validation |
| Parsing | tree-sitter, networkx | One AST library for five languages |
| Data/ML | bge-small-en-v1.5, MiniLM cross-encoder, Groq | Local embeddings, fast hosted LLM |
| Storage | Qdrant, Redis | Two named vectors per point; Celery broker |
| Infra/CI | Docker Compose, GitHub Actions | Tests and frontend build on every push |
| Testing | pytest, Precision@5 harness | No Docker needed; hand-labelled ground truth |

## Results

All Precision@5 runs use the same 8 hand-labelled queries against my polyglot Ephemeral-share repo (Go backend, JS frontend). Baseline is CodeBERT; Best is the bge-small configuration I kept.

| Measure | Baseline | Best |
|---|---|---|
| Score separation, irrelevant vs relevant | none, top 20 all 0.94 to 0.965 | **at most 0.43 vs 0.55 to 0.79** |
| Refusal rate | 25.0% | **12.5%** |
| Precision@5, JavaScript queries | **3 of 3** | 2 of 3 |
| Precision@5, Go queries | 0 of 4 | 0 of 4 |
| Precision@5, overall | **37.5%** | 25.0% |

The new model gives meaningful scores and refuses half as often, but it did not retrieve better on this set: Precision@5 fell and every Go query missed. With 8 queries the numbers are noisy, so I can't claim an improvement yet.

## What I'd do differently

- Build a bigger eval set, around 50 queries per language, before changing models, so one hit doesn't move the overall score by 12.5 points.
- Use the node2vec vectors or remove them: they are stored in Qdrant, but no query path searches them yet.
- Try a code-specific embedding model aimed at Go, which missed every query in both runs.
- Replace name matching in the call graph with type inference, so dynamic calls like `obj.method()` get edges.
