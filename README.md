# Quiz Simulator

ServiceNow Fluent application for creating and running quiz sessions from question collections.

## What is implemented

### Collections

- Browse all available collections
- Save a collection for the current user
- Remove a saved collection
- Open a collection and review its current stats

### Open collection view

- See question counters by group:
    - Never Seen
    - Correct
    - Ever Failed
    - Last Attempt Failed
    - All
- Open filtered question lists for each group
- See previous quizzes and continue/review them
- Create a new quiz from the selected collection

### Quiz creation

- Question counts: 10, 20, 40
- Modes:
    - never_seen
    - random
    - last_attempt_failed
    - ever_failed

### Quiz run

- Supports single and multiple choice questions
- Autosaves progress while answering
- Submit quiz and view completed results state
- Correct/incorrect answer highlighting in completed quizzes
- Hover info icon next to each question title when data exists:
    - shows rationale text
    - shows documentation link when present

### Publish page

- Publish a collection payload (collection, questions, answers) to the backend API

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
