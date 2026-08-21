/**
 * Send Notification API Route
 * Internal endpoint for triggering notifications
 */

import { NextRequest, NextResponse } from "next/server";
import { getNotificationService } from "@/services/notification.service";
import type { 
  NotificationTemplate, 
  EmailRecipient 
} from "@/integrations/external-apis/notifications/types";

interface SendNotificationRequest {
  template: NotificationTemplate;
  recipient: EmailRecipient;
  data: unknown;
}

export async function POST(request: NextRequest) {
  // Check for internal API key or authenticated admin
  const apiKey = request.headers.get("x-api-key");
  const internalKey = process.env.INTERNAL_API_KEY;

  // In production, validate the API key
  if (internalKey && apiKey !== internalKey) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid API key",
        },
      },
      { status: 401 }
    );
  }

  try {
    const body: SendNotificationRequest = await request.json();
    const { template, recipient, data } = body;

    if (!template || !recipient || !data) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Template, recipient, and data are required",
          },
        },
        { status: 400 }
      );
    }

    const notificationService = getNotificationService();

    // Validate email
    if (!notificationService.isValidEmail(recipient.email)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_EMAIL",
            message: "Invalid recipient email address",
          },
        },
        { status: 400 }
      );
    }

    const result = await notificationService.sendByTemplate(
      template,
      recipient,
      data
    );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SEND_FAILED",
            message: result.error || "Failed to send notification",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: result.id,
        template,
        recipient: recipient.email,
      },
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to send notification",
        },
      },
      { status: 500 }
    );
  }
}
