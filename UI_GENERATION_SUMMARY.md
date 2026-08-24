# PriceSmart UI Generation Summary

This catalog documents the views and reusable components that make up the generated PriceSmart UI.

## Views

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
  2. **Stepper sidebar** — Two-step wizard (Membership data → Payment).
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
- **Usage in this view:** Horizontal dividers between Personal data, Contact, Address, and Secondary memberships.

## Design Tokens

The view uses existing PriceSmart design tokens from `src/app/globals.css`:

- `--ps-blue` (#0052a1) — primary actions and links.
- `--ps-blue-dark` (#003d7a) — headings and primary button background.
- `--ps-amber` (#f5a623) — warning icons and accents.
- Gray scale from `--ps-gray-*` for text, borders, and backgrounds.
