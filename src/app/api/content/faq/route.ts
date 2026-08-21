/**
 * FAQ API Route
 * Returns FAQ items, optionally filtered by category
 */

import { NextRequest, NextResponse } from "next/server";
import type { FaqItem } from "@/types/content";

// Mock FAQ data - in production, this would come from Contentful via ContentService
const mockFaqs: FaqItem[] = [
  {
    id: "1",
    question: "How do I become a PriceSmart member?",
    answer: {
      raw: null,
      html: "<p>To become a PriceSmart member, you can sign up online or visit any of our club locations. Membership options include Diamond (Individual) and Business memberships.</p>",
    },
    category: "Membership",
  },
  {
    id: "2",
    question: "What are the membership benefits?",
    answer: {
      raw: null,
      html: "<p>Members enjoy exclusive access to wholesale prices, special promotions, online shopping with delivery or pickup, and points accumulation.</p>",
    },
    category: "Membership",
  },
  {
    id: "3",
    question: "How can I track my order?",
    answer: {
      raw: null,
      html: "<p>You can track your order by logging into your account and visiting the 'Orders' section for real-time updates.</p>",
    },
    category: "Orders",
  },
  {
    id: "4",
    question: "What is your return policy?",
    answer: {
      raw: null,
      html: "<p>We offer a 30-day return policy on most items. Products must be in their original packaging and condition.</p>",
    },
    category: "Orders",
  },
  {
    id: "5",
    question: "How does delivery work?",
    answer: {
      raw: null,
      html: "<p>We offer home delivery and club pickup options. Delivery times vary by location, typically 2-5 business days.</p>",
    },
    category: "Shipping",
  },
  {
    id: "6",
    question: "What payment methods do you accept?",
    answer: {
      raw: null,
      html: "<p>We accept all major credit and debit cards, PriceSmart Credit Card, and digital wallets.</p>",
    },
    category: "Payments",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let faqs = [...mockFaqs];

  // Filter by category
  if (category) {
    faqs = faqs.filter(
      (faq) => faq.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search query
  if (search) {
    const query = search.toLowerCase();
    faqs = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.html.toLowerCase().includes(query)
    );
  }

  // Get unique categories
  const categories = [...new Set(mockFaqs.map((faq) => faq.category || "General"))];

  return NextResponse.json({
    success: true,
    data: {
      items: faqs,
      categories,
      total: faqs.length,
    },
  });
}
