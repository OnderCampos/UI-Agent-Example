import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ChevronLeft,
  Navigation,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  MiniMap, 
  StoreHoursDisplay, 
  StoreServices, 
  StoreAmenities 
} from "@/components/features/store";
import { getStoreService } from "@/services/store.service";
import type { Metadata } from "next";

interface StoreDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoreDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const storeService = getStoreService();
  const store = await storeService.getStoreBySlug(slug);
  
  if (!store) {
    return { title: "Store Not Found" };
  }

  return {
    title: `${store.name} | Store Locator`,
    description: `Visit PriceSmart ${store.name} in ${store.address.city}. View store hours, services, and get directions.`,
  };
}

export default async function StoreDetailPage({ params }: StoreDetailPageProps) {
  const { slug } = await params;
  const storeService = getStoreService();
  const store = await storeService.getStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  const storeContent = await storeService.getStoreContent(store.id);
  const { isOpen, nextChange } = storeService.isStoreOpen(store);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <section className="relative h-64 md:h-80 lg:h-96 bg-gray-800">
        {storeContent?.heroImage ? (
          <Image
            src={storeContent.heroImage}
            alt={store.name}
            fill
            className="object-cover"
            priority
          />
        ) : store.image ? (
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0052a1] to-[#003d7a]" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link href="/stores">
            <Button
              variant="outline"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              All Stores
            </Button>
          </Link>
        </div>

        {/* Store Status */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${
              isOpen
                ? "bg-green-500 text-white"
                : "bg-white/90 text-gray-700"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOpen ? "bg-white" : "bg-gray-400"
              }`}
            />
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
      </section>

      {/* Store Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {store.name}
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {store.address.formatted}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  navigator.share?.({
                    title: store.name,
                    text: `Check out ${store.name} at PriceSmart`,
                    url: window.location.href,
                  });
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Left Column - Main Info */}
            <div className="space-y-8">
              {/* Description */}
              {store.description && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    About This Store
                  </h2>
                  <p className="text-gray-600">{store.description}</p>
                </div>
              )}

              {/* Services */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Services & Departments
                </h2>
                <StoreServices services={store.services} />
              </div>

              {/* Amenities */}
              {store.amenities.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Amenities
                  </h2>
                  <StoreAmenities amenities={store.amenities} />
                </div>
              )}

              {/* Map */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Location
                </h2>
                <MiniMap store={store} className="mb-4" />
                <p className="text-sm text-gray-500">
                  {store.address.street}, {store.address.city}, {store.address.state} {store.address.postalCode}
                </p>
              </div>

              {/* Gallery */}
              {storeContent?.gallery && storeContent.gallery.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Photo Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {storeContent.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`${store.name} gallery ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Store Hours */}
              <StoreHoursDisplay
                hours={store.hours}
                isOpen={isOpen}
                nextOpenTime={nextChange}
              />

              {/* Contact Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${store.phone}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-[#0052a1] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#e6f0fa] flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#0052a1]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{store.phone}</p>
                    </div>
                  </a>
                  {store.email && (
                    <a
                      href={`mailto:${store.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-[#0052a1] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#e6f0fa] flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#0052a1]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{store.email}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* Local Promotions */}
              {storeContent?.localPromotions && storeContent.localPromotions.length > 0 && (
                <div className="bg-gradient-to-br from-[#f5a623] to-[#d4900f] rounded-xl p-6 text-white">
                  <h3 className="font-bold mb-4">Store Specials</h3>
                  <div className="space-y-3">
                    {storeContent.localPromotions.map((promo, index) => (
                      <div key={index}>
                        <p className="font-semibold">{promo.title}</p>
                        <p className="text-sm text-white/80">{promo.description}</p>
                        {promo.link && (
                          <Link
                            href={promo.link}
                            className="text-sm underline mt-1 inline-flex items-center gap-1"
                          >
                            Learn more
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Announcement */}
              {storeContent?.specialAnnouncements && (
                <div className="bg-[#e6f0fa] border border-[#0052a1]/20 rounded-xl p-4">
                  <p className="text-sm text-[#0052a1]">
                    {storeContent.specialAnnouncements}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
