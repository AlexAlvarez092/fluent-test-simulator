# Contributing

This document is the source of truth for the development workflow in this repository.

For product scope, architecture, and UI rules, use the dedicated documents linked from [README.md](README.md).

## Branch Workflow

Create a branch for every change.

- Feature or refactor work: `feat/...` or `ref/...`
- Bug fixes: `fix/...`
- Documentation changes: `docs/...`

Keep branch names short, descriptive, and scoped to one concern.

Examples:

- `feat/open-collection-stats`
- `fix/quiz-submit-validation`
- `ref/quiz-simulator-api`
- `docs/release-process`

## Commit Workflow

Create focused commits that group one logical change.

Rules:

- Stage only files related to the change you are committing.
- Avoid mixing refactors, behavior changes, and documentation updates in the same commit unless they are inseparable.
- Prefer short, imperative commit messages.

Examples:

- `refactor quiz simulator api`
- `fix quiz answer validation`
- `document branching workflow`

## Suggested Local Flow

1. Update your local base branch.
2. Create a new branch from that base.
3. Implement the change.
4. Run the narrowest relevant validation.
5. Stage only the intended files.
6. Create a focused commit.
7. Push the branch.
8. Open a pull request.

Example commands:

```bash
git switch main
git pull
git switch -c ref/quiz-simulator-api
git status --short
git add src/server/rest-api/quiz-simulator-api.ts
git commit -m "refactor quiz simulator api"
git push --set-upstream origin ref/quiz-simulator-api
```

## Validation Before Commit

Run the smallest relevant check for the files you touched.

Common examples in this repository:

- `npx tsc -p src/server/tsconfig.json`
- `npm run format:check`
- `npm run build`

Do not rely on a full build if a narrower validation is enough to confirm the change.

## Pull Request Expectations

A pull request should:

- stay focused on one change area
- explain the user-visible or technical intent
- mention any validation that was run
- call out known risks or follow-up work when relevant

## Documentation Ownership

- Use this file for Git workflow, contribution process, and collaboration rules.
- Use [DOCUMENTATION.md](DOCUMENTATION.md) for documentation ownership.
- Use [ARCH.md](ARCH.md) for technical design and architecture.
- Use [PRD.md](PRD.md) for product requirements and acceptance criteria.
- Use [STYLE.md](STYLE.md) for UI and interaction rules.