# Loading, Latency, and Optimistic UI

Loading design must answer: is it working, what is happening, how long will it take, and can the user continue?

## Wait-time pattern

| Expected wait | Pattern |
|---|---|
| < 300ms | No indicator; update instantly |
| 300ms-1s | Subtle local busy state only if needed |
| 1-3s | Skeleton for layout/content, small spinner for small controls |
| 3-10s | Determinate progress if possible, status text if not |
| 10s+ | Progress, background processing, cancel option, notification, partial results |

## Skeletons

Use skeletons when layout is predictable and content is loading.

Good skeleton:

- Matches final layout.
- Uses calm motion or no motion.
- Does not fake exact data.
- Does not block already-loaded content.

Bad skeleton:

- Full-page shimmering for tiny requests.
- Skeleton that jumps when content arrives.
- Skeleton for unknown/error states where an explanatory message is better.

## Spinners

Use spinners for small localized unknown waits, such as loading a dropdown option list.

Avoid full-page spinner unless the app cannot render any meaningful shell.

## Optimistic UI

Use optimistic UI when:

- Success probability is high.
- The action is reversible or easy to reconcile.
- Latency hurts flow.

Examples: like/star, checkbox, drag reorder, marking task complete, local note edit.

Avoid optimistic UI when:

- Money, legal, irreversible, security, permission, or destructive action.
- Server may transform the result significantly.
- Conflicts are common.

## Optimistic update algorithm

1. Save current local state.
2. Apply predicted state immediately.
3. Show pending marker if meaningful.
4. Send mutation with idempotency key/client mutation id.
5. On success: reconcile with server response.
6. On failure: rollback or show conflict recovery.
7. Log failure for debugging.

## Background sync

For long tasks:

- Start job.
- Return job ID.
- Show progress/status.
- Allow navigation away.
- Notify when done.
- Provide retry/cancel where safe.

## Partial rendering

Load shell first, then critical content, then secondary widgets.

Priority:

1. Navigation/app shell.
2. Page title/context.
3. Primary content.
4. Critical actions.
5. Secondary panels/widgets.
6. Nice-to-have metadata.

## Edge cases

- Offline: queue action if safe; mark unsynced.
- Duplicate submit: disable submit or use idempotency.
- Slow API: show clear status, not fake progress.
- Stale data: show last updated time and refresh state.
- Permission fail after optimistic action: rollback with explanation.
