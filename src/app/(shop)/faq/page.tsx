"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MessageCircle, ChevronRight } from "lucide-react";
import { FaqAccordion, FaqSearch } from "@/components/features/content";
import { Button } from "@/components/ui/button";
import type { FaqItem } from "@/types/content";

// Mock FAQ data - in production, this would come from Contentful
const mockFaqs: FaqItem[] = [
  {
    id: "1",
    question: "How do I become a PriceSmart member?",
    answer: {
      raw: null,
      html: "<p>To become a PriceSmart member, you can sign up online or visit any of our club locations. Membership options include Diamond (Individual) and Business memberships. You'll need a valid ID and payment method to complete your registration.</p>",
    },
    category: "Membership",
  },
  {
    id: "2",
    question: "What are the membership benefits?",
    answer: {
      raw: null,
      html: "<p>Members enjoy exclusive access to wholesale prices on thousands of products, special member-only promotions, the ability to shop online with delivery or pickup, and accumulate points for future purchases. Premium members also get early access to sales and additional discounts.</p>",
    },
    category: "Membership",
  },
  {
    id: "3",
    question: "How can I track my order?",
    answer: {
      raw: null,
      html: "<p>You can track your order by logging into your account and visiting the 'Orders' section. There you'll find real-time updates on your order status, estimated delivery time, and tracking information once your order has shipped.</p>",
    },
    category: "Orders",
  },
  {
    id: "4",
    question: "What is your return policy?",
    answer: {
      raw: null,
      html: "<p>We offer a 30-day return policy on most items. Products must be in their original packaging and condition. Some items like electronics have specific return windows. Perishable goods and personalized items cannot be returned. Visit our Returns page for full details.</p>",
    },
    category: "Orders",
  },
  {
    id: "5",
    question: "How does delivery work?",
    answer: {
      raw: null,
      html: "<p>We offer home delivery and club pickup options. Delivery times vary by location, typically 2-5 business days. You can select your preferred delivery window during checkout. Orders over $50 qualify for free delivery in most areas.</p>",
    },
    category: "Shipping",
  },
  {
    id: "6",
    question: "What payment methods do you accept?",
    answer: {
      raw: null,
      html: "<p>We accept all major credit and debit cards (Visa, Mastercard, American Express), PriceSmart Credit Card, and digital wallets. For in-club purchases, we also accept cash. Business members can apply for credit terms.</p>",
    },
    category: "Payments",
  },
  {
    id: "7",
    question: "How do I reset my password?",
    answer: {
      raw: null,
      html: "<p>Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. The link expires after 24 hours. If you don't receive the email, check your spam folder or contact support.</p>",
    },
    category: "Account",
  },
  {
    id: "8",
    question: "Can I change or cancel my order?",
    answer: {
      raw: null,
      html: "<p>You can modify or cancel your order within 2 hours of placing it, provided it hasn't been processed yet. After this window, please contact customer support for assistance. Once an order is shipped, it cannot be cancelled.</p>",
    },
    category: "Orders",
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return mockFaqs;
    
    const query = searchQuery.toLowerCase();
    return mockFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.html.toLowerCase().includes(query) ||
        faq.category?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const categories = useMemo(() => {
    return [...new Set(mockFaqs.map((faq) => faq.category || "General"))];
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0052a1] to-[#003d7a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Find answers to common questions about membership, orders, shipping, and more.
            </p>
            <div className="max-w-xl mx-auto">
              <FaqSearch onSearch={setSearchQuery} />
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            <button
              onClick={() => setSearchQuery("")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !searchQuery
                  ? "bg-[#0052a1] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Topics
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSearchQuery(category)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  searchQuery === category
                    ? "bg-[#0052a1] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <FaqAccordion items={filteredFaqs} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  No questions found matching "{searchQuery}"
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#e6f0fa] flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-[#0052a1]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
                  Contact Support
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline">
                  Browse Help Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
