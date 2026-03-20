# Surviving Full-Stack Hell: Lessons From Building an Airport Management System

When I started the **Airport Management Web** project, I thought the hard part would be the backend logic — flight scheduling, seat allocation, baggage tracking. I was wrong. The hard part was everything *around* the logic.

## The Architecture That Almost Killed Me

The system had two distinct user roles: **administrators** who manage flight schedules, and **passengers** who search, book, and track. Sounds straightforward. The moment I tried to enforce this cleanly with JWT middleware in **Golang (Gin + GORM)**, I hit a wall.

My first mistake was building role checks at the route level *and* inside handlers. I ended up with duplicated guard logic, inconsistent error responses, and a frontend that did not know whether a 403 meant wrong role or expired token.

> The fix: a single middleware chain where auth and role validation are fully decoupled. Auth verifies the token. Role middleware checks claims. Handlers never touch tokens.

## PostgreSQL Joins Are Not Free

I modelled the schema with proper normalisation — flights, bookings, users, baggage all in separate tables. Then I watched query times balloon when I joined four tables on every booking lookup.

The lesson: **design for your read patterns, not just your write patterns.** I added targeted indexes on `flight_id`, `user_id`, and `departure_time` and rewrote the booking query to use a CTE instead of nested subqueries. Latency dropped by ~70%.

## React State That Lied

On the frontend, the booking flow had three steps: search → select → confirm. I managed this with `useState` across sibling components passed through props. By step three, the state was stale, the UI showed the wrong seat class, and the confirmation API call was sending the original unmodified request.

The fix was lifting all booking state into a single context and treating each step as a state machine transition — not independent component state. **State that spans multiple steps belongs in one place.**

## What I Would Do Differently

- Start with a proper API contract (OpenAPI spec) before writing a single handler.
- Use **refresh tokens** from day one — not just access tokens. Retrofitting this broke three frontend flows.
- Write integration tests for the auth middleware early. A 10-minute test suite would have caught a token expiry bug I only found in production.

Building this system taught me that full-stack is not about knowing two languages — it is about designing the seams between them.
