/**
 * Store-related types
 */


/**
 * Store location coordinates
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Store hours for a specific day
 */
export interface StoreHours {
  day: DayOfWeek;
  openTime: string; // "09:00"
  closeTime: string; // "21:00"
  isClosed: boolean;
}

export type DayOfWeek = 
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/**
 * Store service/amenity
 */
export interface StoreService {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  isAvailable: boolean;
}

/**
 * Store entity
 */
export interface Store {
  id: string;
  name: string;
  slug: string;
  address: StoreAddress;
  coordinates: Coordinates;
  phone: string;
  email?: string;
  hours: StoreHours[];
  services: StoreService[];
  amenities: string[];
  isOpen: boolean;
  nextOpenTime?: string;
  distance?: number; // km from search location
  image?: string;
  description?: string;
  timezone: string;
}

/**
 * Store address (extends base Address)
 */
export interface StoreAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  formatted: string;
}

/**
 * Store search parameters
 */
export interface StoreSearchParams {
  lat?: number;
  lng?: number;
  postalCode?: string;
  city?: string;
  country?: string;
  radius?: number; // km
  services?: string[];
  limit?: number;
  offset?: number;
}

/**
 * Store search result
 */
export interface StoreSearchResult {
  stores: Store[];
  total: number;
  center?: Coordinates;
}

/**
 * Store content from CMS (Contentful)
 */
export interface StoreContent {
  storeId: string;
  heroImage?: string;
  gallery?: string[];
  featuredProducts?: string[];
  localPromotions?: {
    title: string;
    description: string;
    image?: string;
    link?: string;
  }[];
  specialAnnouncements?: string;
}

/**
 * Common store services
 */
export const STORE_SERVICES = {
  PHARMACY: "pharmacy",
  OPTICAL: "optical",
  BAKERY: "bakery",
  DELI: "deli",
  MEAT_SHOP: "meat_shop",
  PHOTO_CENTER: "photo_center",
  TIRE_CENTER: "tire_center",
  GAS_STATION: "gas_station",
  FOOD_COURT: "food_court",
  HEARING_AIDS: "hearing_aids",
  BUSINESS_CENTER: "business_center",
  TRAVEL: "travel",
} as const;

export type StoreServiceType = (typeof STORE_SERVICES)[keyof typeof STORE_SERVICES];
