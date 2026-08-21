/**
 * Help Center API Route
 * Returns help categories and articles
 */

import { NextRequest, NextResponse } from "next/server";
import type { HelpCategory, HelpArticle } from "@/types/content";

// Mock data - in production, this would come from Contentful
const mockCategories: HelpCategory[] = [
  {
    id: "1",
    slug: "orders",
    name: "Orders & Purchases",
    description: "Track orders, view history, manage returns and refunds",
    icon: "orders",
    articleCount: 15,
  },
  {
    id: "2",
    slug: "shipping",
    name: "Shipping & Delivery",
    description: "Delivery options, tracking, pickup instructions",
    icon: "shipping",
    articleCount: 12,
  },
  {
    id: "3",
    slug: "payments",
    name: "Payments & Billing",
    description: "Payment methods, invoices, billing issues",
    icon: "payments",
    articleCount: 10,
  },
  {
    id: "4",
    slug: "account",
    name: "Account & Membership",
    description: "Manage your account, membership benefits, renewal",
    icon: "account",
    articleCount: 18,
  },
];

const mockArticles: HelpArticle[] = [
  {
    id: "1",
    slug: "how-to-track-order",
    title: "How to track your order",
    excerpt: "Learn how to check the status of your order and get real-time tracking updates.",
    content: {
      raw: null,
      html: "<h2>Tracking Your Order</h2><p>Once your order is placed, you can track it through several methods...</p>",
    },
    category: "orders",
    isPopular: true,
    publishedAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    slug: "return-policy",
    title: "Return and refund policy",
    excerpt: "Everything you need to know about returning items and getting refunds.",
    content: {
      raw: null,
      html: "<h2>Our Return Policy</h2><p>We offer a 30-day return policy on most items...</p>",
    },
    category: "orders",
    isPopular: true,
    publishedAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "3",
    slug: "delivery-options",
    title: "Delivery options explained",
    excerpt: "Compare home delivery and club pickup options to find what works for you.",
    content: {
      raw: null,
      html: "<h2>Delivery Options</h2><p>We offer flexible delivery options to suit your needs...</p>",
    },
    category: "shipping",
    isPopular: true,
    publishedAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "4",
    slug: "membership-benefits",
    title: "Membership benefits guide",
    excerpt: "Discover all the perks and savings available to PriceSmart members.",
    content: {
      raw: null,
      html: "<h2>Member Benefits</h2><p>As a PriceSmart member, you enjoy exclusive access to...</p>",
    },
    category: "account",
    isPopular: true,
    publishedAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const popular = searchParams.get("popular");

  let articles = [...mockArticles];

  // Filter by category
  if (category) {
    articles = articles.filter(
      (article) => article.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search query
  if (search) {
    const query = search.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query)
    );
  }

  // Filter popular articles
  if (popular === "true") {
    articles = articles.filter((article) => article.isPopular);
  }

  return NextResponse.json({
    success: true,
    data: {
      categories: mockCategories,
      articles,
      total: articles.length,
    },
  });
}
