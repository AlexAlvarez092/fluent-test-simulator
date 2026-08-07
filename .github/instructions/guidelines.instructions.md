---
description: "Guidelines and rules for agents working on the ServiceNow Fluent test preparation application."
---

# Critical Rules - Don't Invent

- **Never invent code patterns or approaches.** Only follow patterns that already exist in the codebase.
- **Never invent global variables, APIs, or ServiceNow properties** (like `window.NOW.userId`). Always ask where to get user data or ask for clarification.
- **Use strict API contracts always.** Accept only canonical parameter names per endpoint; do not add alias or fallback parameter names (for example, use only `collection_id`, never `collectionId` or `collection`).
- **Use string-only API body contracts.** In request bodies and response bodies, all scalar fields must be strings (IDs, booleans, numbers, counters, flags, statuses). Parse/format in frontend services when UI needs typed values.
- **Use canonical error envelope only.** Error responses always come as `{"result":{"error":"..."}}`; read only `result.error` in clients (no aliases or fallback paths).
- **Never show `sys_id` values in the frontend.** UI labels, breadcrumbs, tables, success messages, and detail pages must use human-friendly values only. For tests, use dates/timestamps as the visible identifier instead of `sys_id`.
- When uncertain about how to implement something, ask the user first instead of guessing or inventing a solution.
- Always verify that a pattern exists in working code before using it. If you can't find it, ask.

## General Guidelines

- English is the primary language for all code, comments, and documentation.
- Follow documentation ownership rules in `DOCUMENTATION.md` to avoid duplicating content across docs.
- If something is not clear, ask for clarification before proceeding.
- UI/UX improvements are encouraged. Use inline styles or edit `styles.css` to style components. Aim for a clean, ultra-minimalist aesthetic: minimal chrome, contextual controls (show buttons only when needed), no unnecessary labels.
- Avoid layout shift in all UI states. Hover, active, loading, and disabled states must not move surrounding content. Reserve layout space in advance (for example with fixed icon slots or hidden width-preserving text) so positions stay pixel-stable.

## Project Context

This is a ServiceNow Fluent test preparation application. Fluent is a TypeScript DSL for ServiceNow metadata. Always follow established Fluent SDK patterns - don't create custom approaches.

## Resources

### ServiceNow Official Examples
Refer to official ServiceNow SDK examples for correct patterns:
- **GitHub Repository**: https://github.com/ServiceNow/sdk-examples
- **React UI Page Sample**: https://github.com/ServiceNow/sdk-examples/tree/main/react-ui-page-ts-sample
- Use these examples as reference for authentication, API calls, and component patterns.

### Fluent Skills Documentation
**All Fluent documentation and patterns are in `.github/skills/` directory in this repository.**

**IMPORTANT**: Search `.github/skills/` FIRST for any pattern or feature you need to implement. This directory contains 200+ skill guides covering all aspects of Fluent, including:

- `fluent-overview/` - Overview and project structure
- `ui-page-patterns-guide/` - React UI Page patterns (dirty state, field extraction, service layer)
- `client-script-guide/` - Client-side scripts and g_form/g_user APIs
- `business-rule-guide/` - Server-side Business Rules, before/after triggers, gs.getUserID()
- `restapi-api/` - REST API endpoints
- `platform-view-guide/` - UI Actions, UI Policies, forms
- And 190+ more skills covering every Fluent feature

**Search Strategy**:
1. First: Check `.github/skills/` for the topic using exact keywords (e.g., "business-rule-guide/SKILL.md")
2. Then: Search GitHub SDK examples if the skill doesn't exist
3. Never: Invent patterns - if you can't find documentation, ask the user

**Always read from local skills before searching the web or SDK examples.**

## ServiceNow Global Variables

- **`window.g_ck`**: Authentication token (always include in API requests as `X-UserToken` header)
- **`window.g_user`**: Current user object in platform context
  - **Properties** (NOT methods):
    - `userID`: The user's sys_id (the unique identifier you need)
    - `firstName`, `lastName`, `userName`: User details
  - **Methods**: `getFullName()`, `hasRole(role: string)`
  - **Correct usage**: `const userId = (window as any).g_user?.userID || '';`
  - **Note**: `g_user` is ONLY available in ServiceNow UI Page context, not in development. Expect "User not authenticated" during testing.

## Troubleshooting

### "I can't find how to implement X feature"
- **Step 1**: Read `.github/skills/` directory for relevant guides
- **Step 2**: Search the codebase for similar patterns
- **Step 3**: If still not found, ask the user instead of inventing
- **DO NOT**: Assume patterns from other frameworks work in Fluent/ServiceNow

### "User authentication isn't working"
- **UI Pages**: Use Business Rules with `gs.getUserID()` on server side (see `business-rule-guide/SKILL.md`)
- **Client Scripts**: Use `g_form.getValue()` and `g_user` APIs (see `client-script-guide/SKILL.md`)
- **Never**: Try to get userId from the client alone in UI Pages - it doesn't work

