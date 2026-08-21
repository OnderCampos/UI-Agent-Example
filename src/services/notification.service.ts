/**
 * Notification Service
 * Orchestrates email and notification sending
 */

import { getNotificationAdapter } from "@/integrations/external-apis/notifications";
import {
  renderOrderConfirmationEmail,
  renderShippingNotificationEmail,
  renderPasswordResetEmail,
  renderWelcomeEmail,
} from "@/emails";
import type {
  EmailRecipient,
  EmailSendResult,
  NotificationTemplate,
  OrderConfirmationEmailData,
  ShippingNotificationEmailData,
  PasswordResetEmailData,
  WelcomeEmailData,
} from "@/integrations/external-apis/notifications/types";
import { logger } from "@/lib/logger";

const log = logger.child("NotificationService");

/**
 * Notification service class
 */
export class NotificationService {
  private adapter = getNotificationAdapter();

  /**
   * Send order confirmation email
   */
  async sendOrderConfirmation(
    recipient: EmailRecipient,
    data: OrderConfirmationEmailData
  ): Promise<EmailSendResult> {
    log.debug("Sending order confirmation", { orderNumber: data.orderNumber });

    const html = renderOrderConfirmationEmail(data);

    return this.adapter.sendEmail(
      {
        to: recipient,
        subject: `Order Confirmed: #${data.orderNumber}`,
        tags: [
          { name: "type", value: "order-confirmation" },
          { name: "order", value: data.orderNumber },
        ],
      },
      html
    );
  }

  /**
   * Send shipping notification email
   */
  async sendShippingNotification(
    recipient: EmailRecipient,
    data: ShippingNotificationEmailData
  ): Promise<EmailSendResult> {
    log.debug("Sending shipping notification", { orderNumber: data.orderNumber });

    const html = renderShippingNotificationEmail(data);

    return this.adapter.sendEmail(
      {
        to: recipient,
        subject: `Your order #${data.orderNumber} has shipped!`,
        tags: [
          { name: "type", value: "shipping-notification" },
          { name: "order", value: data.orderNumber },
        ],
      },
      html
    );
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(
    recipient: EmailRecipient,
    data: PasswordResetEmailData
  ): Promise<EmailSendResult> {
    log.debug("Sending password reset", { email: recipient.email });

    const html = renderPasswordResetEmail(data);

    return this.adapter.sendEmail(
      {
        to: recipient,
        subject: "Reset Your PriceSmart Password",
        tags: [{ name: "type", value: "password-reset" }],
      },
      html
    );
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(
    recipient: EmailRecipient,
    data: WelcomeEmailData
  ): Promise<EmailSendResult> {
    log.debug("Sending welcome email", { email: recipient.email });

    const html = renderWelcomeEmail(data);

    return this.adapter.sendEmail(
      {
        to: recipient,
        subject: "Welcome to PriceSmart!",
        tags: [
          { name: "type", value: "welcome" },
          ...(data.membershipType ? [{ name: "membership", value: data.membershipType }] : []),
        ],
      },
      html
    );
  }

  /**
   * Send notification by template name
   */
  async sendByTemplate<T>(
    template: NotificationTemplate,
    recipient: EmailRecipient,
    data: T
  ): Promise<EmailSendResult> {
    switch (template) {
      case "order-confirmation":
        return this.sendOrderConfirmation(
          recipient,
          data as OrderConfirmationEmailData
        );
      case "shipping-notification":
        return this.sendShippingNotification(
          recipient,
          data as ShippingNotificationEmailData
        );
      case "password-reset":
        return this.sendPasswordReset(
          recipient,
          data as PasswordResetEmailData
        );
      case "welcome":
        return this.sendWelcomeEmail(recipient, data as WelcomeEmailData);
      default:
        throw new Error(`Unknown template: ${template}`);
    }
  }

  /**
   * Validate email address
   */
  isValidEmail(email: string): boolean {
    return this.adapter.isValidEmail(email);
  }
}

// Export singleton instance
let notificationServiceInstance: NotificationService | null = null;

export function getNotificationService(): NotificationService {
  if (!notificationServiceInstance) {
    notificationServiceInstance = new NotificationService();
  }
  return notificationServiceInstance;
}
