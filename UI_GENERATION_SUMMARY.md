# UI Generation Summary

This document catalogs the views and reusable components that make up the PriceSmart application UI.

## Views

### Verify Memberships

- **File:** `src/app/(shop)/membership/verify/page.tsx`
- **Purpose:** Presents the membership verification modal over a slate background so users can send and enter verification codes for each member contact. The page uses sample member data and routes back to the membership hub after completion.
- **Main sections:**
  - Centered slate background page.
  - Reusable modal containing member list and code inputs.
- **Reused components:** `MembershipVerificationModal`, `useToast`.
- **Routing:** `/membership/verify` within the existing `(shop)` layout.

### Membership Hub

- **File:** `src/app/(shop)/membership/page.tsx`
- **Purpose:** Entry point for membership management. Provides quick actions to create a new membership or view pending processes, plus a search form to locate existing member profiles before creating a new membership.
- **Main sections:**
  - Top PriceSmart blue brand strip.
  - Two prominent action cards: "New Membership" and "Pending process".
  - Horizontal divider.
  - Search section with heading, helper text, and membership search form.
- **Reused components:** `MembershipActionCard`, `MembershipSearch`.
- **Routing:** `/membership` within the existing `(shop)` layout so the global `Header` and `Footer` are preserved.

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

### MembershipActionCard

- **File:** `src/components/features/membership/membership-action-card.tsx`
- **Responsibility:** Large clickable card that displays an icon inside a circular border and a bold label, used for primary membership actions.
- **Important props:**
  - `icon: React.ReactNode` - icon rendered inside the circular border.
  - `title: string` - label shown next to the icon.
  - `variant?: "filled" | "outlined"` - visual style (`filled` uses a light gray background, `outlined` uses a white background with a border).
  - `onClick?: () => void` - click handler.
- **Supported states:** Default, hover, focus.
- **Reusability:** Use for any hub page that needs large call-to-action tiles (e.g., services, applications, or account actions).

### MembershipVerificationModal

- **File:** `src/components/features/membership/membership-verification-modal.tsx`
- **Responsibility:** Modal dialog for verifying member contacts. Each row shows the member name (optional), contact info, a status indicator, and either a "Member verified" label or a four-digit code input with a resend action. The modal footer contains a primary "Done" button.
- **Important props:**
  - `open: boolean` - controls modal visibility.
  - `onOpenChange: (open: boolean) => void` - callback when visibility changes.
  - `members: MemberVerification[]` - list of members to verify.
  - `onComplete?: (members: MemberVerification[]) => void` - invoked when "Done" is clicked.
  - `onResendCode?: (memberId: string) => void` - invoked when a member requests a new code.
- **Supported states:** Verified member (green check + label), pending member (amber warning + 4-digit inputs), empty digit, partially/fully entered code, hover/focus on inputs.
- **Reusability:** Use anywhere membership or contact verification is required. It composes `Dialog` and `Button` and can be driven by any data source.
- **Exported types:** `MemberVerification` defines each member row with `id`, optional `name`/`avatarUrl`, `contact`, `verified`, and `code`.

### MembershipSearch

- **File:** `src/components/features/membership/membership-search.tsx`
- **Responsibility:** Self-contained search form for locating member profiles by name, phone, email, or membership number.
- **Important props:**
  - `onSearch?: (query: string) => void` - callback invoked with the trimmed query when the form is submitted.
  - `isLoading?: boolean` - disables the input and button when searching.
- **Supported states:** Empty input, typed input, loading, disabled.
- **Reusability:** Drop into any view that needs to look up members or similar searchable records. The placeholder and submit label are membership-focused but the component can be extended with configurable labels.

### MembershipCard

- **File:** `src/components/features/membership/membership-card.tsx`
- **Responsibility:** Renders a stylized membership card with member details, tier badge, barcode-like visualization, expiration status, and points.
- **Important props:**
  - `membership: UserMembership` - membership data.
  - `memberName: string` - display name of the member.
- **Supported states:** Active, expiring soon, expired, inactive status overlay.
- **Reusability:** Use on account/membership detail pages or anywhere a physical membership card needs to be represented digitally.

### MembershipCardBack

- **File:** `src/components/features/membership/membership-card.tsx`
- **Responsibility:** Renders the back of the membership card with a magnetic strip, signature panel, and terms.
- **Important props:**
  - `membership: UserMembership` - membership data.
- **Supported states:** Static back-of-card layout.
- **Reusability:** Pair with `MembershipCard` to create a flip-card or detailed card view.

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
