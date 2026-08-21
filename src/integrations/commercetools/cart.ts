/**
 * Commercetools Cart Operations
 */

import { createCommercetoolsClient } from "./client";
import type { CTCart, CTCartAction, CTLineItem } from "./types";
import type {
  Cart,
  CartLineItem,
  CartTotals,
  AddToCartInput,
  UpdateCartItemInput,
} from "@/types/cart";
import { NotFoundError, ExternalServiceError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { DEFAULT_LOCALE, DEFAULT_CURRENCY } from "@/lib/constants";

const log = logger.child("CT-Cart");

/**
 * Converts CT line item to CartLineItem
 */
function toCartLineItem(ctLineItem: CTLineItem, locale: string): CartLineItem {
  const variant = ctLineItem.variant;
  const discountedTotal = ctLineItem.discountedPricePerQuantity.reduce(
    (sum, d) => sum + d.discountedPrice.value.centAmount * d.quantity,
    0
  );

  return {
    id: ctLineItem.id,
    productId: ctLineItem.productId,
    variantId: String(variant.id),
    sku: variant.sku || "",
    name: ctLineItem.name[locale] || ctLineItem.name["en"] || Object.values(ctLineItem.name)[0] || "",
    slug: ctLineItem.productSlug?.[locale] || ctLineItem.productSlug?.["en"] || "",
    image: variant.images?.[0]
      ? {
          id: "img-0",
          url: variant.images[0].url,
          alt: "",
          isDefault: true,
        }
      : null,
    quantity: ctLineItem.quantity,
    unitPrice: {
      amount: ctLineItem.price.value.centAmount,
      currency: ctLineItem.price.value.currencyCode,
      formatted: formatPrice(ctLineItem.price.value.centAmount, ctLineItem.price.value.currencyCode),
    },
    totalPrice: {
      amount: ctLineItem.totalPrice.centAmount,
      currency: ctLineItem.totalPrice.currencyCode,
      formatted: formatPrice(ctLineItem.totalPrice.centAmount, ctLineItem.totalPrice.currencyCode),
    },
    discountedPrice:
      discountedTotal > 0
        ? {
            amount: discountedTotal,
            currency: ctLineItem.totalPrice.currencyCode,
            formatted: formatPrice(discountedTotal, ctLineItem.totalPrice.currencyCode),
          }
        : undefined,
    attributes: variant.attributes?.reduce((acc, attr) => {
      if (typeof attr.value === "string") {
        acc[attr.name] = attr.value;
      }
      return acc;
    }, {} as Record<string, string>) || {},
    availability: {
      isAvailable: variant.availability?.isOnStock ?? true,
      maxQuantity: variant.availability?.availableQuantity,
    },
  };
}

/**
 * Formats price for display
 */
function formatPrice(centAmount: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(centAmount / 100);
}

/**
 * Calculates cart totals
 */
function calculateTotals(ctCart: CTCart): CartTotals {
  const currency = ctCart.totalPrice.currencyCode;

  const subtotal = ctCart.lineItems.reduce(
    (sum, item) => sum + item.totalPrice.centAmount,
    0
  );

  const shippingAmount = ctCart.shippingInfo?.price.centAmount || 0;

  const taxAmount = ctCart.taxedPrice
    ? ctCart.taxedPrice.totalGross.centAmount - ctCart.taxedPrice.totalNet.centAmount
    : 0;

  const discountAmount = ctCart.lineItems.reduce((sum, item) => {
    const originalTotal = item.price.value.centAmount * item.quantity;
    return sum + (originalTotal - item.totalPrice.centAmount);
  }, 0);

  return {
    subtotal: {
      amount: subtotal,
      currency,
      formatted: formatPrice(subtotal, currency),
    },
    shipping: shippingAmount
      ? {
          amount: shippingAmount,
          currency,
          formatted: formatPrice(shippingAmount, currency),
        }
      : undefined,
    tax: taxAmount
      ? {
          amount: taxAmount,
          currency,
          formatted: formatPrice(taxAmount, currency),
        }
      : undefined,
    discount: discountAmount
      ? {
          amount: discountAmount,
          currency,
          formatted: formatPrice(discountAmount, currency),
        }
      : undefined,
    total: {
      amount: ctCart.totalPrice.centAmount,
      currency,
      formatted: formatPrice(ctCart.totalPrice.centAmount, currency),
    },
  };
}

/**
 * Converts CT cart to Cart
 */
function toCart(ctCart: CTCart, locale: string = DEFAULT_LOCALE): Cart {
  return {
    id: ctCart.id,
    customerId: ctCart.customerId,
    anonymousId: ctCart.anonymousId,
    lineItems: ctCart.lineItems.map((item) => toCartLineItem(item, locale)),
    discounts: ctCart.discountCodes
      .filter((dc) => dc.state === "MatchesCart")
      .map((dc) => ({
        id: dc.discountCode.id,
        name: "Discount",
        type: "fixed" as const,
        value: 0,
        discountedAmount: {
          amount: 0,
          currency: ctCart.totalPrice.currencyCode,
          formatted: formatPrice(0, ctCart.totalPrice.currencyCode),
        },
      })),
    shippingInfo: ctCart.shippingInfo
      ? {
          methodId: ctCart.shippingInfo.shippingMethod?.id || "",
          methodName: ctCart.shippingInfo.shippingMethodName,
          price: {
            amount: ctCart.shippingInfo.price.centAmount,
            currency: ctCart.shippingInfo.price.currencyCode,
            formatted: formatPrice(
              ctCart.shippingInfo.price.centAmount,
              ctCart.shippingInfo.price.currencyCode
            ),
          },
        }
      : undefined,
    totals: calculateTotals(ctCart),
    itemCount: ctCart.lineItems.reduce((sum, item) => sum + item.quantity, 0),
    currency: ctCart.totalPrice.currencyCode,
    locale: ctCart.locale || locale,
    createdAt: ctCart.createdAt,
    updatedAt: ctCart.lastModifiedAt,
  };
}

// ============================================
// Cart Operations
// ============================================

/**
 * Create a new cart
 */
export async function createCart(options: {
  customerId?: string;
  anonymousId?: string;
  currency?: string;
  country?: string;
}): Promise<Cart> {
  const {
    customerId,
    anonymousId,
    currency = DEFAULT_CURRENCY,
    country = "US",
  } = options;

  log.debug("Creating new cart", { customerId, anonymousId });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.post<CTCart>("/carts", {
      currency,
      country,
      customerId,
      anonymousId,
    });

    return toCart(response.data);
  } catch (error) {
    throw new ExternalServiceError("Commercetools", "Failed to create cart", error);
  }
}

/**
 * Get cart by ID
 */
export async function getCartById(id: string): Promise<Cart> {
  log.debug("Fetching cart by ID", { id });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.get<CTCart>(`/carts/${id}`);

    return toCart(response.data);
  } catch (error) {
    if ((error as { statusCode?: number }).statusCode === 404) {
      throw new NotFoundError("Cart", `Cart with ID ${id} not found`);
    }
    throw new ExternalServiceError("Commercetools", "Failed to fetch cart", error);
  }
}

/**
 * Get cart by customer ID
 */
export async function getCartByCustomerId(customerId: string): Promise<Cart | null> {
  log.debug("Fetching cart by customer ID", { customerId });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.get<CTCart>(`/carts/customer-id=${customerId}`);

    return toCart(response.data);
  } catch (error) {
    if ((error as { statusCode?: number }).statusCode === 404) {
      return null;
    }
    throw new ExternalServiceError("Commercetools", "Failed to fetch cart", error);
  }
}

/**
 * Update cart with actions
 */
async function updateCart(
  cartId: string,
  version: number,
  actions: CTCartAction[]
): Promise<Cart> {
  log.debug("Updating cart", { cartId, actions: actions.map((a) => a.action) });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.post<CTCart>(`/carts/${cartId}`, {
      version,
      actions,
    });

    return toCart(response.data);
  } catch (error) {
    throw new ExternalServiceError("Commercetools", "Failed to update cart", error);
  }
}

/**
 * Get cart version (for optimistic locking)
 */
async function getCartVersion(cartId: string): Promise<number> {
  const _cart = await getCartById(cartId);
  // We need to fetch the raw version from CT
  const client = await createCommercetoolsClient();
  const response = await client.get<CTCart>(`/carts/${cartId}`);
  return response.data.version;
}

/**
 * Add item to cart
 */
export async function addToCart(
  cartId: string,
  input: AddToCartInput
): Promise<Cart> {
  log.debug("Adding item to cart", { cartId, input });

  const version = await getCartVersion(cartId);

  return updateCart(cartId, version, [
    {
      action: "addLineItem",
      productId: input.productId,
      variantId: input.variantId ? parseInt(input.variantId, 10) : undefined,
      quantity: input.quantity,
    },
  ]);
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(
  cartId: string,
  input: UpdateCartItemInput
): Promise<Cart> {
  log.debug("Updating cart item", { cartId, input });

  const version = await getCartVersion(cartId);

  if (input.quantity === 0) {
    return updateCart(cartId, version, [
      {
        action: "removeLineItem",
        lineItemId: input.lineItemId,
      },
    ]);
  }

  return updateCart(cartId, version, [
    {
      action: "changeLineItemQuantity",
      lineItemId: input.lineItemId,
      quantity: input.quantity,
    },
  ]);
}

/**
 * Remove item from cart
 */
export async function removeFromCart(
  cartId: string,
  lineItemId: string
): Promise<Cart> {
  log.debug("Removing item from cart", { cartId, lineItemId });

  const version = await getCartVersion(cartId);

  return updateCart(cartId, version, [
    {
      action: "removeLineItem",
      lineItemId,
    },
  ]);
}

/**
 * Apply discount code to cart
 */
export async function applyDiscountCode(
  cartId: string,
  code: string
): Promise<Cart> {
  log.debug("Applying discount code", { cartId, code });

  const version = await getCartVersion(cartId);

  return updateCart(cartId, version, [
    {
      action: "addDiscountCode",
      code,
    },
  ]);
}

/**
 * Remove discount code from cart
 */
export async function removeDiscountCode(
  cartId: string,
  discountCodeId: string
): Promise<Cart> {
  log.debug("Removing discount code", { cartId, discountCodeId });

  const version = await getCartVersion(cartId);

  return updateCart(cartId, version, [
    {
      action: "removeDiscountCode",
      discountCode: {
        typeId: "discount-code",
        id: discountCodeId,
      },
    },
  ]);
}

/**
 * Clear all items from cart
 */
export async function clearCart(cartId: string): Promise<Cart> {
  log.debug("Clearing cart", { cartId });

  const cart = await getCartById(cartId);
  const version = await getCartVersion(cartId);

  const actions: CTCartAction[] = cart.lineItems.map((item) => ({
    action: "removeLineItem" as const,
    lineItemId: item.id,
  }));

  if (actions.length === 0) {
    return cart;
  }

  return updateCart(cartId, version, actions);
}

/**
 * Delete cart
 */
export async function deleteCart(cartId: string): Promise<void> {
  log.debug("Deleting cart", { cartId });

  try {
    const version = await getCartVersion(cartId);
    const client = await createCommercetoolsClient();
    await client.delete(`/carts/${cartId}?version=${version}`);
  } catch (error) {
    throw new ExternalServiceError("Commercetools", "Failed to delete cart", error);
  }
}
