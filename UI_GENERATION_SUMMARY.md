# PriceSmart UI Generation Summary

This catalog documents the views and reusable UI components introduced for the PriceSmart web application.

## Views

### New Membership Registration

- **File path:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Allow staff to review and manage a new membership registration before proceeding to payment.
- **Main sections:**
  - Page header with title and "Capture Member ID" action.
  - Stepper sidebar showing "Membership data" (active) and "Payment" (upcoming).
  - Personal data card with member photo and read-only fields.
  - Contact information with warning indicator on mobile phone.
  - Address details.
  - Secondary memberships list with edit/remove actions.
  - Sticky footer with "Go back home", "Save changes", and "Payment" actions.
- **Reused components:** `Button`, `Separator` from `@/components/ui`.
- **New reusable components used:**
  - `MembershipStepper`
  - `InfoSection`
  - `SecondaryMemberCard`
- **Reference image:** `1777781281647-hz7g5mgy2b8.jpeg`

## Reusable Components

### MembershipStepper

- **File path:** `src/components/features/membership/membership-stepper.tsx`
- **Responsibility:** Vertical progress stepper for multi-step membership flows.
- **Important props:**
  - `steps: MembershipStep[]` — array of `{ id, name, description? }`.
  - `currentStep: number` — id of the active step.
- **Supported states:** completed, current, upcoming with connecting line color changes.
- **Reusability:** Use in any membership or checkout wizard by importing `MembershipStepper`.

### InfoSection

- **File path:** `src/components/features/membership/info-section.tsx`
- **Responsibility:** Display a titled group of label/value fields in a responsive grid.
- **Important props:**
  - `title?: React.ReactNode | null` — section heading; omit or pass `null` to hide.
  - `fields: InfoField[]` — array of `{ label, value }`.
  - `columns?: 1 | 2 | 3 | 4` — grid column count (default 3).
- **Supported states:** read-only display; values can be plain text or React nodes for icons/warnings.
- **Reusability:** Useful for profile summaries, order details, or any read-only data display.

### SecondaryMemberCard

- **File path:** `src/components/features/membership/secondary-member-card.tsx`
- **Responsibility:** Card for a secondary/add-on member with avatar, name, edit/remove actions, and optional warning.
- **Important props:**
  - `member: SecondaryMember` — `{ id, firstName, lastName, avatarUrl?, hasWarning?, warningMessage? }`.
  - `onEdit: (member) => void`
  - `onRemove: (memberId) => void`
- **Supported states:** default, with warning badge.
- **Reusability:** Use wherever secondary memberships, dependents, or authorized users are listed.

### MembershipCard / MembershipCardBack

- **File path:** `src/components/features/membership/membership-card.tsx`
- **Responsibility:** Digital membership card visualization with barcode-style pattern and status handling.
- **Important props:**
  - `membership: UserMembership`
  - `memberName: string`
- **Supported states:** active, expiring soon, expired, non-active overlay.
- **Reusability:** Already used on `/account/membership`; can be reused in wallet views or card preview modals.

## Component Exports

All membership feature components are exported from:

- `src/components/features/membership/index.ts`

Exports include: `MembershipCard`, `MembershipCardBack`, `MembershipStepper`, `SecondaryMemberCard`, `InfoSection`, and their respective TypeScript interfaces.
