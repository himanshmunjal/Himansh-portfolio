---
intro: A no-login tool for moving files and text between devices with a short code, where every session is deleted after exactly five minutes. The interesting part is making that deadline hold across Redis, object storage and live WebSockets, while the server only stores ciphertext.
caption: The React client encrypts content in the browser and talks to the Gin REST API, which keeps live state in Redis under one TTL, while file bytes go straight to object storage and Redis expiry events drive the cleanup worker and the WebSocket hub.
---

## About

Ephemeral Share moves a file or snippet between devices. You create a session, get a short code, and anyone who types it can see and add content. Quick Transfer is a simple drop box. Shared Workspace is a live room where new items appear in real time.

The hard part is the deletion, not the sharing. **How do you guarantee a session is unreadable at exactly five minutes, and gone from every store soon after, without trusting a cron job?** I also wanted large files to skip the API, and stored data to be useless on its own.

## Architecture

The **React client** runs in a browser or a Capacitor shell. **Web Crypto** derives an AES-GCM key from the access code and encrypts file bytes, filenames and text before they leave the tab. The client calls the **Gin REST API** over JSON. The API writes session and content keys to **Redis**, each carrying the session's remaining TTL, and sends analytics rows to **PostgreSQL** in the background. For files, the API returns a pre-signed URL and the client PUTs or GETs ciphertext directly against **Object storage** (MinIO locally, S3 or R2 in production).

Redis also drives what happens after a write. A `PUBLISH` reaches the **WebSocket hub** on every API instance, which pushes events to clients. When the session key expires, Redis emits a keyspace event. The **Cleanup worker** deletes the session's prefix from Object storage, marks the analytics row ended, and has the WebSocket hub send `session_expired`.

## How it's implemented

### One clock, never extended

On create I run `SET session:{code} ... EX 300`. That is the only timer. Child keys copy the parent's *remaining* TTL, so nothing outlives the session and adding content cannot keep it alive. Every content endpoint checks the session key first. Redis treats an expired key as missing, so the API returns `410 Gone` at 5:00 even if cleanup runs late.

### Expiry-driven cleanup

Deletion runs on Redis keyspace notifications, not polling. S3 deletes are idempotent, so every instance can handle the same event. The server refuses to boot if notifications are disabled, because cleanup would otherwise fail silently. A 60-second sweep fixes analytics rows a missed event left active.

### Two-phase direct uploads

File bytes never pass through Go. The client gets a 2-minute pre-signed PUT, and the item stays hidden as "pending" until it calls `/complete`. The server then runs `HEAD` to check the real size, because a pre-signed URL does not enforce the declared one, and deletes oversized objects. Completion uses `GETDEL`, so a repeated call cannot publish a file twice.

### Encryption keyed by the code

The key is PBKDF2-SHA256 over the code (100,000 iterations) into AES-GCM-256, with a fresh IV per payload. An earlier version kept a random key in the URL fragment. That was true end-to-end encryption, but a hand-typed code could not decrypt anything. The current design protects against leaked buckets and Redis dumps. It is *not* zero-knowledge against the operator, and its strength is bounded by the code's 30 to 40 bits.

### Stateless API, shared event bus

API instances hold no per-request state. Each runs one hub per session that subscribes to `ws:{code}` in Redis, so clients of one session can sit on different instances. A dropped socket reconnects with backoff and refetches the feed to catch up.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Go 1.25, JavaScript | Goroutines suit the hub and background workers |
| Framework | Gin, React 18 + Vite + Tailwind, Capacitor | Small REST surface; one web build for iOS and Android |
| Data | Redis 7 | Per-key TTL, pub/sub and expiry events in one store |
| Storage | MinIO / S3 / R2, PostgreSQL 16 | Blobs bypass the API; Postgres holds only analytics |
| Infra | Docker Compose, multi-stage Dockerfiles, Nginx | One command starts all five services |
| Testing | None automated yet | Checked by hand with a short `SESSION_TTL_SECONDS` |

## Results

I have not benchmarked this project, so there are no measured numbers. It works end to end in Docker Compose. Sessions are created and joined by code or link, encrypted files and text appear live in a Shared Workspace, the API returns `410` at expiry, and the cleanup worker removes the storage prefix.

## What I'd do differently

- Write tests first: miniredis tests for TTL capping and `GETDEL`, plus an end-to-end expiry test with a short TTL.
- Move rate limiting into Redis, since the in-memory per-IP limiter multiplies with instance count.
- Make the participant limit atomic with a Lua script, because `SCARD` then `SADD` lets concurrent joins overshoot it.
- Add a bucket lifecycle rule and paginated deletes, since a missed expiry event leaves objects behind.
