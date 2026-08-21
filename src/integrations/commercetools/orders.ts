/**
 * Commercetools Order Operations
 */

import { createCommercetoolsClient } from "./client";
import type { CTOrder, CTPagedQueryResult, CTOrderAction } from "./types";
import type {
  Order,
  OrderListItem,
  OrderStatus,
  PaymentStatus,
  CreateOrderInput,
  OrderQuery,
} from "@/types/order";
import type { Address } from "@/lib/validation";
import { NotFoundError, ExternalServiceError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { DEFAULT_LOCALE } from "@/lib/constants";

const log = logger.child("CT-Orders");

/**
 * Maps CT order state to application OrderStatus
 */
function toOrderStatus(ctOrder: CTOrder): OrderStatus {
  const { orderState, shipmentState } = ctOrder;

  if (orderState === "Cancelled") return "cancelled";
  if (shipmentState === "Delivered") return "delivered";
  if (shipmentState === "Shipped") return "shipped";
  if (orderState === "Confirmed") return "confirmed";
  if (orderState === "Complete") return "delivered";

  return "pending";
}

/**
 * Maps CT payment state to application PaymentStatus
 */
function toPaymentStatus(ctPaymentState?: string): PaymentStatus {
  switch (ctPaymentState) {
    case "Paid":
      return "captured";
    case "Pending":
      return "pending";
    case "Failed":
      return "failed";
    case "CreditOwed":
      return "refunded";
    default:
      return "pending";
  }
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
 * Converts CT address to application Address
 */
function toAddress(ctAddress: CTOrder["shippingAddress"]): Address {
  if (!ctAddress) {
    return {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    };
  }

  return {
    firstName: ctAddress.firstName || "",
    lastName: ctAddress.lastName || "",
    streetAddress: [ctAddress.streetName, ctAddress.streetNumber]
      .filter(Boolean)
      .join(" "),
    streetAddress2: ctAddress.additionalStreetInfo,
    city: ctAddress.city || "",
    state: ctAddress.state || ctAddress.region || "",
    postalCode: ctAddress.postalCode || "",
    country: ctAddress.country,
    phone: ctAddress.phone,
  };
}

/**
 * Converts application Address to CT address format
 */
function toCTAddress(address: Address): CTOrder["shippingAddress"] {
  const parts = address.streetAddress.split(" ");
  const streetNumber = parts.pop() || "";
  const streetName = parts.join(" ") || address.streetAddress;

  return {
    firstName: address.firstName,
    lastName: address.lastName,
    streetName,
    streetNumber,
    additionalStreetInfo: address.streetAddress2,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
    phone: address.phone,
  };
}

/**
 * Converts CT order to Order
 */
function toOrder(ctOrder: CTOrder, locale: string = DEFAULT_LOCALE): Order {
  const currency = ctOrder.totalPrice.currencyCode;

  return {
    id: ctOrder.id,
    orderNumber: ctOrder.orderNumber || ctOrder.id,
    customerId: ctOrder.customerId || "",
    email: ctOrder.customerEmail || "",
    status: toOrderStatus(ctOrder),
    lineItems: ctOrder.lineItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      variantId: String(item.variant.id),
      sku: item.variant.sku || "",
      name:
        item.name[locale] ||
        item.name["en"] ||
        Object.values(item.name)[0] ||
        "",
      slug: item.productSlug?.[locale] || item.productSlug?.["en"] || "",
      image: item.variant.images?.[0]
        ? {
            id: "img-0",
            url: item.variant.images[0].url,
            alt: "",
            isDefault: true,
          }
        : null,
      quantity: item.quantity,
      unitPrice: {
        amount: item.price.value.centAmount,
        currency: item.price.value.currencyCode,
        formatted: formatPrice(
          item.price.value.centAmount,
          item.price.value.currencyCode
        ),
      },
      totalPrice: {
        amount: item.totalPrice.centAmount,
        currency: item.totalPrice.currencyCode,
        formatted: formatPrice(
          item.totalPrice.centAmount,
          item.totalPrice.currencyCode
        ),
      },
      attributes: {},
    })),
    shipping: {
      method: ctOrder.shippingInfo?.shippingMethodName || "",
      methodId: ctOrder.shippingInfo?.shippingMethod?.id || "",
      price: {
        amount: ctOrder.shippingInfo?.price.centAmount || 0,
        currency,
        formatted: formatPrice(
          ctOrder.shippingInfo?.price.centAmount || 0,
          currency
        ),
      },
      address: toAddress(ctOrder.shippingAddress),
      trackingNumber: ctOrder.shippingInfo?.deliveries?.[0]?.parcels?.[0]?.trackingData?.trackingId,
      carrier: ctOrder.shippingInfo?.deliveries?.[0]?.parcels?.[0]?.trackingData?.carrier,
    },
    billingAddress: toAddress(ctOrder.billingAddress),
    payment: {
      id: ctOrder.paymentInfo?.payments?.[0]?.id || "",
      method: "card",
      status: toPaymentStatus(ctOrder.paymentState),
      amount: {
        amount: ctOrder.totalPrice.centAmount,
        currency,
        formatted: formatPrice(ctOrder.totalPrice.centAmount, currency),
      },
    },
    discounts: ctOrder.discountCodes.map((dc) => ({
      id: dc.discountCode.id,
      name: "Discount",
      discountedAmount: {
        amount: 0,
        currency,
        formatted: formatPrice(0, currency),
      },
    })),
    totals: {
      subtotal: {
        amount: ctOrder.lineItems.reduce(
          (sum, item) => sum + item.totalPrice.centAmount,
          0
        ),
        currency,
        formatted: formatPrice(
          ctOrder.lineItems.reduce(
            (sum, item) => sum + item.totalPrice.centAmount,
            0
          ),
          currency
        ),
      },
      shipping: {
        amount: ctOrder.shippingInfo?.price.centAmount || 0,
        currency,
        formatted: formatPrice(
          ctOrder.shippingInfo?.price.centAmount || 0,
          currency
        ),
      },
      tax: {
        amount: ctOrder.taxedPrice
          ? ctOrder.taxedPrice.totalGross.centAmount -
            ctOrder.taxedPrice.totalNet.centAmount
          : 0,
        currency,
        formatted: formatPrice(
          ctOrder.taxedPrice
            ? ctOrder.taxedPrice.totalGross.centAmount -
                ctOrder.taxedPrice.totalNet.centAmount
            : 0,
          currency
        ),
      },
      total: {
        amount: ctOrder.totalPrice.centAmount,
        currency,
        formatted: formatPrice(ctOrder.totalPrice.centAmount, currency),
      },
    },
    statusHistory: [
      {
        status: toOrderStatus(ctOrder),
        timestamp: ctOrder.lastModifiedAt,
      },
    ],
    createdAt: ctOrder.createdAt,
    updatedAt: ctOrder.lastModifiedAt,
  };
}

/**
 * Converts CT order to OrderListItem
 */
function toOrderListItem(ctOrder: CTOrder): OrderListItem {
  const currency = ctOrder.totalPrice.currencyCode;

  return {
    id: ctOrder.id,
    orderNumber: ctOrder.orderNumber || ctOrder.id,
    status: toOrderStatus(ctOrder),
    itemCount: ctOrder.lineItems.reduce((sum, item) => sum + item.quantity, 0),
    total: {
      amount: ctOrder.totalPrice.centAmount,
      currency,
      formatted: formatPrice(ctOrder.totalPrice.centAmount, currency),
    },
    createdAt: ctOrder.createdAt,
    firstItemImage: ctOrder.lineItems[0]?.variant.images?.[0]
      ? {
          id: "img-0",
          url: ctOrder.lineItems[0].variant.images[0].url,
          alt: "",
          isDefault: true,
        }
      : undefined,
  };
}

// ============================================
// Order Operations
// ============================================

/**
 * Create order from cart
 */
export async function createOrderFromCart(
  input: CreateOrderInput
): Promise<Order> {
  log.debug("Creating order from cart", { cartId: input.cartId });

  try {
    const client = await createCommercetoolsClient();

    // First, update the cart with shipping/billing addresses
    const cartResponse = await client.get<{ version: number }>(
      `/carts/${input.cartId}`
    );

    await client.post(`/carts/${input.cartId}`, {
      version: cartResponse.data.version,
      actions: [
        {
          action: "setShippingAddress",
          address: toCTAddress(input.shippingAddress),
        },
        {
          action: "setBillingAddress",
          address: toCTAddress(input.billingAddress),
        },
      ],
    });

    // Get updated cart version
    const updatedCartResponse = await client.get<{ id: string; version: number }>(
      `/carts/${input.cartId}`
    );

    // Create order from cart
    const orderResponse = await client.post<CTOrder>("/orders", {
      cart: {
        typeId: "cart",
        id: updatedCartResponse.data.id,
      },
      version: updatedCartResponse.data.version,
    });

    return toOrder(orderResponse.data);
  } catch (error) {
    throw new ExternalServiceError(
      "Commercetools",
      "Failed to create order",
      error
    );
  }
}

/**
 * Get order by ID
 */
export async function getOrderById(id: string): Promise<Order> {
  log.debug("Fetching order by ID", { id });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.get<CTOrder>(`/orders/${id}`);

    return toOrder(response.data);
  } catch (error) {
    if ((error as { statusCode?: number }).statusCode === 404) {
      throw new NotFoundError("Order", `Order with ID ${id} not found`);
    }
    throw new ExternalServiceError(
      "Commercetools",
      "Failed to fetch order",
      error
    );
  }
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(orderNumber: string): Promise<Order> {
  log.debug("Fetching order by number", { orderNumber });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.get<CTOrder>(
      `/orders/order-number=${orderNumber}`
    );

    return toOrder(response.data);
  } catch (error) {
    if ((error as { statusCode?: number }).statusCode === 404) {
      throw new NotFoundError(
        "Order",
        `Order with number ${orderNumber} not found`
      );
    }
    throw new ExternalServiceError(
      "Commercetools",
      "Failed to fetch order",
      error
    );
  }
}

/**
 * Get orders by customer ID
 */
export async function getOrdersByCustomerId(
  customerId: string,
  query: OrderQuery = {}
): Promise<{ orders: OrderListItem[]; total: number }> {
  const { page = 1, limit = 20, status, startDate, endDate } = query;

  log.debug("Fetching orders by customer ID", { customerId, query });

  try {
    const client = await createCommercetoolsClient();

    const whereConditions = [`customerId="${customerId}"`];

    if (status) {
      const ctStatus = status === "cancelled" ? "Cancelled" : "Open";
      whereConditions.push(`orderState="${ctStatus}"`);
    }

    if (startDate) {
      whereConditions.push(`createdAt >= "${startDate}"`);
    }

    if (endDate) {
      whereConditions.push(`createdAt <= "${endDate}"`);
    }

    const response = await client.get<CTPagedQueryResult<CTOrder>>("/orders", {
      params: {
        where: whereConditions.join(" and "),
        limit,
        offset: (page - 1) * limit,
        sort: "createdAt desc",
      },
    });

    return {
      orders: response.data.results.map(toOrderListItem),
      total: response.data.total || response.data.count,
    };
  } catch (error) {
    throw new ExternalServiceError(
      "Commercetools",
      "Failed to fetch orders",
      error
    );
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<Order> {
  log.debug("Updating order status", { orderId, status });

  try {
    const client = await createCommercetoolsClient();

    // Get current version
    const currentOrder = await client.get<CTOrder>(`/orders/${orderId}`);

    const actions: CTOrderAction[] = [];

    // Map application status to CT actions
    switch (status) {
      case "confirmed":
        actions.push({ action: "changeOrderState", orderState: "Confirmed" });
        break;
      case "processing":
        actions.push({ action: "changeOrderState", orderState: "Confirmed" });
        break;
      case "shipped":
        actions.push({ action: "changeShipmentState", shipmentState: "Shipped" });
        break;
      case "delivered":
        actions.push({ action: "changeShipmentState", shipmentState: "Delivered" });
        actions.push({ action: "changeOrderState", orderState: "Complete" });
        break;
      case "cancelled":
        actions.push({ action: "changeOrderState", orderState: "Cancelled" });
        break;
    }

    if (actions.length === 0) {
      return toOrder(currentOrder.data);
    }

    const response = await client.post<CTOrder>(`/orders/${orderId}`, {
      version: currentOrder.data.version,
      actions,
    });

    return toOrder(response.data);
  } catch (error) {
    throw new ExternalServiceError(
      "Commercetools",
      "Failed to update order status",
      error
    );
  }
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId: string): Promise<Order> {
  return updateOrderStatus(orderId, "cancelled");
}
