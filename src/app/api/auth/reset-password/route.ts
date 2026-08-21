/**
 * Reset Password API Route
 * POST /api/auth/reset-password - Reset password with token
 */

import { NextRequest, NextResponse } from "next/server";
import { isAppError, toAppError, ValidationError } from "@/lib/errors";
import { z } from "zod";
import { validate } from "@/lib/validation";
import { logger } from "@/lib/logger";

const log = logger.child("ResetPasswordRoute");

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = validate(resetPasswordSchema, body);

    log.info("Password reset attempt", { tokenLength: token.length });

    // In a real implementation, this would:
    // 1. Validate the token exists and hasn't expired
    // 2. Get the user associated with the token
    // 3. Update the user's password
    // 4. Invalidate the token
    // 5. Optionally invalidate all existing sessions
    
    // For demo purposes, we accept any token
    // In production, this would integrate with Digital Identity API
    
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Demo: Accept any token that looks valid (at least 10 chars)
    if (token.length < 10) {
      throw new ValidationError("Invalid or expired reset token");
    }

    return NextResponse.json({
      success: true,
      data: {
        message: "Password has been reset successfully.",
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
