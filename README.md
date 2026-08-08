# AccessAI

AccessAI is an accessibility-first Next.js prototype for deaf and hard-of-hearing users. It brings browser-based live captions, sign-language presentation, visual sound alerts, an accessible chat assistant, meeting overlays, emergency notifications, and an in-app accessibility audit into one interface.

## What is implemented

- Live speech-to-text using the browser Speech Recognition API, with an optional WebSocket caption source.
- Camera-based sign-language UI and typed phrase demonstrations.
- Microphone-level monitoring and visual environmental-sound alerts.
- A locally scripted accessible chat experience with voice dictation.
- Caption styling saved in `localStorage`.
- Light, dark, and high-contrast themes plus global font scaling.
- Runtime accessibility checks using `axe-core` and local DOM heuristics.

This repository contains the frontend only. The optional caption socket expects `ws://localhost:8080/captions`; no server or production AI model is included. Browser support and camera/microphone permission are required for media features.

## Stack

- Next.js 16 and React 19
- TypeScript
- CSS and inline component styles
- React Context for accessibility preferences
- axe-core for browser accessibility audits

## Run locally

Node.js 20 or newer is recommended.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Useful routes are:

- `/` — product landing page
- `/dashboard` — interactive accessibility tools
- `/accessibility-tests` — browser accessibility audit

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Repository structure

```text
public/                         Static assets
src/
  app/                          Next.js routes and global styles
  components/
    accessibility/              Shared accessibility UI primitives
    ai/                         Interactive assistive feature components
    illustrations/              Reusable React/SVG illustrations
  lib/
    accessibility/              Preference context and audit helpers
    captions/                   Caption settings and persistence
    realtime/                   WebSocket client
```

## Architecture notes

All interactive features are client components. `AccessibilityProvider` owns theme and font-size preferences and persists them in the browser. The dashboard composes independent feature components, while shared non-visual behavior lives under `src/lib`. There are currently no API routes, database, authentication layer, automated test suite, or backend service in this repository.
