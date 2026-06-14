# Forms, Inputs, and Validation

Forms are conversations. Ask only what is needed, in the right order, with clear recovery.

## Form structure

- Group related fields.
- Put labels above inputs for scanability.
- Keep helper text near the field.
- Mark optional fields rather than marking every required field.
- Put submit button at the end of the form or sticky for long forms.
- Preserve entered values on error.

## Validation timing

| Field type | Validate when |
|---|---|
| Required text | On blur or submit, not before typing |
| Email/URL | On blur and submit |
| Password strength | While typing, but do not block too early |
| Confirm password | After both fields have values |
| Expensive server validation | Debounced after input pause or on blur |
| Coupon/code | Explicit Apply button or debounced with status |

## Inline validation

Good inline validation:

- Does not shout while user is typing.
- Removes error once fixed.
- Shows positive validation only when helpful.
- Explains exact issue.

Bad:

- Red error after first character.
- Generic `Invalid input`.
- Error disappears only after submit.

## Input selection

- Text input: free text.
- Textarea: multi-line content.
- Select: limited known options.
- Combobox: many options + search.
- Radio: few mutually exclusive options.
- Checkbox: independent yes/no.
- Switch: immediate setting toggle.
- Slider: approximate value, not precise value.

## Submit behavior

- Disable submit only when required fields are obviously incomplete, but avoid leaving users stuck without explanation.
- On submit, show loading state on button.
- Prevent double-submit.
- Keep focus management correct after error.
- Move focus to error summary for long forms.

## Edge cases

- Autofill can change values without keypress.
- Browser password managers may overlay UI.
- Mobile keyboards need correct input types.
- International addresses and names vary heavily.
- Phone numbers and dates are locale-sensitive.
- File upload needs progress, size/type validation, retry.
