"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PromoBanner, } from "@/types/promotion";

interface BannerCarouselProps {
  banners: PromoBanner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  className?: string;
}

export function BannerCarousel({
  banners,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  className,
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeBanners = banners.filter((b) => b.isActive);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === 0 ? activeBanners.length - 1 : prev - 1
    );
  }, [activeBanners.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || isPaused || activeBanners.length <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, goToNext, activeBanners.length]);

  if (activeBanners.length === 0) {
    return null;
  }

  const _currentBanner = activeBanners[currentIndex];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Slides */}
      <div className="relative aspect-[21/9] md:aspect-[3/1]">
        {activeBanners.map((banner, index) => (
          <BannerSlide
            key={banner.id}
            banner={banner}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && activeBanners.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2",
              "w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm",
              "flex items-center justify-center",
              "hover:bg-white transition-colors",
              "shadow-md"
            )}
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2",
              "w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm",
              "flex items-center justify-center",
              "hover:bg-white transition-colors",
              "shadow-md"
            )}
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && activeBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BannerSlide({
  banner,
  isActive,
}: {
  banner: PromoBanner;
  isActive: boolean;
}) {
  const content = (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-500",
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{
        backgroundColor: banner.backgroundColor || "#f3f4f6",
      }}
    >
      {/* Background Image */}
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="object-cover"
        priority={isActive}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ color: banner.textColor || "#ffffff" }}
            >
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p
                className="mt-3 text-lg md:text-xl opacity-90"
                style={{ color: banner.textColor || "#ffffff" }}
              >
                {banner.subtitle}
              </p>
            )}
            {banner.ctaText && banner.ctaUrl && (
              <Button
                asChild
                size="lg"
                className="mt-6 bg-white text-gray-900 hover:bg-gray-100"
              >
                <Link href={banner.ctaUrl}>{banner.ctaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (banner.ctaUrl && !banner.ctaText) {
    return <Link href={banner.ctaUrl}>{content}</Link>;
  }

  return content;
}

/**
 * Simple static banner (no carousel)
 */
export function PromoBannerStatic({
  banner,
  className,
}: {
  banner: PromoBanner;
  className?: string;
}) {
  const content = (
    <div
      className={cn(
        "relative aspect-[21/9] md:aspect-[3/1] rounded-xl overflow-hidden",
        className
      )}
      style={{ backgroundColor: banner.backgroundColor || "#f3f4f6" }}
    >
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-lg">
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: banner.textColor || "#ffffff" }}
            >
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p
                className="mt-2 text-base md:text-lg opacity-90"
                style={{ color: banner.textColor || "#ffffff" }}
              >
                {banner.subtitle}
              </p>
            )}
            {banner.ctaText && banner.ctaUrl && (
              <Button
                asChild
                className="mt-4 bg-white text-gray-900 hover:bg-gray-100"
              >
                <Link href={banner.ctaUrl}>{banner.ctaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (banner.ctaUrl && !banner.ctaText) {
    return <Link href={banner.ctaUrl}>{content}</Link>;
  }

  return content;
}

/**
 * Compact promotional strip (top of page)
 */
export function PromoStrip({
  message,
  linkText,
  linkUrl,
  backgroundColor = "#0052a1",
  textColor = "#ffffff",
  onClose,
  className,
}: {
  message: string;
  linkText?: string;
  linkUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn("py-2 px-4 text-center text-sm", className)}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span>{message}</span>
        {linkText && linkUrl && (
          <Link
            href={linkUrl}
            className="font-semibold underline hover:no-underline"
          >
            {linkText}
          </Link>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 opacity-70 hover:opacity-100"
            aria-label="Close"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
