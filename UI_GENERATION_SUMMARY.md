# UI Generation Summary

This catalog documents the views and reusable components that make up the PriceSmart web application UI.

## Views

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

## Reusable Components

### Shadcn UI Components (existing)

- `Button` (`src/components/ui/button.tsx`) — primary action and outline variants used throughout the application.
- `Separator` (`src/components/ui/separator.tsx`) — used to visually divide form sections.
- `Card`, `Input`, `Label`, `Form` and other primitives in `src/components/ui` are available for future form editing modes.

### Layout Components (existing)

- `Header` (`src/components/layout/header.tsx`) — main site header with search, cart, categories, country selector, and account actions.
- `Footer` (`src/components/layout/footer.tsx`) — site footer with links and social actions.
- `ShopLayout` (`src/app/(shop)/layout.tsx`) — wraps shop pages with `Header` and `Footer`.

### Feature Components (existing)

- `MembershipCard` / `MembershipCardBack` (`src/components/features/membership/membership-card.tsx`) — digital membership card visuals used in the account membership page.
- `CheckoutProgress` (`src/components/features/checkout/checkout-progress.tsx`) — checkout step indicator (shipping/payment/review), not used on this page because the membership registration has its own two-step stepper.

## Design System

The application uses Tailwind CSS with PriceSmart-specific design tokens defined in `src/app/globals.css`:

- Primary blue: `--ps-blue` (#0052a1), dark variant `--ps-blue-dark` (#003d7a).
- Accent amber: `--ps-amber` (#f5a623).
- Supporting grays, success, warning, error, and info colors.
- Shadcn CSS variables are mapped to the PriceSmart blue/amber palette.

Components follow the existing shadcn/ui default style and the project's `components.json` aliases (`@/components/ui`, `@/lib/utils`, etc.).
