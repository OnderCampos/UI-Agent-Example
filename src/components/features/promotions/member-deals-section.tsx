"use client";

import Image from "next/image";
import Link from "next/link";
import { Crown, Lock, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CountdownInline } from "./countdown-timer";
import type { Promotion, MemberDealSection } from "@/types/promotion";

interface MemberDealsSectionProps {
  section: MemberDealSection;
  isMember?: boolean;
  memberTier?: string;
  onJoinClick?: () => void;
  className?: string;
}

export function MemberDealsSection({
  section,
  isMember = false,
  memberTier,
  onJoinClick,
  className,
}: MemberDealsSectionProps) {
  const hasAccess = isMember && (!section.requiredTier || memberTier === section.requiredTier);

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden",
        className
      )}
      style={{ backgroundColor: section.backgroundColor || "#0052a1" }}
    >
      {/* Header */}
      <div className="p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
              {section.subtitle && (
                <p className="text-white/80 mt-1">{section.subtitle}</p>
              )}
            </div>
          </div>

          {!isMember && (
            <Button
              onClick={onJoinClick}
              className="bg-white text-[#0052a1] hover:bg-gray-100"
            >
              Join Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Deals Grid */}
      <div className="p-6 bg-white">
        {hasAccess ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {section.deals.map((deal) => (
              <MemberDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <LockedDealsOverlay
            dealsCount={section.deals.length}
            onJoinClick={onJoinClick}
            requiredTier={section.requiredTier}
          />
        )}
      </div>
    </div>
  );
}

function MemberDealCard({
  deal,
  onAddToCart,
}: {
  deal: Promotion;
  onAddToCart?: () => void;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
      {/* Image */}
      {deal.imageUrl && (
        <Link href={deal.targetUrl || "#"}>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white mb-3">
            <Image
              src={deal.imageUrl}
              alt={deal.title}
              fill
              className="object-cover"
            />
            {deal.badge && (
              <Badge className="absolute top-2 left-2 bg-[#0052a1]">
                {deal.badge}
              </Badge>
            )}
          </div>
        </Link>
      )}

      {/* Content */}
      <Link href={deal.targetUrl || "#"}>
        <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-[#0052a1]">
          {deal.title}
        </h3>
      </Link>

      {deal.discount && (
        <div className="mt-2">
          {deal.discount.type === "percentage" && (
            <span className="text-lg font-bold text-red-600">
              {deal.discount.value}% OFF
            </span>
          )}
          {deal.discount.type === "fixed_amount" && (
            <span className="text-lg font-bold text-red-600">
              ${deal.discount.value} OFF
            </span>
          )}
        </div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        <CountdownInline endDate={deal.endDate} prefix="Ends" />
      </div>

      <Button
        onClick={onAddToCart}
        size="sm"
        className="w-full mt-3 bg-[#0052a1] hover:bg-[#003d7a]"
      >
        <ShoppingCart className="w-4 h-4 mr-1" />
        Shop Now
      </Button>
    </div>
  );
}

function LockedDealsOverlay({
  dealsCount,
  onJoinClick,
  requiredTier,
}: {
  dealsCount: number;
  onJoinClick?: () => void;
  requiredTier?: string;
}) {
  return (
    <div className="relative py-16 text-center">
      {/* Blurred preview */}
      <div className="absolute inset-0 grid grid-cols-4 gap-4 p-4 opacity-20 blur-sm">
        {Array.from({ length: Math.min(4, dealsCount) }).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl aspect-square" />
        ))}
      </div>

      {/* Lock message */}
      <div className="relative">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {requiredTier 
            ? `${requiredTier} Members Only`
            : "Members Only Deals"
          }
        </h3>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Unlock exclusive discounts and member-only prices by joining our membership program.
        </p>
        <Button
          onClick={onJoinClick}
          className="mt-4 bg-[#0052a1] hover:bg-[#003d7a]"
        >
          <Crown className="w-4 h-4 mr-2" />
          Become a Member
        </Button>
      </div>
    </div>
  );
}

/**
 * Member exclusive badge
 */
export function MemberExclusiveBadge({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-[10px] px-1.5 py-0.5",
    default: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    default: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium rounded-full",
      sizes[size],
      className
    )}>
      <Crown className={iconSizes[size]} />
      Member Exclusive
    </span>
  );
}

/**
 * Member price display
 */
export function MemberPriceDisplay({
  regularPrice,
  memberPrice,
  currency = "USD",
  isMember = false,
  className,
}: {
  regularPrice: number;
  memberPrice: number;
  currency?: string;
  isMember?: boolean;
  className?: string;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  const savings = regularPrice - memberPrice;
  const savingsPercentage = Math.round((savings / regularPrice) * 100);

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-[#0052a1]">
          {formatter.format(memberPrice)}
        </span>
        <span className="text-sm text-gray-400 line-through">
          {formatter.format(regularPrice)}
        </span>
      </div>
      {isMember ? (
        <div className="flex items-center gap-2">
          <MemberExclusiveBadge size="sm" />
          <span className="text-xs text-green-600 font-medium">
            You save {formatter.format(savings)} ({savingsPercentage}%)
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Lock className="w-3 h-3" />
          <span>Join to get member price</span>
        </div>
      )}
    </div>
  );
}
