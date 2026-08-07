# Quiz Simulator

ServiceNow Fluent application for creating and running quiz sessions from question collections.

## Documentation

- Source-of-truth map: [DOCUMENTATION.md](DOCUMENTATION.md)
- Product requirements and scope: [PRD.md](PRD.md)
- Technical architecture: [ARCH.md](ARCH.md)
- UI and interaction style guide: [STYLE.md](STYLE.md)
- Agent implementation guardrails: [.github/instructions/guidelines.instructions.md](.github/instructions/guidelines.instructions.md)

## What is implemented (Summary)

- Collections browsing and per-user save/remove
- Open collection overview with stats and filtered question groups
- Quiz creation by mode and question count
- Quiz run with autosave and submit
- Completed quiz review with correctness highlighting
- Collection publish from JSON payload

For complete behavior and acceptance details, see [PRD.md](PRD.md).

## Frontend pages

- Home (saved collections)
- Collections (all collections)
- Publish
- Open Collection
- Collection Questions
- Quiz Run
- Error page

## Scripts

- npm run dev: start local development mode with now-sdk
- npm run build: build artifact with now-sdk
- npm run deploy: install/deploy with now-sdk
- npm run transform: run now-sdk transform
- npm run types: sync now-sdk dependencies/types
- npm run format: run Prettier write
- npm run format:check: run Prettier check

## Notes

- API calls use ServiceNow token header X-UserToken from window.g_ck.
- Error handling in page-level flows redirects to the app error page when requests fail.
- API/data/security details are owned by [ARCH.md](ARCH.md) to avoid duplication.
