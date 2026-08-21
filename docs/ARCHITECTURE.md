# Architecture Documentation

## Overview

This template implements a **Backend-for-Frontend (BFF)** architecture where Next.js API routes act as an orchestration layer between the frontend and external services.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Next.js     │  │   React      │  │    Custom Hooks      │  │
│  │  Pages       │  │  Components  │  │  (useCart, useAuth)  │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BFF / API Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Next.js     │  │  Auth        │  │    Service           │  │
│  │  API Routes  │  │  Middleware  │  │    Orchestrators     │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Integration Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │Commercetools│  │  Contentful │  │   Algolia   │             │
│  │   Adapter   │  │   Adapter   │  │   Adapter   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Identity   │  │ Membership  │  │    OMS      │             │
│  │   Adapter   │  │   Adapter   │  │   Adapter   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │Commercetools│  │  Contentful │  │   Algolia   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Identity   │  │ Membership  │  │ OMS/Payments│             │
│  │    API      │  │    API      │  │    APIs     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # BFF API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product endpoints
│   │   ├── cart/          # Cart endpoints
│   │   ├── search/        # Search endpoints
│   │   └── content/       # CMS content endpoints
│   ├── (shop)/            # Shop route group
│   └── layout.tsx         # Root layout
│
├── integrations/          # External Service Adapters
│   ├── commercetools/     # Commerce backend
│   ├── contentful/        # CMS
│   ├── algolia/           # Search
│   └── external-apis/     # Other APIs
│
├── services/              # Business Logic Layer
│   ├── auth.service.ts    # Authentication orchestration
│   ├── product.service.ts # Product operations
│   ├── cart.service.ts    # Cart operations
│   └── checkout.service.ts# Checkout flow
│
├── components/            # UI Components
│   ├── ui/                # shadcn/ui base components
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components
│
├── hooks/                 # Custom React Hooks
├── lib/                   # Utilities and configurations
├── types/                 # TypeScript type definitions
└── mocks/                 # Mock data for development
```

## Key Design Patterns

### 1. Adapter Pattern

Each external service has a dedicated adapter that:

- Handles authentication and API communication
- Converts external data formats to internal types
- Provides health checks
- Supports mock implementations

```typescript
// Example adapter interface
interface CommerceAdapter {
  products: {
    getById(id: string): Promise<Product>;
    search(query: ProductQuery): Promise<PaginatedResult<Product>>;
  };
  cart: {
    create(): Promise<Cart>;
    addItem(cartId: string, item: CartItem): Promise<Cart>;
  };
}
```

### 2. Service Layer

Services orchestrate multiple adapters to fulfill business operations:

```typescript
// cart.service.ts
class CartService {
  async addToCart(cartId: string, input: AddToCartInput) {
    // 1. Validate inventory
    const available = await this.checkInventory(input.productId, input.quantity);
    if (!available) throw new InsufficientInventoryError();
    
    // 2. Add to Commercetools cart
    return commercetools.addToCart(cartId, input);
  }
}
```

### 3. Mock Mode

The entire application can run with mock data by setting:

```env
NEXT_PUBLIC_USE_MOCKS=true
```

Each service checks this flag and returns mock data when enabled, allowing full development without external services.

## Data Flow

### Product Search Flow

1. User types in search bar
2. Frontend calls `/api/search?q=...`
3. API route calls `SearchService.searchProducts()`
4. Service calls Algolia adapter
5. Results transformed to internal types
6. Response returned to frontend

### Cart Operations Flow

1. User clicks "Add to Cart"
2. Frontend calls `POST /api/cart/items`
3. API route validates request
4. CartService checks inventory (backlog requirement)
5. CartService calls Commercetools adapter
6. Updated cart returned to frontend

### Checkout Flow

1. User enters shipping info
2. CheckoutService calculates tax via Tax API
3. User enters payment
4. CheckoutService creates payment intent
5. Payment confirmed
6. Order created in Commercetools
7. Order submitted to OMS

## Error Handling

All errors extend `AppError` with:

- `code` - Machine-readable error code
- `statusCode` - HTTP status code
- `message` - Human-readable message
- `isOperational` - Whether error is expected

```typescript
// Error hierarchy
AppError
├── ValidationError (400)
├── AuthenticationError (401)
├── AuthorizationError (403)
├── NotFoundError (404)
├── InsufficientInventoryError (400)
├── PaymentError (402)
└── ExternalServiceError (502)
```

## Caching Strategy

| Data Type | TTL | Strategy |
|-----------|-----|----------|
| Products | 5 min | Stale-while-revalidate |
| Categories | 30 min | Cache-first |
| Content | 1 hour | Cache-first |
| Search | 1 min | Network-first |
| Cart | 0 | Always fresh |

## Security Considerations

1. **Authentication** - Tokens stored in httpOnly cookies
2. **CSRF** - SameSite cookie attribute
3. **API Keys** - Server-side only, never exposed to client
4. **Validation** - Zod schemas for all inputs
5. **Headers** - X-Frame-Options, CSP in next.config.ts
