"use client";

import { useCallback, useEffect, useState } from "react";
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Store, Coordinates } from "@/types/store";

interface StoreMapProps {
  stores: Store[];
  center?: Coordinates;
  selectedStoreId?: string;
  onStoreSelect?: (store: Store) => void;
  onCenterChange?: (center: Coordinates) => void;
  className?: string;
  zoom?: number;
}

/**
 * Store Map Component
 * 
 * Note: For production, integrate with @react-google-maps/api
 * This is a placeholder implementation that shows a static map image
 */
export function StoreMap({
  stores,
  center,
  selectedStoreId,
  onStoreSelect,
  onCenterChange,
  className,
  zoom = 10,
}: StoreMapProps) {
  const [mapCenter, setMapCenter] = useState<Coordinates>(
    center || (stores[0]?.coordinates) || { lat: 9.9281, lng: -84.1403 }
  );
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (center) {
      setMapCenter(center);
    }
  }, [center]);

  const handleLocateUser = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newCenter);
        setMapCenter(newCenter);
        onCenterChange?.(newCenter);
        setIsLocating(false);
      },
      () => {
        alert("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  }, [onCenterChange]);

  const handleZoomIn = () => setCurrentZoom((z) => Math.min(z + 1, 18));
  const handleZoomOut = () => setCurrentZoom((z) => Math.max(z - 1, 5));

  // Generate static map URL (Google Static Maps API)
  const mapUrl = generateStaticMapUrl(mapCenter, currentZoom, stores, selectedStoreId);

  return (
    <div className={cn("relative bg-gray-100 rounded-xl overflow-hidden", className)}>
      {/* Map Image */}
      <div className="aspect-[4/3] md:aspect-[16/9] relative">
        {/* Placeholder map - replace with Google Maps component in production */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${mapUrl})`,
            backgroundColor: "#e5e7eb"
          }}
        />

        {/* Store Markers Overlay (for click interaction) */}
        <div className="absolute inset-0">
          {stores.map((store) => {
            const isSelected = store.id === selectedStoreId;
            // Position would be calculated based on lat/lng in real implementation
            return (
              <button
                key={store.id}
                onClick={() => onStoreSelect?.(store)}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-full",
                  "transition-transform hover:scale-110",
                  isSelected && "scale-110 z-10"
                )}
                style={{
                  // Simplified positioning - in production use proper projection
                  left: `${50 + (store.coordinates.lng - mapCenter.lng) * 50}%`,
                  top: `${50 - (store.coordinates.lat - mapCenter.lat) * 50}%`,
                }}
                title={store.name}
              >
                <MapPin
                  className={cn(
                    "w-8 h-8 drop-shadow-lg",
                    isSelected ? "text-[#f5a623]" : "text-[#0052a1]",
                    store.isOpen ? "" : "opacity-60"
                  )}
                  fill={isSelected ? "#f5a623" : "#0052a1"}
                />
              </button>
            );
          })}
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white shadow-md"
            onClick={handleZoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white shadow-md"
            onClick={handleZoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white shadow-md"
            onClick={handleLocateUser}
            disabled={isLocating}
          >
            <Navigation className={cn("w-4 h-4", isLocating && "animate-pulse")} />
          </Button>
        </div>

        {/* User Location Marker */}
        {userLocation && (
          <div
            className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + (userLocation.lng - mapCenter.lng) * 50}%`,
              top: `${50 - (userLocation.lat - mapCenter.lat) * 50}%`,
            }}
          />
        )}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#0052a1]" fill="#0052a1" />
            <span>Store</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#f5a623]" fill="#f5a623" />
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Generate a static map URL
 * In production, use Google Static Maps API or similar
 */
function generateStaticMapUrl(
  center: Coordinates,
  zoom: number,
  stores: Store[],
  selectedStoreId?: string
): string {
  // Placeholder - return a generic map tile
  // In production: return Google Static Maps URL with markers
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${center.lng},${center.lat},${zoom}/800x450?access_token=pk.placeholder`;
}

interface MiniMapProps {
  store: Store;
  className?: string;
}

/**
 * Mini map for store detail pages
 */
export function MiniMap({ store, className }: MiniMapProps) {
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className={cn("relative bg-gray-100 rounded-xl overflow-hidden", className)}>
      <div className="aspect-video relative">
        {/* Placeholder map image */}
        <div 
          className="absolute inset-0 bg-gray-200"
          style={{
            backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+0052a1(${store.coordinates.lng},${store.coordinates.lat})/${store.coordinates.lng},${store.coordinates.lat},14/400x225?access_token=pk.placeholder)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Center marker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <MapPin className="w-10 h-10 text-[#0052a1] drop-shadow-lg" fill="#0052a1" />
        </div>
      </div>

      {/* Get Directions Button */}
      <div className="absolute bottom-3 right-3">
        <Button
          onClick={handleGetDirections}
          className="bg-white text-[#0052a1] hover:bg-gray-100 shadow-lg"
          size="sm"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
      </div>
    </div>
  );
}
