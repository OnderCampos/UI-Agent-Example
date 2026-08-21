"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, MapPin, List, Map as MapIcon, } from "lucide-react";
import { StoreMap, StoreCard } from "@/components/features/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Store, Coordinates } from "@/types/store";

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // Fetch stores
  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetch("/api/stores");
        const data = await response.json();
        if (data.success) {
          setStores(data.data.stores);
          setFilteredStores(data.data.stores);
        }
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStores();
  }, []);

  // Filter stores based on search and country
  useEffect(() => {
    let filtered = stores;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(query) ||
          store.address.city.toLowerCase().includes(query) ||
          store.address.state.toLowerCase().includes(query)
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter(
        (store) => store.address.country === selectedCountry
      );
    }

    // Sort by distance if user location is available
    if (userLocation) {
      filtered = filtered.map((store) => ({
        ...store,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          store.coordinates.lat,
          store.coordinates.lng
        ),
      }));
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    setFilteredStores(filtered);
  }, [stores, searchQuery, selectedCountry, userLocation]);

  const handleLocateUser = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  }, []);

  // Get unique countries
  const countries = [...new Set(stores.map((s) => s.address.country))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0052a1] to-[#003d7a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find a Store Near You
            </h1>
            <p className="text-lg text-white/80">
              Visit one of our club locations for the best wholesale shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by city, state, or store name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052a1] focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Country Filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0052a1]"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {getCountryName(country)}
                </option>
              ))}
            </select>

            {/* Use My Location */}
            <Button
              variant="outline"
              onClick={handleLocateUser}
              className="shrink-0"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Use My Location
            </Button>

            {/* View Toggle */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden shrink-0">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-4 py-2 flex items-center gap-2",
                  viewMode === "list"
                    ? "bg-[#0052a1] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                )}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={cn(
                  "px-4 py-2 flex items-center gap-2",
                  viewMode === "map"
                    ? "bg-[#0052a1] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                )}
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              {isLoading ? (
                "Loading stores..."
              ) : (
                <>
                  <span className="font-semibold">{filteredStores.length}</span>{" "}
                  {filteredStores.length === 1 ? "store" : "stores"} found
                  {userLocation && " near you"}
                </>
              )}
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : viewMode === "map" ? (
            <div className="grid lg:grid-cols-[1fr_400px] gap-6">
              {/* Map */}
              <StoreMap
                stores={filteredStores}
                selectedStoreId={selectedStore?.id}
                onStoreSelect={setSelectedStore}
                center={userLocation || undefined}
                className="h-[500px] lg:h-[600px]"
              />

              {/* Store List Sidebar */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-semibold text-gray-900">
                    Stores ({filteredStores.length})
                  </h3>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  {filteredStores.map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      variant="compact"
                      isSelected={selectedStore?.id === store.id}
                      onClick={() => setSelectedStore(store)}
                      className="border-b last:border-b-0 rounded-none"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  variant="detailed"
                  showDistance={!!userLocation}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredStores.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No stores found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountry("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Helper functions
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    CR: "Costa Rica",
    PA: "Panama",
    GT: "Guatemala",
    HN: "Honduras",
    SV: "El Salvador",
    NI: "Nicaragua",
    DO: "Dominican Republic",
    JM: "Jamaica",
    TT: "Trinidad & Tobago",
    BB: "Barbados",
    AW: "Aruba",
    CO: "Colombia",
  };
  return countries[code] || code;
}
