/**
 * Commercetools-specific types
 * These map to the Commercetools API response structures
 */

/**
 * Commercetools API response wrapper
 */
export interface CTPagedQueryResult<T> {
  limit: number;
  offset: number;
  count: number;
  total?: number;
  results: T[];
}

/**
 * Commercetools Money type
 */
export interface CTMoney {
  type: "centPrecision" | "highPrecision";
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

/**
 * Commercetools LocalizedString
 */
export interface CTLocalizedString {
  [locale: string]: string;
}

/**
 * Commercetools Image
 */
export interface CTImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
  label?: string;
}

/**
 * Commercetools Product Variant
 */
export interface CTProductVariant {
  id: number;
  sku?: string;
  key?: string;
  prices?: CTPrice[];
  images?: CTImage[];
  attributes?: CTAttribute[];
  availability?: CTProductVariantAvailability;
}

/**
 * Commercetools Price
 */
export interface CTPrice {
  id: string;
  value: CTMoney;
  country?: string;
  customerGroup?: CTReference;
  channel?: CTReference;
  validFrom?: string;
  validUntil?: string;
  discounted?: {
    value: CTMoney;
    discount: CTReference;
  };
}

/**
 * Commercetools Attribute
 */
export interface CTAttribute {
  name: string;
  value: unknown;
}

/**
 * Commercetools Product Variant Availability
 */
export interface CTProductVariantAvailability {
  isOnStock?: boolean;
  availableQuantity?: number;
  restockableInDays?: number;
  channels?: {
    [channelId: string]: {
      isOnStock?: boolean;
      availableQuantity?: number;
      restockableInDays?: number;
    };
  };
}

/**
 * Commercetools Reference
 */
export interface CTReference {
  typeId: string;
  id: string;
  obj?: unknown;
}

/**
 * Commercetools Product
 */
export interface CTProduct {
  id: string;
  version: number;
  key?: string;
  productType: CTReference;
  masterData: {
    current: CTProductData;
    staged: CTProductData;
    published: boolean;
    hasStagedChanges: boolean;
  };
  createdAt: string;
  lastModifiedAt: string;
}

/**
 * Commercetools Product Data
 */
export interface CTProductData {
  name: CTLocalizedString;
  description?: CTLocalizedString;
  slug: CTLocalizedString;
  categories: CTReference[];
  categoryOrderHints?: { [categoryId: string]: string };
  metaTitle?: CTLocalizedString;
  metaDescription?: CTLocalizedString;
  metaKeywords?: CTLocalizedString;
  masterVariant: CTProductVariant;
  variants: CTProductVariant[];
  searchKeywords?: { [locale: string]: { text: string }[] };
}

/**
 * Commercetools Product Projection
 */
export interface CTProductProjection {
  id: string;
  version: number;
  key?: string;
  productType: CTReference;
  name: CTLocalizedString;
  description?: CTLocalizedString;
  slug: CTLocalizedString;
  categories: CTReference[];
  metaTitle?: CTLocalizedString;
  metaDescription?: CTLocalizedString;
  masterVariant: CTProductVariant;
  variants: CTProductVariant[];
  createdAt: string;
  lastModifiedAt: string;
}

/**
 * Commercetools Category
 */
export interface CTCategory {
  id: string;
  version: number;
  key?: string;
  name: CTLocalizedString;
  slug: CTLocalizedString;
  description?: CTLocalizedString;
  ancestors: CTReference[];
  parent?: CTReference;
  orderHint: string;
  externalId?: string;
  metaTitle?: CTLocalizedString;
  metaDescription?: CTLocalizedString;
  assets?: CTAsset[];
  createdAt: string;
  lastModifiedAt: string;
}

/**
 * Commercetools Asset
 */
export interface CTAsset {
  id: string;
  sources: { uri: string; key?: string; dimensions?: { w: number; h: number } }[];
  name: CTLocalizedString;
  description?: CTLocalizedString;
}

/**
 * Commercetools Cart
 */
export interface CTCart {
  id: string;
  version: number;
  key?: string;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  lineItems: CTLineItem[];
  customLineItems: CTCustomLineItem[];
  totalPrice: CTMoney;
  taxedPrice?: CTTaxedPrice;
  shippingAddress?: CTAddress;
  billingAddress?: CTAddress;
  shippingInfo?: CTShippingInfo;
  discountCodes: CTDiscountCodeInfo[];
  country?: string;
  locale?: string;
  cartState: "Active" | "Merged" | "Ordered" | "Frozen";
  inventoryMode?: "None" | "TrackOnly" | "ReserveOnOrder";
  taxMode?: "Platform" | "External" | "ExternalAmount" | "Disabled";
  taxRoundingMode?: "HalfEven" | "HalfUp" | "HalfDown";
  taxCalculationMode?: "LineItemLevel" | "UnitPriceLevel";
  createdAt: string;
  lastModifiedAt: string;
}

/**
 * Commercetools Line Item
 */
export interface CTLineItem {
  id: string;
  productId: string;
  productKey?: string;
  name: CTLocalizedString;
  productSlug?: CTLocalizedString;
  productType: CTReference;
  variant: CTProductVariant;
  price: CTPrice;
  quantity: number;
  totalPrice: CTMoney;
  discountedPrice?: CTDiscountedLineItemPrice;
  discountedPricePerQuantity: CTDiscountedLineItemPriceForQuantity[];
  state: { quantity: number; state: CTReference }[];
  taxRate?: CTTaxRate;
  priceMode: "Platform" | "ExternalTotal" | "ExternalPrice";
  lineItemMode: "Standard" | "GiftLineItem";
  addedAt: string;
  lastModifiedAt: string;
}

/**
 * Commercetools Custom Line Item
 */
export interface CTCustomLineItem {
  id: string;
  name: CTLocalizedString;
  money: CTMoney;
  quantity: number;
  totalPrice: CTMoney;
  slug: string;
}

/**
 * Commercetools Taxed Price
 */
export interface CTTaxedPrice {
  totalNet: CTMoney;
  totalGross: CTMoney;
  taxPortions: { rate: number; amount: CTMoney; name?: string }[];
}

/**
 * Commercetools Address
 */
export interface CTAddress {
  id?: string;
  key?: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  additionalStreetInfo?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  state?: string;
  country: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
}

/**
 * Commercetools Shipping Info
 */
export interface CTShippingInfo {
  shippingMethodName: string;
  price: CTMoney;
  shippingRate: {
    price: CTMoney;
    freeAbove?: CTMoney;
  };
  taxRate?: CTTaxRate;
  taxCategory?: CTReference;
  deliveries: CTDelivery[];
  discountedPrice?: {
    value: CTMoney;
    includedDiscounts: { discount: CTReference; discountedAmount: CTMoney }[];
  };
  shippingMethod?: CTReference;
}

/**
 * Commercetools Tax Rate
 */
export interface CTTaxRate {
  id?: string;
  name: string;
  amount: number;
  includedInPrice: boolean;
  country: string;
  state?: string;
}

/**
 * Commercetools Delivery
 */
export interface CTDelivery {
  id: string;
  createdAt: string;
  items: { id: string; quantity: number }[];
  parcels: {
    id: string;
    createdAt: string;
    measurements?: { heightInMillimeter: number; lengthInMillimeter: number; widthInMillimeter: number; weightInGram: number };
    trackingData?: { trackingId?: string; carrier?: string; provider?: string; providerTransaction?: string; isReturn: boolean };
    items: { id: string; quantity: number }[];
  }[];
  address?: CTAddress;
}

/**
 * Commercetools Discount Code Info
 */
export interface CTDiscountCodeInfo {
  discountCode: CTReference;
  state: "NotActive" | "DoesNotMatchCart" | "MatchesCart" | "MaxApplicationReached" | "ApplicationStoppedByPreviousDiscount";
}

/**
 * Commercetools Discounted Line Item Price
 */
export interface CTDiscountedLineItemPrice {
  value: CTMoney;
  includedDiscounts: { discount: CTReference; discountedAmount: CTMoney }[];
}

/**
 * Commercetools Discounted Line Item Price for Quantity
 */
export interface CTDiscountedLineItemPriceForQuantity {
  quantity: number;
  discountedPrice: CTDiscountedLineItemPrice;
}

/**
 * Commercetools Order
 */
export interface CTOrder {
  id: string;
  version: number;
  orderNumber?: string;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  lineItems: CTLineItem[];
  customLineItems: CTCustomLineItem[];
  totalPrice: CTMoney;
  taxedPrice?: CTTaxedPrice;
  shippingAddress?: CTAddress;
  billingAddress?: CTAddress;
  shippingInfo?: CTShippingInfo;
  discountCodes: CTDiscountCodeInfo[];
  paymentInfo?: {
    payments: CTReference[];
  };
  orderState: "Open" | "Confirmed" | "Complete" | "Cancelled";
  shipmentState?: "Shipped" | "Delivered" | "Ready" | "Pending" | "Partial" | "Backorder" | "Delayed";
  paymentState?: "BalanceDue" | "Failed" | "Pending" | "CreditOwed" | "Paid";
  country?: string;
  locale?: string;
  cart?: CTReference;
  createdAt: string;
  lastModifiedAt: string;
  completedAt?: string;
}

/**
 * Cart action types for updates
 */
export type CTCartAction =
  | { action: "addLineItem"; productId: string; variantId?: number; quantity: number }
  | { action: "removeLineItem"; lineItemId: string; quantity?: number }
  | { action: "changeLineItemQuantity"; lineItemId: string; quantity: number }
  | { action: "setShippingAddress"; address: CTAddress }
  | { action: "setBillingAddress"; address: CTAddress }
  | { action: "addDiscountCode"; code: string }
  | { action: "removeDiscountCode"; discountCode: CTReference }
  | { action: "setShippingMethod"; shippingMethod: CTReference }
  | { action: "setCountry"; country: string }
  | { action: "setLocale"; locale: string }
  | { action: "recalculate"; updateProductData?: boolean };

/**
 * Order action types
 */
export type CTOrderAction =
  | { action: "changeOrderState"; orderState: CTOrder["orderState"] }
  | { action: "changeShipmentState"; shipmentState: NonNullable<CTOrder["shipmentState"]> }
  | { action: "changePaymentState"; paymentState: NonNullable<CTOrder["paymentState"]> }
  | { action: "setOrderNumber"; orderNumber: string };
