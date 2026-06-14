# Empty, Error, and Success States

States are product moments. They teach the user how the system works.

## Empty states

Types:

1. First-use empty: user has not created anything.
2. Cleared empty: user completed or removed everything.
3. Filtered empty: filters/search returned no results.
4. Permission empty: user cannot view data.
5. Error empty: data cannot load.

Empty state formula:

- What happened.
- Why it happened if useful.
- What to do next.
- Primary action or recovery path.

Example:

```txt
No release notes yet
Tag completed tasks or add a manual note to build your first release note.
[Create release note]
```

## Error states

Good errors:

- Say what went wrong.
- Say how to fix it.
- Keep user input safe.
- Point to the exact location.
- Avoid blame.
- Include retry/contact/debug details only when useful.

Bad: `Something went wrong`.
Better: `We couldn't save the task because the connection dropped. Your changes are still here. Try again.`

## Error placement

- Field error: next to the field.
- Form error: summary at top + field-level messages.
- Page data error: inline in content area.
- Global outage: banner.
- Dangerous failed mutation: persistent alert, not disappearing toast only.

## Success feedback

Success should be proportional.

- Tiny action: inline state change.
- Background action: toast/status.
- Major completion: confirmation page/summary.
- Reversible action: toast with undo.

Avoid success modals unless the confirmation is truly important.

## Undo vs confirm

Prefer undo when:

- Action is reversible.
- Accidental action is likely.
- Confirmation would slow frequent workflow.

Use confirm when:

- Destructive action is irreversible.
- Financial/legal/security impact.
- Bulk destructive action.

## Edge cases

- Error repeats after retry: change copy to acknowledge repeated failure.
- User has unsaved data: never discard silently.
- Timeout: distinguish server still processing vs request failed.
- Empty due to filters: show clear filters action.
- Permission: explain who can grant access if appropriate.
