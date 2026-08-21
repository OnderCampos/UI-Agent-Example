/**
 * Notification Types
 * Types for email and notification operations
 */

/**
 * Email recipient
 */
export interface EmailRecipient {
  email: string;
  name?: string;
}

/**
 * Email attachment
 */
export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

/**
 * Base email options
 */
export interface EmailOptions {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  replyTo?: string;
  cc?: EmailRecipient[];
  bcc?: EmailRecipient[];
  attachments?: EmailAttachment[];
  tags?: { name: string; value: string }[];
}

/**
 * Email send result
 */
export interface EmailSendResult {
  id: string;
  success: boolean;
  error?: string;
}

/**
 * Order confirmation email data
 */
export interface OrderConfirmationEmailData {
  orderNumber: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: string;
    image?: string;
  }[];
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  estimatedDelivery?: string;
  trackingUrl?: string;
}

/**
 * Shipping notification email data
 */
export interface ShippingNotificationEmailData {
  orderNumber: string;
  customerName: string;
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery: string;
  items: {
    name: string;
    quantity: number;
    image?: string;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

/**
 * Password reset email data
 */
export interface PasswordResetEmailData {
  customerName: string;
  resetUrl: string;
  expiresIn: string;
}

/**
 * Welcome email data
 */
export interface WelcomeEmailData {
  customerName: string;
  membershipType?: string;
  memberId?: string;
  verifyUrl?: string;
}

/**
 * Notification template types
 */
export type NotificationTemplate =
  | "order-confirmation"
  | "shipping-notification"
  | "password-reset"
  | "welcome"
  | "order-delivered"
  | "membership-renewal"
  | "membership-expiring";

/**
 * Notification channel
 */
export type NotificationChannel = "email" | "push" | "sms";

/**
 * Notification request
 */
export interface NotificationRequest<T = unknown> {
  template: NotificationTemplate;
  channel: NotificationChannel;
  recipient: EmailRecipient;
  data: T;
  options?: {
    priority?: "high" | "normal" | "low";
    scheduledFor?: Date;
  };
}

/**
 * Notification API configuration
 */
export interface NotificationApiConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
}
