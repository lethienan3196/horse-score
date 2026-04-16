# Horse Score Tracker

A mobile-optimized web application for 4 players to record and track scores in real-time. The game operates on a zero-sum mechanic where points are transferred directly between players, with every transaction logged and persisted locally.

## Context
- **Core Value**: Providing a fast, reliable, and transparent way to track competitive scores where one player's gain is another's loss.
- **Target Users**: Competitive groups of 4 players needing a shared, visible "source of truth" during games.
- **Tech Strategy**: React (TypeScript) SPA with Vanilla CSS for high performance and "app-like" mobile feel. Data is persisted using browser `localStorage`.

## Requirements

### Validated
(None yet — initialization phase)

### Active
- [ ] **Player Setup**: Interface to enter 4 unique player names before starting a game.
- [ ] **Zero-Sum Scoring**: Buttons to transfer points from Player A to Player B (A+1, B-1).
- [ ] **Transaction Feed**: A real-time, visible scrolling log of all score transfers (e.g., "Alice -1 to Bob").
- [ ] **Real-time Totals**: Dashboard showing current total score for each player at all times.
- [ ] **Game Persistence**: Save the final state of each game to local history.
- [ ] **History View**: Ability to review previous game totals.
- [ ] **Real-time Multiplayer**: Synchronize scores across multiple devices using WebSockets.

### Out of Scope
- **Flexible Player Count**: Hard-coded for exactly 4 players.

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React SPA | High interactivity needed for real-time logs and scores. | — Pending |
| Local Storage | Requirement for "no backend" while maintaining history. | — Pending |
| Zero-Sum Logic | Specific game mechanic: points are traded, not generated. | — Pending |

## Evolution
This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-04-15 after initialization*
