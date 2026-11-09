---
intro: LinkPlus is a self-hosted URL shortener and QR code platform in Go and React, built so that every redirect and every QR scan is a real server-side event I can count.
caption: A visitor's GET /r/:code passes the Rate limiter and Redirect handler, the URL service resolves it from JCache or PostgreSQL, and the Analytics recorder logs the hit in the background, while the React dashboard reaches the other services through JWT auth and the API handlers.
---

## About

LinkPlus shortens links, generates QR codes, and shows per-account analytics: clicks per day, devices, countries and top links. It's a Go API on Gin with PostgreSQL, a React dashboard, and JCache, an in-memory cache server I wrote separately that speaks the Redis protocol.

The question was **how do you count a QR scan after the code is printed, without slowing the redirect down?** A QR code that encodes the destination sends the phone straight there, so the server never sees the scan.

## Architecture

There are two paths. On the redirect path, a Visitor (a browser or a phone camera) sends `GET /r/:code`. The Rate limiter checks a per-IP sliding window, then the Redirect handler asks the URL service to resolve the code: JCache first, PostgreSQL on a miss, then a write-back to JCache. The handler sends a 302 at once and starts the Analytics recorder in a goroutine. The recorder parses the device, looks up the country in GeoLite2, and inserts a click or scan row.

On the dashboard path, the React dashboard sends JSON with a bearer token. JWT auth puts the user ID and role on the request, and the API handlers call the URL service, QR service, Auth service, or Analytics queries. The QR service writes its images to QR PNG files on local disk. The Expiry worker runs every five minutes and deletes expired links from PostgreSQL and JCache.

## How it's implemented

### QR codes backed by a hidden short URL

Each QR code gets its own short URL row with `is_qr = true`, and the image encodes `BASE_URL/r/{code}`, not the destination. A scan goes through the same redirect pipeline and lands in a separate scans table. The user only ever sees the image.

### Cache-aside redirects with 302

The cache is never the source of truth: a read error counts as a miss, and a write error is logged and ignored. New links are written to the cache on creation, so the first click is already a hit. I use 302, not 301, because browsers cache a 301 and repeat visits would never reach the server to be counted.

### Analytics off the request path

The redirect goes out first. Device parsing, the GeoLite2 lookup and the insert happen in a goroutine, and `HEAD` requests from link previews and uptime checks aren't counted. Each event inserts a row and bumps a counter in one transaction, so "top links" is an indexed sort.

### Swappable cache and rate limiter

Services depend on a small `Cache` interface and the middleware on a `RateLimiter` interface, and both JCache and Redis clients satisfy them. With Redis, the sliding-window log is a Lua script over a sorted set and is atomic across replicas. JCache has no scripting, so that client uses 64 striped mutexes and is only atomic within one process.

### Refresh-token rotation with reuse detection

Refresh tokens are opaque, stored as SHA-256 hashes, single-use, and grouped into a family per login. If an already-used token is replayed, the whole family is revoked. A conditional `UPDATE ... WHERE revoked = false` makes "use once" hold under concurrent requests without row locks.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Go 1.25, JavaScript | Goroutines make async click logging trivial |
| Framework | Gin, React 19 + Vite, Tailwind 4 | Simple middleware chain; fast dev loop |
| Data | GORM over pgx, golang-migrate, GeoLite2, go-qrcode | Explicit SQL migrations with down files |
| Storage | PostgreSQL, JCache (RESP2), local disk for PNGs | Postgres for truth, cache for the hot path |
| Infra/CI | None yet; run by hand | No Dockerfile or pipeline in the repo |
| Testing | None yet | Service tests with a fake `Cache` are next |

## Results

I haven't benchmarked LinkPlus, so I have no latency, throughput or hit-rate numbers to report. What it does: links and QR codes resolve through the cache-aside path, phone scans are logged as separate QR analytics, expired links are swept every five minutes, and an admin page polls JCache's live hit rate. Load-testing the redirect path is the next step.

## What I'd do differently

- Replace the goroutine per redirect with a bounded queue and batched inserts, because a traffic spike currently means unbounded concurrent DB writes.
- Re-cache a link on a miss with `min(1h, time until expiry)`. Right now an expired link can keep redirecting for up to five minutes.
- Fix known gaps: QR image endpoints don't check ownership, the IP hash is unsalted, and `ClientIP()` trusts every proxy.
- Add tests, a Dockerfile and CI, and move the QR PNGs to object storage so the API can run on more than one instance.
