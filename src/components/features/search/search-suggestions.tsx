"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, TrendingUp, X, Loader2 } from "lucide-react";

interface SearchSuggestion {
  type: "product" | "category" | "query";
  id: string;
  text: string;
  url: string;
  image?: { url: string; alt?: string };
  price?: string;
}

interface SearchSuggestionsProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (suggestion: SearchSuggestion) => void;
}

// Mock suggestions data
const popularSearches = [
  "Organic Coffee",
  "Olive Oil",
  "Almond Butter",
  "Wireless Headphones",
  "Smart Watch",
];

const mockSuggestions: SearchSuggestion[] = [
  {
    type: "product",
    id: "prod-1",
    text: "Organic Coffee Beans - Premium Blend",
    url: "/products/organic-coffee-beans",
    image: { url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100", alt: "Coffee" },
    price: "$24.99",
  },
  {
    type: "product",
    id: "prod-2",
    text: "Organic Almond Butter",
    url: "/products/almond-butter",
    image: { url: "https://images.unsplash.com/photo-1612187209234-567b6e9a1439?w=100", alt: "Almond Butter" },
    price: "$12.99",
  },
  {
    type: "category",
    id: "cat-1",
    text: "Organic Foods",
    url: "/categories/organic",
  },
  {
    type: "query",
    id: "query-1",
    text: "organic snacks",
    url: "/search?q=organic+snacks",
  },
];

export function SearchSuggestions({
  query,
  isOpen,
  onClose,
  onSelect,
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      // Filter mock suggestions based on query
      const filtered = mockSuggestions.filter(
        (s) => s.text.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const removeRecentSearch = (search: string) => {
    const updated = recentSearches.filter((s) => s !== search);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
    >
      {/* Query Suggestions */}
      {query.trim() && (
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#0052a1]" />
            </div>
          ) : suggestions.length > 0 ? (
            <>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                Suggestions
              </p>
              <div className="space-y-1">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion.id}
                    href={suggestion.url}
                    onClick={() => onSelect(suggestion)}
                    className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {suggestion.type === "product" && suggestion.image ? (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={suggestion.image.url}
                          alt={suggestion.image.alt || suggestion.text}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {suggestion.text}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {suggestion.type}
                      </p>
                    </div>
                    {suggestion.price && (
                      <span className="text-sm font-semibold text-[#0052a1]">
                        {suggestion.price}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="block mt-4 text-center text-sm text-[#0052a1] hover:underline"
                onClick={onClose}
              >
                See all results for &quot;{query}&quot;
              </Link>
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
              <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {/* No Query State - Show Recent & Popular */}
      {!query.trim() && (
        <>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Recent Searches
                </p>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-[#0052a1] hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.slice(0, 5).map((search) => (
                  <div
                    key={search}
                    className="flex items-center justify-between group"
                  >
                    <Link
                      href={`/search?q=${encodeURIComponent(search)}`}
                      className="flex-1 p-2 -mx-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700"
                      onClick={onClose}
                    >
                      {search}
                    </Link>
                    <button
                      onClick={() => removeRecentSearch(search)}
                      className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-3">
              <TrendingUp className="w-3 h-3" />
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <Link
                  key={search}
                  href={`/search?q=${encodeURIComponent(search)}`}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  onClick={onClose}
                >
                  {search}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
