---
intro: Chaukanna is an AI guardian that joins an elderly person's phone call, spots a scam script like "digital arrest" while it is happening, and speaks a warning into the call in their own language. It is a single Go service built on Gnani's Prisma speech-to-text and Timbre text-to-speech, covering 10 Indian languages.
caption: Call audio arrives from Exotel or Twilio, or from a browser on speakerphone, at the Media stream handler, goes to Prisma STT for transcripts, then through the Pre-filter and Response logic (with an optional Reasoning LLM), and comes back out as a Timbre warning on the call, a family alert and a live Family dashboard.
---

## About

"Digital arrest", fake customs and KYC-expiry calls follow a script: authority, fear, isolation, urgency, then a demand for an OTP, a screen-share app or a transfer. The people targeted are often elderly, alone on the line, and speaking Hindi or Hinglish over a noisy connection.

Chaukanna listens to the call alongside the person. **Can a system recognise a scam script live, on 8 kHz phone audio in Indian languages, and step in before money moves, without false alarms on genuine bank calls?** It joins by merging a Chaukanna number into the call, by screening forwarded calls, or by listening on speakerphone.

## Architecture

Audio comes in through **Exotel / Twilio** as a two-way media stream, or from a **Speakerphone browser** over a WebSocket. The **Media stream handler** forwards 8 kHz frames to **Prisma STT** and reconnects past Prisma's 15-minute session limit. Final transcripts land in the **Call session**, which keeps the transcript and the risk state machine and ignores Chaukanna's own voice.

Every line goes through the **Pre-filter**, a set of Indic phrase rules and direct-demand patterns. The **Response logic** decides whether to stay quiet, caution, warn, answer a talk-out or interrupt. If configured, it also asks the **Reasoning LLM** (any OpenAI-compatible endpoint, Evon as the target) for a risk score over a rolling window, but it never waits on it. A chosen pre-written line goes to **Timbre TTS**, and the audio is played back into the call. The **Alert service** messages the family on Telegram, and the **Dashboard hub** streams the live transcript and red flags to the **Family dashboard**. Calls and people are stored in **SQLite / Postgres**.

## How it's implemented

### Rules first, reasoning optional

The pre-filter runs on every transcript line in about 0.4 ms. A direct demand ("OTP bata dijiye", "install AnyDesk", "scan this QR") is a scam by itself, and no model score can overrule it. Softer flags only add up. The model adds judgement when it is available, but a slow or failed request never blocks a warning.

### Warnings are never model output

The model decides whether to warn, but the spoken words are pre-written per scam type and language, because a frightened person may act on every word. Clips are synthesised at startup, so a warning plays without waiting for Timbre.

### A graded response that keeps listening

Below a risk of 0.55 nothing is said. From 0.55 to 0.79 it speaks a soft caution, and at 0.8 or on a direct demand it gives the full warning and alerts the family. The call isn't over after the warning: Chaukanna answers a caller who says "ye scam nahi hai", interrupts if the person starts reading out digits, and alerts the family again if they are still on the call 45 seconds later.

### Built around the real APIs

Prisma splits an OTP across lines, so the session adds the digits back up, and scam keyterms (OTP, AnyDesk, CBI, KYC) help them survive a bad line. `cmd/warningcheck` speaks every warning through Timbre and transcribes it back, which caught a misread helpline number.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | Go 1.26, TypeScript | Goroutines suit concurrent audio streams |
| Framework | Gin, gorilla/websocket, React 18 + Vite + Tailwind | Small HTTP surface plus long-lived sockets |
| Speech and ML | Gnani Prisma v3 STT, Timbre TTS and voice cloning, OpenAI-compatible LLM | Indian languages and Hinglish on phone-quality audio |
| Storage | SQLite by default, Postgres via `DATABASE_URL` | Zero setup locally, a real database when hosted |
| Telephony | Exotel, Twilio Media Streams, Telegram alerts | Exotel tested on real calls |
| Infra and testing | One Docker image, Go tests, `cmd/benchmark`, `cmd/noisebench` | Replays calls through the server's own detector |

## Results

| Measure | Baseline | Best |
|---|---|---|
| Scams caught, Set C (28 unseen scam calls), rules only | 5/28 (old rules) | **22/28** (new rules) |
| Scams caught, Set C, with 5 dB street noise through Prisma | 22/28 (typed) | **23/28** |
| Scams warned, Set C, rules + Evon 30B | 22/28 (rules only) | **26/28** |
| Scams warned, 34 staged speakerphone calls | 18/22 (rules only) | **19/22** (rules + Evon) |
| False alarms on normal calls, Set C | 2/12 (rules only) | 3/12 (rules + Evon) |
| Pre-filter time per transcript line | n/a | **about 0.4 ms** |

Adding Evon caught the most scams on every set, for up to one more false alarm. The sets are small and the voices are Timbre, not real callers, so these show direction more than real-world accuracy.

## What I'd do differently

- Test on real, own-words calls; the scripted sets were written alongside the rules and flatter them.
- Get native speakers to review the warnings in the eight languages other than Hindi and English, which are machine-translated today.
- Run Evon on a live call and measure its latency, since it has only been benchmarked on replayed text.
- Add a bank or UPI hook that pauses outgoing transfers while a call is flagged, so the warning is not the only line of defence.
