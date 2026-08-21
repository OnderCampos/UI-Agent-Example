# Integration Guide

## Overview

This template uses an adapter pattern for all external service integrations. Each adapter provides:

- Type-safe API client
- Data transformation to internal types
- Health checks
- Error handling

## Commercetools

### Configuration

```env
COMMERCETOOLS_PROJECT_KEY=your-project-key
COMMERCETOOLS_CLIENT_ID=your-client-id
COMMERCETOOLS_CLIENT_SECRET=your-client-secret
COMMERCETOOLS_API_URL=https://api.us-central1.gcp.commercetools.com
COMMERCETOOLS_AUTH_URL=https://auth.us-central1.gcp.commercetools.com
COMMERCETOOLS_SCOPES=manage_project
```

### Available Operations

```typescript
import {
  getProductById,
  getProductBySlug,
  queryProducts,
  getCategories,
  createCart,
  addToCart,
  updateCartItem,
  createOrderFromCart,
} from "@/integrations/commercetools";
```

### Usage Example

```typescript
// Fetch product
const product = await getProductById("product-123", {
  locale: "en-US",
  currency: "USD",
});

// Create cart and add item
const cart = await createCart({ currency: "USD" });
const updatedCart = await addToCart(cart.id, {
  productId: "product-123",
  quantity: 2,
});
```

## Contentful

### Configuration

```env
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token
CONTENTFUL_PREVIEW_TOKEN=your-preview-token
CONTENTFUL_ENVIRONMENT=master
```

### Available Operations

```typescript
import {
  getPageBySlug,
  getAllPages,
  getActiveBanners,
  getNavigationMenu,
  getSiteSettings,
} from "@/integrations/contentful";
```

### Usage Example

```typescript
// Fetch page with preview mode
const page = await getPageBySlug("home", { preview: true });

// Get active banners
const banners = await getActiveBanners();

// Get navigation
const nav = await getNavigationMenu("main");
```

### Content Types

The adapter expects these content types in Contentful:

- `page` - CMS pages
- `banner` - Promotional banners
- `navigationMenu` - Navigation menus
- `siteSettings` - Global settings

## Algolia

### Configuration

```env
ALGOLIA_APP_ID=your-app-id
ALGOLIA_ADMIN_API_KEY=your-admin-key
ALGOLIA_SEARCH_API_KEY=your-search-key
ALGOLIA_INDEX_NAME=products
NEXT_PUBLIC_ALGOLIA_APP_ID=your-app-id
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your-search-key
```

### Available Operations

```typescript
import {
  searchProducts,
  getSearchSuggestions,
  indexProduct,
  indexProducts,
  updateIndexSettings,
} from "@/integrations/algolia";
```

### Usage Example

```typescript
// Search products
const results = await searchProducts("headphones", {
  page: 0,
  hitsPerPage: 20,
  filters: { categories: ["Electronics"] },
  facets: ["categories", "brand", "price"],
});

// Index a product
await indexProduct(product);

// Update index settings
await updateIndexSettings(DEFAULT_INDEX_SETTINGS);
```

## External APIs

### Digital Identity

Handles user authentication and profile management.

```typescript
import { getDigitalIdentityAdapter } from "@/integrations/external-apis";

const adapter = getDigitalIdentityAdapter();

// Login
const { user, tokens } = await adapter.login(credentials);

// Get profile
const profile = await adapter.getProfile(accessToken);
```

### Membership

Handles loyalty program and membership operations.

```typescript
import { getMembershipAdapter } from "@/integrations/external-apis";

const adapter = getMembershipAdapter();

// Get membership
const membership = await adapter.getMembershipByCustomerId(customerId);

// Check points
const balance = await adapter.getPointsBalance(memberId);

// Earn points
await adapter.earnPoints(memberId, { orderId, amount });
```

### OMS Wrapper

Handles order submission and tracking.

```typescript
import { getOmsWrapperAdapter } from "@/integrations/external-apis";

const adapter = getOmsWrapperAdapter();

// Submit order
const result = await adapter.submitOrder(orderData);

// Check status
const status = await adapter.getOrderStatus(orderId);
```

### Delivery Windows

Handles delivery scheduling.

```typescript
import { getDeliveryWindowsAdapter } from "@/integrations/external-apis";

const adapter = getDeliveryWindowsAdapter();

// Get available windows
const windows = await adapter.getAvailableWindows({
  postalCode: "94105",
  startDate: "2024-01-15",
});

// Book window
const booking = await adapter.bookWindow({
  windowId: "window-1",
  orderId: "order-123",
  ...
});
```

### Tax

Handles tax calculation.

```typescript
import { getTaxAdapter } from "@/integrations/external-apis";

const adapter = getTaxAdapter();

// Calculate tax
const taxResult = await adapter.calculateTax({
  lineItems: [...],
  shippingAmount: 10,
  toAddress: { state: "CA", postalCode: "94105", country: "US" },
  currencyCode: "USD",
});
```

### Payments

Handles payment processing.

```typescript
import { getPaymentsAdapter } from "@/integrations/external-apis";

const adapter = getPaymentsAdapter();

// Create intent
const intent = await adapter.createPaymentIntent({
  amount: 10000,
  currency: "USD",
});

// Confirm payment
const result = await adapter.confirmPaymentIntent(intent.id, {
  paymentMethodId: "pm_xxx",
});
```

## Adding New Integrations

### 1. Create Adapter Directory

```
src/integrations/new-service/
├── client.ts    # API client setup
├── types.ts     # Service-specific types
├── operations.ts # Business operations
└── index.ts     # Exports
```

### 2. Implement Client

```typescript
// client.ts
import { createApiClient } from "@/lib/api-client";

export function createNewServiceClient() {
  return createApiClient({
    baseUrl: process.env.NEW_SERVICE_URL,
    headers: {
      "X-API-Key": process.env.NEW_SERVICE_API_KEY,
    },
  });
}
```

### 3. Define Types

```typescript
// types.ts
export interface NewServiceItem {
  id: string;
  name: string;
  // ...
}
```

### 4. Implement Operations

```typescript
// operations.ts
import { createNewServiceClient } from "./client";
import type { NewServiceItem } from "./types";

export async function getItem(id: string): Promise<NewServiceItem> {
  const client = createNewServiceClient();
  const response = await client.get(`/items/${id}`);
  return transformToInternal(response.data);
}
```

### 5. Export

```typescript
// index.ts
export * from "./client";
export * from "./types";
export * from "./operations";
```

### 6. Add to Service Layer

```typescript
// services/new.service.ts
import * as newService from "@/integrations/new-service";

export class NewService {
  async doSomething() {
    if (USE_MOCKS) {
      return mockData;
    }
    return newService.getItem("123");
  }
}
```
