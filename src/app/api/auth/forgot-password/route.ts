/**
 * Forgot Password API Route
 * POST /api/auth/forgot-password - Request password reset email
 */

import { NextRequest, NextResponse } from "next/server";
import { isAppError, toAppError } from "@/lib/errors";
import { z } from "zod";
import { validate, emailSchema } from "@/lib/validation";
import { logger } from "@/lib/logger";

const log = logger.child("ForgotPasswordRoute");

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = validate(forgotPasswordSchema, body);

    log.info("Password reset requested", { email });

    // In a real implementation, this would:
    // 1. Check if user exists
    // 2. Generate a secure token
    // 3. Store token with expiry in database
    // 4. Send email with reset link
    
    // For demo purposes, we always return success to prevent email enumeration
    // In production, this would integrate with Digital Identity API
    
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      data: {
        message: "If an account exists with this email, you will receive password reset instructions.",
      },
    });
  } catch (error) {
    const appError = isAppError(error) ? error : toAppError(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: appError.code,
          message: appError.message,
        },
      },
      { status: appError.statusCode }
    );
  }
}
