# PriceSmart UI Generation Summary

This document catalogs the views and reusable components that make up the PriceSmart web application UI.

---

## Views

### New Membership Registration

- **File:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Allows store staff to review and complete a new membership registration before proceeding to payment. Displays personal data, contact information, address, and secondary memberships.
- **Main sections:**
  - Top location/language bar and PriceSmart brand header.
  - Page title with a "Capture Member ID" action.
  - Vertical step indicator (Membership data → Payment).
  - Personal data section with member photo and read-only fields.
  - Contact section with email, phone numbers, and notification preference.
  - Address section with address, country, state, and city.
  - Secondary memberships section with editable/removable member cards.
  - Sticky footer with "Go back home", "Save changes", and "Payment" actions.
- **Components used:**
  - `NewMemberRegistration` (feature component)
  - `RegistrationSteps`
  - `SectionHeader`
  - `ReadOnlyField`
  - `SecondaryMemberCard`
  - `Button` (shadcn/ui)
  - `Card`, `CardContent` (shadcn/ui)

---

## Reusable Components

### NewMemberRegistration

- **File:** `src/components/features/membership/member-registration.tsx`
- **Responsibility:** Composes the entire new membership review page. Manages local state for the registration object and renders all sections, the step indicator, header, and footer actions.
- **Important props:**
  - `initialData?: Partial<NewMemberRegistrationData>` — overrides any default data.
  - `onSaveChanges?: (data) => void | Promise<void>` — called when "Save changes" is clicked.
  - `onPayment?: (data) => void` — called when the "Payment" primary action is clicked.
  - `onGoHome?: () => void` — attached to the "Go back home" button.
  - `onCaptureMemberId?: () => void` — attached to the "Capture Member ID" button.
  - `onEditSecondary?: (member) => void` — called when a secondary member's "Edit" link is clicked.
  - `onRemoveSecondary?: (memberId) => void` — called when a secondary member's "Remove" link is clicked.
- **Supported states:**
  - Default populated state with sample member data.
  - Custom initial data override.
  - Secondary member removal updates local state immediately.
- **How to reuse:** Import into any route or modal that needs to review a new membership. Provide `initialData` from an API response and wire `onSaveChanges` / `onPayment` to the appropriate service calls.

### RegistrationSteps

- **File:** `src/components/features/membership/member-registration.tsx`
- **Responsibility:** Renders a vertical numbered step indicator with connecting lines.
- **Important props:**
  - `steps: { label: string; number: number }[]`
  - `currentStep: number`
- **Supported states:** Active step (filled navy), completed steps (filled navy), future steps (gray outline).
- **How to reuse:** Use in any multi-step form or checkout flow by supplying the step list and active step index.

### SectionHeader

- **File:** `src/components/features/membership/member-registration.tsx`
- **Responsibility:** Consistent section heading with an icon and title.
- **Important props:**
  - `icon: React.ElementType`
  - `title: string`
- **How to reuse:** Drop into any form or detail view that groups content into titled sections.

### ReadOnlyField

- **File:** `src/components/features/membership/member-registration.tsx`
- **Responsibility:** Displays a label/value pair for read-only review screens.
- **Important props:**
  - `label: string`
  - `value: React.ReactNode`
- **How to reuse:** Use in account pages, order summaries, or confirmation screens to show non-editable data.

### SecondaryMemberCard

- **File:** `src/components/features/membership/member-registration.tsx`
- **Responsibility:** Displays a secondary member with avatar, name, Edit/Remove actions, and an optional issue indicator.
- **Important props:**
  - `member: SecondaryMember`
  - `onEdit?: (member) => void`
  - `onRemove?: (memberId) => void`
- **Supported states:**
  - With or without photo (falls back to initials).
  - With or without issue indicator.
- **How to reuse:** Use in any membership management view that lists dependent or secondary members.

### MembershipCard / MembershipCardBack

- **File:** `src/components/features/membership/membership-card.tsx`
- **Responsibility:** Visual digital membership card with barcode effect, member details, and a flip side with terms.
- **Important props:**
  - `membership: UserMembership`
  - `memberName: string`
- **How to reuse:** Already used in the account membership page. Can be reused in mobile wallet views, in-store kiosks, or member verification modals.

### Button

- **File:** `src/components/ui/button.tsx`
- **Responsibility:** Base button component with shadcn/ui variants.
- **How to reuse:** Used across all pages for actions and links.

### Card / CardContent

- **File:** `src/components/ui/card.tsx`
- **Responsibility:** Container primitives for grouped content.
- **How to reuse:** Used for secondary member cards and can be reused for any card-based layout.

---

## Shared Styles

- PriceSmart color tokens are defined in `src/app/globals.css` using CSS custom properties.
- Tailwind configuration in `tailwind.config.ts` maps shadcn/ui variables to the PriceSmart blue/amber palette.
- The new membership view uses the existing navy/blue/amber color scale and `container` padding for consistent layout.
