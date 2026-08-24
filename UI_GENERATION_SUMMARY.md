# PriceSmart UI Generation Summary

This catalog documents the views and reusable UI components introduced for the PriceSmart application. All components are built with React, TypeScript, Next.js App Router, Tailwind CSS, and the existing shadcn/ui component library.

---

## Views

### Membership Search

- **File:** `src/app/(shop)/membership/search/page.tsx`
- **Purpose:** Entry point for membership management, letting staff start a new membership, view pending processes, or search for an existing member profile before creating a new membership.
- **Main Sections:**
  1. Two prominent action cards: "New Membership" and "Pending process".
  2. A centered search form with instructions and a disabled-until-filled submit action.
- **Reusable Components Used:**
  - `MembershipActionCard`
  - `MembershipSearchForm`
- **Reference Image:** `1777781280776-hz85g27aqjj.jpeg`

### New Membership Registration

- **File:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Collects and reviews member data before proceeding to payment for a new PriceSmart membership.
- **Main Sections:**
  1. Page header with title and "Capture Member ID" action.
  2. Personal data with photo and read-only fields (ID type, name, gender, occupation, etc.).
  3. Contact information (email, phone numbers, notification preference).
  4. Address information.
  5. Secondary membership cards with edit/remove actions.
  6. Bottom action bar with go-home, save-changes, and payment buttons.
- **Reusable Components Used:**
  - `MembershipDataView`
  - `Stepper`
  - `PersonalDataSection`
  - `ContactSection`
  - `AddressSection`
  - `SecondaryMembershipsSection`
  - `Button`
- **Reference Image:** `1777781281647-hz7g5mgy2b8.jpeg`

---

## Reusable Components

### MembershipDataView

- **File:** `src/components/features/membership-registration/membership-data-view.tsx`
- **Responsibility:** Provides the full-page shell for the "Membership data" step of new membership registration, including the stepper sidebar, content sections, and bottom action bar.
- **Important Props:**
  - `personalData`, `contactData`, `addressData`, `secondaryMembers` — structured data objects rendered by their respective sections.
  - `onCaptureMemberId`, `onChangePicture`, `onSaveChanges`, `onGoHome`, `onPayment` — action callbacks.
  - `onEditSecondary(id)`, `onRemoveSecondary(id)` — secondary member callbacks.
- **States:** Read-only data view; state is managed by the parent page.
- **Reuse:** Future membership flows can reuse this view by supplying data objects and callbacks.

### Stepper

- **File:** `src/components/features/membership-registration/stepper.tsx`
- **Responsibility:** Renders a vertical numbered progress indicator for multi-step membership flows.
- **Important Props:**
  - `steps: Step[]` — array of `{ id, label, number }`.
  - `currentStep: string` — id of the active step.
- **Supported States:** Active, completed, and upcoming steps with distinct styling.
- **Reuse:** Applicable to any multi-step wizard inside the membership or account areas.

### PersonalDataSection

- **File:** `src/components/features/membership-registration/personal-data-section.tsx`
- **Responsibility:** Displays a member's profile photo and read-only personal data fields.
- **Important Props:**
  - `data` — personal data object.
  - `onChangePicture` — optional photo change callback.
- **Reuse:** Can be reused on member detail or review screens.

### ContactSection

- **File:** `src/components/features/membership-registration/contact-section.tsx`
- **Responsibility:** Renders contact details with required-field indicators and optional warning icons.
- **Important Props:**
  - `data` — contact data object, including `emailDeclined` and `mobileWarning` flags.
- **Reuse:** Useful for any contact review or read-only summary.

### AddressSection

- **File:** `src/components/features/membership-registration/address-section.tsx`
- **Responsibility:** Displays a read-only address summary over four columns.
- **Important Props:**
  - `data` — address data object.
- **Reuse:** Can be reused in account address summaries or checkout review.

### SecondaryMembershipsSection

- **File:** `src/components/features/membership-registration/secondary-memberships-section.tsx`
- **Responsibility:** Lists secondary membership cards with avatar, name, edit/remove links, and warning badges.
- **Important Props:**
  - `members` — array of secondary member objects.
  - `onEdit(id)`, `onRemove(id)` — callbacks for actions.
- **Reuse:** Reusable for any secondary member management screen.

### MembershipActionCard

- **File:** `src/components/features/membership-search/membership-action-card.tsx`
- **Responsibility:** Renders a large, tappable card with an icon ring and label for membership-related actions.
- **Important Props:**
  - `icon: LucideIcon` — icon to display inside the ring.
  - `title: string` — card label.
  - `variant?: "default" | "outlined"` — default uses a light gray background; outlined uses a white background with a border.
  - `onClick?: () => void` and `href?: string` — navigation/action options.
- **Supported States:** Default, outlined, hover/focus-visible.
- **Reuse:** Useful for any landing page that needs large action tiles (e.g., account, support, or admin dashboards).

### MembershipSearchForm

- **File:** `src/components/features/membership-search/membership-search-form.tsx`
- **Responsibility:** Provides a centered search experience for locating existing member profiles.
- **Important Props:**
  - `title`, `description`, `placeholder`, `submitLabel` — configurable text.
  - `onSearch(query)` — callback fired when a non-empty query is submitted.
- **Supported States:** Empty query disables the submit button; typing enables it.
- **Reuse:** Can be reused for any member lookup or profile search flow.

### Button

- **File:** `src/components/ui/button.tsx`
- **Responsibility:** Base button component from shadcn/ui with PriceSmart-styled overrides where needed.
- **Reuse:** Used across all views.

---

## Exports

Membership search components are exported from:

- `src/components/features/membership-search/index.ts`

Membership registration components are exported from:

- `src/components/features/membership-registration/index.ts`

All feature components are re-exported from:

- `src/components/features/index.ts`
