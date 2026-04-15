# Phase 2: Core Scoring & Real-time Totals - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-16
**Phase:** 2-Core Scoring & Real-time Totals
**Areas discussed:** Transfer Interaction, Zero-Sum Strategy, Dashboard Feedback, Total Sum Logic

---

## Transfer Interaction

| Option | Description | Selected |
|--------|-------------|----------|
| Two-Click Giver/Receiver | Click Giver then Receiver to initiate | ✓ |
| Direct Buttons (+/-) | Each card has direct +/- buttons | |
| Menu-Based Transfer | Long-press for menu | |

**User's choice:** Two-Click Giver/Receiver
**Notes:** Better for high-speed scoring by just tapping the two people involved.

---

## Zero-Sum Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Fixed +/- 1 Point | Only allow 1 point transfers | |
| Custom Transfer Amount | Allow custom points to be entered | ✓ |

**User's choice:** Custom Transfer Amount
**Notes:** Flexibility for multi-point transfers in a single action.

---

## Dashboard Feedback

| Option | Description | Selected |
|--------|-------------|----------|
| Color States | Red tint for Giver, Green for Receiver | ✓ |
| Score Animation Only | Animated numbers | |
| Static Instant Update | Simple number change | |

**User's choice:** Color States
**Notes:** Clearly indicates who is selected during the multi-step interaction.

---

## Total Sum Logic

| Option | Description | Selected |
|--------|-------------|----------|
| Strict 0-Sum | Sum of scores always = 0 | ✓ |
| Permissive | Allow non-zero sums | |

**User's choice:** Strict 0-Sum
**Notes:** Fundamental game mechanic of Horse Score.

---

## Claude's Discretion
- Modal/Input UI for custom amount.
- Animation timing for transitions between selection states.

## Deferred Ideas
- None.
