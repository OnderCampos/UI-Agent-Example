/**
 * Contentful-specific types
 */

/**
 * Contentful System metadata
 */
export interface CFSys {
  id: string;
  type: string;
  linkType?: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
  locale?: string;
  contentType?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
  };
  space?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
  };
  environment?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
  };
}

/**
 * Contentful Link
 */
export interface CFLink {
  sys: {
    type: "Link";
    linkType: "Entry" | "Asset";
    id: string;
  };
}

/**
 * Contentful Asset file details
 */
export interface CFAssetFile {
  url: string;
  details: {
    size: number;
    image?: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
}

/**
 * Contentful Asset
 */
export interface CFAsset {
  sys: CFSys;
  fields: {
    title?: string;
    description?: string;
    file: CFAssetFile;
  };
}

/**
 * Contentful Entry (generic)
 */
export interface CFEntry<T = Record<string, unknown>> {
  sys: CFSys;
  fields: T;
  metadata?: {
    tags: { sys: CFLink }[];
  };
}

/**
 * Contentful collection response
 */
export interface CFCollection<T> {
  sys: { type: "Array" };
  total: number;
  skip: number;
  limit: number;
  items: T[];
  includes?: {
    Entry?: CFEntry[];
    Asset?: CFAsset[];
  };
}

/**
 * Rich text document node
 */
export interface CFRichTextNode {
  nodeType: string;
  data: Record<string, unknown>;
  content?: CFRichTextNode[];
  value?: string;
  marks?: { type: string }[];
}

/**
 * Rich text document
 */
export interface CFRichTextDocument {
  nodeType: "document";
  data: Record<string, unknown>;
  content: CFRichTextNode[];
}

// ============================================
// Content Type Field Definitions
// ============================================

/**
 * Page content type fields
 */
export interface CFPageFields {
  title: string;
  slug: string;
  description?: string;
  content?: CFRichTextDocument;
  featuredImage?: CFLink;
  sections?: CFLink[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  noIndex?: boolean;
}

/**
 * Hero section fields
 */
export interface CFHeroFields {
  title: string;
  subtitle?: string;
  backgroundImage: CFLink;
  ctaText?: string;
  ctaLink?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
}

/**
 * Banner fields
 */
export interface CFBannerFields {
  title: string;
  subtitle?: string;
  image: CFLink;
  mobileImage?: CFLink;
  link?: string;
  backgroundColor?: string;
  textColor?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  position: number;
}

/**
 * Featured products section fields
 */
export interface CFFeaturedProductsFields {
  title: string;
  subtitle?: string;
  productIds: string[];
  layout?: "grid" | "carousel";
  maxItems?: number;
}

/**
 * Category grid section fields
 */
export interface CFCategoryGridFields {
  title: string;
  subtitle?: string;
  categories: CFLink[];
  columns?: 2 | 3 | 4;
}

/**
 * FAQ item fields
 */
export interface CFFaqItemFields {
  question: string;
  answer: CFRichTextDocument;
  category?: string;
}

/**
 * FAQ section fields
 */
export interface CFFaqSectionFields {
  title: string;
  items: CFLink[];
}

/**
 * Testimonial fields
 */
export interface CFTestimonialFields {
  content: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: CFLink;
  rating?: number;
}

/**
 * Navigation item fields
 */
export interface CFNavigationItemFields {
  label: string;
  href: string;
  icon?: string;
  children?: CFLink[];
  isExternal?: boolean;
  badge?: string;
}

/**
 * Navigation menu fields
 */
export interface CFNavigationMenuFields {
  name: string;
  items: CFLink[];
}

/**
 * Site settings fields
 */
export interface CFSiteSettingsFields {
  siteName: string;
  siteDescription: string;
  logo: CFLink;
  favicon: CFLink;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  footerText?: string;
  announcementBarText?: string;
  announcementBarLink?: string;
  announcementBarActive?: boolean;
}

/**
 * Help article fields
 */
export interface CFHelpArticleFields {
  title: string;
  slug: string;
  excerpt: string;
  content: CFRichTextDocument;
  category: string;
  subcategory?: string;
  icon?: string;
  featuredImage?: CFLink;
  relatedArticles?: CFLink[];
  isPopular?: boolean;
  order?: number;
}

/**
 * Help category fields
 */
export interface CFHelpCategoryFields {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  articles?: CFLink[];
  order?: number;
}

/**
 * Legal page fields (versioned documents)
 */
export interface CFLegalPageFields {
  title: string;
  slug: string;
  content: CFRichTextDocument;
  effectiveDate: string;
  version: string;
  previousVersions?: CFLink[];
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * About page section fields
 */
export interface CFAboutSectionFields {
  title: string;
  subtitle?: string;
  content?: CFRichTextDocument;
  image?: CFLink;
  layout?: "imageLeft" | "imageRight" | "centered";
  backgroundColor?: string;
}

/**
 * Team member fields
 */
export interface CFTeamMemberFields {
  name: string;
  role: string;
  bio?: string;
  photo?: CFLink;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

/**
 * Content type IDs
 */
export const CONTENT_TYPES = {
  PAGE: "page",
  HERO: "heroSection",
  BANNER: "banner",
  FEATURED_PRODUCTS: "featuredProducts",
  CATEGORY_GRID: "categoryGrid",
  FAQ_SECTION: "faqSection",
  FAQ_ITEM: "faqItem",
  TESTIMONIALS: "testimonials",
  TESTIMONIAL: "testimonial",
  NAVIGATION_MENU: "navigationMenu",
  NAVIGATION_ITEM: "navigationItem",
  SITE_SETTINGS: "siteSettings",
  HELP_ARTICLE: "helpArticle",
  HELP_CATEGORY: "helpCategory",
  LEGAL_PAGE: "legalPage",
  ABOUT_SECTION: "aboutSection",
  TEAM_MEMBER: "teamMember",
} as const;

export type ContentTypeId = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
