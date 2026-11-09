---
intro: JCache is an in-memory cache I wrote from scratch in Java, with O(1) LRU, LFU and ARC eviction and a Netty server that speaks both its own text protocol and the Redis protocol on one port.
caption: Clients send text or RESP over TCP to a server node, where ProtocolDetector picks a handler, CommandExecutor runs the command against the TTLCache, SegmentedCache and LRU / LFU / ARC stack, and writes go to PersistenceManager and counters to Prometheus + Grafana.
---

## About

JCache is a cache library and a cache server in one Maven project. The core module has no dependencies and works in-process. The server adds TTLs, persistence, rate limiting and metrics. A Java client, a connection pool and a sharding cluster client complete it. It ships as a Docker image and a Homebrew formula.

I built it to learn how Redis and Caffeine work by rebuilding their parts: eviction structures, locking, expiry, crash recovery and sharding. The question I kept testing was **which eviction policy keeps more of the right keys, and what does each one cost per operation?**

## Architecture

CacheClient and ClusterCacheClient speak a line-based text protocol. ClusterCacheClient picks the owning server for each key from a hash ring. Redis clients speak RESP. On the server node, ProtocolDetector reads the first byte of each connection: `*` installs the RESP handler, anything else the Text handler. Each handler parses its syntax, applies the rate limit and passes a `Command` to the shared CommandExecutor.

CommandExecutor calls the cache stack. TTLCache drops expired keys. SegmentedCache picks one of 16 locked segments by key hash, and each segment holds its own LRU / LFU / ARC policy. Writes also go to PersistenceManager, which appends to the AOF + snapshot files and replays them on start-up. ServerMetrics serves counters over HTTP `/metrics` to Prometheus + Grafana.

## How it's implemented

### O(1) eviction policies

Each policy maps keys to nodes in an intrusive doubly linked list. LRU keeps one list in access order. LFU keeps one list per access count plus a pointer to the lowest count, so eviction never scans. It halves all counts every 10,000 operations so old hot keys can age out. ARC uses two resident lists and two ghost lists of evicted keys, which steer how much space each list gets.

### Locking as a separate layer

The policy classes are single-threaded on purpose, so I can test their logic without threads and swap the locking. I wrote three wrappers: one global lock, lock striping, and lock-free reads with approximate LRU. The server uses striping. The cost is that eviction is per segment, not global.

### Two protocols on one port

Redis tells inline commands apart by the first byte, and I copied that. ProtocolDetector installs the right codec, then removes itself. Both handlers feed one CommandExecutor, so the protocols cannot drift apart.

### Persistence without lost writes

Each write is appended to the AOF with an absolute expiry time. A periodic snapshot is written, renamed atomically, and the AOF truncated. The tricky part was ordering. Each request applies its change and appends its record under the lock the snapshot holds, so no write falls between snapshot and truncate. Writes pause while a snapshot runs.

### Sharding in the client

ClusterCacheClient puts each server at 150 points on an MD5 ring, so adding one of N servers moves about 1/N of the keys. There is no coordinator. A failed request is retried once on another node, and a server that fails three health checks is dropped.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Java 17 | Records, switch expressions, JVM concurrency primitives |
| Networking | Netty 4.1 | Event-loop I/O, per-connection pipelines |
| Protocol | Text + RESP2 | `nc` for debugging, Redis clients for free |
| Storage | AOF + snapshot files | Simple, modelled on Redis |
| Monitoring | Prometheus + Grafana | Standard scrape format, compose profile |
| Infra/CI | GitHub Actions, Docker, Homebrew | Tests on every push; tags publish images |
| Testing | JUnit 5, JaCoCo, JMH | 506 tests, real-server integration tests |

## Results

Hit rates are from my simulation: 256 entries, 1,000 keys, one million read-through requests. Throughput and latency are short JMH runs on an Apple M1, so treat them as indicative.

| Measure | Baseline | Best |
|---|---|---|
| Hit rate, Zipf (LRU vs LFU) | 74.2% | **81.0%** |
| Hit rate, scan then Zipf (LRU vs LFU) | 51.0% | **61.7%** |
| Read-through ops/µs (LFU vs LRU) | 9.4 | **17.5** |
| `GET` over TCP, p50 / p99 | n/a | **0.054 / 0.148 ms** |

LFU keeps the most useful keys, but does about half the operations per microsecond of LRU. ARC sat between them on hit rate. Network latency is mostly the TCP round trip, not the cache.

## What I'd do differently

- There is no replication, so losing a node loses its keys. That comes next.
- Snapshots block writes. Snapshotting one segment at a time would shorten the pause.
- My concurrency benchmark's error bars were wider than the gaps between the lock strategies, so I can't rank them yet.
- There is no authentication or TLS, so the server belongs on a trusted network.
