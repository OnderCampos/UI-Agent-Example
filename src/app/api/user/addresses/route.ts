/**
 * User Addresses API Route
 * GET /api/user/addresses - List user addresses
 * POST /api/user/addresses - Create new address
 */

import { NextRequest, NextResponse } from "next/server";
import { isAppError, toAppError } from "@/lib/errors";
import { z } from "zod";
import { validate } from "@/lib/validation";
import { USE_MOCKS } from "@/lib/constants";
import type { UserAddress } from "@/types/user";

const createAddressSchema = z.object({
  label: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  streetAddress2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  isDefaultShipping: z.boolean().default(false),
  isDefaultBilling: z.boolean().default(false),
});

// Mock addresses storage (in-memory for demo)
let mockAddresses: UserAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "John",
    lastName: "Doe",
    streetAddress: "123 Main Street",
    streetAddress2: "Apt 4B",
    city: "San Jose",
    state: "San Jose",
    postalCode: "10101",
    country: "CR",
    phone: "+506 8888-1234",
    isDefault: true,
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: "addr-2",
    label: "Work",
    firstName: "John",
    lastName: "Doe",
    streetAddress: "456 Business Ave",
    city: "Escazu",
    state: "San Jose",
    postalCode: "10201",
    country: "CR",
    phone: "+506 2222-5678",
    isDefault: false,
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

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

    if (USE_MOCKS) {
      return NextResponse.json({
        success: true,
        data: mockAddresses,
      });
    }

    // In production, fetch from Commercetools or Digital Identity API
    return NextResponse.json({
      success: true,
      data: [],
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
    const addressData = validate(createAddressSchema, body);

    if (USE_MOCKS) {
      const newAddress: UserAddress = {
        id: `addr-${Date.now()}`,
        ...addressData,
        isDefault: addressData.isDefaultShipping || addressData.isDefaultBilling,
      };

      // Update defaults if needed
      if (addressData.isDefaultShipping) {
        mockAddresses = mockAddresses.map((addr) => ({
          ...addr,
          isDefaultShipping: false,
        }));
      }
      if (addressData.isDefaultBilling) {
        mockAddresses = mockAddresses.map((addr) => ({
          ...addr,
          isDefaultBilling: false,
        }));
      }

      mockAddresses.push(newAddress);

      return NextResponse.json({
        success: true,
        data: newAddress,
      });
    }

    // In production, create in Commercetools or Digital Identity API
    return NextResponse.json({
      success: true,
      data: null,
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
