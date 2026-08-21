# OpenMemory Guide - Ecommerce Integration Template

## Overview

This is an ecommerce integration template built with Next.js 15, designed as a boilerplate for projects that need to integrate with external commerce services (Commercetools, Contentful, Algolia) rather than building a greenfield solution.

**Tech Stack:**
- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS + shadcn/ui
- BFF (Backend-for-Frontend) pattern

## Architecture

The application follows a **BFF (Backend-for-Frontend)** pattern where Next.js API routes act as an orchestration layer between the frontend and external services.

```
Frontend (React) → BFF (Next.js API Routes) → Services → Adapters → External APIs
```

### Key Architectural Decisions

1. **Integration Approach** - Built to integrate with existing external services rather than greenfield
2. **Adapter Pattern** - Each external service has a dedicated typed adapter
3. **Service Layer** - Business logic orchestrates multiple adapters
4. **Mock Mode** - Full development without external services using `NEXT_PUBLIC_USE_MOCKS=true`

## Components

### Core Libraries (`src/lib/`)
- `api-client.ts` - Generic HTTP client with error handling
- `errors.ts` - Custom error classes (AppError, ApiError)
- `validation.ts` - Zod schema validation utilities
- `constants.ts` - Application constants
- `logger.ts` - Structured logging utility
- `utils.ts` - General utilities (cn for classNames)

### Types (`src/types/`)
- `product.ts` - Product, ProductVariant, Category
- `cart.ts` - Cart, LineItem
- `order.ts` - Order, Address
- `user.ts` - User
- `api.ts` - ApiResponse wrapper
- `content.ts` - ContentPage, Banner

### Integrations (`src/integrations/`)

#### Commercetools (`integrations/commercetools/`)
- `client.ts` - Commercetools API client
- `products.ts` - Product queries
- `cart.ts` - Cart operations
- `orders.ts` - Order creation
- `types.ts` - Commercetools-specific types

#### Contentful (`integrations/contentful/`)
- `client.ts` - Contentful API client
- `content.ts` - Content fetching operations
- `types.ts` - Contentful-specific types

#### Algolia (`integrations/algolia/`)
- `client.ts` - Algolia search client
- `search.ts` - Search operations
- `indexing.ts` - Index management
- `types.ts` - Algolia-specific types

#### External APIs (`integrations/external-apis/`)
- `digital-identity/` - Authentication adapter
- `membership/` - Loyalty program adapter
- `oms-wrapper/` - Order management adapter
- `delivery-windows/` - Delivery scheduling adapter
- `payments/` - Payment processing adapter
- `tax/` - Tax calculation adapter

### Services (`src/services/`)
- `auth.service.ts` - Authentication orchestration
- `product.service.ts` - Product operations
- `cart.service.ts` - Cart operations
- `checkout.service.ts` - Checkout flow
- `content.service.ts` - CMS content
- `search.service.ts` - Search orchestration

### API Routes (`src/app/api/`)
- `/api/products` - Product listing and detail
- `/api/categories` - Category listing
- `/api/search` - Product search
- `/api/search/suggestions` - Autocomplete
- `/api/cart` - Cart operations
- `/api/cart/items` - Cart item management
- `/api/auth/*` - Authentication endpoints
- `/api/content/*` - CMS content endpoints

### UI Components (`src/components/`)
- `ui/` - shadcn/ui base components (button, card, input)
- `features/product/` - ProductCard, ProductGrid
- `features/search/` - SearchBar
- `features/cart/` - CartItem, CartSummary

### Pages (`src/app/(shop)/`)
- `/deals` - Deals landing page with savings highlights and product CTA
- `/members-selection` - Member-exclusive landing page with membership CTAs
- `/new-arrivals` - New arrivals landing page with product CTAs

### Hooks (`src/hooks/`)
- `use-cart.ts` - Cart state management
- `use-search.ts` - Search with debouncing
- `use-products.ts` - Product fetching
- `use-auth.ts` - Authentication state

## Patterns

### Error Handling
All errors extend `AppError` with code, statusCode, message, and isOperational flag.

### Logging
`logger.error` expects `(message, error?, data?)` — pass an `Error` as the second argument and attach extra context as `data`.

### Build
Use `NODE_ENV=production tsc --noEmit && next build` (no `cross-env`).

### Mock Mode
Set `NEXT_PUBLIC_USE_MOCKS=true` to use mock data from `src/mocks/`.

### API Response Format
```typescript
{ success: true, data: T } | { success: false, error: { code, message } }
```

## User Defined Namespaces

- [Leave blank - user populates]

## Documentation

- `docs/ARCHITECTURE.md` - System design
- `docs/INTEGRATIONS.md` - Service configuration
- `docs/EXTENDING.md` - Adding features
- `docs/API-CONTRACTS.md` - API documentation
- `docs/INTEGRATION-STATUS.md` - Architecture diagram and integration status
