/**
 * Content Service
 * Orchestrates content operations from Contentful
 */

import * as contentful from "@/integrations/contentful";
import type {
  ContentPage,
  BannerData,
  NavigationMenu,
  SiteSettings,
} from "@/types/content";
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";

const log = logger.child("ContentService");

/**
 * Content service class
 */
export class ContentService {
  /**
   * Get page by slug
   */
  async getPageBySlug(
    slug: string,
    options: { preview?: boolean; locale?: string } = {}
  ): Promise<ContentPage> {
    log.debug("Fetching page by slug", { slug, options });

    if (USE_MOCKS) {
      return this.getMockPage(slug);
    }

    return contentful.getPageBySlug(slug, options);
  }

  /**
   * Get all pages
   */
  async getAllPages(
    options: { preview?: boolean; locale?: string; limit?: number } = {}
  ): Promise<ContentPage[]> {
    log.debug("Fetching all pages", options);

    if (USE_MOCKS) {
      return [this.getMockPage("home"), this.getMockPage("about")];
    }

    return contentful.getAllPages(options);
  }

  /**
   * Get active banners
   */
  async getActiveBanners(
    options: { preview?: boolean; locale?: string } = {}
  ): Promise<BannerData[]> {
    log.debug("Fetching active banners", options);

    if (USE_MOCKS) {
      return this.getMockBanners();
    }

    return contentful.getActiveBanners(options);
  }

  /**
   * Get navigation menu by name
   */
  async getNavigationMenu(
    name: string,
    options: { preview?: boolean; locale?: string } = {}
  ): Promise<NavigationMenu | null> {
    log.debug("Fetching navigation menu", { name, options });

    if (USE_MOCKS) {
      return this.getMockNavigation(name);
    }

    return contentful.getNavigationMenu(name, options);
  }

  /**
   * Get site settings
   */
  async getSiteSettings(
    options: { preview?: boolean; locale?: string } = {}
  ): Promise<SiteSettings | null> {
    log.debug("Fetching site settings", options);

    if (USE_MOCKS) {
      return this.getMockSiteSettings();
    }

    return contentful.getSiteSettings(options);
  }

  // ============================================
  // Mock implementations
  // ============================================

  private getMockPage(slug: string): ContentPage {
    const pages: Record<string, Partial<ContentPage>> = {
      home: {
        title: "Welcome to Our Store",
        description: "Discover amazing products at great prices",
      },
      about: {
        title: "About Us",
        description: "Learn more about our company and mission",
      },
      contact: {
        title: "Contact Us",
        description: "Get in touch with our team",
      },
    };

    const pageData = pages[slug] || { title: slug, description: "" };

    return {
      id: `page-${slug}`,
      slug,
      title: pageData.title || slug,
      description: pageData.description,
      content: {
        raw: null,
        html: `<h1>${pageData.title}</h1><p>${pageData.description}</p>`,
      },
      sections: [
        {
          id: "section-hero",
          type: "hero",
          data: {
            title: pageData.title,
            subtitle: pageData.description,
            alignment: "center",
          },
        },
      ],
      seo: {
        title: pageData.title || slug,
        description: pageData.description || "",
      },
      publishedAt: "2024-01-01T00:00:00Z",
      updatedAt: new Date().toISOString(),
    };
  }

  private getMockBanners(): BannerData[] {
    return [
      {
        id: "banner-1",
        title: "Summer Sale",
        subtitle: "Up to 50% off on selected items",
        image: {
          id: "img-banner-1",
          title: "Summer Sale Banner",
          url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200",
          contentType: "image/jpeg",
          size: 100000,
          width: 1200,
          height: 400,
        },
        link: "/sale",
        backgroundColor: "#ff6b6b",
        textColor: "#ffffff",
        isActive: true,
        position: 1,
      },
      {
        id: "banner-2",
        title: "New Arrivals",
        subtitle: "Check out our latest products",
        image: {
          id: "img-banner-2",
          title: "New Arrivals Banner",
          url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
          contentType: "image/jpeg",
          size: 100000,
          width: 1200,
          height: 400,
        },
        link: "/new-arrivals",
        isActive: true,
        position: 2,
      },
    ];
  }

  private getMockNavigation(name: string): NavigationMenu {
    const menus: Record<string, NavigationMenu> = {
      main: {
        id: "nav-main",
        name: "main",
        items: [
          { id: "nav-1", label: "Home", href: "/" },
          {
            id: "nav-2",
            label: "Products",
            href: "/products",
            children: [
              { id: "nav-2-1", label: "Electronics", href: "/categories/electronics" },
              { id: "nav-2-2", label: "Clothing", href: "/categories/clothing" },
              { id: "nav-2-3", label: "Home & Garden", href: "/categories/home-garden" },
            ],
          },
          { id: "nav-3", label: "Sale", href: "/sale", badge: "HOT" },
          { id: "nav-4", label: "About", href: "/about" },
          { id: "nav-5", label: "Contact", href: "/contact" },
        ],
      },
      footer: {
        id: "nav-footer",
        name: "footer",
        items: [
          {
            id: "footer-1",
            label: "Customer Service",
            href: "#",
            children: [
              { id: "footer-1-1", label: "Help Center", href: "/help" },
              { id: "footer-1-2", label: "Shipping Info", href: "/shipping" },
              { id: "footer-1-3", label: "Returns", href: "/returns" },
              { id: "footer-1-4", label: "Contact Us", href: "/contact" },
            ],
          },
          {
            id: "footer-2",
            label: "Company",
            href: "#",
            children: [
              { id: "footer-2-1", label: "About Us", href: "/about" },
              { id: "footer-2-2", label: "Careers", href: "/careers" },
              { id: "footer-2-3", label: "Press", href: "/press" },
            ],
          },
          {
            id: "footer-3",
            label: "Legal",
            href: "#",
            children: [
              { id: "footer-3-1", label: "Privacy Policy", href: "/privacy" },
              { id: "footer-3-2", label: "Terms of Service", href: "/terms" },
              { id: "footer-3-3", label: "Cookie Policy", href: "/cookies" },
            ],
          },
        ],
      },
    };

    return menus[name] || menus.main;
  }

  private getMockSiteSettings(): SiteSettings {
    return {
      siteName: "Ecommerce Store",
      siteDescription: "Your one-stop shop for amazing products",
      logo: {
        id: "logo",
        title: "Store Logo",
        url: "/logo.svg",
        contentType: "image/svg+xml",
        size: 5000,
      },
      favicon: {
        id: "favicon",
        title: "Favicon",
        url: "/favicon.ico",
        contentType: "image/x-icon",
        size: 1000,
      },
      socialLinks: [
        { platform: "facebook", url: "https://facebook.com/store" },
        { platform: "twitter", url: "https://twitter.com/store" },
        { platform: "instagram", url: "https://instagram.com/store" },
      ],
      contactEmail: "support@store.com",
      contactPhone: "+1 (555) 123-4567",
      address: "123 Commerce St, San Francisco, CA 94105",
      footerText: "2024 Ecommerce Store. All rights reserved.",
      announcementBar: {
        text: "Free shipping on orders over $50!",
        link: "/shipping",
        isActive: true,
      },
    };
  }
}

// Export singleton instance
let contentServiceInstance: ContentService | null = null;

export function getContentService(): ContentService {
  if (!contentServiceInstance) {
    contentServiceInstance = new ContentService();
  }
  return contentServiceInstance;
}
