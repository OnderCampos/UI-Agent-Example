/**
 * Cart API Route
 * GET /api/cart - Get current cart
 * POST /api/cart - Create new cart
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCartService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";

const CART_COOKIE = "cart_id";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE)?.value;

    if (!cartId) {
      return NextResponse.json({
        success: true,
        data: null,
      });
    }

    const cartService = getCartService();
    const cart = await cartService.getCartById(cartId);

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    const appError = isAppError(error) ? error : toAppError(error);

    // If cart not found, return null instead of error
    if (appError.code === "NOT_FOUND") {
      return NextResponse.json({
        success: true,
        data: null,
      });
    }

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { customerId, anonymousId } = body;

    const cartService = getCartService();
    const cart = await cartService.getOrCreateCart({
      customerId,
      anonymousId: anonymousId || `anon-${Date.now()}`,
    });

    // Set cart ID in cookie
    const response = NextResponse.json({
      success: true,
      data: cart,
    });

    response.cookies.set(CART_COOKIE, cart.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
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
        },
      },
      { status: appError.statusCode }
    );
  }
}
