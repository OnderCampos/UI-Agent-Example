/**
 * Nearby Stores API Route
 * Returns stores near a given location
 */

import { NextRequest, NextResponse } from "next/server";
import { getStoreService } from "@/services/store.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius");
  const limit = searchParams.get("limit");

  if (!lat || !lng) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "MISSING_COORDINATES",
          message: "Latitude and longitude are required",
        },
      },
      { status: 400 }
    );
  }

  try {
    const storeService = getStoreService();

    const result = await storeService.searchNearby(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseFloat(radius) : 50 // Default 50km radius
    );

    // Apply limit if specified
    if (limit) {
      result.stores = result.stores.slice(0, parseInt(limit));
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to search nearby stores:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "STORE_SEARCH_ERROR",
          message: "Failed to search nearby stores",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, radius, services } = body;

    if (!latitude || !longitude) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_COORDINATES",
            message: "Latitude and longitude are required",
          },
        },
        { status: 400 }
      );
    }

    const storeService = getStoreService();

    const result = await storeService.searchNearby(
      latitude,
      longitude,
      radius || 50
    );

    // Filter by services if specified
    if (services && Array.isArray(services) && services.length > 0) {
      result.stores = result.stores.filter((store) =>
        services.some((service: string) =>
          store.services.some((s) => s.id === service && s.isAvailable)
        )
      );
      result.total = result.stores.length;
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to search nearby stores:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "STORE_SEARCH_ERROR",
          message: "Failed to search nearby stores",
        },
      },
      { status: 500 }
    );
  }
}
