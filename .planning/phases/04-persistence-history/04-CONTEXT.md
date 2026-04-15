# Phase 4: Persistence & History - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementing persistent storage for current games and a historical record of finished sessions.
This phase delivers long-term state management and a "history" feature (SAVE-01, SAVE-02, SAVE-03).
</domain>

<decisions>
## Implementation Decisions

### Persistence Strategy
- **D-4-01:** Auto-save current game state (players, scores, transactions) to `localStorage` on every change. (SAVE-01)
- **D-4-02:** On app load, check for an existing game and resume if found.

### History & Ending
- **D-4-03:** A dedicated "History" screen/view accessible from the Setup or Dashboard. (SAVE-02)
- **D-4-04:** Explicit "End Game" button. Clicking this clears the current game and archives the final result (player names, final scores, timestamp) to a history list. (SAVE-03)

### Logic
- **D-4-05:** All data is client-side only (localStorage).

</decisions>

<canonical_refs>
## Canonical References

- `.planning/PROJECT.md` — Core vision (Persistence).
- `.planning/REQUIREMENTS.md` — v1 Requirements (SAVE-01, SAVE-02, SAVE-03).
- `.planning/ROADMAP.md` — Phase 4 Success Criteria.

</canonical_refs>

<code_context>
## Existing Code Insights

### App.tsx
- Main entry point for `players` and `transactions` state.
- Need to add `useEffect` to load/save state from `localStorage`.
- Need to manage the transition to a new `History` view.

### SetupScreen.tsx
- Good place to add a "View History" button.

### Dashboard.tsx
- Update the "Reset Game" button to include an "End Game & Save" option or separate actions.

</code_context>

<specifics>
## Specific Ideas
- "Stable" feel: Use a simple table or list for the History view.
- Clear indication of the date/time each game ended.
</specifics>

<deferred>
## Deferred Ideas
- Syncing history across devices (out of scope).
- Deleting specific history entries (not in requirements).
</deferred>

---
*Phase: 04-persistence-history*
*Context gathered: 2026-04-16*
