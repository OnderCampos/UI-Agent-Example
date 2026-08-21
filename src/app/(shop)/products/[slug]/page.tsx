"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
  Play,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { VideoPlayer, } from "@/components/features/product/video-player";
import type { Product, ProductImage, ProductVideo, ProductVariant } from "@/types/product";

// Mock product with video data
const mockProductWithVideo: Product = {
  id: "prod-1",
  sku: "PS-HEADPHONES-001",
  name: "Premium Wireless Noise-Cancelling Headphones",
  slug: "premium-wireless-headphones",
  description: `
    <p>Experience superior sound quality with our Premium Wireless Noise-Cancelling Headphones. 
    Designed for audiophiles and casual listeners alike, these headphones deliver crystal-clear 
    audio across all frequencies.</p>
    
    <h3>Key Features:</h3>
    <ul>
      <li>Active Noise Cancellation (ANC) technology</li>
      <li>40-hour battery life</li>
      <li>Premium memory foam ear cushions</li>
      <li>Bluetooth 5.2 connectivity</li>
      <li>Multi-device pairing</li>
      <li>Built-in microphone for calls</li>
      <li>Foldable design for portability</li>
    </ul>
    
    <h3>What's in the Box:</h3>
    <ul>
      <li>Premium Wireless Headphones</li>
      <li>USB-C charging cable</li>
      <li>3.5mm audio cable</li>
      <li>Premium carrying case</li>
      <li>User manual</li>
    </ul>
  `,
  shortDescription: "Experience premium sound with 40-hour battery life and active noise cancellation.",
  brand: "PriceSmart Audio",
  categories: [
    { id: "cat-1", name: "Electronics", slug: "electronics" },
    { id: "cat-2", name: "Audio", slug: "audio" },
  ],
  masterVariant: {
    id: "var-1",
    sku: "PS-HP-BLK",
    name: "Black",
    price: { amount: 29999, currency: "USD", formatted: "$299.99" },
    compareAtPrice: { amount: 39999, currency: "USD", formatted: "$399.99" },
    attributes: { color: "Black" },
    images: [
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        alt: "Black headphones front view",
        isDefault: true,
      },
      {
        id: "img-2",
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
        alt: "Black headphones side view",
        isDefault: false,
      },
      {
        id: "img-3",
        url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80",
        alt: "Black headphones detail",
        isDefault: false,
      },
    ],
    availability: { isAvailable: true, quantity: 50, isBackorderable: false, isPreorder: false },
    isDefault: true,
  },
  variants: [
    {
      id: "var-2",
      sku: "PS-HP-WHT",
      name: "White",
      price: { amount: 29999, currency: "USD", formatted: "$299.99" },
      compareAtPrice: { amount: 39999, currency: "USD", formatted: "$399.99" },
      attributes: { color: "White" },
      images: [
        {
          id: "img-4",
          url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
          alt: "White headphones",
          isDefault: true,
        },
      ],
      availability: { isAvailable: true, quantity: 30, isBackorderable: false, isPreorder: false },
      isDefault: false,
    },
    {
      id: "var-3",
      sku: "PS-HP-BLU",
      name: "Navy Blue",
      price: { amount: 31999, currency: "USD", formatted: "$319.99" },
      compareAtPrice: { amount: 39999, currency: "USD", formatted: "$399.99" },
      attributes: { color: "Navy Blue" },
      images: [
        {
          id: "img-5",
          url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
          alt: "Navy blue headphones",
          isDefault: true,
        },
      ],
      availability: { isAvailable: false, quantity: 0, isBackorderable: true, isPreorder: false },
      isDefault: false,
    },
  ],
  images: [
    {
      id: "img-1",
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      alt: "Black headphones front view",
      isDefault: true,
    },
  ],
  videos: [
    {
      id: "vid-1",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      title: "Product Overview",
      description: "Watch our detailed product overview video",
      duration: 180,
      type: "youtube",
      isDefault: true,
    },
    {
      id: "vid-2",
      url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80",
      title: "Features Demo",
      description: "See all the amazing features in action",
      duration: 120,
      type: "mp4",
      isDefault: false,
    },
  ],
  attributes: {
    weight: "250g",
    connectivity: "Bluetooth 5.2, 3.5mm jack",
    batteryLife: "40 hours",
    chargingTime: "2 hours",
    driverSize: "40mm",
    frequencyResponse: "20Hz - 20kHz",
  },
  metaTitle: "Premium Wireless Headphones | PriceSmart",
  metaDescription: "Shop premium wireless noise-cancelling headphones with 40-hour battery life.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<ProductVideo | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addToCart, isAddingProduct } = useCart();
  const isAddingToCart = product ? isAddingProduct(product.id) : false;

  useEffect(() => {
    // Simulate API fetch - in production, this would fetch from /api/products/[slug]
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // For demo, use mock data
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProduct(mockProductWithVideo);
        setSelectedVariant(mockProductWithVideo.masterVariant);
        setSelectedImage(mockProductWithVideo.masterVariant.images[0] || null);
        if (mockProductWithVideo.videos?.length) {
          setSelectedVideo(mockProductWithVideo.videos[0]);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.images.length > 0) {
      setSelectedImage(variant.images[0]);
    }
    setShowVideo(false);
  };

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    await addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
    });
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0052a1]" />
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const allImages = selectedVariant.images.length > 0 ? selectedVariant.images : product.images;
  const hasDiscount = selectedVariant.compareAtPrice && selectedVariant.compareAtPrice.amount > selectedVariant.price.amount;
  const discountPercent = hasDiscount
    ? Math.round((1 - selectedVariant.price.amount / selectedVariant.compareAtPrice!.amount) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#0052a1]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-[#0052a1]">Products</Link>
            {product.categories[0] && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link href={`/categories/${product.categories[0].slug}`} className="hover:text-[#0052a1]">
                  {product.categories[0].name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images & Video */}
          <div className="space-y-4">
            {/* Main Media Display */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border">
              {showVideo && selectedVideo ? (
                <VideoPlayer video={selectedVideo} className="absolute inset-0" />
              ) : selectedImage ? (
                <>
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain p-4"
                    priority
                  />
                  {hasDiscount && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1">
                      Save {discountPercent}%
                    </Badge>
                  )}
                  {product.videos && product.videos.length > 0 && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#0052a1] text-white px-4 py-2 rounded-full hover:bg-[#003d7a] transition-colors shadow-lg"
                    >
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">Watch Video</span>
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {/* Image thumbnails */}
              {allImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => {
                    setSelectedImage(image);
                    setShowVideo(false);
                  }}
                  className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage?.id === image.id && !showVideo
                      ? "border-[#0052a1] ring-2 ring-[#0052a1]/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}

              {/* Video thumbnails */}
              {product.videos?.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {
                    setSelectedVideo(video);
                    setShowVideo(true);
                  }}
                  className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    showVideo && selectedVideo?.id === video.id
                      ? "border-[#0052a1] ring-2 ring-[#0052a1]/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {video.thumbnailUrl ? (
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title || "Video"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-4 h-4 text-[#0052a1] ml-0.5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              {product.brand && (
                <p className="text-sm text-[#0052a1] font-medium uppercase tracking-wide mb-2">
                  {product.brand}
                </p>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600">{product.shortDescription}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#0052a1]">
                {selectedVariant.price.formatted}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {selectedVariant.compareAtPrice!.formatted}
                  </span>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                    {discountPercent}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              {selectedVariant.availability.isAvailable ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">In Stock</span>
                  {selectedVariant.availability.quantity && selectedVariant.availability.quantity < 10 && (
                    <span className="text-amber-600 text-sm">
                      (Only {selectedVariant.availability.quantity} left!)
                    </span>
                  )}
                </>
              ) : selectedVariant.availability.isBackorderable ? (
                <>
                  <span className="text-amber-600 font-medium">Available for Backorder</span>
                </>
              ) : (
                <>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Variant Selection */}
            {product.variants.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Color: <span className="font-normal text-gray-600">{selectedVariant.name}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[product.masterVariant, ...product.variants].map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedVariant.id === variant.id
                          ? "border-[#0052a1] bg-blue-50 text-[#0052a1]"
                          : "border-gray-200 hover:border-gray-300"
                      } ${!variant.availability.isAvailable ? "opacity-50" : ""}`}
                    >
                      {variant.name}
                      {!variant.availability.isAvailable && " (Out of Stock)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= 99}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 bg-[#f5a623] hover:bg-[#d4900f] text-white font-semibold h-14 text-lg"
                disabled={!selectedVariant.availability.isAvailable || isAddingToCart}
                onClick={handleAddToCart}
              >
                {isAddingToCart ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`h-14 px-6 ${isWishlisted ? "text-red-500 border-red-200" : ""}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-6">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-[#0052a1]" />
                </div>
                <p className="text-xs font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">Orders over $50</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-[#0052a1]" />
                </div>
                <p className="text-xs font-medium text-gray-900">2 Year Warranty</p>
                <p className="text-xs text-gray-500">Full coverage</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <RotateCcw className="w-6 h-6 text-[#0052a1]" />
                </div>
                <p className="text-xs font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30 day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Specs */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>

          {/* Specifications */}
          <div>
            <div className="bg-white rounded-2xl p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
              <dl className="space-y-3">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <dt className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</dt>
                    <dd className="font-medium text-gray-900">{String(value)}</dd>
                  </div>
                ))}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-600">SKU</dt>
                  <dd className="font-medium text-gray-900">{selectedVariant.sku}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {product.videos && product.videos.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Product Videos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.videos.map((video) => (
                  <div key={video.id} className="space-y-3">
                    <VideoPlayer video={video} />
                    {video.title && (
                      <div>
                        <h3 className="font-medium text-gray-900">{video.title}</h3>
                        {video.description && (
                          <p className="text-sm text-gray-600">{video.description}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
