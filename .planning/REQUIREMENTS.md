# Requirements

## v1 Requirements

### Setup
- [ ] **SET-01**: User can input 4 player names to start a session.
- [ ] **SET-02**: Players are initialized with 0 points.
- [ ] **SET-03**: Interface layout adapts to both landscape and portrait mobile screens.

### Scoring
- [ ] **SCORE-01**: Transfer points from one player to another (A+1, B-1).
- [ ] **SCORE-02**: Real-time update of all player totals.
- [ ] **SCORE-03**: Total score across all 4 players always equals 0 (Zero-Sum check).

### Logging
- [ ] **LOG-01**: Visible transaction feed showing each point transfer history (Newest at top).
- [ ] **LOG-02**: Log entries include timestamp and players involved.

### Persistence
- [ ] **SAVE-01**: Automatic persistence of current game state to browser `localStorage`.
- [ ] **SAVE-02**: Ability to "End Game" and save totals to local history archive.
- [ ] **SAVE-03**: "History" view to see list of previous game totals by player name.

## v2 Requirements (Deferred)
- [ ] **CONF-01**: Customizable player avatars/colors.
- [ ] **EXP-01**: Export history to CSV or JSON.
- [ ] **EXP-02**: Support for 2 or 3 player modes.

## Out of Scope
- **Online Sync**: Multiplayer on separate devices is excluded.
- **Backend/Database**: All data is client-side only.

---
*Last updated: 2026-04-15 after initialization*
