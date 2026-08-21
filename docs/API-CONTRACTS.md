# API Contracts

This document describes the API endpoints provided by the BFF layer.

## Response Format

All API responses follow this structure:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": { ... }  // Optional metadata
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": { ... }  // Optional validation errors
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Authentication

### POST /api/auth/login

Login with credentials.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "membership": { ... }
    },
    "expiresAt": "2024-01-15T10:00:00Z"
  }
}
```

**Cookies Set:**
- `access_token` (httpOnly)
- `refresh_token` (httpOnly)

### POST /api/auth/logout

Logout current user.

**Response:**
```json
{
  "success": true,
  "data": { "message": "Logged out successfully" }
}
```

### GET /api/auth/me

Get current authenticated user.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "membership": { ... }
  }
}
```

## Products

### GET /api/products

List products with optional filtering.

**Query Parameters:**
- `categoryId` - Filter by category
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sortBy` - Sort field (name, price, createdAt)
- `sortOrder` - Sort direction (asc, desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod-001",
      "name": "Product Name",
      "slug": "product-name",
      "price": { "amount": 2999, "currency": "USD", "formatted": "$29.99" },
      "image": { "url": "...", "alt": "..." },
      "isAvailable": true
    }
  ],
  "pagination": { ... }
}
```

### GET /api/products/[id]

Get product by ID or slug.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "prod-001",
    "name": "Product Name",
    "slug": "product-name",
    "description": "...",
    "masterVariant": { ... },
    "variants": [ ... ],
    "categories": [ ... ]
  }
}
```

## Categories

### GET /api/categories

List all categories.

**Query Parameters:**
- `parentId` - Filter by parent category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cat-001",
      "name": "Electronics",
      "slug": "electronics",
      "productCount": 150
    }
  ]
}
```

## Search

### GET /api/search

Search products using Algolia.

**Query Parameters:**
- `q` - Search query (required)
- `page` - Page number (0-indexed)
- `hitsPerPage` - Results per page (default: 20)
- `sortBy` - Sort option (relevance, price_asc, price_desc, newest)
- `categories` - Category filter (can repeat)
- `brand` - Brand filter (can repeat)
- `inStock` - Availability filter (true/false)

**Response:**
```json
{
  "success": true,
  "data": {
    "hits": [ ... ],
    "query": "headphones",
    "totalHits": 45,
    "page": 0,
    "hitsPerPage": 20,
    "totalPages": 3,
    "processingTimeMs": 15,
    "facets": {
      "categories": { "Electronics": 30, "Audio": 15 },
      "brand": { "Brand A": 20, "Brand B": 25 }
    }
  }
}
```

### GET /api/search/suggestions

Get autocomplete suggestions.

**Query Parameters:**
- `q` - Search query (min 2 characters)
- `limit` - Max suggestions (default: 5)

**Response:**
```json
{
  "success": true,
  "data": ["wireless headphones", "wireless earbuds", "wireless speaker"]
}
```

## Cart

### GET /api/cart

Get current cart.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart-123",
    "lineItems": [
      {
        "id": "line-1",
        "productId": "prod-001",
        "name": "Product Name",
        "quantity": 2,
        "unitPrice": { ... },
        "totalPrice": { ... }
      }
    ],
    "totals": {
      "subtotal": { ... },
      "shipping": { ... },
      "tax": { ... },
      "total": { ... }
    },
    "itemCount": 3
  }
}
```

### POST /api/cart

Create a new cart.

**Request:**
```json
{
  "customerId": "user-123",  // Optional
  "anonymousId": "anon-456"  // Optional
}
```

### POST /api/cart/items

Add item to cart.

**Request:**
```json
{
  "productId": "prod-001",
  "variantId": "var-001",  // Optional
  "quantity": 1
}
```

### PATCH /api/cart/items/[lineItemId]

Update item quantity.

**Request:**
```json
{
  "quantity": 3
}
```

### DELETE /api/cart/items/[lineItemId]

Remove item from cart.

## Content

### GET /api/content/pages/[slug]

Get CMS page by slug.

**Query Parameters:**
- `preview` - Enable preview mode (true/false)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "page-001",
    "title": "About Us",
    "slug": "about",
    "content": { "html": "..." },
    "sections": [ ... ],
    "seo": { ... }
  }
}
```

### GET /api/content/banners

Get active promotional banners.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "banner-1",
      "title": "Summer Sale",
      "subtitle": "Up to 50% off",
      "image": { ... },
      "link": "/sale"
    }
  ]
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Invalid input data |
| AUTHENTICATION_ERROR | 401 | Not authenticated |
| AUTHORIZATION_ERROR | 403 | Not authorized |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource conflict |
| INSUFFICIENT_INVENTORY | 400 | Not enough stock |
| PAYMENT_ERROR | 402 | Payment failed |
| RATE_LIMIT | 429 | Too many requests |
| EXTERNAL_SERVICE_ERROR | 502 | Third-party API failure |
| INTERNAL_ERROR | 500 | Server error |

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| /api/auth/* | 10 req/min |
| /api/search/* | 60 req/min |
| /api/cart/* | 30 req/min |
| Other | 100 req/min |

Rate limit headers included in response:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`
