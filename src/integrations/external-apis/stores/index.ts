/**
 * Store Location API Adapter
 * Handles store location and information operations
 */

import { ExternalApiAdapter, type ExternalApiConfig } from "../base";
import { ExternalServiceError, NotFoundError } from "@/lib/errors";
import type { 
  Store, 
  StoreSearchParams, 
  StoreSearchResult,
  StoreHours,
  StoreService,
  DayOfWeek,
} from "@/types/store";
import type { 
  StoreApiResponse, 
  StoreSearchApiResponse,
  NearbySearchRequest,
} from "./types";

// Re-export types
export * from "./types";

/**
 * Store API configuration
 */
export type StoreApiConfig = ExternalApiConfig;

/**
 * Day mapping from API (0=Sunday) to our format
 */
const DAY_MAP: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/**
 * Gets configuration from environment variables
 */
export function getStoreApiConfig(): StoreApiConfig {
  return {
    baseUrl: process.env.STORE_API_URL || "",
    apiKey: process.env.STORE_API_KEY,
  };
}

/**
 * Store API adapter
 */
export class StoreAdapter extends ExternalApiAdapter<StoreApiConfig> {
  constructor(config?: StoreApiConfig) {
    super("Store", config || getStoreApiConfig());
  }

  /**
   * Converts API response to Store type
   */
  private toStore(response: StoreApiResponse, distance?: number): Store {
    const hours: StoreHours[] = response.operating_hours.map((h) => ({
      day: DAY_MAP[h.day_of_week],
      openTime: h.open,
      closeTime: h.close,
      isClosed: h.is_closed,
    }));

    const services: StoreService[] = response.services.map((s) => ({
      id: s.toLowerCase().replace(/\s+/g, "_"),
      name: s,
      isAvailable: true,
    }));

    return {
      id: response.id,
      name: response.name,
      slug: response.slug,
      address: {
        street: response.address.line1 + (response.address.line2 ? `, ${response.address.line2}` : ""),
        city: response.address.city,
        state: response.address.state,
        postalCode: response.address.postal_code,
        country: response.address.country_code,
        formatted: `${response.address.line1}, ${response.address.city}, ${response.address.state} ${response.address.postal_code}`,
      },
      coordinates: {
        lat: response.location.latitude,
        lng: response.location.longitude,
      },
      phone: response.contact.phone,
      email: response.contact.email,
      hours,
      services,
      amenities: response.amenities,
      isOpen: response.is_currently_open,
      nextOpenTime: response.next_open_at,
      distance,
      image: response.image_url,
      description: response.description,
      timezone: response.timezone,
    };
  }

  /**
   * Get all stores
   */
  async getAllStores(params: { limit?: number; offset?: number } = {}): Promise<StoreSearchResult> {
    const { limit = 100, offset = 0 } = params;

    this.log.debug("Fetching all stores", { limit, offset });

    try {
      const response = await this.client.get<StoreSearchApiResponse>("/stores", {
        params: { limit, offset },
      });

      return {
        stores: response.data.results.map((s) => this.toStore(s)),
        total: response.data.total,
      };
    } catch (error) {
      throw new ExternalServiceError("Store", "Failed to fetch stores", error);
    }
  }

  /**
   * Get store by ID
   */
  async getStoreById(id: string): Promise<Store> {
    this.log.debug("Fetching store by ID", { id });

    try {
      const response = await this.client.get<StoreApiResponse>(`/stores/${id}`);
      return this.toStore(response.data);
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode === 404) {
        throw new NotFoundError("Store", `Store ${id} not found`);
      }
      throw new ExternalServiceError("Store", "Failed to fetch store", error);
    }
  }

  /**
   * Get store by slug
   */
  async getStoreBySlug(slug: string): Promise<Store> {
    this.log.debug("Fetching store by slug", { slug });

    try {
      const response = await this.client.get<StoreApiResponse>(`/stores/slug/${slug}`);
      return this.toStore(response.data);
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode === 404) {
        throw new NotFoundError("Store", `Store ${slug} not found`);
      }
      throw new ExternalServiceError("Store", "Failed to fetch store", error);
    }
  }

  /**
   * Search stores by location
   */
  async searchNearby(params: StoreSearchParams): Promise<StoreSearchResult> {
    this.log.debug("Searching nearby stores", params);

    try {
      const request: NearbySearchRequest = {
        latitude: params.lat!,
        longitude: params.lng!,
        radius_km: params.radius || 50,
        services: params.services,
        limit: params.limit || 20,
        offset: params.offset || 0,
      };

      const response = await this.client.post<StoreSearchApiResponse>(
        "/stores/nearby",
        request
      );

      // Calculate distances for each store
      const stores = response.data.results.map((s) => {
        const distance = this.calculateDistance(
          params.lat!,
          params.lng!,
          s.location.latitude,
          s.location.longitude
        );
        return this.toStore(s, distance);
      });

      // Sort by distance
      stores.sort((a, b) => (a.distance || 0) - (b.distance || 0));

      return {
        stores,
        total: response.data.total,
        center: response.data.center
          ? { lat: response.data.center.latitude, lng: response.data.center.longitude }
          : undefined,
      };
    } catch (error) {
      throw new ExternalServiceError("Store", "Failed to search stores", error);
    }
  }

  /**
   * Search stores by address/postal code
   */
  async searchByAddress(params: StoreSearchParams): Promise<StoreSearchResult> {
    this.log.debug("Searching stores by address", params);

    try {
      const response = await this.client.get<StoreSearchApiResponse>("/stores/search", {
        params: {
          postal_code: params.postalCode,
          city: params.city,
          country: params.country,
          limit: params.limit || 20,
        },
      });

      return {
        stores: response.data.results.map((s) => this.toStore(s)),
        total: response.data.total,
        center: response.data.center
          ? { lat: response.data.center.latitude, lng: response.data.center.longitude }
          : undefined,
      };
    } catch (error) {
      throw new ExternalServiceError("Store", "Failed to search stores", error);
    }
  }

  /**
   * Get stores by country
   */
  async getStoresByCountry(countryCode: string): Promise<Store[]> {
    this.log.debug("Fetching stores by country", { countryCode });

    try {
      const response = await this.client.get<StoreSearchApiResponse>(
        `/stores/country/${countryCode}`
      );
      return response.data.results.map((s) => this.toStore(s));
    } catch (error) {
      throw new ExternalServiceError("Store", "Failed to fetch stores by country", error);
    }
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal place
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

// Export singleton instance
let instance: StoreAdapter | null = null;

export function getStoreAdapter(): StoreAdapter {
  if (!instance) {
    instance = new StoreAdapter();
  }
  return instance;
}
