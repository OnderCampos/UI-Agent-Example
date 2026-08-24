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

### New Secondary Membership

- **File:** `src/app/(shop)/membership/secondary/page.tsx`
- **Purpose:** Allows staff to add a new secondary membership linked to a primary member. The form collects personal data, contact information, and address details, with options to decline email/mobile and copy the primary member's address.
- **Main Sections:**
  1. Page header showing the primary member name and "Primary membership" label.
  2. Section title "New secondary membership" with a "Capture Member ID" action.
  3. Personal data section with photo placeholder, text inputs, and dropdowns.
  4. Contact section with email/mobile inputs, "Send code" actions, decline checkboxes, home phone, and notifications.
  5. Address section with a "Same address as primary member" checkbox and address fields.
  6. Bottom action bar with go-home, save-changes, previous, and add-member buttons.
- **Reusable Components Used:**
  - `SecondaryMemberForm`
  - `Button`, `Input`, `Label`, `Checkbox`, `Select`
- **Reference Image:** `1777781280362-0m1yd6qajlo.jpeg`

### Verify Memberships

- **File:** `src/app/(shop)/membership/verify/page.tsx`
- **Purpose:** Presents the membership verification modal where staff send and enter verification codes for each member's registered contact before finalizing the process.
- **Main Sections:**
  1. Modal header with icon, title, and description.
  2. Scrollable member list showing avatars, contact details, and status indicators.
  3. Four-digit code inputs with resend actions for pending members.
  4. A full-width "Done" action button.
- **Reusable Components Used:**
  - `VerifyMembershipsModal`
  - `VerificationMemberItem`
  - `VerificationCodeInput`
  - `Dialog`, `Button`
- **Reference Image:** `1777781279681-hbeprvw275k.jpeg`

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

### SecondaryMemberForm

- **File:** `src/components/features/membership-registration/secondary-member-form.tsx`
- **Responsibility:** Editable form for adding a secondary member linked to a primary member. Collects personal data, contact information, and address details, and includes decline checkboxes for email/mobile and a "Same address as primary member" option.
- **Important Props:**
  - `primaryMemberName?: string` — name shown as the primary member.
  - `defaultData?: Partial<SecondaryMemberFormData>` — optional initial values.
  - `onSubmit(data)` — callback fired on form submission.
  - `onGoHome`, `onSaveChanges`, `onPrevious`, `onAddMember`, `onCaptureMemberId`, `onTakePhoto` — action callbacks.
- **Supported States:** Controlled local state for all form fields; checkboxes disable/enable related inputs.
- **Reuse:** Use for any add/edit secondary membership flow. Future views can extend it for member onboarding or household member management.

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

### VerifyMembershipsModal

- **File:** `src/components/features/membership-verification/verify-memberships-modal.tsx`
- **Responsibility:** Renders the full membership verification modal with a header, a scrollable list of members, and a primary "Done" action. It is intended to be shown as a modal dialog over a background page.
- **Important Props:**
  - `open`, `onOpenChange` — controlled dialog state.
  - `members: VerificationMember[]` — list of members to verify.
  - `onCodeChange(id, code)` — callback invoked when a member's verification code changes.
  - `onResendCode(id)` — callback invoked when a member requests a code resend.
  - `onDone()` — callback invoked when the user presses the primary action.
  - `title`, `description` — configurable modal header text.
  - `codeLength` — number of digits per verification code (default 4).
- **Supported States:** Pending members show an input and a resend link; verified members show a green check and "Member verified" label. The "Done" button is visible at all times; future consumers may choose to disable it until all members are verified.
- **Reuse:** Reusable for any flow that requires verifying a list of contacts by code, such as secondary member onboarding, account recovery, or batch verification.

### VerificationMemberItem

- **File:** `src/components/features/membership-verification/verification-member-item.tsx`
- **Responsibility:** Displays a single member inside the verification list with avatar, contact info, status indicator, and an inline verification code input when pending.
- **Important Props:**
  - `member: VerificationMember` — the member data object.
  - `onCodeChange(id, code)` — code change callback.
  - `onResendCode(id)` — resend callback.
  - `codeLength` — number of input boxes to render.
- **Supported States:** `verified` shows a green check and success label; `pending` shows an amber warning icon and the code input.
- **Reuse:** Can be reused in any list where contacts must be verified by code.

### VerificationCodeInput

- **File:** `src/components/features/membership-verification/verification-code-input.tsx`
- **Responsibility:** Renders a fixed-length numeric code input composed of individual digit boxes with keyboard navigation, backspace handling, and paste support.
- **Important Props:**
  - `value: string` — current code value.
  - `onChange(value)` — callback invoked with the full code string.
  - `length` — number of digit boxes (default 4).
  - `disabled` — disables all inputs.
- **Supported States:** Empty, partially filled, filled, and disabled.
- **Reuse:** Applicable to any OTP, PIN, or numeric verification flow across the application.

### Select

- **File:** `src/components/ui/select.tsx`
- **Responsibility:** Base dropdown/select component from shadcn/ui built on Radix UI Select. Provides a trigger, value display, scrollable content list, item selection, and separators.
- **Important Props:**
  - `value`, `onValueChange`, `defaultValue` — controlled/uncontrolled selection.
  - `disabled`, `required` — native validation support.
- **Supported States:** Open/closed, selected, disabled, and grouped options.
- **Reuse:** Use for any dropdown selection in forms, filters, or configuration panels.

### Button

- **File:** `src/components/ui/button.tsx`
- **Responsibility:** Base button component from shadcn/ui with PriceSmart-styled overrides where needed.
- **Reuse:** Used across all views.

### Input

- **File:** `src/components/ui/input.tsx`
- **Responsibility:** Base text input component from shadcn/ui.
- **Reuse:** Used across all views.

### Label

- **File:** `src/components/ui/label.tsx`
- **Responsibility:** Accessible form label from shadcn/ui.
- **Reuse:** Used across all views.

### Checkbox

- **File:** `src/components/ui/checkbox.tsx`
- **Responsibility:** Accessible checkbox from shadcn/ui.
- **Reuse:** Used across all views.

---

## Exports

Membership search components are exported from:

- `src/components/features/membership-search/index.ts`

Membership registration components are exported from:

- `src/components/features/membership-registration/index.ts`

Membership verification components are exported from:

- `src/components/features/membership-verification/index.ts`

All feature components are re-exported from:

- `src/components/features/index.ts`
