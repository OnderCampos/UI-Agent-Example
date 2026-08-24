# UI Generation Summary

## Application Overview

PriceSmart membership registration flow. A new page allows staff/customers to review and edit a pending membership application before proceeding to payment.

## Views

### New Membership Data Page

- **File path:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Display and edit a new membership application. Includes personal data, contact details, address, and secondary memberships, plus navigation to payment.
- **Main sections:**
  - Page header with title and "Capture Member ID" action
  - Vertical stepper showing "Membership data" (active) and "Payment"
  - Personal data: avatar with "Change picture" link, ID type, ID number, membership type, abbreviation, first/last name, gender, date of birth, occupation
  - Contact: email, mobile phone, home phone, notifications
  - Address: street address, country, state, city
  - Secondary memberships: cards with avatar, name, edit/remove actions, and issue indicator
  - Sticky bottom action bar with "Go back home", "Edit/Save changes", and "Payment"
- **Components used:**
  - `Button` (shadcn/ui)
  - `Input` (shadcn/ui)
  - `Label` (shadcn/ui)
  - `Separator` (shadcn/ui)
  - `AnimatedIcon` (`src/components/ui/animated-icon.tsx`)
  - `ReadOnlyField`, `EditableField`, `SectionTitle`, `Stepper`, `SecondaryMemberCard` (local to the page)
- **Reference image filename:** `1777781281647-hz7g5mgy2b8.jpeg`

## Reusable Components

### shadcn/ui Components (existing)

- **Button** — `src/components/ui/button.tsx`
  - Used for primary actions, outline actions, and navigation.
- **Input** — `src/components/ui/input.tsx`
  - Used for editable form fields.
- **Label** — `src/components/ui/label.tsx`
  - Used for field labels.
- **Separator** — `src/components/ui/separator.tsx`
  - Used to divide sections visually.

### AnimatedIcon (existing)

- **File path:** `src/components/ui/animated-icon.tsx`
  - Used for section icons with no continuous animation.
  - Future views can import it for consistent animated iconography.

## New Reusable Patterns Introduced in This View

### ReadOnlyField

- **Responsibility:** Display a non-editable label/value pair matching the reference layout.
- **Props:** `label: string`, `value: string`
- **Supported states:** Static read-only.

### EditableField

- **Responsibility:** Display a labeled text input for edit mode.
- **Props:** `label: string`, `value: string`, `name: string`, `required?: boolean`, `onChange: (value: string) => void`
- **Supported states:** Editing, optional/required label markers.

### SectionTitle

- **Responsibility:** Render a section heading with an icon, consistent with the reference design.
- **Props:** `icon: LucideIcon`, `children: React.ReactNode`
- **Supported states:** Static.

### Stepper

- **Responsibility:** Vertical step indicator for multi-step flows.
- **Props:** `steps: { id: number; label: string }[]`, `currentStep: number`
- **Supported states:** Active, completed, pending steps.

### SecondaryMemberCard

- **Responsibility:** Display a secondary membership holder with actions and optional issue indicator.
- **Props:** `member: SecondaryMember`, `onEdit: (id: string) => void`, `onRemove: (id: string) => void`
- **Supported states:** Default, with issue alert.

## How to Reuse

- Import `Stepper` for other multi-step flows (checkout, onboarding, etc.).
- Use `SectionTitle` for consistent section headings across account and registration pages.
- Use `ReadOnlyField` and `EditableField` for review-and-edit patterns.
- Use `SecondaryMemberCard` whenever listing additional membership holders.
