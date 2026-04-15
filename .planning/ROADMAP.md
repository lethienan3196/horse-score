# Roadmap

## Phase 1: Base Application & Player Setup
- **Goal**: Core application UI with player naming and score initialization.
- **Requirements**: SET-01, SET-02, SET-03.
- **Plans**: 2 plans
- **Success Criteria**:
  - [x] 4 player names can be entered.
  - [x] App starts with all scores at 0.
  - [x] Layout is responsive on mobile screens.

Plans:
- [x] 01-01-PLAN.md — Project Scaffolding & Setup Screen (Completed: 2026-04-16)
- [x] 01-02-PLAN.md — Game Dashboard & Player Initialization (Completed: 2026-04-16)

## Phase 2: Core Scoring & Real-time Totals
- **Goal**: Implement zero-sum point transfer logic and score visualization.
- **Requirements**: SCORE-01, SCORE-02, SCORE-03.
- **Plans**: 1 plan
- **Success Criteria**:
  - [x] Point transfers from A to B work correctly (A+1, B-1).
  - [x] Total sum across all 4 players is always 0.
  - [x] Dashboard updates instantly on score changes.

Plans:
- [x] 02-01-PLAN.md — Core Scoring Logic & Player Selection (Completed: 2026-04-16)

## Phase 3: Transaction Logging
- **Goal**: Real-time visible log of score transfers.
- **Requirements**: LOG-01, LOG-02.
- **Plans**: 1 plan
- **Success Criteria**:
  - [x] Feed shows scrolling entries (e.g., "Alice -> Bob (+1)").
  - [x] Newest logs appear at the top.

Plans:
- [x] 03-01-PLAN.md — Transaction Log State & UI Component (Completed: 2026-04-16)

## Phase 4: Persistence & History
- **Goal**: Game state saving to localStorage and historical view.
- **Requirements**: SAVE-01, SAVE-02, SAVE-03.
- **Plans**: 2 plans
- **Success Criteria**:
  - [x] Refreshing the browser doesn't lose current game scores.
  - [x] Ended games are saved to a visible History list.

Plans:
- [x] 04-01-PLAN.md — LocalStorage Persistence & Auto-save (Completed: 2026-04-16)
- [x] 04-02-PLAN.md — End Game Flow & History Screen (Completed: 2026-04-16)

## Phase 5: UX/UI Polishing
- **Goal**: Refine the visual experience and responsiveness.
- **Requirements**: SET-03, UX-01, UX-02.
- **Plans**: 1 plan
- **Success Criteria**:
  - [x] Interface is visually cohesive and follows a consistent theme.
  - [x] Interactions feel smooth with transitions and feedback.
  - [x] Mobile experience is polished for both portrait and landscape.

Plans:
- [x] 05-01-PLAN.md — Styling Refinements & Interactions (Completed: 2026-04-16)

## Phase 6: Real-time Multiplayer Sync
- **Goal**: Synchronize scores across multiple devices via WebSockets.
- **Requirements**: SYNC-01, SYNC-02, SYNC-03.
- **Plans**: 1 plan
- **Success Criteria**:
  - [x] Each device can join a shared session.
  - [x] Scores update instantly on all devices when a transfer occurs.
  - [x] Conflict resolution ensures data consistency.

Plans:
- [x] 06-01-PLAN.md — WebSocket Integration & Session Management (Completed: 2026-04-16)

---
*Last updated: 2026-04-16*
