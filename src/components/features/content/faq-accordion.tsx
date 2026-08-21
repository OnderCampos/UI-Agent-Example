"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/content";

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, FaqItem[]>);

  const categories = Object.keys(groupedItems);

  return (
    <div className={cn("space-y-8", className)}>
      {categories.map((category) => (
        <div key={category}>
          {categories.length > 1 && (
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {category}
            </h3>
          )}
          <div className="space-y-3">
            {groupedItems[category].map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface FaqAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqAccordionItem({ item, isOpen, onToggle }: FaqAccordionItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div
          className="p-4 pt-0 text-gray-600 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: item.answer.html }}
        />
      </div>
    </div>
  );
}

interface FaqSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function FaqSearch({ onSearch, placeholder = "Search FAQs..." }: FaqSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052a1] focus:border-transparent"
      />
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
