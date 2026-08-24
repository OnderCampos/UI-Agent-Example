# UI Generation Summary

This document catalogs the views and reusable components that make up the PriceSmart web application UI.

## Product

PriceSmart is a membership-warehouse e-commerce web application. The UI includes a public shop, account management flows, checkout, support, and membership registration.

---

## Views

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

- `1777781281647-hz7g5mgy2b8.jpeg` — New membership registration view.
