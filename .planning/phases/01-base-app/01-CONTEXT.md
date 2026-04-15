# Phase 1: Base Application & Player Setup - Context

**Gathered:** 2026-04-15
**Status:** Ready for planning

<domain>
## Phase Boundary

The core application shell, responsive player setup screen, and initial 0-point scoring dashboard.
This phase delivers the fundamental UI structure (SET-01, SET-02, SET-03).
</domain>

<decisions>
## Implementation Decisions

### Player Entry UX
- **D-01:** Setup screen shows 4 independent text boxes for names. (No sequential steps).
- **D-02:** Strict validation: User cannot "Start" the game if names are empty or duplicates.

### Layout & Style
- **D-03:** In-game dashboard uses a 2x2 grid to show the 4 players (2 columns, 2 rows).
- **D-04:** Theme is "Horse/Earthy" (Browns, greens, high-end stable aesthetic).

### Logic
- **D-05:** All players initialize with exactly 0 points upon game start.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/PROJECT.md` — Core vision and "Horse" branding.
- `.planning/REQUIREMENTS.md` — v1 Requirements (SET-01, SET-02, SET-03).
- `.planning/ROADMAP.md` — Phase 1 Success Criteria.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None (Fresh project start).

### Established Patterns
- Tech stack: React (TypeScript) SPA with Vanilla CSS (from PROJECT.md).

### Integration Points
- This is the entry point of the entire application.

</code_context>

<specifics>
## Specific Ideas
- "Stable" feel: Use a darker green or brown header with light, clean player boxes.
- Large, easy-to-tap buttons for names and starting the game.
</specifics>

<deferred>
## Deferred Ideas
- None mentioned during this discussion.
</deferred>

---
*Phase: 01-base-app*
*Context gathered: 2026-04-15*
