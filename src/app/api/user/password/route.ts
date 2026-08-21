/**
 * Change Password API Route
 * POST /api/user/password - Change user password
 */

import { NextRequest, NextResponse } from "next/server";
import { getAuthService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";
import { z } from "zod";
import { validate } from "@/lib/validation";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access_token")?.value;

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

    const body = await request.json();
    const { currentPassword, newPassword } = validate(changePasswordSchema, body);

    const authService = getAuthService();
    await authService.changePassword(accessToken, currentPassword, newPassword);

    return NextResponse.json({
      success: true,
      data: {
        message: "Password changed successfully",
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
