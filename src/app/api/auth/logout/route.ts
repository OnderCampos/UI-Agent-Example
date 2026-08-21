/**
 * Logout API Route
 * POST /api/auth/logout - Logout user
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthService } from "@/services";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (accessToken) {
      const authService = getAuthService();
      await authService.logout(accessToken);
    }

    const response = NextResponse.json({
      success: true,
      data: { message: "Logged out successfully" },
    });

    // Clear auth cookies
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return response;
  } catch {
    // Always return success for logout
    const response = NextResponse.json({
      success: true,
      data: { message: "Logged out successfully" },
    });

    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return response;
  }
}
