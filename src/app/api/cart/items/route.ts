/**
 * Cart Items API Route
 * POST /api/cart/items - Add item to cart
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCartService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";
import { validate, cartItemSchema } from "@/lib/validation";

const CART_COOKIE = "cart_id";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    let cartId = cookieStore.get(CART_COOKIE)?.value;

    const body = await request.json();
    const validatedInput = validate(cartItemSchema, body);

    const cartService = getCartService();

    // Create cart if it doesn't exist
    if (!cartId) {
      const cart = await cartService.getOrCreateCart({
        anonymousId: `anon-${Date.now()}`,
      });
      cartId = cart.id;
    }

    const cart = await cartService.addToCart(cartId, {
      productId: validatedInput.productId,
      variantId: validatedInput.variantId,
      quantity: validatedInput.quantity,
    });

    const response = NextResponse.json({
      success: true,
      data: cart,
    });

    // Ensure cart cookie is set
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
