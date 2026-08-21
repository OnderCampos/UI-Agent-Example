"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ChevronRight, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Store } from "@/types/store";

interface StoreCardProps {
  store: Store;
  variant?: "default" | "compact" | "detailed";
  showDistance?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function StoreCard({
  store,
  variant = "default",
  showDistance = true,
  isSelected = false,
  onClick,
  className,
}: StoreCardProps) {
  const handleGetDirections = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
    window.open(url, "_blank");
  };

  if (variant === "compact") {
    return (
      <button
        onClick={onClick}
        className={cn(
          "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
          isSelected
            ? "bg-[#e6f0fa] border-2 border-[#0052a1]"
            : "bg-white hover:bg-gray-50 border border-gray-200",
          className
        )}
      >
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          store.isOpen ? "bg-green-100" : "bg-gray-100"
        )}>
          <MapPin className={cn(
            "w-5 h-5",
            store.isOpen ? "text-green-600" : "text-gray-400"
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{store.name}</h4>
          <p className="text-sm text-gray-500 truncate">{store.address.city}</p>
        </div>
        {showDistance && store.distance !== undefined && (
          <span className="text-sm text-gray-500 shrink-0">
            {store.distance} km
          </span>
        )}
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
      </button>
    );
  }

  if (variant === "detailed") {
    return (
      <div
        className={cn(
          "bg-white rounded-xl border overflow-hidden",
          isSelected ? "border-[#0052a1] ring-2 ring-[#0052a1]/20" : "border-gray-200",
          className
        )}
      >
        {/* Store Image */}
        {store.image && (
          <div className="relative h-48">
            <Image
              src={store.image}
              alt={store.name}
              fill
              className="object-cover"
            />
            {store.distance !== undefined && showDistance && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                {store.distance} km away
              </div>
            )}
          </div>
        )}

        {/* Store Info */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{store.name}</h3>
              <p className="text-sm text-gray-500">{store.address.formatted}</p>
            </div>
            <StatusBadge isOpen={store.isOpen} />
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <a href={`tel:${store.phone}`} className="hover:text-[#0052a1]">
                {store.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {store.isOpen
                  ? `Open until ${getTodayCloseTime(store)}`
                  : store.nextOpenTime || "Closed"}
              </span>
            </div>
          </div>

          {/* Services Preview */}
          {store.services.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {store.services.slice(0, 3).map((service) => (
                <span
                  key={service.id}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {service.name}
                </span>
              ))}
              {store.services.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{store.services.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Link href={`/stores/${store.slug}`} className="flex-1">
              <Button className="w-full bg-[#0052a1] hover:bg-[#003d7a]">
                View Store
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleGetDirections}
              className="shrink-0"
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <Link
      href={`/stores/${store.slug}`}
      className={cn(
        "block bg-white rounded-xl border p-4 hover:shadow-md transition-all group",
        isSelected ? "border-[#0052a1] ring-2 ring-[#0052a1]/20" : "border-gray-200",
        className
      )}
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Store Icon/Image */}
        <div className="w-16 h-16 rounded-lg bg-[#e6f0fa] flex items-center justify-center shrink-0">
          {store.image ? (
            <Image
              src={store.image}
              alt={store.name}
              width={64}
              height={64}
              className="rounded-lg object-cover"
            />
          ) : (
            <MapPin className="w-8 h-8 text-[#0052a1]" />
          )}
        </div>

        {/* Store Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-[#0052a1] transition-colors">
              {store.name}
            </h3>
            <StatusBadge isOpen={store.isOpen} size="sm" />
          </div>
          <p className="text-sm text-gray-500 mb-2 truncate">
            {store.address.city}, {store.address.state}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {showDistance && store.distance !== undefined && (
              <span>{store.distance} km</span>
            )}
            <span>{store.phone}</span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0 self-center group-hover:text-[#0052a1] transition-colors" />
      </div>
    </Link>
  );
}

interface StatusBadgeProps {
  isOpen: boolean;
  size?: "sm" | "default";
}

function StatusBadge({ isOpen, size = "default" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        isOpen
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full mr-1.5",
          isOpen ? "bg-green-500" : "bg-gray-400"
        )}
      />
      {isOpen ? "Open" : "Closed"}
    </span>
  );
}

function getTodayCloseTime(store: Store): string {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = days[new Date().getDay()];
  const todayHours = store.hours.find((h) => h.day === today);
  return todayHours?.closeTime || "N/A";
}
