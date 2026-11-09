---
intro: SkyPort is a full-stack airport portal in React and Go where passengers book flights and admins run the schedule, built so that two people racing for the last seat can never both get it.
caption: A request leaves the React SPA through the Axios client, passes Gin middleware, the Rate limiter or JWT auth, reaches the Controllers and the Booking transaction, and ends in PostgreSQL.
---

## About

SkyPort is an airport management system with two sides. Passengers check flight status, book flights, look up lost baggage and file complaints. Admins run the schedule, statuses, advisories, staff and baggage, and review bookings.

Each flight has a fixed seat inventory split into classes, and the fare rises as seats sell. The question I had to answer was: **how do I sell a limited number of seats at a server-decided price without overselling, and without letting a passenger token reach admin data?**

## Architecture

Every request from the React SPA goes through one Axios client, which reads the JWT from the Session store and sends it as a bearer token. On the server, Gin middleware sets security headers, caps bodies at 1 MB and checks CORS. Login and signup then pass the Rate limiter. Every other route goes through JWT auth, which checks signature, expiry and `role` claim.

The Controllers are split into public, user and admin groups. They take the caller's identity from the token claims, never from the body or URL, and talk to PostgreSQL through GORM. `POST /user/book` runs as a Booking transaction: lock the flight row, check seats, decrement the counter and insert the booking in one commit.

## How it's implemented

### Booking transaction with a row lock

The handler loads the flight with `SELECT ... FOR UPDATE`, checks the counter for the chosen class, updates only that column and inserts the booking. I picked a row lock over optimistic retries because one flight row is the only contended resource.

### Prices computed on the server

The client never sends a price. When an admin adds a flight, 85% of seats go to the normal class and 5% of that figure to each of the student, senior and armed-forces concessions, at fares 5%, 6% and 8% lower. `unitPrice` raises the base fare 5% for every 20% of normal seats sold. Search and booking share it, so the quoted and charged prices match.

### One auth middleware, two roles

Both route groups share `Authenticate(role)`. It rejects anything not HMAC-signed and requires the `role` claim to match, so a passenger token on an admin route gets a 401. The server refuses to start without a 32+ character secret. Tokens expire after 12 hours.

### Login hardening

- Passwords use bcrypt. Old plaintext rows log in once and are rehashed.
- An unknown email still runs a bcrypt compare on a dummy hash, so timing does not reveal which accounts exist.
- The Rate limiter allows 10 attempts per IP per minute. Trusted proxies are off so clients cannot spoof their IP.
- Admin signup needs a server-side invite code.

### Thin client with one API module

All HTTP goes through `src/lib/api.js`. On any 401 an interceptor clears the session and redirects to the right login page. `ProtectedRoute` checks token expiry for UX only; the server authorises every call.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Go 1.24, JavaScript | Small API binary; JS for the browser |
| Framework | Gin, React 19, React Router 7 | Gin route groups match the three APIs |
| Data | GORM with `AutoMigrate` | Schema comes from the Go models |
| Storage | PostgreSQL | Real transactions and row locks for seat inventory |
| Build | Vite 6, Tailwind CSS 3 | Fast dev server, shared utility classes |
| Infra | Render, two services | Simple hosting for frontend and API |
| Testing | `go test`, ESLint | Unit tests on auth, passwords, rate limit, CORS |

## Results

I did not measure latency, throughput or load, so there are no performance numbers. The Go test suite passes. It covers seven JWT cases (including a user token on an admin route, a wrong key and `alg: none`), the secret check, password policy, rate limiting and CORS origins. The no-overselling guarantee comes from the row lock; I have not load-tested it.

## What I'd do differently

- Store seat counters and prices as integers. They are legacy text columns parsed on every request.
- Write a test that fires many bookings at the last seat and checks exactly one succeeds.
- Add payment and cancellation. "Confirm booking" only reserves seats today.
- Move the rate limiter out of process memory so it works across API instances.