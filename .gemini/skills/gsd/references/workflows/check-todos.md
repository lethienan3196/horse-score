<purpose>
List all pending TO-DOs, allow selection, load full context for the selected TO-DO, and route to appropriate action.
</purpose>

<required_reading>
Read all files referenced by the invoking prompt's execution_context before starting.
</required_reading>

<process>

<step name="init_context">
Load TO-DO context:

```bash
INIT=$(node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" init TO-DOs)
if [[ "$INIT" == @file:* ]]; then INIT=$(cat "${INIT#@file:}"); fi
```

Extract from init JSON: `TO-DO_count`, `TO-DOs`, `pending_dir`.

If `TO-DO_count` is 0:
```
No pending TO-DOs.

TO-DOs are captured during work sessions with /gsd-add-TO-DO.

---

Would you like to:

1. Continue with current phase (/gsd-progress)
2. Add a TO-DO now (/gsd-add-TO-DO)
```

Exit.
</step>

<step name="parse_filter">
Check for area filter in arguments:
- `/gsd-check-TO-DOs` → show all
- `/gsd-check-TO-DOs api` → filter to area:api only
</step>

<step name="list_TO-DOs">
Use the `TO-DOs` array from init context (already filtered by area if specified).

Parse and display as numbered list:

```
Pending TO-DOs:

1. Add auth token refresh (api, 2d ago)
2. Fix modal z-index issue (ui, 1d ago)
3. Refactor database connection pool (database, 5h ago)

---

Reply with a number to view details, or:
- `/gsd-check-TO-DOs [area]` to filter by area
- `q` to exit
```

Format age as relative time from created timestamp.
</step>

<step name="handle_selection">
Wait for user to reply with a number.

If valid: load selected TO-DO, proceed.
If invalid: "Invalid selection. Reply with a number (1-[N]) or `q` to exit."
</step>

<step name="load_context">
Read the TO-DO file completely. Display:

```
## [title]

**Area:** [area]
**Created:** [date] ([relative time] ago)
**Files:** [list or "None"]

### Problem
[problem section content]

### Solution
[solution section content]
```

If `files` field has entries, read and briefly summarize each.
</step>

<step name="check_roadmap">
Check for roadmap (can use init progress or directly check file existence):

If `.planning/ROADMAP.md` exists:
1. Check if TO-DO's area matches an upcoming phase
2. Check if TO-DO's files overlap with a phase's scope
3. Note any match for action options
</step>

<step name="offer_actions">
**If TO-DO maps to a roadmap phase:**


**Text mode (`workflow.text_mode: true` in config or `--text` flag):** Set `TEXT_MODE=true` if `--text` is present in `$ARGUMENTS` OR `text_mode` from init JSON is `true`. When TEXT_MODE is active, replace every `AskUserQuestion` call with a plain-text numbered list and ask the user to type their choice number. This is required for non-Claude runtimes (OpenAI Codex, Gemini CLI, etc.) where `AskUserQuestion` is not available.
Use AskUserQuestion:
- header: "Action"
- question: "This TO-DO relates to Phase [N]: [name]. What would you like to do?"
- options:
  - "Work on it now" — move to done, start working
  - "Add to phase plan" — include when planning Phase [N]
  - "Brainstorm approach" — think through before deciding
  - "Put it back" — return to list

**If no roadmap match:**

Use AskUserQuestion:
- header: "Action"
- question: "What would you like to do with this TO-DO?"
- options:
  - "Work on it now" — move to done, start working
  - "Create a phase" — /gsd-add-phase with this scope
  - "Brainstorm approach" — think through before deciding
  - "Put it back" — return to list
</step>

<step name="execute_action">
**Work on it now:**
```bash
mv ".planning/TO-DOs/pending/[filename]" ".planning/TO-DOs/completed/"
```
Update STATE.md TO-DO count. Present problem/solution context. Begin work or ask how to proceed.

**Add to phase plan:**
Note TO-DO reference in phase planning notes. Keep in pending. Return to list or exit.

**Create a phase:**
Display: `/gsd-add-phase [description from TO-DO]`
Keep in pending. User runs command in fresh context.

**Brainstorm approach:**
Keep in pending. Start discussion about problem and approaches.

**Put it back:**
Return to list_TO-DOs step.
</step>

<step name="update_state">
After any action that changes TO-DO count:

Re-run `init TO-DOs` to get updated count, then update STATE.md "### Pending TO-DOs" section if exists.
</step>

<step name="git_commit">
If TO-DO was moved to done/, commit the change:

```bash
git rm --cached .planning/TO-DOs/pending/[filename] 2>/dev/null || true
node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" commit "docs: start work on TO-DO - [title]" --files .planning/TO-DOs/completed/[filename] .planning/STATE.md
```

Tool respects `commit_docs` config and gitignore automatically.

Confirm: "Committed: docs: start work on TO-DO - [title]"
</step>

</process>

<success_criteria>
- [ ] All pending TO-DOs listed with title, area, age
- [ ] Area filter applied if specified
- [ ] Selected TO-DO's full context loaded
- [ ] Roadmap context checked for phase match
- [ ] Appropriate actions offered
- [ ] Selected action executed
- [ ] STATE.md updated if TO-DO count changed
- [ ] Changes committed to git (if TO-DO moved to done/)
</success_criteria>
