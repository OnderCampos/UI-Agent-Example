# UI Generation Summary

This document catalogs the views and reusable components that make up the PriceSmart application UI.

## Views

### New Membership Registration

- **File:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Allows a user to review a new membership application before proceeding to payment. The page presents captured personal data, contact details, address, and secondary memberships in a read-only summary with editing/removal actions and primary navigation.
- **Main sections:**
  - Page header with title and "Capture Member ID" action.
  - Stepper sidebar showing "Membership data" (active) and "Payment".
  - Personal data summary with member photo and identification fields.
  - Contact information including email, phone numbers, and notification preference.
  - Address details.
  - Secondary membership cards with edit/remove actions.
  - Sticky bottom action bar with "Go back home", "Save changes", and "Payment" buttons.
- **Reused components:** `Button`, `useToast`.
- **New reusable components:** `MembershipRegistrationSummary`, `InfoSection`, `ReadOnlyField`, `SecondaryMembershipCard`.
- **Routing:** `/membership/new` within the existing `(shop)` layout so the global `Header` and `Footer` are preserved.

## Reusable Components

### MembershipRegistrationSummary

- **File:** `src/components/features/membership-registration/membership-registration-summary.tsx`
- **Responsibility:** Renders a complete read-only summary of a new membership registration grouped into sections: personal data, contact, address, and secondary memberships.
- **Important props:**
  - `data: MembershipRegistrationData` - all captured member information.
  - `secondaryMembers: SecondaryMember[]` - list of attached secondary members.
  - `onEditSecondary?: (id: string) => void` - callback when a secondary member is edited.
  - `onRemoveSecondary?: (id: string) => void` - callback when a secondary member is removed.
- **Supported states:** Static review state; callbacks drive edit/remove behavior.
- **Reusability:** Drop into any view that needs to display a membership registration summary. Combine with the sticky action bar pattern from `NewMembershipPage` for a complete review screen.

### InfoSection

- **File:** `src/components/features/membership-registration/info-section.tsx`
- **Responsibility:** A layout primitive for grouping labeled content under an icon + heading with a bottom border.
- **Important props:**
  - `title: React.ReactNode` - section heading.
  - `icon?: React.ReactNode` - decorative icon rendered in PriceSmart blue.
- **Supported states:** Default layout only.
- **Reusability:** Use in any form summary, detail page, or settings view to separate content into clear sections.

### ReadOnlyField

- **File:** `src/components/features/membership-registration/read-only-field.tsx`
- **Responsibility:** Displays a label and a read-only value, optionally marking the field as required.
- **Important props:**
  - `label: string`
  - `value: React.ReactNode`
  - `required?: boolean`
- **Supported states:** Default, required indicator.
- **Reusability:** Useful for any summary/detail view where values are shown but not edited inline.

### SecondaryMembershipCard

- **File:** `src/components/features/membership-registration/secondary-membership-card.tsx`
- **Responsibility:** Card showing a secondary member's photo, name, edit/remove links, and an optional warning indicator.
- **Important props:**
  - `member: SecondaryMember`
  - `onEdit?: (id: string) => void`
  - `onRemove?: (id: string) => void`
- **Supported states:** Default, warning state.
- **Reusability:** Can be reused in account management, membership detail, or family-sharing flows.

## Shared Types

- **File:** `src/components/features/membership-registration/types.ts`
- Exports `MembershipRegistrationData` and `SecondaryMember` used by the summary components.
