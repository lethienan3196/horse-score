# Phase 2: Core Scoring & Real-time Totals - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementing the zero-sum scoring logic, player selection for transfers, and the transfer UI itself.
This phase delivers the fundamental game mechanic (SCORE-01, SCORE-02, SCORE-03).
</domain>

<decisions>
## Implementation Decisions

### Transfer Interaction
- **D-2-01:** "Two-Click" Giver/Receiver selection.
  - Click on Player A (Giver) to select them as the source.
  - Click on Player B (Receiver) to select them as the target.
- **D-2-02:** After Selecting Giver & Receiver, the user is prompted for a "Custom Transfer Amount" (e.g. +5, -2, etc.).

### Logic
- **D-2-03:** Strict Zero-Sum (Σ scores = 0). (SCORE-02) - All transfers must balance: Giver loses X, Receiver gains X.

### Score Visualization
- **D-2-04:** Color feedback for selection states (D-04 theme-compliant).
  - Selected Giver should show a red tint/border.
  - Selected Receiver should show a green tint/border.
- **D-2-05:** Dashboard updates instantly on state change (SCORE-03).

</decisions>

<canonical_refs>
## Canonical References

- `.planning/PROJECT.md` — Core vision (Zero-sum mechanic).
- `.planning/REQUIREMENTS.md` — v1 Requirements (SCORE-01, SCORE-02, SCORE-03).
- `.planning/ROADMAP.md` — Phase 2 Success Criteria.

</canonical_refs>

<code_context>
## Existing Code Insights

### Dashboard.tsx
- Current implementation shows static players from `App.tsx` state.
- Need to add `onSelectPlayer` or similar callback to handle the two-click flow.

### App.tsx
- Holds the `players` state and manages the overall game status.
- Logic for point transfers should reside here and be passed down as a method.

</code_context>

<specifics>
## Specific Ideas
- Once a Giver is selected, highlight them and show a prompt: "Select Receiver".
- Use a simple modal or inline input for the custom amount.
</specifics>

<deferred>
## Deferred Ideas
- None.
</deferred>

---
*Phase: 02-core-scoring*
*Context gathered: 2026-04-16*
