/**
 * Content-related types (for CMS content from Contentful)
 */

/**
 * Rich text content (simplified from Contentful document)
 */
export interface RichTextContent {
  raw: unknown; // Original rich text document
  html: string; // Pre-rendered HTML
}

/**
 * Media asset
 */
export interface ContentAsset {
  id: string;
  title: string;
  description?: string;
  url: string;
  width?: number;
  height?: number;
  contentType: string;
  size: number;
}

/**
 * CMS Page
 */
export interface ContentPage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: RichTextContent;
  featuredImage?: ContentAsset;
  sections: ContentSection[];
  seo: ContentSeo;
  publishedAt: string;
  updatedAt: string;
}

/**
 * SEO metadata
 */
export interface ContentSeo {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: ContentAsset;
  noIndex?: boolean;
  noFollow?: boolean;
}

/**
 * Content section (generic block)
 */
export interface ContentSection {
  id: string;
  type: ContentSectionType;
  data: unknown; // Type depends on section type
}

/**
 * Available section types
 */
export type ContentSectionType =
  | "hero"
  | "featuredProducts"
  | "categoryGrid"
  | "banner"
  | "textBlock"
  | "imageGallery"
  | "testimonials"
  | "faq"
  | "newsletter"
  | "custom";

/**
 * Hero section data
 */
export interface HeroSectionData {
  title: string;
  subtitle?: string;
  backgroundImage: ContentAsset;
  ctaText?: string;
  ctaLink?: string;
  alignment: "left" | "center" | "right";
  overlay?: boolean;
}

/**
 * Banner data
 */
export interface BannerData {
  id: string;
  title: string;
  subtitle?: string;
  image: ContentAsset;
  mobileImage?: ContentAsset;
  link?: string;
  backgroundColor?: string;
  textColor?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  position: number;
}

/**
 * Featured products section data
 */
export interface FeaturedProductsSectionData {
  title: string;
  subtitle?: string;
  productIds: string[];
  layout: "grid" | "carousel";
  maxItems: number;
}

/**
 * Category grid section data
 */
export interface CategoryGridSectionData {
  title: string;
  subtitle?: string;
  categories: {
    id: string;
    name: string;
    image: ContentAsset;
    link: string;
  }[];
  columns: 2 | 3 | 4;
}

/**
 * FAQ item
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: RichTextContent;
  category?: string;
}

/**
 * FAQ section data
 */
export interface FaqSectionData {
  title: string;
  items: FaqItem[];
}

/**
 * Testimonial
 */
export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: ContentAsset;
  rating?: number;
}

/**
 * Testimonials section data
 */
export interface TestimonialsSectionData {
  title: string;
  testimonials: Testimonial[];
  layout: "grid" | "carousel";
}

/**
 * Navigation item
 */
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
  isExternal?: boolean;
  badge?: string;
}

/**
 * Navigation menu
 */
export interface NavigationMenu {
  id: string;
  name: string;
  items: NavigationItem[];
}

/**
 * Site settings
 */
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: ContentAsset;
  favicon: ContentAsset;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  footerText?: string;
  announcementBar?: {
    text: string;
    link?: string;
    isActive: boolean;
  };
}

/**
 * Help article
 */
export interface HelpArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: RichTextContent;
  category: string;
  subcategory?: string;
  icon?: string;
  featuredImage?: ContentAsset;
  relatedArticles?: HelpArticle[];
  isPopular: boolean;
  publishedAt: string;
  updatedAt: string;
}

/**
 * Help category
 */
export interface HelpCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  articleCount: number;
}

/**
 * Legal page (versioned document)
 */
export interface LegalPage {
  id: string;
  slug: string;
  title: string;
  content: RichTextContent;
  effectiveDate: string;
  version: string;
  seo: ContentSeo;
  updatedAt: string;
}

/**
 * About section
 */
export interface AboutSection {
  id: string;
  title: string;
  subtitle?: string;
  content?: RichTextContent;
  image?: ContentAsset;
  layout: "imageLeft" | "imageRight" | "centered";
  backgroundColor?: string;
}

/**
 * Team member
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: ContentAsset;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}
