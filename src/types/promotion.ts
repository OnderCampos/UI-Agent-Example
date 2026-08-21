/**
 * Promotion Types
 */

/**
 * Base promotion
 */
export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: PromotionType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  conditions?: PromotionCondition[];
  discount?: PromotionDiscount;
  badge?: string;
  imageUrl?: string;
  targetUrl?: string;
  membersOnly?: boolean;
}

/**
 * Promotion types
 */
export type PromotionType = 
  | "flash_sale"
  | "bundle"
  | "percentage_off"
  | "fixed_amount_off"
  | "buy_x_get_y"
  | "member_exclusive"
  | "clearance"
  | "seasonal";

/**
 * Promotion condition
 */
export interface PromotionCondition {
  type: "min_quantity" | "min_purchase" | "specific_products" | "category" | "membership_tier";
  value: string | number;
  productIds?: string[];
  categoryIds?: string[];
}

/**
 * Promotion discount
 */
export interface PromotionDiscount {
  type: "percentage" | "fixed_amount" | "free_item";
  value: number;
  maxDiscount?: number;
  currency?: string;
}

/**
 * Flash sale
 */
export interface FlashSale extends Promotion {
  type: "flash_sale";
  products: FlashSaleProduct[];
  stockLimit?: number;
  soldCount: number;
}

/**
 * Flash sale product
 */
export interface FlashSaleProduct {
  productId: string;
  productName: string;
  productImage: string;
  productSlug: string;
  originalPrice: number;
  salePrice: number;
  currency: string;
  stockLimit?: number;
  soldCount: number;
  discountPercentage: number;
}

/**
 * Bundle deal
 */
export interface BundleDeal extends Promotion {
  type: "bundle";
  products: BundleProduct[];
  bundlePrice: number;
  originalPrice: number;
  savings: number;
  currency: string;
}

/**
 * Bundle product
 */
export interface BundleProduct {
  productId: string;
  productName: string;
  productImage: string;
  productSlug: string;
  originalPrice: number;
  quantity: number;
}

/**
 * Promotional banner
 */
export interface PromoBanner {
  id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  position: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

/**
 * Banner carousel configuration
 */
export interface BannerCarousel {
  id: string;
  banners: PromoBanner[];
  autoPlay: boolean;
  autoPlayInterval: number;
  showNavigation: boolean;
  showDots: boolean;
}

/**
 * Member-exclusive deal section
 */
export interface MemberDealSection {
  id: string;
  title: string;
  subtitle?: string;
  deals: Promotion[];
  backgroundColor?: string;
  requiredTier?: string;
}

/**
 * Countdown timer props
 */
export interface CountdownTimerProps {
  endDate: string;
  onExpire?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "urgent";
}

/**
 * Time remaining
 */
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}
