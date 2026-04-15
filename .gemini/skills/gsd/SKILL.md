---
name: gsd
description: Meta-prompting, context engineering and spec-driven development system. Use when starting a new project, mapping an existing codebase, planning development phases, or following a rigorous spec-driven workflow to prevent context rot.
---

# Get Shit Done (GSD)

## Overview
GSD is a light-weight and powerful meta-prompting, context engineering and spec-driven development system. It helps maintain project alignment and high code quality through structured planning in the `.planning/` directory.

## Core Workflow
GSD operates through a structured lifecycle of mapping, planning, and execution.

### 1. Mapping & Initialization
- **Map Codebase**: For existing projects, use `/gsd-map-codebase` to index the current state.
- **New Project**: Initialize a GSD project with `/gsd-new-project`. This creates the `.planning/` structure.

### 2. Planning
- **New Milestone**: Break down the project into milestones using `/gsd-new-milestone`.
- **Plan Phase**: Detail the tasks for a specific phase with `/gsd-plan-phase`.

### 3. Execution & Verification
- **Execute Phase**: Implement the planned tasks using `/gsd-execute-phase`.
- **Verify Work**: Ensure the implementation meets the specs with `/gsd-verify-work`.

## Command Reference
When a GSD command is requested (e.g., "gsd map codebase" or "/gsd-map-codebase"), locate the corresponding instruction file in `references/commands/` and follow its `<process>` and `<success_criteria>`.

| Command | Description |
|---------|-------------|
| `map-codebase` | Analyze codebase to produce `.planning/codebase/` docs. |
| `new-project` | Initialize a fresh GSD project structure. |
| `plan-phase` | Create a detailed plan for a specific phase. |
| `execute-phase` | Perform the actual coding/implementation. |
| `verify-work` | Validate the implementation against requirements. |
| `graphify` | Build a knowledge graph of the project state. |

## Specialized Agents
GSD uses specialized agents for different tasks. Read the corresponding agent file in `references/agents/` to adopt the specific persona and instructions.

- **gsd-planner**: Responsible for high-level project and milestone planning.
- **gsd-executor**: Handles the technical implementation of tasks.
- **gsd-verifier**: Critically evaluates work against the original specs.
- **gsd-debugger**: Specialized in deep-dive bug hunting and fixing.

## Using GSD Resources
- **Commands**: Found in `references/commands/*.md`. These provide the "how-to" for specific GSD actions.
- **Agents**: Found in `references/agents/*.md`. These provide the "who" for specific tasks.

Always refer to the `.planning/STATE.md` file (if it exists) to maintain context across sessions.
