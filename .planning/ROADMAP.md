# Roadmap

## Phase 1: Base Application & Player Setup
- **Goal**: Core application UI with player naming and score initialization.
- **Requirements**: SET-01, SET-02, SET-03.
- **Plans**: 2 plans
- **Success Criteria**:
  - [ ] 4 player names can be entered.
  - [ ] App starts with all scores at 0.
  - [ ] Layout is responsive on mobile screens.

Plans:
- [ ] 01-01-PLAN.md — Project Scaffolding & Setup Screen
- [ ] 01-02-PLAN.md — Game Dashboard & Player Initialization

## Phase 2: Core Scoring & Real-time Totals
- **Goal**: Implement zero-sum point transfer logic and score visualization.
- **Requirements**: SCORE-01, SCORE-02, SCORE-03.
- **Success Criteria**:
  - [ ] Point transfers from A to B work correctly (A+1, B-1).
  - [ ] Total sum across all 4 players is always 0.
  - [ ] Dashboard updates instantly on score changes.

## Phase 3: Transaction Logging
- **Goal**: Real-time visible log of score transfers.
- **Requirements**: LOG-01, LOG-02.
- **Success Criteria**:
  - [ ] Feed shows scrolling entries (e.g., "Alice -> Bob (+1)").
  - [ ] Newest logs appear at the top.

## Phase 4: Persistence & History
- **Goal**: Game state saving to localStorage and historical view.
- **Requirements**: SAVE-01, SAVE-02, SAVE-03.
- **Success Criteria**:
  - [ ] Refreshing the browser doesn't lose current game scores.
  - [ ] Ended games are saved to a visible History list.

---
*Last updated: 2026-04-15*
