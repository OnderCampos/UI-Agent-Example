# UI Generation Summary

This document catalogs the views and reusable components that make up the PriceSmart web application UI.

## Product

PriceSmart is a membership-warehouse e-commerce web application. The UI includes a public shop, account management flows, checkout, support, and membership registration.

---

## Views

### Membership Hub

- **File:** `src/app/(shop)/membership/page.tsx`
- **Purpose:** Entry point for membership management. Lets staff start a new membership registration, view pending membership processes, or search for an existing member profile by name, phone, email, or membership ID.
- **Main sections:**
  - Quick actions — two prominent cards for "New Membership" and "Pending process".
  - Search membership — heading, helper text, search input, and submit button.
- **Components used:**
  - Reused: `Button` (`src/components/ui/button.tsx`), `Input` (`src/components/ui/input.tsx`)
  - New reusable: `QuickActionCard` (`src/components/features/membership/quick-action-card.tsx`)

### New Membership Registration

- **File:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Primary membership enrollment page that lets a user review and edit a new member's personal data, contact details, address, and secondary memberships before continuing to payment.
- **Main sections:**
  - Personal data — avatar, ID information, name, gender, date of birth, occupation, and membership type.
  - Contact — email, mobile phone, home phone, and notification preference.
  - Address — street address, country, state, city.
  - Secondary memberships — list of additional members with edit/remove actions and an add dialog.
  - Bottom action bar — go back home, edit/save changes, and payment actions.
- **Components used:**
  - Reused: `Button`, `Input`, `Label`, `Dialog` (from `src/components/ui`)
  - New reusable components introduced in the page file:
    - `SectionTitle`
    - `DataRow`
    - `ReadOnlyField`
    - `Stepper`
    - `PersonalDataSection`
    - `ContactSection`
    - `AddressSection`
    - `SecondaryMembershipCard`
    - `SecondaryMembershipsSection`

---

## Reusable Components

### Shadcn / UI primitives

Located in `src/components/ui`. Used across all views.

- `Button` — `src/components/ui/button.tsx`
- `Input` — `src/components/ui/input.tsx`
- `Label` — `src/components/ui/label.tsx`
- `Dialog` (with `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogTrigger`) — `src/components/ui/dialog.tsx`
- `Card` family — `src/components/ui/card.tsx`
- `Badge` — `src/components/ui/badge.tsx`
- `Checkbox` — `src/components/ui/checkbox.tsx`
- `Form` family — `src/components/ui/form.tsx`

### Layout components

- `Header` — `src/components/layout/header.tsx`
  - Global site header with search, category navigation, country selector, cart, and account actions.
- `Footer` — `src/components/layout/footer.tsx`
  - Global footer with shop, membership, support, and company links.

### Feature components

Located in `src/components/features`.

- `MembershipCard`, `MembershipCardBack` — `src/components/features/membership/membership-card.tsx`
  - Visual digital membership card with barcode effect and card-back details.
- `QuickActionCard` — `src/components/features/membership/quick-action-card.tsx`
  - Large icon-and-title link card for hub-style entry points. Supports filled and outlined variants.
  - **Props:**
    - `href: string` — destination route.
    - `icon: React.ReactNode` — icon rendered inside a circular container.
    - `title: string` — card label.
    - `variant?: "filled" | "outlined"` — default `"filled"`.
  - **Reuse:** Drop into any hub or dashboard that needs a visually prominent navigation action.
- `VerificationCodeInput` — `src/components/features/membership/verification-code-input.tsx`
  - Composable numeric one-time-code input made of individual digit boxes. Supports typing, backspace navigation, and paste.
  - **Props:**
    - `length?: number` — number of digit boxes, default `4`.
    - `value: string[]` — current code value as an array of digits.
    - `onChange: (value: string[]) => void` — called whenever the code changes.
    - `label?: string` — label shown above the input, default `"Enter code"`.
    - `className?: string` — additional styles for the wrapper.
  - **States:** Focus rings use the brand blue. Empty inputs show a `"0"` placeholder.
  - **Reuse:** Use in any verification, OTP, or PIN entry flow.
- `VerifyMemberRow` — `src/components/features/membership/verify-member-row.tsx`
  - Row displaying a member's avatar (optional), contact info, verification status indicator, and a `VerificationCodeInput` when pending.
  - **Props:**
    - `member: VerifyMember` — member data including contact, status, and current code.
    - `onCodeChange: (id: string, code: string[]) => void`
    - `onResend: (id: string) => void`
    - `className?: string`
  - **States:** Verified members show a green checkmark and "Member verified" text. Pending members show an amber warning icon and the code input.
  - **Reuse:** Render inside `VerifyMembershipsDialog` or any list that needs per-member verification.
- `VerifyMembershipsDialog` — `src/components/features/membership/verify-memberships-dialog.tsx`
  - Modal overlay for verifying secondary or primary memberships by sending a code to each member's registered contact (phone or email) and collecting the entered verification code.
  - **Props:**
    - `open: boolean`
    - `onOpenChange: (open: boolean) => void`
    - `members: VerifyMember[]`
    - `onMembersChange: (members: VerifyMember[]) => void`
    - `onDone: () => void`
  - **States:** Pending members show four-digit code inputs and a "Resend code" link; verified members display a green checkmark and "Member verified" label.
  - **Reuse:** Drop into any membership workflow that requires multi-member contact verification.
- `AddressCard`, `AddressForm` — `src/components/features/address/address-card.tsx`, `address-form.tsx`
  - Display and edit saved addresses with default badges and actions.
- `CheckoutProgress`, `OrderSummary` — `src/components/features/checkout/`
  - Checkout step indicator and order summary.
- `ProductCard`, `ProductGrid` — `src/components/features/product/`
  - Product listing components.
- `CartItem`, `CartSummary` — `src/components/features/cart/`
  - Shopping-cart display and totals.
- `SearchBar`, `SearchFilters`, `SearchSuggestions` — `src/components/features/search/`
  - Search-related components.
- `StoreCard`, `StoreMap`, `StoreHours`, `StoreServices` — `src/components/features/store/`
  - Store locator and details.
- `Promotions` family — `src/components/features/promotions/`
  - Countdown timers, flash-sale cards, bundle deals, banners, member deals.
- `WishlistButton`, `WishlistCard` — `src/components/features/wishlist/`
  - Wishlist controls and item cards.
- `InvoiceCard`, `InvoiceForm` — `src/components/features/invoice/`
  - Invoice display and form.
- `ContactForm`, `ChatWidget`, `TicketForm`, `OrderIssueForm` — `src/components/features/support/`
  - Customer support components.
- `LanguageSelector`, `CountrySelector`, `LocaleSelector` — `src/components/features/i18n/`
  - Internationalization selectors.
- `InstallPrompt`, `OfflineIndicator` — `src/components/features/pwa/`
  - PWA prompt and offline state UI.

---

## Modals / Dialogs

### Verify Memberships Dialog

- **File:** `src/components/features/membership/verify-memberships-dialog.tsx`
- **Purpose:** Modal overlay for verifying secondary or primary memberships by sending a code to each member's registered contact (phone or email) and collecting the entered verification code.
- **Main sections:**
  - Header — rounded-top brand-blue banner with a `UserPlus` icon and decorative ring shapes.
  - Title and helper text — explains that a code will be sent to each registered contact.
  - Member rows — one row per member showing avatar (when available), contact info, status indicator, and a code-entry input for pending members.
  - Footer — full-width primary "Done" button.
- **Components used:**
  - Reused: `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` (`src/components/ui/dialog.tsx`), `Button` (`src/components/ui/button.tsx`).
  - New reusable: `VerifyMemberRow` (`src/components/features/membership/verify-member-row.tsx`), `VerificationCodeInput` (`src/components/features/membership/verification-code-input.tsx`).
- **Props:**
  - `open: boolean` — controls dialog visibility.
  - `onOpenChange: (open: boolean) => void` — visibility change callback.
  - `members: VerifyMember[]` — members to verify.
  - `onMembersChange: (members: VerifyMember[]) => void` — callback when a member's code changes or is reset.
  - `onDone: () => void` — finalizes the verification flow.
- **States:** Pending members show four-digit code inputs and a "Resend code" link; verified members display a green checkmark and "Member verified" label.
- **Reuse:** Drop into any membership workflow that requires multi-member contact verification.

## New Components for Membership Registration

These components are co-located within `src/app/(shop)/membership/new/page.tsx`. They are composed of shared primitives and are designed to be reusable by future membership-related views.

### SectionTitle

- **Responsibility:** Consistent section heading with icon.
- **Props:**
  - `icon: React.ReactNode` — icon displayed before the title.
  - `children: React.ReactNode` — title text.

### DataRow

- **Responsibility:** Read-only display of a labeled value.
- **Props:**
  - `label: string`
  - `value: string`
  - `required?: boolean` — appends a red asterisk to the label.

### ReadOnlyField

- **Responsibility:** Styled read-only input-like container for non-editable form values.
- **Props:**
  - `label: string`
  - `value: string`

### Stepper

- **Responsibility:** Vertical step indicator for the membership registration flow (Membership data → Payment).
- **Props:** None — current steps are hard-coded for this flow. Future views can extract `steps` as a prop.

### PersonalDataSection

- **Responsibility:** Display and edit member personal information.
- **Props:**
  - `data: PersonalData`
  - `editing: boolean`
  - `onChange: (data: PersonalData) => void`
- **States:** View mode shows `DataRow` values; edit mode enables inputs for editable fields and uses `ReadOnlyField` for locked fields.

### ContactSection

- **Responsibility:** Display and edit contact information.
- **Props:**
  - `data: ContactData`
  - `editing: boolean`
  - `onChange: (data: ContactData) => void`
- **States:** Supports an email-decline checkbox that disables the email input.

### AddressSection

- **Responsibility:** Display and edit member address.
- **Props:**
  - `data: AddressData`
  - `editing: boolean`
  - `onChange: (data: AddressData) => void`

### SecondaryMembershipCard

- **Responsibility:** Card for a single secondary member with avatar, name, edit/remove actions, and a status indicator.
- **Props:**
  - `member: Member`
  - `onEdit: (member: Member) => void`
  - `onRemove: (id: string) => void`

### SecondaryMembershipsSection

- **Responsibility:** Manages the list of secondary members, including add/edit dialog and remove action.
- **Props:**
  - `members: Member[]`
  - `onChange: (members: Member[]) => void`
- **States:** Add/edit dialog state, draft first/last name, member list updates.
- **Reuse:** Drop into any membership form that allows dependent or secondary members.

---

## Reference Images

- `1777781279681-hbeprvw275k.jpeg` — Verify memberships dialog.
- `1777781281647-hz7g5mgy2b8.jpeg` — New membership registration view.
- `1777781280776-hz85g27aqjj.jpeg` — Membership hub view.
