/**
 * Current User API Route
 * GET /api/auth/me - Get current authenticated user
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthService } from "@/services";
import { isAppError, toAppError, AuthenticationError } from "@/lib/errors";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      throw new AuthenticationError("Not authenticated");
    }

    const authService = getAuthService();
    const user = await authService.getCurrentUser(accessToken);

    return NextResponse.json({
      success: true,
      data: user,
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
