/**
 * Contact Form API Route
 * Handles contact form submissions
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getNotificationService } from "@/services/notification.service";
import { logger } from "@/lib/logger";

const log = logger.child("ContactAPI");

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  type: z.enum(["general", "order", "return", "technical", "billing", "membership", "feedback"]),
  message: z.string().min(20),
  orderId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid form data",
            details: validationResult.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    log.info("Contact form submitted", { email: data.email, type: data.type });

    // Generate a ticket ID
    const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;

    // In production, this would:
    // 1. Create a ticket in your support system (Zendesk, Freshdesk, etc.)
    // 2. Send confirmation email to customer
    // 3. Send notification to support team

    // Send confirmation email (mock in dev)
    const _notificationService = getNotificationService();
    
    // Log the submission (in production, store in database)
    log.info("Contact ticket created", {
      ticketId,
      name: data.name,
      email: data.email,
      type: data.type,
      subject: data.subject,
      orderId: data.orderId,
    });

    return NextResponse.json({
      success: true,
      data: {
        ticketId,
        message: "Your message has been received. We'll respond within 24-48 hours.",
      },
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    log.error("Contact form error", err, { rawError: error });
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to submit contact form",
        },
      },
      { status: 500 }
    );
  }
}
