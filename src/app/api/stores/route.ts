/**
 * Stores API Route
 * Returns list of stores with optional filtering
 */

import { NextRequest, NextResponse } from "next/server";
import { getStoreService } from "@/services/store.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius");

  try {
    const storeService = getStoreService();

    // If coordinates provided, search nearby
    if (lat && lng) {
      const result = await storeService.searchNearby(
        parseFloat(lat),
        parseFloat(lng),
        radius ? parseFloat(radius) : undefined
      );

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    // If address params provided, search by address
    if (country || city) {
      const result = await storeService.searchByAddress({
        country: country || undefined,
        city: city || undefined,
      });

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    // Default: return all stores
    const stores = await storeService.getAllStores();

    return NextResponse.json({
      success: true,
      data: {
        stores,
        total: stores.length,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stores:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "STORE_FETCH_ERROR",
          message: "Failed to fetch stores",
        },
      },
      { status: 500 }
    );
  }
}
