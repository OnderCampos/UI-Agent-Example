/**
 * Register API Route
 * POST /api/auth/register - Create new user account
 */

import { NextRequest, NextResponse } from "next/server";
import { getAuthService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";
import { z } from "zod";
import { validate, emailSchema } from "@/lib/validation";

const registerSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  subscribeNewsletter: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const registrationData = validate(registerSchema, body);

    const authService = getAuthService();
    const session = await authService.register(registrationData);

    const response = NextResponse.json({
      success: true,
      data: {
        user: session.user,
        expiresAt: session.expiresAt,
      },
    });

    // Set auth cookies
    response.cookies.set("access_token", session.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: session.tokens.expiresIn,
    });

    response.cookies.set("refresh_token", session.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    const appError = isAppError(error) ? error : toAppError(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: appError.code,
          message: appError.message,
          details:
            "errors" in appError
              ? (appError as { errors: Record<string, string[]> }).errors
              : undefined,
        },
      },
      { status: appError.statusCode }
    );
  }
}
