---
name: gsd:add-TO-DO
description: Capture idea or task as TO-DO from current conversation context
argument-hint: [optional description]
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

<objective>
Capture an idea, task, or issue that surfaces during a GSD session as a structured TO-DO for later work.

Routes to the add-TO-DO workflow which handles:
- Directory structure creation
- Content extraction from arguments or conversation
- Area inference from file paths
- Duplicate detection and resolution
- TO-DO file creation with frontmatter
- STATE.md updates
- Git commits
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/add-TO-DO.md
</execution_context>

<context>
Arguments: $ARGUMENTS (optional TO-DO description)

State is resolved in-workflow via `init TO-DOs` and targeted reads.
</context>

<process>
**Follow the add-TO-DO workflow** from `@~/.claude/get-shit-done/workflows/add-TO-DO.md`.

The workflow handles all logic including:
1. Directory ensuring
2. Existing area checking
3. Content extraction (arguments or conversation)
4. Area inference
5. Duplicate checking
6. File creation with slug generation
7. STATE.md updates
8. Git commits
</process>
