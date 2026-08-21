/**
 * Single Address API Route
 * GET /api/user/addresses/[id] - Get address by ID
 * PATCH /api/user/addresses/[id] - Update address
 * DELETE /api/user/addresses/[id] - Delete address
 */

import { NextRequest, NextResponse } from "next/server";
import { isAppError, toAppError, NotFoundError } from "@/lib/errors";
import { z } from "zod";
import { validate } from "@/lib/validation";
import { USE_MOCKS } from "@/lib/constants";
import type { UserAddress } from "@/types/user";

const updateAddressSchema = z.object({
  label: z.string().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  streetAddress: z.string().min(1).optional(),
  streetAddress2: z.string().optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  phone: z.string().optional(),
  isDefaultShipping: z.boolean().optional(),
  isDefaultBilling: z.boolean().optional(),
});

// Mock addresses storage (shared with parent route in real app)
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

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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
      const address = mockAddresses.find((addr) => addr.id === id);
      
      if (!address) {
        throw new NotFoundError("Address not found");
      }

      return NextResponse.json({
        success: true,
        data: address,
      });
    }

    // In production, fetch from API
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

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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
    const updateData = validate(updateAddressSchema, body);

    if (USE_MOCKS) {
      const addressIndex = mockAddresses.findIndex((addr) => addr.id === id);
      
      if (addressIndex === -1) {
        throw new NotFoundError("Address not found");
      }

      // Update defaults if needed
      if (updateData.isDefaultShipping) {
        mockAddresses = mockAddresses.map((addr) => ({
          ...addr,
          isDefaultShipping: addr.id === id,
        }));
      }
      if (updateData.isDefaultBilling) {
        mockAddresses = mockAddresses.map((addr) => ({
          ...addr,
          isDefaultBilling: addr.id === id,
        }));
      }

      // Update the address
      mockAddresses[addressIndex] = {
        ...mockAddresses[addressIndex],
        ...updateData,
        isDefault: updateData.isDefaultShipping || updateData.isDefaultBilling || mockAddresses[addressIndex].isDefault,
      };

      return NextResponse.json({
        success: true,
        data: mockAddresses[addressIndex],
      });
    }

    // In production, update via API
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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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
      const addressIndex = mockAddresses.findIndex((addr) => addr.id === id);
      
      if (addressIndex === -1) {
        throw new NotFoundError("Address not found");
      }

      mockAddresses.splice(addressIndex, 1);

      return NextResponse.json({
        success: true,
        data: { deleted: true },
      });
    }

    // In production, delete via API
    return NextResponse.json({
      success: true,
      data: { deleted: true },
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
