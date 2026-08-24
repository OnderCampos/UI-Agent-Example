# PriceSmart UI Generation Summary

This document catalogs the views and reusable UI components implemented for the PriceSmart web application.

## Views

### Membership Hub

- **File path:** `src/app/(shop)/membership/page.tsx`
- **Purpose:** Entry point for membership operations, allowing staff to create a new membership, view pending processes, or search for an existing member before creating a new profile.
- **Main sections:**
  - Blue sub-header brand bar.
  - Two large action cards for "New Membership" and "Pending process".
  - Divider separating actions from the search section.
  - `MembershipSearchForm` centered on the page.
- **Reused components:** `MembershipActionCard`, `MembershipSearchForm`.
- **New reusable components:** `MembershipActionCard`, `MembershipSearchForm`.

### New Membership Registration

- **File path:** `src/app/(shop)/membership/new/page.tsx`
- **Purpose:** Walks a user through reviewing and editing member data before proceeding to payment for a new membership.
- **Main sections:**
  - Page header with "Capture Member ID" action.
  - Vertical stepper showing "Membership data" (active) and "Payment".
  - `MembershipRegistrationForm` wrapped in a card for editable/readonly member details.
  - Action bar with "Go back home", "Save changes", and "Payment".
- **Reused components:** `Button`, `MembershipRegistrationForm`.
- **New reusable components:** `MembershipRegistrationForm`, `SecondaryMembershipCard`.

### Verify Memberships

- **File path:** `src/app/(shop)/membership/verify/page.tsx`
- **Purpose:** Modal-style page for verifying each membership contact by sending a code and entering the received verification digits.
- **Main sections:**
  - Slate-colored full-screen backdrop.
  - Centered `VerifyMembershipsDialog` containing the member list.
  - "Done" button that becomes enabled once every member is verified.
- **Reused components:** `VerifyMembershipsDialog`, `MemberVerificationItem`, `Button`.
- **New reusable components:** `VerifyMembershipsDialog`, `MemberVerificationItem`.

### Verify Memberships Done

- **File path:** `src/app/(shop)/membership/verify/done/page.tsx`
- **Purpose:** Success confirmation shown after all member contacts have been verified.
- **Main sections:**
  - Slate-colored full-screen backdrop.
  - Centered card with a success icon, confirmation message, and "Continue" button.
- **Reused components:** `Button`.

### New Secondary Membership

- **File path:** `src/app/(shop)/membership/secondary/page.tsx`
- **Purpose:** Allows staff to add a new secondary membership linked to a primary member, collecting personal data, contact information, and address details.
- **Main sections:**
  - Page header showing the primary member name and membership type.
  - Vertical stepper showing "Membership data" (active) and "Payment".
  - Section header with "New secondary membership" title and "Capture Member ID" action.
  - `SecondaryMemberRegistrationForm` containing Personal data, Contact, Address, and action buttons.
- **Reused components:** `Button`, `SecondaryMemberRegistrationForm`.
- **New reusable components:** `SecondaryMemberRegistrationForm`.

## Reusable Components

### MembershipActionCard

- **File path:** `src/components/features/membership/membership-action-card.tsx`
- **Responsibility:** Renders a large, tappable card with a circular icon and label for primary membership actions.
- **Important props:**
  - `icon: LucideIcon` — icon displayed inside the circle.
  - `label: string` — card text.
  - `variant?: "filled" | "outlined"` — visual treatment.
  - `onClick?: () => void` — click handler.
- **Supported states:** Default, hover, and disabled via button semantics.
- **How to reuse:** Use in any dashboard or hub view that needs prominent action tiles.

### MembershipSearchForm

- **File path:** `src/components/features/membership/membership-search-form.tsx`
- **Responsibility:** Provides a centered search experience for locating an existing membership profile by name, phone, email, or membership ID.
- **Important props:**
  - `onSearch?: (query: string) => void` — triggered on form submit.
  - `isLoading?: boolean` — disables submit and shows "Searching...".
  - `title?`, `description?`, `placeholder?`, `submitLabel?` — customizable text.
- **Supported states:** Empty query (disabled submit), filled query, loading.
- **How to reuse:** Drop into any view that needs to find a member record.

### MembershipRegistrationForm

- **File path:** `src/components/features/membership/membership-registration-form.tsx`
- **Responsibility:** Renders the full new-membership review/edit form organized into Personal data, Contact, Address, and Secondary memberships.
- **Important props:**
  - `initialData: MembershipRegistrationData` — populated member data.
  - `onSave?: (data) => void` — triggered by "Save changes".
  - `onPayment?: (data) => void` — triggered by "Payment".
  - `onGoHome?: () => void` — triggered by "Go back home".
  - `onCaptureMemberId?: () => void` — optional hook for capture action.
- **Supported states:** Read-only display of personal data, editable contact/address inputs, add/edit email inline, remove secondary members.
- **How to reuse:** Import into any membership creation or review flow and pass pre-filled member data.

### SecondaryMembershipCard

- **File path:** `src/components/features/membership/secondary-membership-card.tsx`
- **Responsibility:** Compact card for an additional household member with avatar, name, Edit/Remove actions, and an optional warning indicator.
- **Important props:**
  - `id`, `firstName`, `lastName`, `avatarUrl`
  - `hasWarning?: boolean`, `warningMessage?: string`
  - `onEdit?: (id) => void`, `onRemove?: (id) => void`
- **Supported states:** Default display, warning state, missing avatar fallback.
- **How to reuse:** Use in any view listing supplementary membership cards or household members.

### MembershipCard / MembershipCardBack

- **File path:** `src/components/features/membership/membership-card.tsx`
- **Responsibility:** Visual digital membership card and its back side for the account membership page.
- **How reused here:** Exported alongside new membership components from `src/components/features/membership/index.ts`; reused by the existing account membership page.

### MemberVerificationItem

- **File path:** `src/components/features/membership/member-verification-item.tsx`
- **Responsibility:** Displays a single member's avatar, contact info, verification status, and a 4-digit (configurable) code entry form.
- **Important props:**
  - `id`, `firstName`, `lastName`, `contact`, `avatarUrl`
  - `status: "verified" | "pending"`
  - `codeLength?: number` — defaults to 4.
  - `onVerify?: (id, code) => void` — triggered when the code is completed.
  - `onResend?: (id) => void` — triggered by the "Resend code" link.
- **Supported states:** Verified (green check + "Member verified" label), pending (amber warning + code inputs), empty/missing name fallback.
- **How to reuse:** Use inside any member list that needs per-contact verification, such as onboarding, renewal, or KYC flows.

### VerifyMembershipsDialog

- **File path:** `src/components/features/membership/verify-memberships-dialog.tsx`
- **Responsibility:** Full modal dialog that renders a list of `MemberVerificationItem`s and a primary "Done" action, tracking each member's verification state internally.
- **Important props:**
  - `open: boolean`
  - `onOpenChange?: (open) => void`
  - `members: MemberWithStatus[]` — list of members to verify.
  - `onVerify?: (id, code) => void`
  - `onResend?: (id) => void`
  - `onDone?: () => void` — enabled only after all members are verified.
- **Supported states:** Some members pending (Done disabled), all members verified (Done enabled), dialog open/closed.
- **How to reuse:** Drop into any flow that needs to confirm multiple members before continuing. It can be rendered from a page backdrop or inside another view.

### SecondaryMemberRegistrationForm

- **File path:** `src/components/features/membership/secondary-member-registration-form.tsx`
- **Responsibility:** Renders an editable form for adding a new secondary household member, organized into Personal data, Contact, Address, and action buttons.
- **Important props:**
  - `initialData?: Partial<SecondaryMemberRegistrationData>` — optional pre-filled values.
  - `onSave?: (data) => void` — triggered by "Save changes".
  - `onAddMember?: (data) => void` — triggered by "Add member".
  - `onGoHome?: () => void` — triggered by "Go back home".
  - `onPrevious?: () => void` — triggered by "Previous".
  - `onCaptureMemberId?: () => void` — optional hook for capture action.
- **Supported states:** Empty form, partially filled form, declines email/mobile checkboxes disabling corresponding fields, "Same address as primary member" disabling address fields.
- **How to reuse:** Import into any flow that registers an additional household member or secondary cardholder.

## Component Index Updates

- `src/components/features/membership/index.ts` exports:
  - `MembershipCard`
  - `MembershipCardBack`
  - `MembershipRegistrationForm`
  - `SecondaryMembershipCard`
  - `MembershipActionCard`
  - `MembershipSearchForm`
  - `MemberVerificationItem`
  - `VerifyMembershipsDialog`
  - `SecondaryMemberRegistrationForm` (new)
  - `SecondaryMemberRegistrationData` (type) (new)

## Design Notes

- Color palette follows existing PriceSmart tokens (`--ps-blue`, `--ps-blue-dark`, `--ps-amber`).
- Uses existing `Button`, `Input`, `Label`, `Separator`, and `Dialog` UI primitives.
- Layout built with Tailwind CSS utility classes and the existing `container` page width convention.
- New route constants added to `APP_ROUTES` for `/membership/new`, `/membership/secondary`, `/membership/pending`, `/membership/verify`, and `/membership/verify/done`.
- A new CSS token `--ps-overlay` and utility `bg-ps-overlay` provide the slate backdrop used behind the verification modal.
