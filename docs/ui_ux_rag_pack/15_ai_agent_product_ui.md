# AI and Agent Product UI

AI UI must make uncertainty, progress, sources, and control visible.

## AI output states

- Idle prompt/input.
- Thinking/planning.
- Tool call running.
- Streaming response.
- Needs user input.
- Partial answer.
- Failed tool/API.
- Completed with sources.
- Completed with uncertainty.
- User correction/edit.

## Agent progress UI

Show high-level progress, not private chain-of-thought.

Good:

- `Searching docs...`
- `Reading 4 matching files...`
- `Drafting recommendations...`
- `Could not access repo; using provided context only.`

Bad:

- Silent loading for 40 seconds.
- Fake detailed reasoning.
- Endless spinner without current step.

## Trust pattern

AI-generated UI should include:

- Sources/citations where applicable.
- Confidence or limitation notes for uncertain claims.
- Ability to inspect inputs used.
- Edit/regenerate controls.
- Clear separation between user data and model suggestion.
- Undo/revert for automated changes.

## Human control

Use approval gates for:

- Sending emails/messages.
- Deleting data.
- Billing/legal/security changes.
- Publishing public content.
- Running destructive commands.

## Streaming UI

- Stream text where useful.
- Keep layout stable.
- Do not auto-scroll if the user has scrolled up.
- Provide stop/cancel.
- Show tool errors inline.
- Let user copy final answer.

## AI form filling

When AI fills fields:

- Highlight AI-filled values.
- Let user accept/reject changes.
- Explain missing data.
- Do not silently overwrite user edits.

## Edge cases

- Hallucinated UI claims: require sources.
- Tool unavailable: show degraded capability.
- Long-running agent task: show steps, job state, cancel.
- Conflicting sources: show disagreement.
- Sensitive action: require explicit confirmation.
