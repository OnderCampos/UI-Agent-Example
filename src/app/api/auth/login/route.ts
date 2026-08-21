/**
 * Login API Route
 * POST /api/auth/login - Authenticate user
 */

import { NextRequest, NextResponse } from "next/server";
import { getAuthService } from "@/services";
import { isAppError, toAppError, } from "@/lib/errors";
import { z } from "zod";
import { validate, emailSchema } from "@/lib/validation";

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const credentials = validate(loginSchema, body);

    const authService = getAuthService();
    const session = await authService.login(credentials);

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
      maxAge: credentials.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7, // 30 days or 7 days
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
