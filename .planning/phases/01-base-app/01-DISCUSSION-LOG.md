# Phase 1: Base Application & Player Setup - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-15
**Phase:** 1-Base Application & Player Setup
**Areas discussed:** Player Entry UX, Layout Choice, Theme Style, Validation

---

## Player Entry UX

| Option | Description | Selected |
|--------|-------------|----------|
| Independent Boxes | 4 independent boxes on a single setup screen | ✓ |
| Sequential Steps | One-by-one, 4 sequential screens for each player | |
| List View | Just 4 simple text inputs in a list format | |

**User's choice:** Independent Boxes
**Notes:** Preferred for fast entry on a single screen.

---

## Layout Choice

| Option | Description | Selected |
|--------|-------------|----------|
| 2x2 Grid | 2 columns, 2 rows for the 4 players | ✓ |
| Vertical List | Standard vertical list of players (4 rows) | |
| Dynamic Adaptive | List on mobile, grid on desktop/landscape | |

**User's choice:** 2x2 Grid
**Notes:** Better utilization of screen space on mobile.

---

## Theme Style

| Option | Description | Selected |
|--------|-------------|----------|
| Horse/Earthy Theme | Earthy browns, deep greens, stable aesthetic | ✓ |
| Neutral Minimalist | Minimalist neutral (Dark/Light mode support) | |
| High Contrast | Vibrant & High-contrast for visibility | |

**User's choice:** Horse/Earthy Theme
**Notes:** To match the name "Horse Score Tracker".

---

## Validation

| Option | Description | Selected |
|--------|-------------|----------|
| Strict Validation | Prevent "Start" if names are empty or duplicate | ✓ |
| Permissive/Auto-fill | Allow empty names or duplicates | |

**User's choice:** Strict Validation
**Notes:** Ensures clean and accurate game starts.

---

## Claude's Discretion
- Choice of specific color codes (within Earthy palette).
- CSS architecture (Flexbox vs Grid implementation details).

## Deferred Ideas
- None.
