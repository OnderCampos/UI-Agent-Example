/**
 * User Profile API Route
 * GET /api/user/profile - Get current user profile
 * PATCH /api/user/profile - Update user profile
 */

import { NextRequest, NextResponse } from "next/server";
import { getAuthService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";
import { z } from "zod";
import { validate } from "@/lib/validation";

const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export async function GET(request: NextRequest) {
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

export async function PATCH(request: NextRequest) {
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
    const updateData = validate(updateProfileSchema, body);

    const authService = getAuthService();
    const user = await authService.updateProfile(accessToken, updateData);

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
