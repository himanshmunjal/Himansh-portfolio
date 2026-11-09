// Each project is also written up as an experiment: question → method → result.
// Only put numbers in `metrics` that were actually measured; they're shown as headline results.
// Order matters: the home page shows the first five as cards and lists the rest in its index.
// The list leads with the strongest work for SDE / Backend / AI Engineer / Data Scientist / Data Analyst roles.
export interface Metric { value: string; label: string }

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  category: string;
  color: string;
  link: string;
  ongoing?: boolean;
  problem: string;
  approach: string[];
  result: string;
  metrics?: Metric[];
  /** Slug of a blog post that goes deeper on this project */
  writeup?: string;
  /** Overrides the slug derived from the title, when the write-up file is named differently */
  slug?: string;
}

export const allProjects: Project[] = [
  {
    id: 1,
    subtitle: 'A distributed in-memory cache server, built from the data structures up',
    problem: 'How much do eviction policy and locking strategy actually matter for a cache under realistic, skewed traffic, and which one is worth the complexity?',
    approach: [
      'Three eviction policies: LRU, O(1) LFU with frequency buckets, and ARC (as used in ZFS) with ghost lists.',
      'Three concurrency strategies: one coarse read-write lock, 16 independently locked segments, and lock-free reads.',
      'Netty TCP server, consistent hashing with 150 virtual nodes, AOF and snapshot persistence.',
      'JMH benchmarks on Zipfian and uniform workloads. CI enforces 85% JaCoCo coverage.',
    ],
    result: 'ARC beat LRU by 11 points of hit rate on skewed access. Splitting the lock into 16 segments gave 4.4× the throughput of a single coarse lock.',
    metrics: [
      { value: '87%', label: 'ARC hit rate (LRU 76%)' },
      { value: '4.8M', label: 'ops/sec, segmented' },
      { value: '0.8 ms', label: 'p99 round-trip, 8 clients' },
    ],
    writeup: 'concurrency-bottlenecks-in-java-caches',
    title: 'JCache — In-Memory Cache Server',
    description: 'Built a production-grade, distributed in-memory cache server in Java from the ground up — starting with O(1) data structures and scaling to a full TCP server accessible from any language. Implemented three eviction policies: LRU (doubly linked list + HashMap), O(1) LFU using Shan\'s frequency-bucket algorithm (not the naive O(log n) heap version), and ARC (Adaptive Replacement Cache) — the same algorithm used in ZFS and the macOS kernel — with four ghost lists and a self-tuning adaptation parameter. Layered three concurrency strategies on top: coarse-grained ReentrantReadWriteLock, segmented locking across 16 independent shards (4.4x throughput improvement over coarse), and lock-free reads via ConcurrentHashMap and AtomicLong counters. Added dual-mechanism TTL expiry matching Redis internals — lazy eviction on every get() plus a background ScheduledExecutorService sweeper — with per-key TTL override via the wire protocol. Built an optional persistence layer with an append-only log and atomic snapshot writes, enabling full cache recovery on restart by replaying the AOF log on top of the last snapshot. Exposed the entire library as a TCP server built on Netty — one boss thread accepting connections, N configurable worker threads dispatching commands — with a plain-text wire protocol (GET, PUT, DELETE, STATS, FLUSH, PING) debuggable via telnet. Implemented consistent hashing with 150 virtual nodes per physical node so adding or removing a cluster node remaps only 1/N keys instead of everything. Shipped a Java client library with connection pooling, a ClusterCacheClient that mirrors the hash ring client-side for zero-coordinator routing, and an interactive CLI shell. Containerized with Docker — all configuration (policy, capacity, TTL, threads, segments, persistence) passed via environment variables following twelve-factor app conventions. Benchmarked with JMH across Zipfian and uniform workloads: ARC achieved 87% hit rate vs LRU\'s 76% on skewed access patterns; segmented locking hit 4.8M ops/sec vs 1.1M coarse-grained; network round-trip p99 held at 0.8ms under 8 concurrent clients. CI pipeline via GitHub Actions enforces 85% JaCoCo coverage on every push and runs the JMH suite on merge to main.',
    tech: ['Java', 'Netty', 'JMH', 'JUnit 5', 'JaCoCo', 'Maven', 'Docker', 'GitHub Actions', 'ReentrantReadWriteLock', 'ConcurrentHashMap', 'ScheduledExecutorService', 'Consistent Hashing', 'Go'],
    category: 'Systems & Infrastructure',
    color: 'from-orange-500 to-red-500',
    link: 'https://github.com/himanshmunjal/JCache'
  },
  {
    id: 2,
    subtitle: 'An AI guardian that joins a phone call and stops a scam while it is happening',
    problem: 'Can a system recognise a scam script live, on 8 kHz phone audio in Indian languages, and step in before money moves, without false alarms on genuine bank calls?',
    approach: [
      'Exotel / Twilio media streams and a speakerphone browser feed one Go service; Gnani Prisma transcribes in real time.',
      'A rules pre-filter on every line, with direct demands (OTP, AnyDesk, QR) treated as a scam by themselves.',
      'An optional reasoning LLM adds a risk score but never blocks a warning; spoken warnings are pre-written, never generated.',
      'Timbre speaks the warning into the call in 10 languages, and the family gets a Telegram alert and a live dashboard.',
    ],
    result: 'On 28 unseen scam calls the new rules caught 22 (old rules: 5), and adding the Evon 30B model raised that to 26, for one more false alarm out of 12 normal calls.',
    metrics: [
      { value: '26/28', label: 'unseen scams warned (rules + Evon)' },
      { value: '23/28', label: 'caught at 5 dB street noise' },
      { value: '10', label: 'Indian languages' },
    ],
    title: 'Chaukanna — Live Scam-Call Guardian',
    description: 'Built an AI guardian that joins an elderly person\'s phone call, recognises scam scripts such as "digital arrest", fake customs and KYC-expiry calls while they unfold, and speaks a warning into the call in the person\'s own language. Calls arrive through Exotel or Twilio media streams, or from a browser on speakerphone, at a single Go service that streams 8 kHz audio to Gnani Prisma for transcription with scam keyterms. A rules pre-filter runs on every line in about 0.4 ms and treats a direct demand for an OTP, a screen-share app or a QR scan as a scam by itself; an optional OpenAI-compatible reasoning model adds a risk score over a rolling window but never blocks a warning. Warnings are pre-written per scam type and language and synthesised by Gnani Timbre at startup, so they play without delay. After a warning the system keeps listening, answers talk-outs, interrupts a person reading out digits and alerts the family on Telegram, while a React dashboard streams the live transcript and red flags. Measured on 28 unseen scam calls, rules alone caught 22 and rules plus Evon 30B caught 26, with 2 to 3 false alarms out of 12 normal calls.',
    tech: ['Go', 'Gin', 'WebSockets', 'Gnani Prisma STT', 'Gnani Timbre TTS', 'LLM', 'Exotel', 'Twilio', 'React', 'TypeScript', 'Tailwind CSS', 'SQLite', 'PostgreSQL', 'Docker', 'Telegram'],
    category: 'AI/NLP',
    color: 'from-teal-500 to-emerald-500',
    link: 'https://github.com/himanshmunjal/Chaukanna-AI'
  },
  {
    id: 3,
    subtitle: 'A trust layer that lets AI agents pay with PayPal, within rules you set',
    problem: 'Can an AI agent be allowed to pay real money while no model output, injected text or retried call is able to break a spending limit?',
    approach: [
      'The agent can only name a product, quantity and reason; the server sets the price from the catalog.',
      'A deterministic injection screen and a policy engine (budgets, caps, categories, sellers, retry and split guards) run before any AI.',
      'An AI risk check can only make a decision stricter, and fails safe to asking a human.',
      'Final checks and the ledger insert run in one PostgreSQL transaction under a per-user advisory lock; PayPal calls carry a request id.',
    ],
    result: 'All 18 scripted attacks were stopped, including prompt injection, double charges, split purchases and 12 purchases racing a $50 budget, which committed only $40.',
    metrics: [
      { value: '18/18', label: 'red-team attacks stopped' },
      { value: '82', label: 'backend test cases' },
      { value: '99/100', label: 'APIMatic spec audit' },
    ],
    title: 'Allowance — Safe Agentic Payments with PayPal',
    description: 'Built a trust layer that lets an AI shopping agent pay with PayPal within rules written in plain English. A built-in tool-calling agent on Gemini, Groq or Claude, or any external agent over MCP, calls request_purchase on a Hono API with only a product id, quantity and reason, so the agent can never set the price. Each request goes through a deterministic prompt-injection screen, a policy engine with weekly budgets, auto-pay limits, hard caps, blocked categories and trusted sellers, retry and split-purchase guards, and an AI risk check that can only tighten a decision. The final checks and the ledger insert run in one PostgreSQL transaction under a per-user advisory lock, so concurrent purchases cannot overspend. Allowed purchases are paid with PayPal Orders v2 and a saved Vault token; others go to an approval page with the PayPal JS SDK button, and webhooks reconcile captures, turn off auto-pay when consent is removed and pause an agent on a dispute. A lost PayPal response leaves the payment PROCESSING and it is settled by re-sending the same PayPal-Request-Id. The red-team suite stopped 18 of 18 attacks, and parent accounts can give children an allowance with checks no rule can turn off.',
    tech: ['TypeScript', 'Node.js', 'Hono', 'Next.js', 'PayPal APIs', 'MCP', 'Gemini', 'Groq', 'Claude', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Render'],
    category: 'Backend',
    color: 'from-blue-500 to-indigo-500',
    link: 'https://github.com/himanshmunjal/Allowance'
  },
  {
    id: 4,
    subtitle: 'Retrieval-augmented question answering over GitHub repositories',
    problem: 'Can a retriever that treats code as both meaning and structure answer real codebase questions more reliably than plain text search, and can that be shown with measurements instead of demos?',
    approach: [
      'tree-sitter parses five languages into one chunk per function, class and module, plus a call graph.',
      'An LLM classifier routes each question to vector search in Qdrant, call-graph traversal or clustering.',
      'A MiniLM cross-encoder reranks to the top 5; a Groq LLM answers with file:function:line citations.',
      'Ingestion runs in Celery workers; a hand-labelled Precision@5 harness measures retrieval.',
    ],
    result: 'Switching from CodeBERT to bge-small gave meaningful similarity scores and halved the refusal rate, but Precision@5 on 8 hand-labelled queries did not improve.',
    metrics: [
      { value: '12.5%', label: 'refusal rate (CodeBERT 25%)' },
      { value: '5', label: 'languages parsed' },
    ],
    title: 'CodeSense AI — Code-Aware RAG for GitHub Repos',
    description: 'Built a retrieval-augmented question-answering system for GitHub repositories that parses Python, JavaScript, TypeScript, Java and Go with tree-sitter into function, class and module chunks plus a call graph, then answers plain-English questions with file:function:line citations. An LLM query classifier routes lookup questions to semantic search in Qdrant, relational questions to networkx call-graph traversal, and analytical questions to clustering; a MiniLM cross-encoder reranks candidates and a Groq-hosted LLM writes the answer from the top sources only. Replaced CodeBERT with bge-small-en-v1.5 after measuring that CodeBERT scored all top-20 candidates between 0.94 and 0.965, and shared one prompt budget across sources in rank order to stay under the token-per-minute limit. Ingestion runs off the request path in Celery with Redis as the broker, served by FastAPI with a React frontend and Docker Compose.',
    tech: ['Python', 'FastAPI', 'React', 'tree-sitter', 'networkx', 'Qdrant', 'Redis', 'Celery', 'sentence-transformers', 'Groq', 'Docker', 'GitHub Actions', 'pytest'],
    category: 'AI/NLP',
    color: 'from-violet-500 to-fuchsia-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 5,
    subtitle: 'Can you trust an offline A/B test? Off-policy estimators graded against real ground truth',
    problem: 'If every off-policy estimator is graded against a real randomised ground truth, which can be trusted, at what log size, and for which decision?',
    approach: [
      'Open Bandit Dataset (ZOZOTOWN): a uniformly random policy in the same week gives an unbiased ground truth.',
      'Eight estimators (DM, IPW, SNIPW, DR, SNDR, Switch-DR, DR-shrinkage, clipped IPW) behind one array-based OPEvaluator.',
      'Per-policy weights and predictions cached as memory-mapped arrays, so 200 replicates x 20 policies x 8 estimators take about 90 s.',
      'Six experiments: log size, interval coverage, overlap, reward-model quality, pairwise decisions and the optimizer\'s curse.',
    ],
    result: 'Overlap decides almost everything: nominal 95% intervals covered 88 to 93% at best, no single estimator won on every metric, and the winner\'s value was inflated by up to 224% at small n.',
    metrics: [
      { value: '0.11', label: 'rel. RMSE, clipped IPW (DM 0.53)' },
      { value: '0.93', label: 'best 95% CI coverage' },
      { value: '+224%', label: 'optimizer\'s curse at n = 10k' },
    ],
    title: 'OPE-lab — Off-Policy Evaluation Lab',
    description: 'Built a counterfactual-evaluation lab on real recommender logs from the Open Bandit Dataset (ZOZOTOWN), where a uniformly random policy run in the same week provides an unbiased ground truth for any target policy. Logs are ingested to Parquet with impression ids, split chronologically, and used to fit LightGBM and slot-plus-item reward models and a zoo of 20 target policies. A pipeline streams per-policy importance weights, predicted rewards and policy values into memory-mapped arrays, so experiments over a 2.3M-row pool run in seconds. An array-based OPEvaluator implements eight estimators that return per-sample influence terms, giving standard errors, cluster-robust errors, paired differences and a fast bootstrap from one object. Six experiments grade accuracy versus log size, confidence-interval coverage, overlap, reward-model robustness, pairwise decisions and the optimizer\'s curse, replicated on two campaigns. Clipped IPW reached a relative RMSE of 0.11 against 0.53 for DM, intervals never reached their nominal 95% coverage, and naive selection inflated the winner\'s value by up to 224%. Every stage is a DVC stage, results are browsable in a Streamlit app, and 52 tests include agreement with the obp library.',
    tech: ['Python', 'NumPy', 'pandas', 'LightGBM', 'joblib', 'Parquet', 'DVC', 'Streamlit', 'Docker', 'pytest'],
    category: 'Data Science',
    color: 'from-cyan-500 to-blue-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 6,
    subtitle: 'A real-time collaborative editor on a hand-written CRDT',
    problem: 'How do you let people edit the same text, including offline, so everyone ends up with the same document and no acknowledged edit is lost?',
    approach: [
      'A hand-written RGA sequence CRDT, mirrored in Go on the server and JavaScript in the browser.',
      'One Room per document holds the authoritative copy; every op is committed to PostgreSQL before the sender is acked.',
      'Clients keep a replica and an outbox in localStorage and resync from their last seen sequence number on reconnect.',
      'REST API for auth, sharing, comments, history and uploads; pandoc and typst for Word, PDF and LaTeX.',
    ],
    result: 'Replaying 100,000 sequential inserts into a new document takes 52.2 ms, and both CRDT test suites pin the same concurrent tie-break case so the two implementations cannot drift.',
    metrics: [
      { value: '52.2 ms', label: 'replay of 100k inserts' },
      { value: '25/25', label: 'frontend tests passing' },
    ],
    title: 'SyncEngine — Real-Time Collaborative Editor',
    description: 'Built a Google-Docs-style collaborative editor in Go and React around a sequence CRDT written by hand instead of a library. Each keystroke becomes an RGA operation identified by a client id and a Lamport counter, applied to a local replica and queued in an outbox saved in the browser. A WebSocket hub routes messages to one Room per document, which holds the authoritative copy under a mutex, validates ops, commits them to PostgreSQL in one transaction and only then acks the sender and broadcasts to other clients, so an acknowledged edit is never lost. Rooms load from a snapshot plus tail ops and are evicted when the last user leaves; slow clients are dropped and catch up from their last sequence number. Offline edits merge on reconnect because the CRDT converges by construction, and the server skips ops it already stored, so resends are safe. A Gin REST API covers login, sharing, teams, comments, version history and image uploads to S3-compatible storage, with Word, PDF and LaTeX export through pandoc and typst. CI runs vet, race-detector tests against Postgres and govulncheck.',
    tech: ['Go', 'Gin', 'GORM', 'WebSockets', 'CRDT', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS', 'CodeMirror', 'S3', 'Docker', 'GitHub Actions'],
    category: 'Systems & Infrastructure',
    color: 'from-violet-500 to-purple-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 7,
    subtitle: 'No-login, end-to-end encrypted file sharing that self-destructs in five minutes',
    problem: 'How do you guarantee a session is unreadable at exactly five minutes, and gone from every store soon after, without trusting a cron job?',
    approach: [
      'One Redis TTL per session; child keys copy the remaining TTL, so nothing outlives it.',
      'Redis keyspace expiry events drive cleanup of object storage and WebSocket notifications.',
      'Files upload directly to S3-compatible storage with two-phase pre-signed URLs.',
      'Content is encrypted in the browser with AES-GCM keyed from the access code.',
    ],
    result: 'Works end to end in Docker Compose: the API returns 410 at expiry and the cleanup worker removes stored files. Not benchmarked yet.',
    title: 'Ephemeral Share — Self-Destructing File & Text Sharing',
    description: 'Built a no-login tool for moving files and text between devices with a short code, where every session becomes unreadable after exactly five minutes. A single Redis key with a 300-second TTL is the only clock; child keys inherit its remaining TTL, every endpoint checks it first, and the API returns 410 Gone at expiry even if cleanup is late. Redis keyspace notifications drive an idempotent cleanup worker that deletes the session\'s objects from MinIO/S3/R2 and tells WebSocket clients the session ended. File bytes never pass through the Go API: clients use two-phase pre-signed uploads verified with a HEAD size check and GETDEL completion. Content is encrypted in the browser with AES-GCM-256 keyed by PBKDF2 over the access code. Stateless Gin API instances share live updates through Redis pub/sub, with a React + Capacitor client and Docker Compose deployment.',
    tech: ['Go', 'Gin', 'Redis', 'PostgreSQL', 'MinIO', 'S3', 'WebSockets', 'Web Crypto', 'React', 'Vite', 'Tailwind CSS', 'Capacitor', 'Docker', 'Nginx'],
    category: 'Backend',
    color: 'from-rose-500 to-red-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 8,
    subtitle: 'Importance-tiered KV cache quantization for Hugging Face models',
    problem: 'Can KV cache memory be cut by 20–40% while keeping perplexity within 1% of an FP16 cache, without evicting any tokens?',
    approach: [
      'A drop-in transformers Cache that stores each token at FP16, INT8 or INT4 based on a decayed importance score.',
      'Re-tiers every 16 tokens, so tokens can move back up to higher precision when they matter again.',
      'Keys quantized per channel, values per token; INT4 packed two per byte.',
      'Evaluated on WikiText-2, LongBench and a needle-in-a-haystack test with Qwen2.5-1.5B and Phi-3-mini.',
    ],
    result: 'KV cache memory fell about 40% on both models with perplexity within 0.16%. The cost is decode speed, since tiers are dequantized to FP16 before every matmul.',
    metrics: [
      { value: '−40%', label: 'KV cache memory' },
      { value: '+0.16%', label: 'perplexity, Qwen2.5-1.5B' },
      { value: '0', label: 'tokens evicted' },
    ],
    title: 'Adaptive KV Cache — Mixed-Precision KV Cache Compression',
    description: 'Built a drop-in KV cache for Hugging Face transformers that never evicts a token but stores each one at FP16, INT8 or INT4 according to a running importance score. The default score is KeyDiff-style key diversity, which needs no attention matrix and works with FlashAttention; H2O-style attention mass and VATP-style scoring are options. Every 16 tokens a tiering policy keeps sink tokens, the recent window and the top 30% at FP16, the next 30% at INT8 and the rest at INT4, and because scores decay, tokens can be promoted back. Keys are quantized per channel to handle outlier channels and values per token, with INT4 codes packed two per byte. Fixed three bugs in my own evaluation harness before trusting results. On a 2048-token prompt the cache shrank from 62.4 MB to 37.3 MB on Qwen2.5-1.5B and from 855.6 MB to 512.6 MB on Phi-3-mini, with WikiText-2 perplexity moving 0.16% and 0.02%.',
    tech: ['Python', 'PyTorch', 'Transformers', 'HuggingFace', 'Quantization', 'pytest'],
    category: 'Machine Learning',
    color: 'from-amber-500 to-orange-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 9,
    subtitle: 'An incremental Postgres warehouse with late-data-safe SCD2 and a bad-review model',
    problem: 'However the data arrives (late, twice, out of order or corrected), does the warehouse end up identical to a one-shot rebuild, down to the surrogate keys?',
    approach: [
      'The Olist dataset replayed as a backfill plus 116 messy daily files, loaded through raw, silver and dw layers in one transaction per run.',
      'SCD Type 2 customer history rebuilt per touched person, with surrogate keys hashed from (person, valid_from) so they stay stable.',
      'Table fingerprints prove day-by-day, all-at-once and random-order loads converge; a BigQuery port is parity-checked against Postgres.',
      'A bad-review model chosen with forward-chaining validation, using only what is known at carrier handoff.',
    ],
    result: 'All 9 tables match a one-shot rebuild whatever the load order, a daily batch loads in about 1.3 s instead of a 3-minute rebuild, and the model catches 25.1% of bad reviews in its riskiest 10% of orders.',
    metrics: [
      { value: '0 of 9', label: 'tables differ from a full rebuild' },
      { value: '3.3 ms', label: 'one-week query (126.2 ms unindexed)' },
      { value: '0.637', label: 'bad-review ROC-AUC (random 0.495)' },
    ],
    title: 'Customer 360 — Incremental Data Warehouse & Bad-Review Model',
    description: 'Built a Customer 360 warehouse in PostgreSQL on the real Olist e-commerce dataset (99,441 orders), loaded incrementally from a backfill plus 116 daily files that arrive late, twice, out of order and with corrections. The ingest checksums each file, skips files it has already seen and loads each run in one transaction through append-only raw, silver and a dw star schema. Silver picks each order\'s winning snapshot from the full bronze history, so a stale snapshot never overwrites a newer status. The SCD Type 2 customer dimension is rebuilt per touched person and facts are re-pointed when a late change lands mid-history, with surrogate keys hashed from (person, valid_from). Orders whose customer has not arrived wait in a pending table. Table fingerprints prove that day-by-day, all-at-once and random-order loads produce identical warehouses, and a BigQuery port is checked against Postgres. On top, a logistic-regression model chosen with forward-chaining validation ranks orders by bad-review risk, with 2.5x lift in the top decile, and a Streamlit dashboard reads from mart views.',
    tech: ['Python', 'SQL', 'PostgreSQL', 'BigQuery', 'pandas', 'Scikit-learn', 'Streamlit', 'Plotly', 'Docker', 'GitHub Actions', 'pytest'],
    category: 'Data Engineering',
    color: 'from-emerald-500 to-teal-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 10,
    subtitle: 'Day-ahead electricity demand forecasting and anomaly detection for four grid zones',
    problem: 'Does a deep model actually beat "same hour yesterday" or "same hour last week" on real aggregate grid load, and by how much?',
    approach: [
      '309 real Portuguese meters grouped into four zones by the shape of their weekly load, plus injected anomaly events.',
      'Encoder-decoder LSTM and LightGBM on identical 48h-past / 24h-future windows with weather and holidays, blended on validation MAE.',
      'Calibrated 95% bands from MC Dropout; an LSTM autoencoder scores every hour for anomalies.',
      'FastAPI serves forecasts and anomalies to a React dashboard.',
    ],
    result: 'The blend beat the better seasonal-naive baseline by 21.5 to 30.7% on MAE in every zone, with 3.4 to 4.4% MAPE and 95% bands covering 94.6 to 96.7% of actual load.',
    metrics: [
      { value: '3.39%', label: 'best zone MAPE (naive 4.67%)' },
      { value: '−31%', label: 'MAE vs best naive baseline' },
      { value: '0.93', label: 'best anomaly F1' },
    ],
    title: 'GridSense — Grid Demand Forecasting & Anomaly Detection',
    description: 'Developed a day-ahead electricity demand forecasting and anomaly detection system for four grid zones built from 309 real metered clients in the UCI ElectricityLoadDiagrams dataset (Portugal, 2012 to 2014). Clients are grouped by the shape of their weekly load profile into evening-peak, baseload, weekday-business and mixed zones, DST artefacts are repaired, and labelled spike and dropout events are injected into 1% of hours. Features combine lagged demand, calendar terms, Portuguese holidays and Lisbon temperature with simulated forecast noise to avoid leakage. An encoder-decoder LSTM and a LightGBM model are trained on identical windows and blended with a weight chosen on validation, with 95% bands calibrated from MC Dropout spread. An LSTM autoencoder trained on normal load scores each hour by reconstruction error, with thresholds tuned over 20 random injections. The blend reached 3.4 to 4.4% MAPE, beat the better seasonal-naive baseline by 21.5 to 30.7% on MAE and kept band coverage between 94.6 and 96.7%, while anomaly F1 ranged from 0.73 to 0.93. A FastAPI service feeds a React dashboard with forecasts, anomalies and heatmaps.',
    tech: ['Python', 'PyTorch', 'LightGBM', 'pandas', 'FastAPI', 'React', 'Vite', 'Recharts'],
    category: 'Machine Learning',
    color: 'from-orange-500 to-amber-500',
    link: 'https://github.com/himanshmunjal/GridSense'
  },
  {
    id: 11,
    subtitle: 'Do fast first replies bring open-source contributors back? A survival analysis of 13M GitHub events',
    problem: 'Does a fast first response make a first-time contributor more likely to return, or do responsive repos just retain people for other reasons?',
    approach: [
      'Resumable ingest of GH Archive hourly dumps into one 17-column parquet schema, behind pluggable source adapters.',
      'Eight parameterised DuckDB SQL layers deduplicate events, flag bots and build each PR\'s lifecycle and first response.',
      'Kaplan-Meier curves, Cox models with a 24-hour landmark to avoid immortal-time bias, and propensity-score matching.',
      'Results served through an HTML dashboard, a Streamlit app and a FastAPI JSON API.',
    ],
    result: 'Pooled, a reply within 24 hours looked strongly linked to return (hazard ratio 1.69), but stratified by repo it vanished (0.99): responsive repos keep people, not fast replies to individual PRs.',
    metrics: [
      { value: '13.0M', label: 'GitHub events analysed' },
      { value: '17,378', label: 'first-time contributors' },
      { value: '0.99', label: 'hazard ratio within repo (pooled 1.69)' },
    ],
    title: 'OSS Contributor Analytics — First-Time Contributor Retention',
    description: 'Built a batch analytics pipeline over 13.0M public GitHub events from January to March 2015 (1.14M pull requests, 17,378 first-time contributors across 297 repos) to measure who comes back for a second pull request within 30 days. Source adapters stream GH Archive hourly files into parquet with a fixed 17-column schema, skipping finished hours and retrying with backoff. Eight parameterised DuckDB SQL scripts remove duplicates, exclude bots by login pattern and behaviour, and build each PR\'s lifecycle and first response, with six sanity queries that must return zero. The analysis computes the funnel, Kaplan-Meier retention curves, Cox models with a 24-hour landmark design to avoid immortal-time bias, propensity-score matching (max standardized mean difference 0.13 to 0.03) and a per-repo scorecard. Contributors who got a reply within an hour returned at 43.6% versus 27.0% with no reply, but a repo-stratified Cox model put the within-repo effect at 0.99, so the association is about which repo someone joined. Results are served through an HTML dashboard, a Streamlit app and a FastAPI JSON API.',
    tech: ['Python', 'SQL', 'DuckDB', 'pandas', 'lifelines', 'statsmodels', 'Scikit-learn', 'Parquet', 'FastAPI', 'Streamlit', 'pytest'],
    category: 'Data Science',
    color: 'from-lime-500 to-green-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 12,
    subtitle: 'Does attention help activity recognition? 1,320 runs and a decision rule fixed in advance',
    problem: 'Do attention gains for wearable-sensor activity recognition survive subject-independent evaluation, multiple seeds and paired statistics?',
    approach: [
      'Eight models, including a proposed spectral-gated dual-attention BiGRU and its ablations, in one shared training pipeline.',
      'Leave-subjects-out cross-validation on UCI-HAR, WISDM and PAMAP2: 30 folds, 5 seeds each, subject-wise validation.',
      'Wilcoxon tests with Holm correction, bootstrap intervals and a Bayesian equivalence test, with the decision rule committed before the final run.',
      'Parameters, FLOPs and measured latency for every model.',
    ],
    result: 'Attention gave no measurable gain over a plain BiGRU (0.815 vs 0.816 pooled macro-F1), the gate is 99.5% likely to be practically equivalent to no gate, and held-out subjects explain 94 to 96% of score variance.',
    metrics: [
      { value: '1,320', label: 'training runs' },
      { value: '0.832', label: 'best pooled macro-F1 (CNN+BiGRU)' },
      { value: '~95%', label: 'score variance from held-out subjects' },
    ],
    title: 'Dual-Attention HAR — Does Attention Help Activity Recognition?',
    description: 'Ran a controlled study of whether attention improves recurrent models for human activity recognition from wearable sensors. The proposed spectral-gated dual-attention BiGRU adds channel attention, a 33-parameter gate fed by FFT descriptors and temporal attention to a CNN-free BiGRU, and is compared with its own ablations and with BiGRU, BiLSTM with attention, CNN+BiGRU and DeepConvLSTM in one shared pipeline. After a pipeline audit that fixed seven problems, including window-level validation leakage and mixed-hardware latency, 1,320 runs covered UCI-HAR, WISDM and PAMAP2 with 30 leave-subjects-out folds and 5 seeds per fold, executed as 264 parallel jobs from one resumable script. A decision rule based on Wilcoxon tests with Holm correction was committed before the final run, alongside bootstrap intervals, a Bayesian equivalence test and variance decomposition. Attention gave no measurable gain over a plain BiGRU, the gate was practically equivalent to no gate, convolutional hybrids scored highest at 0.832 pooled macro-F1, and held-out subjects explained 94 to 96% of score variance. The work is written up as an empirical study rather than a method paper.',
    tech: ['Python', 'PyTorch', 'NumPy', 'SciPy', 'Statistics', 'Bash'],
    category: 'Machine Learning',
    color: 'from-rose-500 to-pink-500',
    link: 'https://github.com/himanshmunjal/Dual-attention-HAR'
  },
  // No .md write-up or architecture diagram yet. Uncomment once they are in src/content/.
  // {
  //   id: 12,
  //   subtitle: 'Real-time disaster tweet triage and urgency ranking',
  //   problem: 'In an emergency, responders get a flood of posts. Can a model separate SOS calls, medical needs, damage reports and misinformation, and rank them by urgency?',
  //   approach: ['Fine-tuned RoBERTa for multi-class crisis classification.', 'Urgency score from model confidence, severity indicators and recency.', 'Real-time alert-feed dashboard.'],
  //   result: 'A prioritised alert feed for first responders, not just a list of labels.',
  //   writeup: 'roberta-disaster-tweet-triage',
  //   title: 'DisasterTweet AI — Real-Time Disaster Tweet Triage & Urgency Ranking System',
  //   description: 'Built an NLP intelligence system to classify and prioritize disaster-related tweets during emergencies by fine-tuning RoBERTa for multi-class classification across categories such as SOS, medical emergencies, infrastructure damage, and misinformation. Designed an urgency ranking algorithm combining model confidence, severity indicators, and recency to generate a prioritized alert feed for first responders with a real-time visualization dashboard.',
  //   tech: ['Python', 'HuggingFace', 'Transformers', 'PyTorch', 'Pandas', 'Streamlit', 'Plotly'],
  //   ongoing: false,
  //   category: 'AI/NLP',
  //   color: 'from-emerald-500 to-teal-500',
  //   link: 'https://github.com/himanshmunjal'
  // },
  // {
  //   id: 13,
  //   subtitle: 'Sparse baselines vs neural embeddings on AG News',
  //   problem: 'When does a fine-tuned transformer justify its cost over a TF-IDF baseline or a recurrent model, for edge deployment versus cloud?',
  //   approach: ['Six architectures, from TF-IDF baselines to LSTM/GRU to fine-tuned DistilBERT.', 'Compared accuracy, parameter count, training throughput and per-class precision and recall.'],
  //   result: 'Empirical model-selection guidelines for edge and cloud deployments.',
  //   metrics: [
  //     { value: '6', label: 'architectures compared' },
  //     { value: '120k', label: 'AG News samples' },
  //   ],
  //   title: 'Text Classification & Neural Embedding Benchmark',
  //   description: 'Engineered a unified NLP benchmarking framework evaluating six text classification architectures—ranging from sparse TF-IDF baselines to fine-tuned DistilBERT models—on the 120,000-sample AG News corpus. Conducted multi-dimensional trade-off analysis across test accuracy, parameter efficiency, training throughput, and per-class precision/recall to establish empirical model selection guidelines for edge and cloud deployments.',
  //   tech: ['Python', 'PyTorch', 'Transformers', 'DistilBERT', 'Scikit-learn', 'TF-IDF', 'LSTM/GRU'],
  //   ongoing: false,
  //   category: 'AI/NLP',
  //   color: 'from-blue-500 to-cyan-500',
  //   link: 'https://github.com/himanshmunjal/Text-Classification-Benchmark'
  // },
  // {
  //   id: 15,
  //   subtitle: 'Resume-to-job compatibility and skill-gap scoring',
  //   problem: 'Given a resume and a job description, how ready is this candidate, and what exactly are they missing?',
  //   approach: ['Skill extraction with spaCy, TF-IDF features.', 'Logistic Regression and XGBoost fit classifiers.', 'Diff resume skills against job requirements.'],
  //   result: 'A job-readiness score plus personalised skill-gap recommendations.',
  //   title: 'Job Fit & Skill Gap Intelligence System',
  //   description: 'Developed an AI-driven resume intelligence system that evaluates candidate-job compatibility using NLP feature extraction and machine learning classification models. The system generates a job readiness score and identifies missing competencies by comparing resume skills against job descriptions, providing personalized skill gap insights and improvement recommendations.',
  //   tech: ['Python', 'spaCy', 'TF-IDF', 'Logistic Regression', 'XGBoost', 'PostgreSQL', 'Streamlit'],
  //   ongoing: true,
  //   category: 'AI/NLP',
  //   color: 'from-purple-500 to-pink-500',
  //   link: 'https://github.com/himanshmunjal/Job-fit-skill-gap-Analyzer'
  // },
];

/**
 * Kept but not shown on the site: off-target for SDE / Backend / AI / Data roles, or replaced by a
 * written-up version above. Move an entry back into allProjects (and renumber ids) to show it again.
 */
export const archivedProjects: Project[] = [
  {
    id: 106,
    subtitle: 'An A/B-testing toolkit whose statistics are validated by simulation on real user data',
    problem: 'Does each A/B-test method actually give a 5% false-positive rate, the power it promises, and an unbiased estimate on real, heavy-tailed user data?',
    approach: [
      'Thousands of simulated A/A splits and known-lift injections on real behaviour from 177,441 Stack Overflow users.',
      'One method registry shared by the simulation harness, CLI, FastAPI API and Streamlit app.',
      'Effects injected by metric type so counts stay integers and heavy tails are kept.',
      'Seeded, parallel runs with SeedSequence.spawn give identical results serially or across workers.',
    ],
    result: 'The delta method planned as the default was miscalibrated below about 10,000 users per arm, so a jackknife test became the ratio default. CUPED cut variance 62.9% and beat outlier capping with no bias.',
    metrics: [
      { value: '5.9%', label: 'ratio false positives (delta 20.6%)' },
      { value: '−62.9%', label: 'variance with CUPED' },
      { value: '92%', label: 'power at +20% lift (Welch 55.4%)' },
    ],
    title: 'ExpKit — Simulation-Validated A/B Testing Toolkit',
    description: 'Built a Python A/B-testing toolkit and validated every method with 2,000 to 5,000 simulated A/A tests and known-lift injections per setting, on real behaviour from 177,441 Stack Overflow users pulled once from BigQuery into a Parquet cache. The statistics core takes numpy arrays and returns frozen dataclasses, and a single method registry feeds the simulation harness, a CLI, a FastAPI API and a Streamlit app, with an analysis facade that runs an SRM check and fixed decision rules. Lifts are injected by metric type (Poisson thickening or binomial thinning for counts, flips for binary metrics) so the data keeps its shape. The simulations showed the delta method over-rejecting ratio metrics (20.6% false positives at 100 users per arm), so I added a leave-one-user-out jackknife (5.9%) and made it the default. O\'Brien-Fleming boundaries brought 28 daily peeks from 24.1% to 4.1% false positives, Holm correction held 20 null metrics to 6.0% family-wise error, and CUPED raised power at a +20% lift from 55.4% to 92.0% with -1.5% bias, against -56% for p99 capping.',
    tech: ['Python', 'NumPy', 'SciPy', 'pandas', 'BigQuery', 'PyArrow', 'FastAPI', 'Streamlit', 'Docker', 'GitHub Actions', 'pytest', 'Hypothesis'],
    category: 'Data Science',
    color: 'from-cyan-500 to-blue-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 107,
    subtitle: 'A self-hosted URL shortener and QR platform that counts every scan',
    problem: 'How do you count a QR scan after the code is printed, without slowing the redirect down?',
    approach: [
      'Each QR code encodes a hidden short URL, so scans go through the same redirect pipeline.',
      'Cache-aside redirects through JCache (or Redis) with PostgreSQL as the source of truth, using 302 so repeat visits are counted.',
      'Device parsing, GeoLite2 lookup and the analytics insert run in a goroutine after the redirect.',
      'Sliding-window rate limiting and rotating refresh tokens with reuse detection.',
    ],
    result: 'Links and QR codes resolve through the cache-aside path with scans logged separately. Not benchmarked yet; load-testing the redirect path is next.',
    title: 'LinkPlus — URL Shortener & QR Analytics Platform',
    description: 'Built a self-hosted URL shortener and QR code platform with a Go (Gin) API, PostgreSQL, a React dashboard, and JCache — my own Redis-protocol cache server — on the hot path. Each QR code encodes a hidden short URL instead of the destination, so every phone scan is a real server-side event recorded in its own scans table. Redirects use cache-aside lookups and 302 responses; device parsing, GeoLite2 country lookup and the analytics insert run in a goroutine after the response is sent. Services depend on small Cache and RateLimiter interfaces that both JCache and Redis satisfy, with a Lua sliding-window limiter on Redis. Auth uses JWTs plus single-use, hashed refresh tokens grouped into families that are revoked on reuse. An expiry worker sweeps expired links every five minutes.',
    tech: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'JCache', 'Redis', 'React', 'Vite', 'Tailwind CSS', 'JWT Authentication', 'GeoLite2'],
    category: 'Backend',
    color: 'from-sky-500 to-blue-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 108,
    subtitle: 'Pricing a NYC taxi trip before it happens, from a leaky notebook to an honest API',
    problem: 'The original notebook scored 99% R² by reading trip duration, which is only known after the trip. How well can a trip be priced using only what is known at booking time?',
    approach: [
      'XGBoost predicts trip time; a JSON rate-card engine applies the official TLC tariff, so fare rules are not learned.',
      'City-agnostic features: H3 hexagons, historical speeds per hexagon and hour, weather, events and holidays.',
      'One features module shared by training and serving, so they cannot drift apart.',
      'Out-of-time evaluation on a held-out month after fixing scaler leakage, swapped metric arguments and a random split.',
    ],
    result: 'Street-hail fares are priced to within about $3 before the trip. App-booked upfront prices stay near $5.60 MAE even with the true distance and time, so the limit is what is knowable in advance, not data volume.',
    metrics: [
      { value: '$2.96', label: 'street-hail fare MAE (baseline $3.56)' },
      { value: '0.914', label: 'street-hail fare R²' },
      { value: '3.7 min', label: 'trip-time MAE' },
    ],
    writeup: 'data-science-notebook-to-production',
    title: 'Taxi Fare Prediction — Pre-Trip Fare Estimator',
    description: 'Built a taxi fare estimator with a FastAPI backend and a map dashboard that prices a NYC trip before it happens. It started as a notebook with 99% R² that turned out to be target leakage, since its features included trip duration and metered distance. The rebuilt service geocodes addresses with Photon / Nominatim, routes them with OSRM, and builds features from H3 hexagons, historical speed tables per hexagon and hour, holidays, hourly weather and permitted events. An XGBoost model predicts trip time, and a generic rate-card engine applies the NYC TLC tariff from JSON (meter, the JFK flat fare, surcharges, congestion and airport fees), with corrections learned from real trips and prediction intervals. Training and serving share one features module, artifacts are swapped in only when a training run finishes, and evaluation is out-of-time on a held-out month: street-hail fare MAE of $2.96 and R² of 0.914, with a 3.7-minute trip-time MAE. Packaged with Docker and optional MLflow tracking.',
    tech: ['Python', 'XGBoost', 'pandas', 'H3', 'Shapely', 'FastAPI', 'Pydantic', 'OSRM', 'MLflow', 'Docker'],
    category: 'Machine Learning',
    color: 'from-blue-500 to-cyan-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 109,
    subtitle: 'An airport portal in Go and React that can never sell the last seat twice',
    problem: 'How do you sell a limited number of seats at a server-decided price without overselling, and without letting a passenger token reach admin data?',
    approach: [
      'Bookings run in one PostgreSQL transaction that locks the flight row with SELECT … FOR UPDATE.',
      'Prices are computed on the server from class quotas and seats sold; the client never sends a price.',
      'One Authenticate(role) middleware checks HMAC signature, expiry and role claim on every route.',
      'bcrypt with timing-safe unknown-email checks, per-IP login rate limiting and invite-only admin signup.',
    ],
    result: 'The Go test suite passes, covering seven JWT cases (including a passenger token on an admin route and alg: none), password policy, rate limiting and CORS. No load test yet.',
    writeup: 'full-stack-airport-management',
    title: 'SkyPort — Airport Management & Flight Booking',
    slug: 'skyports',
    description: 'Built a full-stack airport management system in Go (Gin + GORM) and React where passengers check flight status, book flights, track lost baggage and file complaints, and admins run the schedule, advisories, staff and baggage. Each flight has a fixed seat inventory split into normal and concession classes, and the fare rises 5% for every 20% of normal seats sold, computed on the server so quoted and charged prices match. Bookings run as one PostgreSQL transaction that locks the flight row, checks and decrements the class counter and inserts the booking, so two passengers racing for the last seat cannot both get it. Public, user and admin route groups share one JWT middleware that checks signature, expiry and role, and controllers take the caller\'s identity only from token claims. Login uses bcrypt with a dummy compare for unknown emails, a 10-per-minute per-IP rate limiter and invite-only admin signup. Deployed on Render as two services.',
    tech: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'JWT Authentication', 'bcrypt', 'React', 'React Router', 'Vite', 'Tailwind CSS', 'Render'],
    category: 'Backend',
    color: 'from-indigo-500 to-purple-500',
    link: 'https://github.com/himanshmunjal/Training'
  },
  {
    id: 110,
    subtitle: 'A six-page Power BI report on where retail revenue turns into profit',
    problem: 'Where does revenue turn into profit, and where does it leak away, without asking an analyst to rerun anything?',
    approach: [
      'Power Query splits one flat sheet into a star schema and turns the returns list into a per-order flag.',
      'A DAX calendar table drives YoY, QoQ and rolling 12-month measures consistently.',
      'Customer value segments and New vs Returning status from calculated columns.',
      'Shared Year, Category, Segment and Sub-Category slicers across all six pages.',
    ],
    result: 'Sales grew 51% from 2018 to 2021 while average order value fell, so growth came from more orders. Discounting is the biggest profit lever: undiscounted lines earn a 29.5% margin, lines discounted above 30% lose 48.2%.',
    metrics: [
      { value: '+51%', label: 'sales, 2018 to 2021' },
      { value: '29.5%', label: 'margin on undiscounted lines' },
      { value: '9,994', label: 'order lines modelled' },
    ],
    title: 'RetailPulse – Sales & Profit Intelligence Dashboard',
    description: 'Designed a six-page Power BI report on 9,994 US retail order lines from 2018 to 2021 (5,009 orders, 793 customers, 1,862 products) that takes a manager from headline numbers down to single products and customers. Power Query splits the flat source sheet into a star schema of deduplicated dimensions and turns the returns workbook into an explicit per-order Yes/No flag. A DAX calendar table with an April to March fiscal year drives YoY growth, QoQ change and rolling 12-month sales, and calculated columns bucket customers into lifetime-value segments and New vs Returning status. The report shows that sales grew 51% while orders grew 74% and average order value fell from $500 to $435, and that lines discounted above 30% lose 48.2% of their sales value. Totals were reconciled against the source sheets to the cent.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Data Modeling', 'Excel'],
    category: 'Analytics',
    color: 'from-pink-500 to-rose-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 101,
    subtitle: 'Role-based flight management and booking',
    problem: 'Admins schedule flights while users book, track baggage and file complaints. Can the system stay clean when real users hit it?',
    approach: ['REST backend in Go (Gin and GORM) on PostgreSQL.', 'JWT authentication with role-based access.', 'Responsive React and Tailwind frontend.'],
    result: 'A working role-based full-stack system, plus a write-up of every mistake made on the way there.',
    title: 'Airport Management Web - Flight Management & Booking System',
    description: 'Built a role-based full-stack airport management system where administrators manage flight schedules while users search, book flights, track baggage status, and submit complaints. Implemented secure authentication using JWT and developed a RESTful backend with Golang (Gin + GORM) integrated with PostgreSQL, with a responsive React frontend.',
    tech: ['React.js', 'Tailwind CSS', 'Golang', 'Gin', 'GORM', 'PostgreSQL', 'JWT Authentication'],
    category: 'Full Stack',
    color: 'from-indigo-500 to-purple-500',
    link: 'https://github.com/himanshmunjal/Training'
  },
  {
    id: 102,
    subtitle: 'Smart trip planner and itinerary generator for iOS',
    problem: 'Turn preferences, budget and location into an optimised multi-day itinerary.',
    approach: ['Itinerary engine with categorised activities and time-slot allocation.', 'Modular MVVM, ready for AI and API integration.'],
    result: 'Day-by-day plans rendered dynamically in SwiftUI.',
    title: 'TravelItinerary AI — Smart Trip Planner & Itinerary Generator',
    description: 'Developed a SwiftUI-based travel planning application that generates optimized multi-day itineraries based on user preferences, budget, and location inputs. Implemented a structured itinerary engine with categorized activities, time-slot allocation, and dynamic UI rendering for daily plans. Focused on clean UX design, modular architecture, and scalable frontend logic for future AI/API integration.',
    tech: ['Swift', 'SwiftUI', 'MVVM', 'State Management', 'API Integration (Planned)'],
    ongoing: true,
    category: 'iOS Development',
    color: 'from-teal-500 to-cyan-500',
    link: 'https://github.com/himanshmunjal/Travelitinerary'
  },
  {
    id: 103,
    subtitle: 'Minimalist productivity and Pomodoro system for iOS',
    problem: 'Combine tasks, focus sessions, planning and analytics in one app that works fully offline.',
    approach: ['Combine-powered timer state machine.', 'MVVM architecture.', 'Swift Charts trends, persisted with Codable.'],
    result: 'A fully native, offline-first SwiftUI app with an analytics dashboard.',
    title: 'FocusFlow — Minimalist Productivity & Pomodoro System',
    description: 'Built a fully native iOS productivity application using SwiftUI, combining task management, Pomodoro-based focus sessions, a rule-based daily planner, and an analytics dashboard. Implemented a Combine-powered timer state machine, MVVM architecture for scalability, and Swift Charts for visualizing productivity trends. Designed the system to be fully offline-first with persistent storage using UserDefaults and Codable.',
    tech: ['Swift', 'SwiftUI', 'Combine', 'Swift Charts', 'MVVM', 'UserDefaults', 'Codable'],
    ongoing: false,
    category: 'iOS Development',
    color: 'from-blue-500 to-indigo-500',
    link: 'https://github.com/himanshmunjal/FocusFlow'
  },
  {
    id: 104,
    subtitle: 'NLP-based review sentiment classification',
    problem: 'Classify the sentiment of user reviews and make it usable by other applications.',
    approach: ['NLTK preprocessing and feature extraction.', 'Random Forest classifier.', 'Real-time FastAPI endpoint.'],
    result: 'A sentiment model other services can call over HTTP.',
    title: 'Sentiment Analysis – NLP-Based Text Classification System',
    description: 'Developed an NLP pipeline for sentiment classification of user reviews using text preprocessing, feature extraction, and a Random Forest classifier. Deployed the model as a REST API using FastAPI, enabling real-time sentiment prediction and integration with external applications.',
    tech: ['Python', 'NLTK', 'Scikit-learn', 'Random Forest', 'FastAPI', 'REST APIs'],
    category: 'NLP',
    color: 'from-green-500 to-emerald-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 105,
    subtitle: 'A touchless computer-vision game interface',
    problem: 'Can real-time hand tracking replace a keyboard in a game loop?',
    approach: ['MediaPipe hand landmarks with OpenCV capture.', 'Gestures mapped to Pygame controls.'],
    result: 'A playable Snake game controlled entirely by hand gestures.',
    title: 'Gesture-Controlled Snake Game – Computer Vision Interface',
    description: 'Built a computer vision-based interactive game where users control a Snake game using hand gestures detected via MediaPipe. Integrated real-time hand tracking with OpenCV and mapped gestures to Pygame controls to create a touchless gaming experience.',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Pygame', 'NumPy'],
    category: 'Computer Vision',
    color: 'from-cyan-500 to-blue-500',
    link: 'https://github.com/himanshmunjal/Hand-Gesture'
  },
];

export const expNo = (id: number) => `EXP-${String(id).padStart(2, '0')}`;

/** "GridSense — AI Grid Demand…" → "GridSense" (the subtitle carries the rest) */
export const shortTitle = (title: string) => title.split(/ [—–-] /)[0];

/** URL slug for /project/:slug — "JCache — In-Memory Cache Server" → "jcache" */
export const projectSlug = (p: Pick<Project, 'title' | 'slug'>) =>
  p.slug ?? shortTitle(p.title).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const projectPath = (p: Pick<Project, 'title' | 'slug'>) => `/project/${projectSlug(p)}`;

export const findProject = (slug: string) => allProjects.find((p) => projectSlug(p) === slug);
