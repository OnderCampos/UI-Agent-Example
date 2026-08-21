/**
 * Promo Code API Route
 * POST /api/cart/promo - Apply promo code
 * DELETE /api/cart/promo - Remove promo code
 */

import { NextRequest, NextResponse } from "next/server";
import { isAppError, toAppError, ValidationError } from "@/lib/errors";
import { z } from "zod";
import { validate } from "@/lib/validation";

const applyPromoSchema = z.object({
  code: z.string().min(1, "Promo code is required"),
});

// Mock promo codes
const validPromoCodes: Record<string, { discount: number; type: "percentage" | "fixed"; minOrder?: number }> = {
  SAVE10: { discount: 10, type: "percentage" },
  SAVE20: { discount: 20, type: "percentage", minOrder: 10000 }, // $100 minimum
  FLAT5: { discount: 500, type: "fixed" }, // $5 off
  WELCOME: { discount: 15, type: "percentage" },
  MEMBER25: { discount: 25, type: "percentage", minOrder: 15000 }, // $150 minimum
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = validate(applyPromoSchema, body);

    const upperCode = code.toUpperCase();
    const promo = validPromoCodes[upperCode];

    if (!promo) {
      throw new ValidationError("Invalid promo code. Please check and try again.");
    }

    // In a real app, you'd:
    // 1. Validate code against database
    // 2. Check if code is active and not expired
    // 3. Check usage limits
    // 4. Validate minimum order amount
    // 5. Apply to cart in commerce system

    // Calculate mock discount (assuming $50 subtotal for demo)
    const mockSubtotal = 5000; // $50.00 in cents
    
    if (promo.minOrder && mockSubtotal < promo.minOrder) {
      throw new ValidationError(
        `This code requires a minimum order of $${(promo.minOrder / 100).toFixed(2)}`
      );
    }

    const discountAmount = promo.type === "percentage" 
      ? Math.round(mockSubtotal * (promo.discount / 100))
      : promo.discount;

    return NextResponse.json({
      success: true,
      data: {
        code: upperCode,
        discount: {
          amount: discountAmount,
          formatted: `$${(discountAmount / 100).toFixed(2)}`,
        },
        description: promo.type === "percentage" 
          ? `${promo.discount}% off`
          : `$${(promo.discount / 100).toFixed(2)} off`,
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

export async function DELETE() {
  try {
    // In a real app, you'd remove the promo code from the cart in commerce system
    
    return NextResponse.json({
      success: true,
      data: {
        message: "Promo code removed",
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
