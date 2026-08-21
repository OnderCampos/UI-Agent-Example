/**
 * External APIs Integration
 * Re-exports all external API adapters
 */

// Base adapter
export { ExternalApiAdapter, createExternalApiClient, type ExternalApiConfig } from "./base";

// Digital Identity
export {
  DigitalIdentityAdapter,
  getDigitalIdentityAdapter,
  getDigitalIdentityConfig,
  type DigitalIdentityConfig,
} from "./digital-identity";

// Membership
export {
  MembershipAdapter,
  getMembershipAdapter,
  getMembershipConfig,
  type MembershipConfig,
} from "./membership";

// OMS Wrapper
export {
  OmsWrapperAdapter,
  getOmsWrapperAdapter,
  getOmsConfig,
  type OmsConfig,
  type OmsOrderSubmission,
  type OmsOrderStatus,
} from "./oms-wrapper";

// Delivery Windows
export {
  DeliveryWindowsAdapter,
  getDeliveryWindowsAdapter,
  getDeliveryWindowsConfig,
  type DeliveryWindowsConfig,
  type DeliveryWindow,
  type DeliveryBooking,
} from "./delivery-windows";

// Payments
export {
  PaymentsAdapter,
  getPaymentsAdapter,
  getPaymentsConfig,
  type PaymentsConfig,
  type PaymentMethod,
  type PaymentIntent,
  type PaymentResult,
  type RefundResult,
} from "./payments";

// Tax
export {
  TaxAdapter,
  getTaxAdapter,
  getTaxConfig,
  type TaxConfig,
  type TaxCalculationRequest,
  type TaxCalculationResult,
  type TaxExemption,
} from "./tax";

// Stores
export {
  StoreAdapter,
  getStoreAdapter,
  getStoreApiConfig,
  type StoreApiConfig,
} from "./stores";

// Notifications
export {
  NotificationAdapter,
  getNotificationAdapter,
  getNotificationConfig,
} from "./notifications";

// E-Invoice
export {
  EInvoiceService,
  EInvoiceAdapterFactory,
  getEInvoiceService,
} from "./einvoice";
