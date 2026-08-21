/**
 * Support Tickets API Route
 * Handles ticket creation and listing
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { cookies } from "next/headers";

const log = logger.child("TicketsAPI");

const createTicketSchema = z.object({
  type: z.enum(["general", "order", "return", "technical", "billing", "membership", "feedback"]),
  priority: z.enum(["low", "normal", "high", "urgent"]).optional().default("normal"),
  subject: z.string().min(5),
  description: z.string().min(20),
  orderId: z.string().optional(),
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// Mock tickets storage (in production, use database)
const mockTickets: Map<string, Record<string, unknown>> = new Map();

export async function GET(request: NextRequest) {
  // Check authentication
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  
  if (!accessToken) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
        },
      },
      { status: 401 }
    );
  }

  // In production, fetch tickets from database/support system
  const tickets = Array.from(mockTickets.values());

  return NextResponse.json({
    success: true,
    data: {
      tickets,
      total: tickets.length,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = createTicketSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid ticket data",
            details: validationResult.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    
    // Generate ticket ID
    const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;
    const now = new Date().toISOString();

    // Create ticket object
    const ticket = {
      id: ticketId,
      ...data,
      status: "open",
      createdAt: now,
      updatedAt: now,
    };

    // Store ticket (mock)
    mockTickets.set(ticketId, ticket);

    log.info("Support ticket created", {
      ticketId,
      type: data.type,
      priority: data.priority,
      subject: data.subject,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: ticketId,
        status: "open",
        message: "Your support ticket has been created. We'll respond as soon as possible.",
      },
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    log.error("Ticket creation error", err, { rawError: error });
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to create support ticket",
        },
      },
      { status: 500 }
    );
  }
}
