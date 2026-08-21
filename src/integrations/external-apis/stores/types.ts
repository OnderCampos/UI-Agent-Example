/**
 * Store API Types
 * Types specific to the external store location API
 */

/**
 * Store API response format
 */
export interface StoreApiResponse {
  id: string;
  name: string;
  slug: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country_code: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email?: string;
  };
  operating_hours: {
    day_of_week: number; // 0 = Sunday, 6 = Saturday
    open: string;
    close: string;
    is_closed: boolean;
  }[];
  services: string[];
  amenities: string[];
  timezone: string;
  is_currently_open: boolean;
  next_open_at?: string;
  image_url?: string;
  description?: string;
}

/**
 * Store search API response
 */
export interface StoreSearchApiResponse {
  results: StoreApiResponse[];
  total: number;
  center?: {
    latitude: number;
    longitude: number;
  };
  search_radius_km: number;
}

/**
 * Store API configuration
 */
export interface StoreApiConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

/**
 * Nearby search request
 */
export interface NearbySearchRequest {
  latitude: number;
  longitude: number;
  radius_km?: number;
  services?: string[];
  limit?: number;
  offset?: number;
}

/**
 * Address search request
 */
export interface AddressSearchRequest {
  postal_code?: string;
  city?: string;
  country?: string;
  limit?: number;
}
