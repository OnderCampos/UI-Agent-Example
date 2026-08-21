"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  HelpCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { HelpCategoryCard, HelpArticleCard } from "@/components/features/content";
import { Button } from "@/components/ui/button";
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
  {
    id: "5",
    slug: "security",
    name: "Privacy & Security",
    description: "Data protection, account security, privacy settings",
    icon: "security",
    articleCount: 8,
  },
  {
    id: "6",
    slug: "general",
    name: "General Help",
    description: "Store information, policies, and other questions",
    icon: "general",
    articleCount: 20,
  },
];

const mockPopularArticles: HelpArticle[] = [
  {
    id: "1",
    slug: "how-to-track-order",
    title: "How to track your order",
    excerpt: "Learn how to check the status of your order and get real-time tracking updates.",
    content: { raw: null, html: "" },
    category: "Orders",
    isPopular: true,
    publishedAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    slug: "return-policy",
    title: "Return and refund policy",
    excerpt: "Everything you need to know about returning items and getting refunds.",
    content: { raw: null, html: "" },
    category: "Orders",
    isPopular: true,
    publishedAt: "2024-01-01",
    updatedAt: "2024-01-10",
  },
  {
    id: "3",
    slug: "delivery-options",
    title: "Delivery options explained",
    excerpt: "Compare home delivery and club pickup options to find what works for you.",
    content: { raw: null, html: "" },
    category: "Shipping",
    isPopular: true,
    publishedAt: "2024-01-01",
    updatedAt: "2024-01-12",
  },
  {
    id: "4",
    slug: "membership-benefits",
    title: "Membership benefits guide",
    excerpt: "Discover all the perks and savings available to PriceSmart members.",
    content: { raw: null, html: "" },
    category: "Account",
    isPopular: true,
    publishedAt: "2024-01-01",
    updatedAt: "2024-01-08",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0052a1] to-[#003d7a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How can we help you?
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Search our help center or browse categories below
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pl-14 text-gray-900 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6 flex-wrap text-sm">
            <Link 
              href="/faq" 
              className="text-[#0052a1] hover:underline font-medium flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" />
              View FAQ
            </Link>
            <Link 
              href="/contact" 
              className="text-[#0052a1] hover:underline font-medium flex items-center gap-1"
            >
              Contact Support
            </Link>
            <Link 
              href="/stores" 
              className="text-[#0052a1] hover:underline font-medium flex items-center gap-1"
            >
              Find a Store
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockCategories.map((category) => (
              <HelpCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Popular Articles
              </h2>
              <Link 
                href="/help/all-articles"
                className="text-[#0052a1] hover:underline font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mockPopularArticles.map((article) => (
                <HelpArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-8">
              Our customer support team is available 24/7 to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#0052a1] hover:bg-[#003d7a] w-full sm:w-auto">
                  Contact Us
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
