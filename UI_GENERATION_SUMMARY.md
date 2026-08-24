# PriceSmart UI Generation Summary

This document catalogs the views and reusable UI components implemented for the PriceSmart web application.

## Views

### New Membership Registration

- **File path:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Walks a user through reviewing and editing member data before proceeding to payment for a new membership.
- **Main sections:**
  - Page header with "Capture Member ID" action.
  - Vertical stepper showing "Membership data" (active) and "Payment".
  - `MembershipRegistrationForm` wrapped in a card for editable/readonly member details.
  - Action bar with "Go back home", "Save changes", and "Payment".
- **Reused components:** `Button`, `MembershipRegistrationForm`.
- **New reusable components:** `MembershipRegistrationForm`, `SecondaryMembershipCard`.

## Reusable Components

### MembershipRegistrationForm

- **File path:** `src/components/features/membership/membership-registration-form.tsx`
- **Responsibility:** Renders the full new-membership review/edit form organized into Personal data, Contact, Address, and Secondary memberships.
- **Important props:**
  - `initialData: MembershipRegistrationData` — populated member data.
  - `onSave?: (data) => void` — triggered by "Save changes".
  - `onPayment?: (data) => void` — triggered by "Payment".
  - `onGoHome?: () => void` — triggered by "Go back home".
  - `onCaptureMemberId?: () => void` — optional hook for capture action.
- **Supported states:** Read-only display of personal data, editable contact/address inputs, add/edit email inline, remove secondary members.
- **How to reuse:** Import into any membership creation or review flow and pass pre-filled member data.

### SecondaryMembershipCard

- **File path:** `src/components/features/membership/secondary-membership-card.tsx`
- **Responsibility:** Compact card for an additional household member with avatar, name, Edit/Remove actions, and an optional warning indicator.
- **Important props:**
  - `id`, `firstName`, `lastName`, `avatarUrl`
  - `hasWarning?: boolean`, `warningMessage?: string`
  - `onEdit?: (id) => void`, `onRemove?: (id) => void`
- **Supported states:** Default display, warning state, missing avatar fallback.
- **How to reuse:** Use in any view listing supplementary membership cards or household members.

### MembershipCard / MembershipCardBack

- **File path:** `src/components/features/membership/membership-card.tsx`
- **Responsibility:** Visual digital membership card and its back side for the account membership page.
- **How reused here:** Exported alongside new membership components from `src/components/features/membership/index.ts`; reused by the existing account membership page.

## Component Index Updates

- `src/components/features/membership/index.ts` exports:
  - `MembershipCard`
  - `MembershipCardBack`
  - `MembershipRegistrationForm`
  - `SecondaryMembershipCard`

## Design Notes

- Color palette follows existing PriceSmart tokens (`--ps-blue`, `--ps-blue-dark`, `--ps-amber`).
- Uses existing `Button`, `Input`, `Label`, and `Separator` UI primitives.
- Layout built with Tailwind CSS utility classes and the existing `container`/`max-w-6xl` page width convention.
