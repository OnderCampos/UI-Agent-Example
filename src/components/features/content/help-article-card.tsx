"use client";

import Link from "next/link";
import { 
  FileText, 
  HelpCircle, 
  ShoppingCart, 
  Truck, 
  CreditCard, 
  User,
  Settings,
  Shield,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { HelpArticle, HelpCategory } from "@/types/content";

// Icon mapping for categories
const categoryIcons: Record<string, React.ElementType> = {
  general: HelpCircle,
  orders: ShoppingCart,
  shipping: Truck,
  payments: CreditCard,
  account: User,
  settings: Settings,
  security: Shield,
  default: FileText,
};

interface HelpArticleCardProps {
  article: HelpArticle;
  variant?: "default" | "compact";
  className?: string;
}

export function HelpArticleCard({ 
  article, 
  variant = "default",
  className 
}: HelpArticleCardProps) {
  const Icon = categoryIcons[article.category?.toLowerCase()] || categoryIcons.default;

  if (variant === "compact") {
    return (
      <Link
        href={`/help/article/${article.slug}`}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group",
          className
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-[#e6f0fa] flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-[#0052a1]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate group-hover:text-[#0052a1] transition-colors">
            {article.title}
          </h4>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
      </Link>
    );
  }

  return (
    <Link
      href={`/help/article/${article.slug}`}
      className={cn(
        "block p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-[#0052a1]/20 transition-all group",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#e6f0fa] flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-[#0052a1]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#0052a1] transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {article.excerpt}
          </p>
          {article.category && (
            <span className="inline-block mt-3 text-xs font-medium text-[#0052a1] bg-[#e6f0fa] px-2 py-1 rounded">
              {article.category}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

interface HelpCategoryCardProps {
  category: HelpCategory;
  className?: string;
}

export function HelpCategoryCard({ category, className }: HelpCategoryCardProps) {
  const Icon = categoryIcons[category.slug?.toLowerCase()] || categoryIcons.default;

  return (
    <Link
      href={`/help/${category.slug}`}
      className={cn(
        "block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-[#0052a1]/30 transition-all group",
        className
      )}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0052a1] to-[#003d7a] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#0052a1] transition-colors">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {category.description}
        </p>
      )}
      <div className="flex items-center text-sm text-[#0052a1] font-medium">
        <span>{category.articleCount} articles</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </Link>
  );
}

interface PopularArticlesProps {
  articles: HelpArticle[];
  className?: string;
}

export function PopularArticles({ articles, className }: PopularArticlesProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 p-6", className)}>
      <h3 className="font-bold text-gray-900 mb-4">Popular Articles</h3>
      <div className="space-y-1">
        {articles.map((article) => (
          <HelpArticleCard
            key={article.id}
            article={article}
            variant="compact"
          />
        ))}
      </div>
    </div>
  );
}
