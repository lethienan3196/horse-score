---
name: gsd:check-TO-DOs
description: List pending TO-DOs and select one to work on
argument-hint: [area filter]
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

<objective>
List all pending TO-DOs, allow selection, load full context for the selected TO-DO, and route to appropriate action.

Routes to the check-TO-DOs workflow which handles:
- TO-DO counting and listing with area filtering
- Interactive selection with full context loading
- Roadmap correlation checking
- Action routing (work now, add to phase, brainstorm, create phase)
- STATE.md updates and git commits
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/check-TO-DOs.md
</execution_context>

<context>
Arguments: $ARGUMENTS (optional area filter)

TO-DO state and roadmap correlation are loaded in-workflow using `init TO-DOs` and targeted reads.
</context>

<process>
**Follow the check-TO-DOs workflow** from `@~/.claude/get-shit-done/workflows/check-TO-DOs.md`.

The workflow handles all logic including:
1. TO-DO existence checking
2. Area filtering
3. Interactive listing and selection
4. Full context loading with file summaries
5. Roadmap correlation checking
6. Action offering and execution
7. STATE.md updates
8. Git commits
</process>
