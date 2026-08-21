/**
 * Store Service
 * Orchestrates store location operations from API and content from Contentful
 */

import { getStoreAdapter } from "@/integrations/external-apis/stores";
import type {
  Store,
  StoreSearchParams,
  StoreSearchResult,
  StoreContent,
  StoreHours,
  DayOfWeek,
} from "@/types/store";
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";

const log = logger.child("StoreService");

// Mock store data for development
const mockStores: Store[] = [
  {
    id: "store-1",
    name: "PriceSmart Escazu",
    slug: "escazu",
    address: {
      street: "Autopista Prospero Fernandez",
      city: "Escazu",
      state: "San Jose",
      postalCode: "10201",
      country: "CR",
      formatted: "Autopista Prospero Fernandez, Escazu, San Jose 10201",
    },
    coordinates: { lat: 9.9281, lng: -84.1403 },
    phone: "+506 2201-9600",
    email: "escazu@pricesmart.com",
    hours: generateMockHours(),
    services: [
      { id: "pharmacy", name: "Pharmacy", isAvailable: true },
      { id: "optical", name: "Optical Center", isAvailable: true },
      { id: "bakery", name: "Bakery", isAvailable: true },
      { id: "food_court", name: "Food Court", isAvailable: true },
      { id: "tire_center", name: "Tire Center", isAvailable: true },
    ],
    amenities: ["Parking", "Wheelchair Accessible", "ATM"],
    isOpen: true,
    timezone: "America/Costa_Rica",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    description: "Our flagship location in Escazu, serving the greater San Jose area.",
  },
  {
    id: "store-2",
    name: "PriceSmart Heredia",
    slug: "heredia",
    address: {
      street: "Real Cariari",
      city: "Heredia",
      state: "Heredia",
      postalCode: "40101",
      country: "CR",
      formatted: "Real Cariari, Heredia, Heredia 40101",
    },
    coordinates: { lat: 9.9939, lng: -84.1058 },
    phone: "+506 2293-5600",
    hours: generateMockHours(),
    services: [
      { id: "pharmacy", name: "Pharmacy", isAvailable: true },
      { id: "bakery", name: "Bakery", isAvailable: true },
      { id: "deli", name: "Deli", isAvailable: true },
      { id: "gas_station", name: "Gas Station", isAvailable: true },
    ],
    amenities: ["Parking", "Wheelchair Accessible"],
    isOpen: true,
    timezone: "America/Costa_Rica",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
  },
  {
    id: "store-3",
    name: "PriceSmart Liberia",
    slug: "liberia",
    address: {
      street: "Carretera Interamericana Norte",
      city: "Liberia",
      state: "Guanacaste",
      postalCode: "50101",
      country: "CR",
      formatted: "Carretera Interamericana Norte, Liberia, Guanacaste 50101",
    },
    coordinates: { lat: 10.6346, lng: -85.4407 },
    phone: "+506 2665-0700",
    hours: generateMockHours(),
    services: [
      { id: "pharmacy", name: "Pharmacy", isAvailable: true },
      { id: "bakery", name: "Bakery", isAvailable: true },
      { id: "food_court", name: "Food Court", isAvailable: true },
    ],
    amenities: ["Parking", "Wheelchair Accessible", "ATM"],
    isOpen: false,
    nextOpenTime: "Tomorrow at 9:00 AM",
    timezone: "America/Costa_Rica",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800",
  },
  {
    id: "store-4",
    name: "PriceSmart Panama City",
    slug: "panama-city",
    address: {
      street: "Via Espana",
      city: "Panama City",
      state: "Panama",
      postalCode: "0816",
      country: "PA",
      formatted: "Via Espana, Panama City, Panama 0816",
    },
    coordinates: { lat: 9.0056, lng: -79.5122 },
    phone: "+507 300-9700",
    hours: generateMockHours(),
    services: [
      { id: "pharmacy", name: "Pharmacy", isAvailable: true },
      { id: "optical", name: "Optical Center", isAvailable: true },
      { id: "bakery", name: "Bakery", isAvailable: true },
      { id: "tire_center", name: "Tire Center", isAvailable: true },
      { id: "travel", name: "Travel Services", isAvailable: true },
    ],
    amenities: ["Parking", "Wheelchair Accessible", "ATM", "EV Charging"],
    isOpen: true,
    timezone: "America/Panama",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
  },
];

function generateMockHours(): StoreHours[] {
  const days: DayOfWeek[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return days.map((day) => ({
    day,
    openTime: day === "sunday" ? "10:00" : "09:00",
    closeTime: day === "sunday" ? "18:00" : "21:00",
    isClosed: false,
  }));
}

/**
 * Store service class
 */
export class StoreService {
  private adapter = getStoreAdapter();

  /**
   * Get all stores
   */
  async getAllStores(): Promise<Store[]> {
    log.debug("Fetching all stores");

    if (USE_MOCKS) {
      return mockStores;
    }

    const result = await this.adapter.getAllStores();
    return result.stores;
  }

  /**
   * Get store by ID
   */
  async getStoreById(id: string): Promise<Store | null> {
    log.debug("Fetching store by ID", { id });

    if (USE_MOCKS) {
      return mockStores.find((s) => s.id === id) || null;
    }

    try {
      return await this.adapter.getStoreById(id);
    } catch {
      return null;
    }
  }

  /**
   * Get store by slug
   */
  async getStoreBySlug(slug: string): Promise<Store | null> {
    log.debug("Fetching store by slug", { slug });

    if (USE_MOCKS) {
      return mockStores.find((s) => s.slug === slug) || null;
    }

    try {
      return await this.adapter.getStoreBySlug(slug);
    } catch {
      return null;
    }
  }

  /**
   * Search stores by location (coordinates)
   */
  async searchNearby(lat: number, lng: number, radius?: number): Promise<StoreSearchResult> {
    log.debug("Searching nearby stores", { lat, lng, radius });

    if (USE_MOCKS) {
      // Calculate mock distances
      const storesWithDistance = mockStores.map((store) => ({
        ...store,
        distance: this.calculateDistance(lat, lng, store.coordinates.lat, store.coordinates.lng),
      }));

      // Filter by radius and sort by distance
      const filtered = storesWithDistance
        .filter((s) => !radius || s.distance <= radius)
        .sort((a, b) => a.distance - b.distance);

      return {
        stores: filtered,
        total: filtered.length,
        center: { lat, lng },
      };
    }

    return this.adapter.searchNearby({ lat, lng, radius });
  }

  /**
   * Search stores by address/postal code
   */
  async searchByAddress(params: StoreSearchParams): Promise<StoreSearchResult> {
    log.debug("Searching stores by address", params);

    if (USE_MOCKS) {
      // Filter by country if provided
      let filtered = mockStores;
      if (params.country) {
        filtered = filtered.filter(
          (s) => s.address.country.toLowerCase() === params.country!.toLowerCase()
        );
      }
      if (params.city) {
        filtered = filtered.filter(
          (s) => s.address.city.toLowerCase().includes(params.city!.toLowerCase())
        );
      }

      return {
        stores: filtered,
        total: filtered.length,
      };
    }

    return this.adapter.searchByAddress(params);
  }

  /**
   * Get stores by country
   */
  async getStoresByCountry(countryCode: string): Promise<Store[]> {
    log.debug("Fetching stores by country", { countryCode });

    if (USE_MOCKS) {
      return mockStores.filter(
        (s) => s.address.country.toLowerCase() === countryCode.toLowerCase()
      );
    }

    return this.adapter.getStoresByCountry(countryCode);
  }

  /**
   * Get store content from CMS
   * In production, this would fetch from Contentful
   */
  async getStoreContent(storeId: string): Promise<StoreContent | null> {
    log.debug("Fetching store content", { storeId });

    // Mock content - in production, this would come from Contentful
    return {
      storeId,
      heroImage: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
      ],
      localPromotions: [
        {
          title: "Weekend Special",
          description: "Get 20% off selected items this weekend only!",
          link: "/promotions/weekend-special",
        },
      ],
    };
  }

  /**
   * Check if store is currently open
   */
  isStoreOpen(store: Store): { isOpen: boolean; nextChange: string } {
    const now = new Date();
    const dayIndex = now.getDay();
    const dayNames: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = dayNames[dayIndex];

    const todayHours = store.hours.find((h) => h.day === today);
    if (!todayHours || todayHours.isClosed) {
      // Find next open day
      for (let i = 1; i <= 7; i++) {
        const nextDay = dayNames[(dayIndex + i) % 7];
        const nextHours = store.hours.find((h) => h.day === nextDay);
        if (nextHours && !nextHours.isClosed) {
          return {
            isOpen: false,
            nextChange: `Opens ${i === 1 ? "tomorrow" : nextDay} at ${nextHours.openTime}`,
          };
        }
      }
      return { isOpen: false, nextChange: "Temporarily closed" };
    }

    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const isOpen = currentTime >= todayHours.openTime && currentTime < todayHours.closeTime;

    return {
      isOpen,
      nextChange: isOpen
        ? `Closes at ${todayHours.closeTime}`
        : `Opens at ${todayHours.openTime}`,
    };
  }

  /**
   * Calculate distance between two points
   */
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }
}

// Export singleton instance
let storeServiceInstance: StoreService | null = null;

export function getStoreService(): StoreService {
  if (!storeServiceInstance) {
    storeServiceInstance = new StoreService();
  }
  return storeServiceInstance;
}
