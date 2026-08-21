/**
 * Cart Item API Route
 * PATCH /api/cart/items/[lineItemId] - Update item quantity
 * DELETE /api/cart/items/[lineItemId] - Remove item from cart
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCartService } from "@/services";
import { isAppError, toAppError, ValidationError } from "@/lib/errors";

const CART_COOKIE = "cart_id";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ lineItemId: string }> }
) {
  try {
    const { lineItemId } = await params;
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE)?.value;

    if (!cartId) {
      throw new ValidationError("Cart not found");
    }

    const body = await request.json();
    const { quantity } = body;

    if (typeof quantity !== "number" || quantity < 0) {
      throw new ValidationError("Invalid quantity", {
        quantity: ["Quantity must be a non-negative number"],
      });
    }

    const cartService = getCartService();
    const cart = await cartService.updateCartItem(cartId, {
      lineItemId,
      quantity,
    });

    return NextResponse.json({
      success: true,
      data: cart,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ lineItemId: string }> }
) {
  try {
    const { lineItemId } = await params;
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE)?.value;

    if (!cartId) {
      throw new ValidationError("Cart not found");
    }

    const cartService = getCartService();
    const cart = await cartService.removeFromCart(cartId, lineItemId);

    return NextResponse.json({
      success: true,
      data: cart,
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
