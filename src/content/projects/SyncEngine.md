---
intro: A Google-Docs-style collaborative editor in Go and React, built around a sequence CRDT I wrote by hand instead of pulling in a library.
caption: Edits flow left to right from the Editor UI and SyncClient over WebSocket into the Hub and per-document Room, are committed to PostgreSQL before the ack, and fan out to other clients, while the REST API handles auth, files and exports.
---

## About

SyncEngine is a real-time editor where several people type in one document and see each other's changes. It handles plain text, code, rich text and multi-file projects, with comments, version history, sharing, teams and export to Word and PDF.

The core question was this: **how do you let people edit the same text, including offline, so everyone ends up with the same document and no acknowledged edit is lost?** Most of the project is my answer to that.

## Architecture

A user types in the Editor UI. The SyncClient turns each keystroke into a CRDT operation, applies it to a local replica, and keeps it in an outbox saved in the browser. It sends the outbox over a WebSocket to the Hub, which routes each message to the Room for that document.

The Room holds the authoritative copy in memory under one mutex. It validates the ops, writes them to PostgreSQL in one transaction, then acks the sender and broadcasts to everyone else. The REST API, also in Gin, covers login, sharing, comments, history and uploads. Images go to Image storage (local disk or S3-compatible). Exports and imports go through Converters (pandoc and typst). SMTP sends sign-up and reset emails.

## How it's implemented

### Hand-written RGA CRDT

I picked RGA because its rules are small: an insert names the item it follows, and concurrent inserts at the same spot are ordered by ID. IDs are a client id plus a Lamport counter. Deletes leave tombstones so later ops can still point at deleted items. There are two mirrored versions, Go on the server and JavaScript in the browser. Both test suites pin the same tie-break case, so drift gets caught.

### Persist before ack

Each `ops` message is one database transaction, and the sender is acked only after the commit. I rejected an async writer because the server could ack an edit, crash, and lose it after the client dropped it from its outbox. If a write fails, the Room closes and its clients reconnect and resend.

### One Room per document

The Hub maps document ids to Rooms. A Room loads from a snapshot plus tail ops and is evicted when the last user leaves. A mutex per Room gives the ordering of an actor with less code. A client that falls behind its 256-message buffer is dropped and catches up using `lastSeq`. Snapshots every 200 ops are only a speed-up; the op log is the source of truth.

### Offline and reconnect

The client keeps its replica, outbox and last seen `seq` in `localStorage`. On reconnect it sends `hello{lastSeq}` and gets only the missing ops. The server skips ops it already stored, so resending is safe. Revert emits new ops instead of deleting history.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Go 1.26 | Goroutines fit one reader and one writer per socket. |
| Backend | Gin, GORM, gorilla/websocket | Thin router, simple models, stable WebSocket library. |
| Sync | RGA CRDT in Go and JS | Merges by construction, so offline editing needs no extra mechanism. |
| Storage | PostgreSQL, S3 or R2 for images | `jsonb` holds ops and snapshots; cascades clean up deletes. |
| Frontend | React 19, Vite, Tailwind, CodeMirror, Quill | Standard editors on top of my own sync layer. |
| Infra and CI | Docker, Heroku, GitHub Actions | One image; CI runs vet, race-detector tests against Postgres, govulncheck. |
| Testing | Go `testing`, `node --test` | No framework needed for a pure CRDT. |

## Results

I never built a load test, so I have no end-to-end sync numbers. The only performance figure is a Go benchmark in the repo, which I ran on an M1 laptop.

| Measure | Baseline | Best |
|---|---|---|
| Replay of 100,000 sequential inserts into a new document | Not measured | **52.2 ms per run** |
| Frontend tests passing | Not applicable | **25 of 25** |

Large uploads load quickly because of a hint for the last insert position. This says nothing about concurrent users.

## What I'd do differently

- Run more than one server. Open documents live in one process, so I can only run one instance. Consistent hashing on document id is the next step.
- Collect tombstones. They are never removed, and finding an item is O(n) in a plain array.
- Batch commits. One insert per message is fine now, but group commit would keep the guarantee at higher load.
- Add load tests, so I can say how many editors one Room handles.
