/**
 * Contentful Content Operations
 */

import { createContentfulClient, type ContentfulQueryParams } from "./client";
import type {
  CFCollection,
  CFEntry,
  CFAsset,
  CFPageFields,
  CFBannerFields,
  CFNavigationMenuFields,
  CFNavigationItemFields,
  CFSiteSettingsFields,
  CFRichTextDocument,
} from "./types";
import type {
  ContentPage,
  ContentSection,
  ContentAsset,
  RichTextContent,
  BannerData,
  NavigationMenu,
  NavigationItem,
  SiteSettings,
} from "@/types/content";
import { NotFoundError, ExternalServiceError } from "@/lib/errors";
import { logger } from "@/lib/logger";

const log = logger.child("CF-Content");

// ============================================
// Asset Helpers
// ============================================

/**
 * Resolves asset from includes
 */
function resolveAsset(
  link: { sys: { id: string } } | undefined,
  includes?: { Asset?: CFAsset[] }
): CFAsset | undefined {
  if (!link || !includes?.Asset) return undefined;
  return includes.Asset.find((asset) => asset.sys.id === link.sys.id);
}

/**
 * Resolves entry from includes
 */
function resolveEntry<T>(
  link: { sys: { id: string } } | undefined,
  includes?: { Entry?: CFEntry[] }
): CFEntry<T> | undefined {
  if (!link || !includes?.Entry) return undefined;
  return includes.Entry.find((entry) => entry.sys.id === link.sys.id) as CFEntry<T> | undefined;
}

/**
 * Converts CF asset to ContentAsset
 */
function toContentAsset(cfAsset: CFAsset | undefined): ContentAsset | undefined {
  if (!cfAsset) return undefined;

  return {
    id: cfAsset.sys.id,
    title: cfAsset.fields.title || "",
    description: cfAsset.fields.description,
    url: cfAsset.fields.file.url.startsWith("//")
      ? `https:${cfAsset.fields.file.url}`
      : cfAsset.fields.file.url,
    width: cfAsset.fields.file.details.image?.width,
    height: cfAsset.fields.file.details.image?.height,
    contentType: cfAsset.fields.file.contentType,
    size: cfAsset.fields.file.details.size,
  };
}

/**
 * Converts rich text to RichTextContent
 * Note: In a real implementation, you'd use @contentful/rich-text-html-renderer
 */
function toRichTextContent(doc: CFRichTextDocument | undefined): RichTextContent {
  if (!doc) {
    return { raw: null, html: "" };
  }

  // Simple HTML conversion - in production, use @contentful/rich-text-html-renderer
  const html = convertRichTextToHtml(doc);

  return {
    raw: doc,
    html,
  };
}

/**
 * Simple rich text to HTML converter
 * For production, use @contentful/rich-text-html-renderer
 */
function convertRichTextToHtml(doc: CFRichTextDocument): string {
  const processNode = (node: CFRichTextDocument["content"][0]): string => {
    if (node.nodeType === "text") {
      let text = node.value || "";
      node.marks?.forEach((mark) => {
        switch (mark.type) {
          case "bold":
            text = `<strong>${text}</strong>`;
            break;
          case "italic":
            text = `<em>${text}</em>`;
            break;
          case "underline":
            text = `<u>${text}</u>`;
            break;
          case "code":
            text = `<code>${text}</code>`;
            break;
        }
      });
      return text;
    }

    const children = node.content?.map(processNode).join("") || "";

    switch (node.nodeType) {
      case "paragraph":
        return `<p>${children}</p>`;
      case "heading-1":
        return `<h1>${children}</h1>`;
      case "heading-2":
        return `<h2>${children}</h2>`;
      case "heading-3":
        return `<h3>${children}</h3>`;
      case "heading-4":
        return `<h4>${children}</h4>`;
      case "heading-5":
        return `<h5>${children}</h5>`;
      case "heading-6":
        return `<h6>${children}</h6>`;
      case "unordered-list":
        return `<ul>${children}</ul>`;
      case "ordered-list":
        return `<ol>${children}</ol>`;
      case "list-item":
        return `<li>${children}</li>`;
      case "blockquote":
        return `<blockquote>${children}</blockquote>`;
      case "hr":
        return "<hr />";
      case "hyperlink":
        return `<a href="${node.data.uri}">${children}</a>`;
      default:
        return children;
    }
  };

  return doc.content.map(processNode).join("");
}

// ============================================
// Content Type Converters
// ============================================

/**
 * Converts CF page to ContentPage
 */
function toContentPage(
  entry: CFEntry<CFPageFields>,
  includes?: { Entry?: CFEntry[]; Asset?: CFAsset[] }
): ContentPage {
  const fields = entry.fields;

  const sections: ContentSection[] = [];
  fields.sections?.forEach((sectionLink) => {
    const sectionEntry = resolveEntry(sectionLink, includes);
    if (sectionEntry) {
      const sectionType = sectionEntry.sys.contentType?.sys.id || "custom";
      sections.push({
        id: sectionEntry.sys.id,
        type: sectionType as ContentSection["type"],
        data: sectionEntry.fields,
      });
    }
  });

  return {
    id: entry.sys.id,
    slug: fields.slug,
    title: fields.title,
    description: fields.description,
    content: toRichTextContent(fields.content),
    featuredImage: toContentAsset(resolveAsset(fields.featuredImage, includes)),
    sections,
    seo: {
      title: fields.seoTitle || fields.title,
      description: fields.seoDescription || fields.description || "",
      keywords: fields.seoKeywords,
      noIndex: fields.noIndex,
    },
    publishedAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
  };
}

/**
 * Converts CF banner to BannerData
 */
function toBannerData(
  entry: CFEntry<CFBannerFields>,
  includes?: { Asset?: CFAsset[] }
): BannerData {
  const fields = entry.fields;

  return {
    id: entry.sys.id,
    title: fields.title,
    subtitle: fields.subtitle,
    image: toContentAsset(resolveAsset(fields.image, includes))!,
    mobileImage: toContentAsset(resolveAsset(fields.mobileImage, includes)),
    link: fields.link,
    backgroundColor: fields.backgroundColor,
    textColor: fields.textColor,
    isActive: fields.isActive,
    startDate: fields.startDate,
    endDate: fields.endDate,
    position: fields.position,
  };
}

/**
 * Converts CF navigation menu to NavigationMenu
 */
function toNavigationMenu(
  entry: CFEntry<CFNavigationMenuFields>,
  includes?: { Entry?: CFEntry[] }
): NavigationMenu {
  const fields = entry.fields;

  const items: NavigationItem[] = [];
  fields.items?.forEach((itemLink) => {
    const itemEntry = resolveEntry<CFNavigationItemFields>(itemLink, includes);
    if (itemEntry) {
      items.push(toNavigationItem(itemEntry, includes));
    }
  });

  return {
    id: entry.sys.id,
    name: fields.name,
    items,
  };
}

/**
 * Converts CF navigation item to NavigationItem
 */
function toNavigationItem(
  entry: CFEntry<CFNavigationItemFields>,
  includes?: { Entry?: CFEntry[] }
): NavigationItem {
  const fields = entry.fields;

  const children: NavigationItem[] = [];
  fields.children?.forEach((childLink) => {
    const childEntry = resolveEntry<CFNavigationItemFields>(childLink, includes);
    if (childEntry) {
      children.push(toNavigationItem(childEntry, includes));
    }
  });

  return {
    id: entry.sys.id,
    label: fields.label,
    href: fields.href,
    icon: fields.icon,
    children: children.length > 0 ? children : undefined,
    isExternal: fields.isExternal,
    badge: fields.badge,
  };
}

/**
 * Converts CF site settings to SiteSettings
 */
function toSiteSettings(
  entry: CFEntry<CFSiteSettingsFields>,
  includes?: { Asset?: CFAsset[] }
): SiteSettings {
  const fields = entry.fields;

  return {
    siteName: fields.siteName,
    siteDescription: fields.siteDescription,
    logo: toContentAsset(resolveAsset(fields.logo, includes))!,
    favicon: toContentAsset(resolveAsset(fields.favicon, includes))!,
    socialLinks: fields.socialLinks || [],
    contactEmail: fields.contactEmail,
    contactPhone: fields.contactPhone,
    address: fields.address,
    footerText: fields.footerText,
    announcementBar: fields.announcementBarText
      ? {
          text: fields.announcementBarText,
          link: fields.announcementBarLink,
          isActive: fields.announcementBarActive || false,
        }
      : undefined,
  };
}

// ============================================
// Content Operations
// ============================================

/**
 * Get page by slug
 */
export async function getPageBySlug(
  slug: string,
  options: { preview?: boolean; locale?: string } = {}
): Promise<ContentPage> {
  const { preview = false, locale } = options;

  log.debug("Fetching page by slug", { slug, preview });

  try {
    const client = createContentfulClient({ preview });

    const params: ContentfulQueryParams = {
      content_type: "page",
      "fields.slug": slug,
      include: 3,
      limit: 1,
    };

    if (locale) {
      params.locale = locale;
    }

    const response = await client.get<CFCollection<CFEntry<CFPageFields>>>(
      "/entries",
      { params }
    );

    if (response.data.items.length === 0) {
      throw new NotFoundError("Page", `Page with slug "${slug}" not found`);
    }

    return toContentPage(response.data.items[0], response.data.includes);
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new ExternalServiceError("Contentful", "Failed to fetch page", error);
  }
}

/**
 * Get all pages
 */
export async function getAllPages(
  options: { preview?: boolean; locale?: string; limit?: number } = {}
): Promise<ContentPage[]> {
  const { preview = false, locale, limit = 100 } = options;

  log.debug("Fetching all pages", { preview, limit });

  try {
    const client = createContentfulClient({ preview });

    const params: ContentfulQueryParams = {
      content_type: "page",
      include: 3,
      limit,
    };

    if (locale) {
      params.locale = locale;
    }

    const response = await client.get<CFCollection<CFEntry<CFPageFields>>>(
      "/entries",
      { params }
    );

    return response.data.items.map((item) =>
      toContentPage(item, response.data.includes)
    );
  } catch (error) {
    throw new ExternalServiceError("Contentful", "Failed to fetch pages", error);
  }
}

/**
 * Get active banners
 */
export async function getActiveBanners(
  options: { preview?: boolean; locale?: string } = {}
): Promise<BannerData[]> {
  const { preview = false, locale } = options;

  log.debug("Fetching active banners", { preview });

  try {
    const client = createContentfulClient({ preview });

    const params: ContentfulQueryParams = {
      content_type: "banner",
      "fields.isActive": true,
      order: "fields.position",
      include: 1,
    };

    if (locale) {
      params.locale = locale;
    }

    const response = await client.get<CFCollection<CFEntry<CFBannerFields>>>(
      "/entries",
      { params }
    );

    const now = new Date();
    return response.data.items
      .map((item) => toBannerData(item, response.data.includes))
      .filter((banner) => {
        if (banner.startDate && new Date(banner.startDate) > now) return false;
        if (banner.endDate && new Date(banner.endDate) < now) return false;
        return true;
      });
  } catch (error) {
    throw new ExternalServiceError("Contentful", "Failed to fetch banners", error);
  }
}

/**
 * Get navigation menu by name
 */
export async function getNavigationMenu(
  name: string,
  options: { preview?: boolean; locale?: string } = {}
): Promise<NavigationMenu | null> {
  const { preview = false, locale } = options;

  log.debug("Fetching navigation menu", { name, preview });

  try {
    const client = createContentfulClient({ preview });

    const params: ContentfulQueryParams = {
      content_type: "navigationMenu",
      "fields.name": name,
      include: 3,
      limit: 1,
    };

    if (locale) {
      params.locale = locale;
    }

    const response = await client.get<CFCollection<CFEntry<CFNavigationMenuFields>>>(
      "/entries",
      { params }
    );

    if (response.data.items.length === 0) {
      return null;
    }

    return toNavigationMenu(response.data.items[0], response.data.includes);
  } catch (error) {
    throw new ExternalServiceError(
      "Contentful",
      "Failed to fetch navigation menu",
      error
    );
  }
}

/**
 * Get site settings
 */
export async function getSiteSettings(
  options: { preview?: boolean; locale?: string } = {}
): Promise<SiteSettings | null> {
  const { preview = false, locale } = options;

  log.debug("Fetching site settings", { preview });

  try {
    const client = createContentfulClient({ preview });

    const params: ContentfulQueryParams = {
      content_type: "siteSettings",
      include: 1,
      limit: 1,
    };

    if (locale) {
      params.locale = locale;
    }

    const response = await client.get<CFCollection<CFEntry<CFSiteSettingsFields>>>(
      "/entries",
      { params }
    );

    if (response.data.items.length === 0) {
      return null;
    }

    return toSiteSettings(response.data.items[0], response.data.includes);
  } catch (error) {
    throw new ExternalServiceError(
      "Contentful",
      "Failed to fetch site settings",
      error
    );
  }
}

/**
 * Get entries by content type
 */
export async function getEntriesByType<T>(
  contentType: string,
  options: {
    preview?: boolean;
    locale?: string;
    limit?: number;
    skip?: number;
    order?: string;
    query?: Record<string, string | number | boolean>;
  } = {}
): Promise<{ items: CFEntry<T>[]; total: number }> {
  const { preview = false, locale, limit = 100, skip = 0, order, query = {} } = options;

  log.debug("Fetching entries by type", { contentType, preview, limit });

  try {
    const client = createContentfulClient({ preview });

    const params: ContentfulQueryParams = {
      content_type: contentType,
      include: 2,
      limit,
      skip,
      ...query,
    };

    if (locale) {
      params.locale = locale;
    }

    if (order) {
      params.order = order;
    }

    const response = await client.get<CFCollection<CFEntry<T>>>(
      "/entries",
      { params }
    );

    return {
      items: response.data.items,
      total: response.data.total,
    };
  } catch (error) {
    throw new ExternalServiceError(
      "Contentful",
      "Failed to fetch entries",
      error
    );
  }
}
