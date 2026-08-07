# Documentation Map and Source of Truth

## Purpose

This file defines which document owns each type of information.
Use it to avoid duplicate content across repository documentation.

## Source of Truth Matrix

| Topic                                                                                      | Source of truth                                 | Other docs should do                                                  |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------- | --------------------------------------------------------------------- |
| Product goals, scope, functional requirements, acceptance criteria                         | PRD.md                                          | Reference PRD.md, summarize only                                      |
| Runtime architecture, data model, security model, API structure, build/deploy architecture | ARCH.md                                         | Reference ARCH.md, avoid restating details                            |
| Visual language, UI patterns, accessibility and interaction style                          | STYLE.md                                        | Reference STYLE.md, avoid style duplication                           |
| Quick product overview and developer entry points                                          | README.md                                       | Keep brief and link to detailed docs                                  |
| Agent and implementation guardrails for this repository                                    | .github/instructions/guidelines.instructions.md | Follow instructions, do not duplicate design or architecture chapters |

## Authoring Rules

1. Write details only in the owning document.
2. In non-owning documents, keep a short summary and link to the source document.
3. When behavior changes, update the source document first, then update dependent summaries.
4. Prefer stable headings so links remain valid.

## Required Cross-References

- README.md must link to PRD.md, arch.md, style.md, and this file.
- PRD.md must reference arch.md for implementation details.
- arch.md must reference PRD.md for functional scope and acceptance intent.
- style.md should remain style-only and avoid functional/architecture requirements.

## Optional Standard Docs

The following are optional for this repository but recommended when collaboration grows:

- CONTRIBUTING.md for development workflow and contribution process.
- CHANGELOG.md for release and behavior-change tracking.
- SECURITY.md for vulnerability reporting process.
