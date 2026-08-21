# Extension Guide

This guide explains how to extend the template with new features.

## Adding New Features

### 1. Adding a New Page

Create a new page in the `src/app` directory:

```tsx
// src/app/(shop)/wishlist/page.tsx
import { getWishlistService } from "@/services";

export default async function WishlistPage() {
  const wishlistService = getWishlistService();
  const items = await wishlistService.getItems();

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {/* Render wishlist items */}
    </main>
  );
}
```

### 2. Adding API Routes

Create API routes in `src/app/api`:

```typescript
// src/app/api/wishlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getWishlistService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";

export async function GET() {
  try {
    const service = getWishlistService();
    const items = await service.getItems();

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    const appError = isAppError(error) ? error : toAppError(error);
    return NextResponse.json(
      { success: false, error: { code: appError.code, message: appError.message } },
      { status: appError.statusCode }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const service = getWishlistService();
    const item = await service.addItem(body.productId);

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    const appError = isAppError(error) ? error : toAppError(error);
    return NextResponse.json(
      { success: false, error: { code: appError.code, message: appError.message } },
      { status: appError.statusCode }
    );
  }
}
```

### 3. Adding a Service

Create a service in `src/services`:

```typescript
// src/services/wishlist.service.ts
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";

const log = logger.child("WishlistService");

export class WishlistService {
  async getItems() {
    log.debug("Fetching wishlist items");

    if (USE_MOCKS) {
      return this.getMockItems();
    }

    // Real implementation
  }

  async addItem(productId: string) {
    log.debug("Adding to wishlist", { productId });

    if (USE_MOCKS) {
      return { id: "mock-1", productId };
    }

    // Real implementation
  }

  private getMockItems() {
    return [
      { id: "1", productId: "prod-001", addedAt: new Date().toISOString() },
    ];
  }
}

let instance: WishlistService | null = null;

export function getWishlistService() {
  if (!instance) {
    instance = new WishlistService();
  }
  return instance;
}
```

### 4. Adding a Custom Hook

Create a hook in `src/hooks`:

```typescript
// src/hooks/use-wishlist.ts
"use client";

import { useState, useCallback, useEffect } from "react";

interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/wishlist");
      const data = await res.json();

      if (data.success) {
        setItems(data.data);
      }
    } catch {
      setError("Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addToWishlist = useCallback(async (productId: string) => {
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      if (data.success) {
        setItems((prev) => [...prev, data.data]);
      }
    } catch {
      setError("Failed to add to wishlist");
    }
  }, []);

  return {
    items,
    isLoading,
    error,
    addToWishlist,
    refresh: fetchItems,
  };
}
```

### 5. Adding Components

Create components in `src/components/features`:

```tsx
// src/components/features/wishlist/wishlist-button.tsx
"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { items, addToWishlist } = useWishlist();
  const isInWishlist = items.some((item) => item.productId === productId);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("hover:text-red-500", className)}
      onClick={() => addToWishlist(productId)}
    >
      <Heart
        className={cn("h-5 w-5", isInWishlist && "fill-red-500 text-red-500")}
      />
    </Button>
  );
}
```

## Adding New Types

Add types in `src/types`:

```typescript
// src/types/wishlist.ts
export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  addedAt: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}
```

Then export from index:

```typescript
// src/types/index.ts
export * from "./wishlist";
```

## Adding Validation Schemas

Add schemas in `src/lib/validation.ts`:

```typescript
// Add to validation.ts
export const wishlistItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

export type WishlistItemInput = z.infer<typeof wishlistItemSchema>;
```

## Adding Environment Variables

1. Add to `.env.example`:

```env
# Wishlist Configuration
WISHLIST_API_URL=""
WISHLIST_API_KEY=""
```

1. Update `src/lib/constants.ts` if needed:

```typescript
export const WISHLIST_ENABLED = process.env.NEXT_PUBLIC_FEATURE_WISHLIST === "true";
```

## Testing New Features

1. Enable mock mode in `.env.local`:

```env
NEXT_PUBLIC_USE_MOCKS=true
```

1. Add mock data in `src/mocks/`:

```json
// src/mocks/wishlist.json
{
  "items": [
    {
      "id": "wish-1",
      "productId": "prod-001",
      "addedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

1. Use mock data in service:

```typescript
if (USE_MOCKS) {
  const mockData = require("@/mocks/wishlist.json");
  return mockData.items;
}
```

## Best Practices

1. **Follow Existing Patterns** - Look at existing services/hooks/components
2. **Use Types** - Always define TypeScript types
3. **Handle Errors** - Use AppError hierarchy
4. **Add Logging** - Use logger.child for context
5. **Support Mocks** - Always add mock implementations
6. **Document** - Update docs when adding features
