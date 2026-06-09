# Concurrency Bottlenecks in Java Caches: Coarse Locks vs Segmented Locking vs Lock-Free Designs

*Lessons learned while building a distributed in-memory cache server in Java.*

## Introduction

When I started building **JCache**, my goal was simple: implement a high-performance in-memory cache with support for multiple eviction policies such as LRU, LFU, and ARC.

The first version worked perfectly in single-threaded tests. Cache operations were fast, memory usage was predictable, and the implementation was straightforward.

Then I introduced concurrency.

As soon as multiple threads started performing reads and writes simultaneously, a new set of problems appeared:

* Throughput stopped scaling.
* CPU utilization increased.
* Threads spent significant time waiting.
* Benchmark numbers became inconsistent.

This forced me to dive deeper into concurrent data structure design and experiment with multiple synchronization strategies.

This article summarizes the approaches I explored, the bottlenecks I encountered, and the lessons learned while benchmarking different cache implementations.

---

# Why Concurrency Matters in a Cache

Caches are often deployed in high-throughput environments.

Consider a cache server receiving requests from hundreds of clients:

```text
Client A -> GET user:123
Client B -> PUT user:456
Client C -> DELETE session:789
Client D -> GET product:42
```

All these operations may execute simultaneously on different threads.

Without proper synchronization:

* Data corruption can occur.
* Linked lists may become inconsistent.
* Hash maps may contain invalid state.
* Reads can observe partially updated data.

The challenge is ensuring correctness without sacrificing performance.

---

# Approach 1: Coarse-Grained Locking

The most straightforward solution is protecting the entire cache with a single lock.

```java
public V get(K key) {
    lock.lock();
    try {
        return cache.get(key);
    } finally {
        lock.unlock();
    }
}
```

Every operation acquires the same lock.

This guarantees correctness because only one thread can access the cache at any given moment.

## Advantages

* Easy to implement
* Easy to reason about
* Difficult to introduce race conditions

## Problems

As concurrency increases, throughput quickly reaches a ceiling.

Imagine 32 threads attempting to access the cache simultaneously:

```text
Thread 1 -> Running
Thread 2 -> Waiting
Thread 3 -> Waiting
Thread 4 -> Waiting
...
```

Only one thread can make progress.

Even when threads access completely unrelated keys, they still compete for the same lock.

This creates:

* Lock contention
* Context switching overhead
* Increased request latency
* Poor CPU utilization

The cache remains correct, but scalability suffers.

---

# Understanding Lock Contention

Before optimizing, it is important to understand what contention actually means.

Contention occurs when multiple threads want the same resource.

For example:

```text
Thread A -> Lock Cache
Thread B -> Wait
Thread C -> Wait
Thread D -> Wait
```

The CPU may have available cores, but threads cannot proceed because they are blocked.

In many systems, contention becomes the primary bottleneck long before CPU or memory limits are reached.

This was one of the biggest lessons from building JCache:

> Performance problems are often synchronization problems.

---

# Approach 2: Segmented Locking

To reduce contention, I implemented a segmented cache.

Instead of protecting the entire cache with a single lock, the cache is divided into multiple independent segments.

```text
Cache
├── Segment 0
├── Segment 1
├── Segment 2
├── Segment 3
└── Segment N
```

Each segment owns:

* A portion of the key space
* Its own lock
* Its own data structures

A key is routed to a segment using hashing.

```java
int segmentIndex = hash(key) % segmentCount;
```

Now operations on different segments can execute simultaneously.

---

# Why Segmentation Helps

Consider these requests:

```text
GET user:1
GET user:5000
PUT order:42
DELETE cart:100
```

If they map to different segments:

```text
Segment 1 -> Thread A
Segment 3 -> Thread B
Segment 6 -> Thread C
Segment 9 -> Thread D
```

All operations proceed concurrently.

Instead of one giant lock, we now have many smaller locks.

This significantly reduces contention.

---

# Trade-offs of Segmentation

Segmented locking improves scalability but introduces complexity.

Challenges include:

## Choosing Segment Count

Too few segments:

```text
High contention
```

Too many segments:

```text
Memory overhead
Lock management complexity
```

Finding the right balance depends on workload characteristics.

---

## Uneven Key Distribution

Hash functions are not always perfectly balanced.

Sometimes one segment becomes a hotspot.

```text
Segment 4 -> 70% of traffic
All others -> lightly loaded
```

In these scenarios, contention still exists despite segmentation.

---

# Approach 3: Lock-Free Structures

After experimenting with segmentation, I wanted to explore lock-free designs.

The idea is simple:

> Avoid blocking threads whenever possible.

Instead of locks, lock-free structures rely on atomic operations such as Compare-And-Swap (CAS).

Examples include:

```java
AtomicReference
AtomicInteger
ConcurrentHashMap
```

Threads attempt updates atomically.

If another thread modifies the value first, the operation retries.

No thread ever blocks waiting for a lock.

---

# Why Lock-Free Sounds Attractive

In theory:

* No lock contention
* Better scalability
* Improved throughput
* Lower latency under heavy contention

This is why many high-performance systems use lock-free techniques.

Examples include:

* JVM internals
* Concurrent queues
* Reactive frameworks
* High-frequency trading systems

---

# The Surprising Reality

One assumption I had before benchmarking was:

> Lock-free automatically means faster.

That turned out to be incorrect.

Lock-free implementations are not universally better.

They introduce their own costs:

* Retry loops
* Additional atomic operations
* Memory barriers
* Increased CPU work

In write-heavy workloads, retries can become expensive.

As contention increases, multiple threads may repeatedly fail CAS operations and retry.

The result:

```text
More CPU usage
Lower throughput
Unpredictable performance
```

In several benchmark scenarios, lock-free structures did not outperform simpler approaches.

This was one of the most valuable lessons from the project.

---

# Benchmarking with JMH

To evaluate each strategy fairly, I built a benchmark suite using JMH.

The benchmark scenarios included:

## Read Heavy

```text
90% Reads
10% Writes
```

Represents common caching workloads.

---

## Write Heavy

```text
20% Reads
80% Writes
```

Tests update-heavy systems.

---

## Mixed Workloads

```text
50% Reads
50% Writes
```

Balanced access patterns.

---

## Hotspot Contention

Multiple threads repeatedly access the same set of keys.

This intentionally creates contention and stress-tests synchronization strategies.

---

# Key Observations

## Observation 1

Coarse-grained locking was easier to implement but hit scalability limits quickly.

Increasing thread count did not significantly improve throughput.

---

## Observation 2

Segmented locking provided the best balance between complexity and performance.

It reduced contention while keeping the implementation understandable.

For many practical workloads, segmentation delivered most of the benefits without the complexity of lock-free algorithms.

---

## Observation 3

Lock-free was not always faster.

In contention-heavy write scenarios, retry overhead sometimes offset the theoretical benefits of avoiding locks.

This reinforced an important engineering principle:

> Measure first. Optimize second.

---

# What I Would Do Differently

If I were rebuilding the cache today, I would:

1. Start with segmented locking earlier.
2. Introduce lock-free structures only where profiling shows contention.
3. Spend more time analyzing workload characteristics before optimizing.
4. Benchmark every major architectural decision.

One of the easiest mistakes in performance engineering is optimizing based on assumptions rather than measurements.

---

# Lessons for Distributed Systems Engineers

Building concurrent software is fundamentally different from writing single-threaded code.

Correctness alone is not enough.

A production-grade system must also:

* Scale with thread count
* Maintain low latency
* Avoid excessive contention
* Use CPU resources efficiently

The most important lesson from this project was:

> Faster code is not always better code. Reducing contention often has a larger impact than micro-optimizing individual operations.

When building high-performance systems, synchronization strategy can matter more than algorithmic complexity.

---

# Conclusion

Concurrency became one of the most educational parts of building JCache.

What started as a simple cache implementation evolved into an exploration of:

* Locking strategies
* Contention analysis
* Concurrent data structures
* Benchmark-driven optimization

The experience reinforced a principle that applies far beyond caches:

> The biggest performance bottleneck is often not computation—it is coordination between threads.

Understanding how threads interact, compete, and synchronize is essential for designing scalable backend systems.

And sometimes, the most effective optimization is simply allowing threads to stop waiting for each other.
