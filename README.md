# Ecommerce Integration Template

A comprehensive Next.js boilerplate for building ecommerce applications with integration adapters for Commercetools, Contentful, Algolia, and external APIs.

## Features

- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **BFF Pattern** - Next.js API routes as orchestration layer
- **Adapter Pattern** - Typed integrations for external services
- **Mock Mode** - Full development without external services
- **Comprehensive Types** - Shared TypeScript definitions

## Quick Start

```bash
# Install dependencies
bun install

# Copy environment template
cp .env.example .env.local

# Run development server (uses mock data by default)
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # BFF API Routes
│   └── (shop)/            # Shop pages
├── integrations/          # External Service Adapters
│   ├── commercetools/     # Commerce backend
│   ├── contentful/        # CMS
│   ├── algolia/           # Search
│   └── external-apis/     # Other APIs
├── services/              # Business Logic
├── components/            # UI Components
├── hooks/                 # Custom React Hooks
├── lib/                   # Utilities
├── types/                 # TypeScript Types
└── mocks/                 # Mock Data
```

## Configuration

### Mock Mode (Default)

The template runs with mock data by default. Set in `.env.local`:

```env
NEXT_PUBLIC_USE_MOCKS=true
```

### Production Mode

To connect to real services, configure the following environment variables:

#### Commercetools

```env
COMMERCETOOLS_PROJECT_KEY=your-project-key
COMMERCETOOLS_CLIENT_ID=your-client-id
COMMERCETOOLS_CLIENT_SECRET=your-client-secret
```

#### Contentful

```env
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token
```

#### Algolia

```env
ALGOLIA_APP_ID=your-app-id
ALGOLIA_SEARCH_API_KEY=your-search-key
NEXT_PUBLIC_ALGOLIA_APP_ID=your-app-id
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your-search-key
```

See `.env.example` for all available options.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and data flow
- [Integrations](docs/INTEGRATIONS.md) - How to configure external services
- [Extending](docs/EXTENDING.md) - Adding new features
- [API Contracts](docs/API-CONTRACTS.md) - API endpoint documentation

## Available Scripts

```bash
bun dev          # Start development server
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
bun type-check   # Run TypeScript compiler
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Validation | Zod |
| Commerce | Commercetools |
| CMS | Contentful |
| Search | Algolia |

## Key Patterns

### Adapter Pattern

Each external service has a dedicated adapter:

```typescript
// Usage
import { getProductById } from "@/integrations/commercetools";
const product = await getProductById("prod-123");
```

### Service Layer

Services orchestrate multiple adapters:

```typescript
// cart.service.ts validates inventory before adding to cart
const cart = await cartService.addToCart(cartId, {
  productId: "prod-123",
  quantity: 2,
});
```

### Custom Hooks

React hooks for data fetching:

```typescript
const { cart, addToCart, isLoading } = useCart();
const { results, search, facets } = useSearch();
```

## License

MIT
