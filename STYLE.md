# Quiz Simulator Style Guide

## Document Boundary

This document is the source of truth for UI visual language and interaction style.

- Functional requirements and acceptance criteria are owned by [PRD.md](PRD.md).
- Technical architecture and API internals are owned by [ARCH.md](ARCH.md).
- Documentation ownership rules are defined in [DOCUMENTATION.md](DOCUMENTATION.md).

## 1. Purpose

This document defines the visual and interaction style currently implemented in Quiz Simulator. It should be treated as the source of truth for new UI work unless a deliberate redesign is approved.

## 2. Design Principles

- Minimal and focused UI: content first, chrome second.
- Stable layouts: hover, loading, and action states must not shift surrounding content.
- Quiet visual hierarchy: low-noise surfaces, medium-contrast text, subtle emphasis.
- Progressive disclosure: contextual actions appear when relevant (row hover/focus, section context).
- Consistent feedback: loading, disabled, and error states are always visible and predictable.

## 3. Color System

Use CSS variables from :root. Do not hardcode colors in component-level styles unless strictly necessary.

- Text and ink:
    - --color-ink-strong: primary text
    - --color-ink: interactive/base secondary text
    - --color-ink-muted: muted text and idle icons
- Surfaces:
    - --color-surface: base background
    - --color-surface-subtle: subtle elevated stripe and page gradient end
- Functional colors:
    - --color-answer-correct
    - --color-answer-wrong
    - --color-error-text
    - --color-error-border
    - --color-error-bg
- Utility:
    - --app-focus for focus rings
    - --color-shadow-pop and --color-overlay-soft for overlays/tooltips/modal depth

## 4. Typography

- Base font stack:
    - Public Sans, Avenir Next, Segoe UI, sans-serif
- Body:
    - line-height: 1.50
    - letter-spacing: 0.002em
- Weight tokens:
    - --fw-regular, --fw-medium, --fw-semibold, --fw-title, --fw-display
- Heading scale:
    - h1: prominent page title
    - h2: section title
    - h3: question title

## 5. Spacing and Layout

- Use spacing variables only:
    - --space-1 to --space-6
- App frame:
    - max width 1120px in app shell
    - centered layout
- Core rhythm:
    - section spacing comes from h2, section-title-row, and table/list gaps
- Mobile behavior:
    - nav wraps below 900px
    - content keeps linear reading order

## 6. Core UI Patterns

### 6.1 Navigation

- Left: brand icon + label.
- Right: text-style action buttons.
- Active section uses is-active class.

### 6.2 Text Action Buttons

- Base class: text-action-button.
- Hover/focus uses icon swapping and color emphasis.
- Pseudo-element with data-label reserves width for hover weight changes.

### 6.3 Table Rows as Actions

- Clickable rows use collection-row collection-row-clickable.
- Use InteractiveTableRow to keep behavior and ARIA consistent.
- Row hover background uses subtle horizontal gradient.

### 6.4 Contextual Row Icons

- Save/remove icon actions are hidden by default and shown on row hover/focus.
- Busy state forces icon visibility and disables pointer interactions.
- Use CollectionActionIcon variants:
    - remove
    - save-unsaved
    - save-saved

### 6.5 Loading Indicators

- Use LoadingSpinnerIcon for startup, titles, sections, and submit states.
- Keep fixed icon slots so loading visibility changes do not move text.

### 6.6 Modal

- Backdrop uses overlay token and centered card.
- Modal has constrained width and max-height with scroll.
- Header contains title and close action.

### 6.7 Question Information Tooltip

- Trigger is an inline icon in question headings.
- Tooltip opens on hover and focus-within.
- Tooltip includes rationale and optional docs link.
- Tooltip uses strong shadow plus viewport overlay to isolate reading context.

## 7. Quiz Interaction Rules

- Question types:
    - single choice uses radio
    - multiple choice uses checkbox
- Completed quizzes are read-only.
- Correctness highlighting:
    - correct answers use is-correct
    - selected wrong answers use is-wrong
- Autosave state is reflected through page-header loading indicator behavior.

## 8. Motion

- Icon transitions use short opacity-based swaps.
- Question items may use scroll-timeline reveal animation when supported.
- Reduced motion mode disables animated transforms and blur.
- Motion should support clarity, never distract from answering workflow.

## 9. Accessibility and Interaction Standards

- Always provide visible focus state with --app-focus.
- Preserve keyboard access on interactive rows and controls.
- Use aria-label/title pairs for icon-only and contextual actions.
- Keep semantic form controls for answers and settings.
- Ensure disabled states communicate non-interactivity clearly.

## 10. Error and Feedback Patterns

- Global app-level failures route to Error Page.
- Publish form uses inline error feedback banner for local JSON validation errors.
- Error styling uses dedicated error tokens and subtle tinted background.

## 11. Copy and Tone

- Keep labels short and direct.
- Prefer action-first language:
    - Create quiz
    - Submit
    - Publish collection
    - Continue
    - Review
- Keep status naming aligned with backend domain terms:
    - in_progress
    - completed
    - never_seen
    - ever_failed
    - last_attempt_failed

## 12. Implementation Rules for Contributors

- Reuse existing CSS variables before adding new ones.
- Reuse existing shared components for repeated interaction patterns.
- Avoid introducing style systems that conflict with current plain CSS architecture.
- Do not introduce layout shift in any state transitions.
- Keep visual behavior consistent between pointer and keyboard interactions.

## 13. Quick Checklist

- Uses existing tokens for color, spacing, and weight.
- Preserves no-layout-shift behavior in loading/hover/disabled states.
- Includes keyboard focus and ARIA labels for interactions.
- Reuses shared components where patterns already exist.
- Matches current minimal visual language and motion constraints.
