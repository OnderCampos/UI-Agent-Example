"use client";

import {
  Pill,
  Eye,
  CakeSlice,
  UtensilsCrossed,
  Beef,
  Camera,
  Car,
  Fuel,
  Coffee,
  Ear,
  Briefcase,
  Plane,
  Package,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { StoreService } from "@/types/store";

// Icon mapping for services
const SERVICE_ICONS: Record<string, React.ElementType> = {
  pharmacy: Pill,
  optical: Eye,
  bakery: CakeSlice,
  deli: UtensilsCrossed,
  meat_shop: Beef,
  photo_center: Camera,
  tire_center: Car,
  gas_station: Fuel,
  food_court: Coffee,
  hearing_aids: Ear,
  business_center: Briefcase,
  travel: Plane,
  default: Package,
};

interface StoreServicesProps {
  services: StoreService[];
  variant?: "grid" | "list" | "compact";
  className?: string;
}

export function StoreServices({
  services,
  variant = "grid",
  className,
}: StoreServicesProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-1", className)}>
        {services
          .filter((s) => s.isAvailable)
          .map((service) => (
            <ServiceBadge key={service.id} service={service} />
          ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-2", className)}>
        {services.map((service) => (
          <ServiceListItem key={service.id} service={service} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-3", className)}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}

interface ServiceCardProps {
  service: StoreService;
}

function ServiceCard({ service }: ServiceCardProps) {
  const Icon = SERVICE_ICONS[service.id] || SERVICE_ICONS.default;

  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-colors",
        service.isAvailable
          ? "bg-white border-gray-200 hover:border-[#0052a1]/30"
          : "bg-gray-50 border-gray-100 opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            service.isAvailable ? "bg-[#e6f0fa]" : "bg-gray-100"
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5",
              service.isAvailable ? "text-[#0052a1]" : "text-gray-400"
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm">{service.name}</h4>
          {service.description && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
              {service.description}
            </p>
          )}
          {!service.isAvailable && (
            <span className="text-xs text-gray-400 mt-1 block">
              Currently unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceListItem({ service }: ServiceCardProps) {
  const Icon = SERVICE_ICONS[service.id] || SERVICE_ICONS.default;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg",
        service.isAvailable ? "bg-white" : "bg-gray-50 opacity-60"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          service.isAvailable ? "bg-[#e6f0fa]" : "bg-gray-100"
        )}
      >
        <Icon
          className={cn(
            "w-4 h-4",
            service.isAvailable ? "text-[#0052a1]" : "text-gray-400"
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-gray-900 text-sm">{service.name}</span>
      </div>
      {service.isAvailable && (
        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
      )}
    </div>
  );
}

function ServiceBadge({ service }: ServiceCardProps) {
  const Icon = SERVICE_ICONS[service.id] || SERVICE_ICONS.default;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        service.isAvailable
          ? "bg-[#e6f0fa] text-[#0052a1]"
          : "bg-gray-100 text-gray-500"
      )}
    >
      <Icon className="w-3 h-3" />
      {service.name}
    </span>
  );
}

interface StoreAmenitiesProps {
  amenities: string[];
  className?: string;
}

export function StoreAmenities({ amenities, className }: StoreAmenitiesProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {amenities.map((amenity) => (
        <span
          key={amenity}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
        >
          <CheckCircle className="w-3 h-3 text-green-500" />
          {amenity}
        </span>
      ))}
    </div>
  );
}
