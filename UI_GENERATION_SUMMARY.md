# UI Generation Summary

This catalog documents the views and reusable components that make up the PriceSmart web application UI.

## Views

### Membership Search

- **File:** `src/app/(shop)/membership/page.tsx`
- **Purpose:** Landing page for membership management where staff can start a new membership registration, view pending membership processes, or search for an existing member profile before creating a new membership.
- **Sections:**
  1. Top action bar with the PriceSmart logo on the left and location, country, and language selectors on the right.
  2. Two large action cards: "New Membership" and "Pending process".
  3. Horizontal divider.
  4. Search form with a centered heading, helper text, a large search input, and a submit button.
- **Reused components:** `Button`, `Input` from `@/components/ui`, `AnimatedIcon` from `@/components/ui/animated-icon`, `MembershipActionCard` from `@/components/features/membership`.
- **New reusable components introduced in this view:** none (all new UI elements are covered by the shared `MembershipActionCard` component below).
- **Important props / state:**
  - `query`: controlled value of the search input.
  - `isSearching`: toggles the submit button loading state.
  - `handleSearch`: validates non-empty queries and simulates an async membership lookup.
- **Future reuse:** The search form layout and action-card pattern can be reused for other staff-facing lookups by importing `MembershipActionCard`.

### New Membership Registration

- **File:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Allows a user to review and complete a new PriceSmart membership registration before proceeding to payment.
- **Sections:**
  1. Top status bar with store location, country, and language selectors.
  2. Page header with title "New membership" and a "Capture Member ID" action.
  3. Vertical stepper sidebar (Membership data → Payment).
  4. Personal data section with member photo, "Change picture" link, and read-only identity fields.
  5. Contact section with email, mobile phone, home phone, and notification preference.
  6. Address section with street address, country, state, and city.
  7. Secondary memberships section listing additional household members with edit/remove actions.
  8. Bottom action bar with "Go back home", "Save changes", and "Payment" buttons.
- **Reused components:** `Button`, `Separator` from `@/components/ui`, Lucide icons.
- **New reusable components introduced in this view:**
  - `FieldGroup` (local): labeled read-only value with optional required marker and warning icon.
  - `SectionTitle` (local): section heading with an icon and PriceSmart blue text.
  - `SecondaryMemberCard` (local): compact card for a secondary member with photo, name, edit/remove links, and a warning indicator.
- **Important props / state:**
  - `secondaryMembers`: local mocked list of secondary household members.
  - `onEdit` / `onRemove` handlers on secondary member cards (currently log to console).
- **Future reuse:** The local helper components can be promoted to `src/components/features/membership` if additional membership forms need the same read-only review pattern or secondary-member listing.

### Verify Memberships

- **File:** `src/app/(shop)/membership/verify/page.tsx`
- **Purpose:** Presents the membership verification modal where staff send codes to each member's registered contact and enter the returned verification codes.
- **Sections:**
  1. Modal header with a user-add icon, title "Verify memberships", description, and close action.
  2. Scrollable list of members showing avatar, name, contact, status indicator, and either a verified badge or a 4-digit code entry field.
  3. Bottom action bar with a full-width "Done" button.
- **Reused components:** `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogClose` from `@/components/ui/dialog`; `Button` from `@/components/ui/button`; `Input` from `@/components/ui/input`; Lucide icons.
- **New reusable components introduced in this view:**
  - `VerifyMembershipsDialog` (shared): the complete verification modal.
  - `VerificationCodeInput` (internal): a 4-slot numeric code input with keyboard navigation and paste support.
  - `VerifyMemberRow` (internal): renders a single member row with status and code entry.
- **Important props / state:**
  - `open` / `onOpenChange`: controls modal visibility.
  - `members`: list of `VerificationMember` objects with `id`, optional `photoUrl`, `fullName`, `contact`, and `status` (`pending` | `sent` | `verified`).
  - `onDone`: callback invoked when the "Done" button is clicked.
  - `codes`: internal controlled state mapping member IDs to entered code strings.
- **Future reuse:** Import `VerifyMembershipsDialog` from `@/components/features/membership` into any staff or account flow that needs to verify multiple members by contact code; the dialog can be controlled from a parent page or another modal.

## Reusable Components

### Shadcn UI Components (existing)

- `Button` (`src/components/ui/button.tsx`) — primary action and outline variants used throughout the application.
- `Input` (`src/components/ui/input.tsx`) — form text input used in the membership search form and verification code slots.
- `Separator` (`src/components/ui/separator.tsx`) — used to visually divide form sections.
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogClose` (`src/components/ui/dialog.tsx`) — accessible modal primitives used for the verification dialog.
- `Card`, `Label`, `Form` and other primitives in `src/components/ui` are available for future form editing modes.

### Animated Icon Component (existing)

- `AnimatedIcon` (`src/components/ui/animated-icon.tsx`) — wrapper around Lucide icons with motion presets; used for the loading state on the membership search button.

### Layout Components (existing)

- `Header` (`src/components/layout/header.tsx`) — main site header with search, cart, categories, country selector, and account actions.
- `Footer` (`src/components/layout/footer.tsx`) — site footer with links and social actions.
- `ShopLayout` (`src/app/(shop)/layout.tsx`) — wraps shop pages with `Header` and `Footer`.

### Feature Components

#### MembershipActionCard

- **File:** `src/components/features/membership/membership-action-card.tsx`
- **Purpose:** Large clickable card used to surface primary membership actions such as starting a new membership or opening pending processes.
- **Responsibility:** Renders an icon inside a circular border, a label, and consistent hover/focus styling.
- **Important props:**
  - `icon`: React node displayed inside the circular border.
  - `label`: action text shown next to the icon.
  - `onClick`: click handler for the action.
  - `variant`: `"default" | "alert"` for visual emphasis (currently maps to the same blue styling and can be extended).
  - `className`: optional additional utility classes.
- **Supported states:** default, hover, focus-visible, and disabled via parent `Button` or controlled logic.
- **How to reuse:** Import from `@/components/features/membership` and provide an icon and label; useful for any membership-related dashboard or action grid.

#### MembershipCard / MembershipCardBack

- **File:** `src/components/features/membership/membership-card.tsx`
- **Purpose:** Digital membership card visuals used in the account membership page.
- **Responsibility:** Renders a branded front/back membership card with member details, barcode visualization, status overlay, and expiration information.
- **Important props:**
  - `membership`: `UserMembership` object with member ID, type, tier, status, expiration date, and points.
  - `memberName`: member name displayed on the front card.
- **Supported states:** active, expiring soon, expired, and status overlay for non-active memberships.
- **How to reuse:** Import from `@/components/features/membership` and pass a membership object and member name; useful on account/membership pages and wallet views.

#### VerifyMembershipsDialog

- **File:** `src/components/features/membership/verify-membership-dialog.tsx`
- **Purpose:** Reusable modal for confirming memberships by sending and entering verification codes per member contact.
- **Responsibility:**
  - Renders a header with icon, title, description, and close button.
  - Lists each member with avatar, name, contact, and status indicator.
  - Provides a 4-digit numeric code input when verification is required.
  - Displays a verified badge for already-verified members.
  - Exposes a "Resend code" action for each pending/sent member.
  - Ends with a primary "Done" action.
- **Important props:**
  - `open`: whether the dialog is visible.
  - `onOpenChange`: callback invoked when the dialog open state changes.
  - `members`: optional array of `VerificationMember`; falls back to representative sample data.
  - `onDone`: optional callback when the user clicks "Done".
- **Supported states:**
  - `verified`: shows green check badge and "Member verified" text.
  - `pending` / `sent`: shows warning indicator and enabled/disabled code input.
  - Code input supports typing, backspace, arrow navigation, and paste.
- **How to reuse:** Import `VerifyMembershipsDialog` from `@/components/features/membership` and control it with local state in any page or parent component. The exported `VerificationMember` and `VerificationStatus` types can be used to build the `members` prop.

#### CheckoutProgress

- **File:** `src/components/features/checkout/checkout-progress.tsx`
- **Purpose:** Checkout step indicator (shipping/payment/review), not used on the membership pages because the membership registration has its own two-step stepper.

## Design System

The application uses Tailwind CSS with PriceSmart-specific design tokens defined in `src/app/globals.css`:

- Primary blue: `--ps-blue` (#0052a1), dark variant `--ps-blue-dark` (#003d7a).
- Accent amber: `--ps-amber` (#f5a623).
- Supporting grays, success, warning, error, and info colors.
- Shadcn CSS variables are mapped to the PriceSmart blue/amber palette.

Components follow the existing shadcn/ui default style and the project's `components.json` aliases (`@/components/ui`, `@/lib/utils`, etc.).
