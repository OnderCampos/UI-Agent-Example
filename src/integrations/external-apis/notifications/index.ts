/**
 * Notifications Adapter
 * Handles email sending via Resend
 */

import { logger } from "@/lib/logger";
import type {
  NotificationApiConfig,
  EmailOptions,
  EmailSendResult,
  EmailRecipient,
} from "./types";

// Re-export types
export * from "./types";

const log = logger.child("Notifications");

/**
 * Gets configuration from environment variables
 */
export function getNotificationConfig(): NotificationApiConfig {
  return {
    apiKey: process.env.RESEND_API_KEY || "",
    fromEmail: process.env.EMAIL_FROM || "noreply@pricesmart.com",
    fromName: process.env.EMAIL_FROM_NAME || "PriceSmart",
    replyTo: process.env.EMAIL_REPLY_TO,
  };
}

/**
 * Notification adapter for Resend
 */
export class NotificationAdapter {
  private config: NotificationApiConfig;
  private baseUrl = "https://api.resend.com";

  constructor(config?: NotificationApiConfig) {
    this.config = config || getNotificationConfig();
  }

  /**
   * Send an email using Resend
   */
  async sendEmail(
    options: EmailOptions,
    html: string,
    text?: string
  ): Promise<EmailSendResult> {
    log.debug("Sending email", { to: options.to, subject: options.subject });

    // In mock mode, just log and return success
    if (process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !this.config.apiKey) {
      log.info("Mock: Email sent", { to: options.to, subject: options.subject });
      return {
        id: `mock-${Date.now()}`,
        success: true,
      };
    }

    try {
      const recipients = Array.isArray(options.to) ? options.to : [options.to];
      const toEmails = recipients.map((r) => 
        r.name ? `${r.name} <${r.email}>` : r.email
      );

      const payload: Record<string, unknown> = {
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: toEmails,
        subject: options.subject,
        html,
      };

      if (text) {
        payload.text = text;
      }

      if (options.replyTo || this.config.replyTo) {
        payload.reply_to = options.replyTo || this.config.replyTo;
      }

      if (options.cc) {
        payload.cc = options.cc.map((r) => r.email);
      }

      if (options.bcc) {
        payload.bcc = options.bcc.map((r) => r.email);
      }

      if (options.attachments) {
        payload.attachments = options.attachments.map((a) => ({
          filename: a.filename,
          content: typeof a.content === "string" 
            ? a.content 
            : a.content.toString("base64"),
        }));
      }

      if (options.tags) {
        payload.tags = options.tags;
      }

      const response = await fetch(`${this.baseUrl}/emails`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send email");
      }

      log.info("Email sent successfully", { id: result.id });

      return {
        id: result.id,
        success: true,
      };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      log.error("Failed to send email", err, { errorMessage: err.message });

      return {
        id: "",
        success: false,
        error: err.message,
      };
    }
  }

  /**
   * Send a batch of emails
   */
  async sendBatch(
    emails: Array<{
      options: EmailOptions;
      html: string;
      text?: string;
    }>
  ): Promise<EmailSendResult[]> {
    log.debug("Sending batch emails", { count: emails.length });

    // For now, send emails sequentially
    // Resend supports batch API which could be implemented for better performance
    const results: EmailSendResult[] = [];

    for (const email of emails) {
      const result = await this.sendEmail(email.options, email.html, email.text);
      results.push(result);
    }

    return results;
  }

  /**
   * Validate email address format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Format recipient for display
   */
  formatRecipient(recipient: EmailRecipient): string {
    return recipient.name 
      ? `${recipient.name} <${recipient.email}>` 
      : recipient.email;
  }
}

// Export singleton instance
let instance: NotificationAdapter | null = null;

export function getNotificationAdapter(): NotificationAdapter {
  if (!instance) {
    instance = new NotificationAdapter();
  }
  return instance;
}
