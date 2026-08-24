# PriceSmart UI Generation Summary

This catalog documents the views and reusable components that make up the generated PriceSmart UI.

## Views

### Verify Memberships

- **File path:** `src/app/(shop)/membership/verify/page.tsx`
- **Reference image:** `1777781279681-hbeprvw275k.jpeg`
- **Purpose:** Present the membership verification modal to club staff so they can confirm each secondary/contact member by sending and entering a one-time code.
- **Main sections:**
  1. **Centered backdrop** — solid slate background that frames the dialog.
  2. **Verification dialog** — modal title, description, member list, and primary Done action.
  3. **Member list** — avatar, name, contact, status indicator, and per-contact code entry.
  4. **Secondary contact rows** — additional contact numbers for a member that also require verification.
- **Reused components:**
  - `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` (`src/components/ui/dialog.tsx`) — modal shell and accessibility.
  - `Button` (`src/components/ui/button.tsx`) — primary Done action.
- **New reusable components:**
  - `VerifyMembershipDialog` (`src/components/features/membership/verify-membership-dialog.tsx`) — full membership verification dialog.
  - `MemberRow` — local helper for rendering a member and its code inputs.
  - `VerificationCodeInput` — reusable 4-digit code entry control with single hidden input and styled digit boxes.
- **Important props / state:**
  - `open` and `onOpenChange` control dialog visibility.
  - `members` drives the list of members to verify.
  - `codes` stores the 4-digit verification code entered for each contact.
  - `onDone` callback is invoked when the user clicks Done.
- **How to reuse:**
  - Import `VerifyMembershipDialog` anywhere a membership verification flow is needed; pass the relevant `members` array and wire `onDone` to the next step.
  - Use `VerificationCodeInput` independently for any 4-digit PIN/OTP input scenario.

### Membership Search

- **File path:** `src/app/(shop)/membership/page.tsx`
- **Reference image:** `1777781280776-hz85g27aqjj.jpeg`
- **Purpose:** Provide club staff with a starting point to register a new membership, view pending processes, or locate an existing member profile before creating a duplicate.
- **Main sections:**
  1. **Context selectors** — Fixed club location and country dropdowns in the top-right (Miraflores / Guatemala / English).
  2. **Decorative brand bar** — Solid PriceSmart blue bar directly under the global header.
  3. **Action cards** — Two large cards for "New Membership" and "Pending process".
  4. **Search section** — Heading, descriptive text, search input, and "Search Membership" action.
- **Reused components:**
  - `Button` (`src/components/ui/button.tsx`) — search action.
  - `Input` (`src/components/ui/input.tsx`) — search field.
  - `Card` / `CardContent` (`src/components/ui/card.tsx`) — action card containers.
- **New reusable components:**
  - `ActionCard` — local helper for the icon + title action cards.
- **Important props / state:**
  - `query` controls the search input value.
  - `isSearching` simulates search submission feedback.
  - `selectedCountry` and `selectedClub` hold the contextual selectors.
  - `isCountryOpen` and `isClubOpen` toggle the dropdown menus.
- **How to reuse:**
  - The `ActionCard` pattern can be extracted for any hub page with large action tiles.
  - The contextual club/country selectors can be promoted to a shared header accessory component for membership or admin flows.

### New Membership Registration

- **File path:** `src/app/(shop)/membership/new/page.tsx`
- **Reference image:** `1777781281647-hz7g5mgy2b8.jpeg`
- **Purpose:** Allow club staff or members to review and complete personal data, contact information, address, and secondary memberships for a new PriceSmart membership before proceeding to payment.
- **Main sections:**
  1. **Page header** — "New membership" title and "Capture Member ID" action.
  2. **Stepper sidebar** — Two-step wizard (Membership data → Payment) via `MembershipStepper`.
  3. **Personal data** — Member photo, ID type/number, membership type, abbreviation, names, gender, date of birth, occupation.
  4. **Contact** — Email (with declined option), mobile/home phones, notification preference.
  5. **Address** — Street address, country, state, city.
  6. **Secondary memberships** — Cards for linked secondary members with Edit/Remove actions.
  7. **Sticky footer** — Go back home, Save changes, and Payment actions.
- **Reused components:**
  - `Button` (`src/components/ui/button.tsx`) — primary and outline actions.
  - `Input` (`src/components/ui/input.tsx`) — editable contact/address fields.
  - `Label` (`src/components/ui/label.tsx`) — field labels.
  - `Separator` (`src/components/ui/separator.tsx`) — section dividers.
  - `MembershipStepper` (`src/components/features/membership/membership-stepper.tsx`) — wizard step indicator.
  - `Header` / `Footer` — provided by the `(shop)` layout.
- **New reusable components:**
  - `ReadOnlyField` — local helper for label/value display in read mode.
- **Important props / state:**
  - `formData` object holds all editable membership fields.
  - `isEditing` toggles between read-only and inline edit modes for contact/address fields.
  - `isSaving` simulates save feedback.
  - `secondaryMembers` array renders secondary membership cards.
- **How to reuse:**
  - The wizard stepper pattern can be extracted for future multi-step flows.
  - The inline read/edit field pattern can be reused for any review-and-edit form.
  - The sticky action footer can be reused for forms with prominent primary actions.

### New Secondary Membership

- **File path:** `src/app/(shop)/membership/secondary/page.tsx`
- **Reference image:** `1777781280362-0m1yd6qajlo.jpeg`
- **Purpose:** Allow club staff to add a new secondary membership linked to an existing primary member by capturing personal data, contact information, and address details.
- **Main sections:**
  1. **Primary member header** — "Nicolas Treviño" with "Primary membership" subtitle.
  2. **Page header** — "New secondary membership" title and "Capture Member ID" action.
  3. **Stepper sidebar** — Two-step wizard (Membership data → Payment) via `MembershipStepper`.
  4. **Personal data** — Photo placeholder with "Take photo", ID Type, ID Number, Membership type, Abbreviation, First Name, Last Name, Gender, Date of birth, Occupation.
  5. **Contact** — Email address with "Send code" and decline checkbox, mobile phone number with "Send code" and decline checkbox, home phone number, Notifications.
  6. **Address** — "Same address as primary member" checkbox, Address, Country, State, City.
  7. **Sticky footer** — Go back home, Save changes, Previous, and Add member actions.
- **Reused components:**
  - `Button` (`src/components/ui/button.tsx`) — primary and outline actions.
  - `Input` (`src/components/ui/input.tsx`) — text, email, telephone, and date inputs.
  - `Label` (`src/components/ui/label.tsx`) — field labels.
  - `Checkbox` (`src/components/ui/checkbox.tsx`) — decline and same-address checkboxes.
  - `Separator` (`src/components/ui/separator.tsx`) — section dividers.
  - `MembershipStepper` (`src/components/features/membership/membership-stepper.tsx`) — wizard step indicator.
  - `SelectField` (`src/components/features/membership/select-field.tsx`) — dropdown inputs.
  - `FormSection` (`src/components/features/membership/form-section.tsx`) — titled form section with icon.
  - `Header` / `Footer` — provided by the `(shop)` layout.
- **Important props / state:**
  - `formData` object holds all editable secondary membership fields including `emailDeclined`, `mobilePhoneDeclined`, and `sameAddressAsPrimary`.
  - `isSaving` simulates save feedback.
- **How to reuse:**
  - `SelectField` can be reused for any styled native dropdown across forms.
  - `FormSection` provides a consistent section heading pattern for long forms.
  - `MembershipStepper` is shared with the primary membership flow.
  - The decline-checkbox pattern can be extracted for any field with opt-out logic.

## Reusable Components

### Button

- **File path:** `src/components/ui/button.tsx`
- **Responsibility:** Primary, outline, ghost, and secondary actions with consistent sizing and focus states.
- **Important props:** `variant`, `size`, `asChild`, standard button attributes.
- **States:** Default, hover, focus, disabled.
- **Usage in this view:** Header action, save/cancel, payment, and footer navigation buttons.

### Input

- **File path:** `src/components/ui/input.tsx`
- **Responsibility:** Text and telephone inputs with standard form styling.
- **Important props:** Standard `input` attributes, `className`.
- **States:** Default, focus, disabled.
- **Usage in this view:** Editable email, phone, address, country, state, city fields.

### Label

- **File path:** `src/components/ui/label.tsx`
- **Responsibility:** Accessible form labels.
- **Important props:** `htmlFor`, children.
- **Usage in this view:** Labels for editable fields in edit mode.

### Separator

- **File path:** `src/components/ui/separator.tsx`
- **Responsibility:** Visual divider between form sections.
- **Important props:** `orientation`, `className`.
- **States:** Default.
- **Usage in this view:** Horizontal dividers between Personal data, Contact, Address, and Secondary memberships.

### Checkbox

- **File path:** `src/components/ui/checkbox.tsx`
- **Responsibility:** Accessible checkbox control based on Radix UI.
- **Important props:** `checked`, `onCheckedChange`, `disabled`.
- **Usage in this view:** Decline-to-provide toggles and "same address as primary member".

### MembershipStepper

- **File path:** `src/components/features/membership/membership-stepper.tsx`
- **Responsibility:** Vertical numbered stepper for membership wizard flows.
- **Important props:**
  - `steps: MembershipStep[]` — ordered list of steps.
  - `currentStepId: number` — currently active step.
  - `className?: string` — optional root styling.
- **States:** Active (filled dark blue), completed (filled blue), upcoming (gray outline).
- **Usage in this view:** Shared by `NewMembershipPage` and `NewSecondaryMembershipPage`.

### SelectField

- **File path:** `src/components/features/membership/select-field.tsx`
- **Responsibility:** Styled native `<select>` wrapper with label, placeholder, optional error, and chevron icon.
- **Important props:**
  - `label?: React.ReactNode` — field label.
  - `options?: SelectOption[]` — selectable values.
  - `placeholder?: string` — default option text.
  - `onChange?: (value: string) => void` — value change handler.
  - `error?: string` — validation message.
- **States:** Default, focus, disabled, error.
- **Usage in this view:** All dropdown fields on the secondary membership page.

### FormSection

- **File path:** `src/components/features/membership/form-section.tsx`
- **Responsibility:** Consistent section header with icon and title for long forms.
- **Important props:**
  - `icon: LucideIcon` — section icon.
  - `title: string` — section title.
  - `children: React.ReactNode` — section content.
- **Usage in this view:** Personal data, Contact, and Address sections.

### VerifyMembershipDialog

- **File path:** `src/components/features/membership/verify-membership-dialog.tsx`
- **Responsibility:** Modal that walks a user through confirming each member/contact by entering a verification code.
- **Important props:**
  - `open: boolean` — controls visibility.
  - `onOpenChange: (open: boolean) => void` — visibility change handler.
  - `members?: VerificationMember[]` — list of members to verify (defaults to demo data).
  - `onDone?: (members: VerificationMember[]) => void` — finalizes the flow.
- **States:**
  - Pending member — shows warning icon and empty 4-digit code inputs with a Resend link.
  - Verified member — shows green checkmark and "Member verified" text; code input hidden.
- **Usage in this view:** Mounted by `VerifyMembershipPage` and reused as the core verification UI.

### VerificationCodeInput

- **File path:** `src/components/features/membership/verify-membership-dialog.tsx`
- **Responsibility:** Accessible 4-digit OTP-style input rendered as four styled boxes, backed by a single numeric input.
- **Important props:**
  - `value: string` — current numeric value.
  - `onChange: (value: string) => void` — value change handler.
  - `disabled?: boolean` — disables interaction.
- **States:** Empty boxes show a faint placeholder "0"; filled boxes highlight with the primary blue border.
- **Usage in this view:** Used by `VerifyMembershipDialog` for each contact that requires a code.

## Design Tokens

The view uses existing PriceSmart design tokens from `src/app/globals.css`:

- `--ps-blue` (#0052a1) — primary actions and links.
- `--ps-blue-dark` (#003d7a) — headings and primary button background.
- `--ps-amber` (#f5a623) — warning icons and accents.
- Gray scale from `--ps-gray-*` for text, borders, and backgrounds.
