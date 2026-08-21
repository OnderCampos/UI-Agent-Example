"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ChevronRight, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/hooks/use-search";
import { useCart } from "@/hooks/use-cart";
import type { ProductListItem, Category } from "@/types/product";

// Category metadata for special categories that may not exist in backend
const categoryMetadata: Record<string, { name: string; description: string; color: string }> = {
  "grocery": { name: "Grocery Aisle", description: "Fresh groceries and everyday essentials", color: "from-green-500 to-emerald-600" },
  "members-selection": { name: "Member's Selection", description: "Exclusive products for our valued members", color: "from-amber-500 to-yellow-600" },
  "electronics": { name: "Electronics", description: "Latest gadgets and technology", color: "from-blue-500 to-cyan-600" },
  "home-garden": { name: "Home & Garden", description: "Everything for your home and outdoor spaces", color: "from-orange-500 to-amber-600" },
  "health-beauty": { name: "Health & Beauty", description: "Personal care and wellness products", color: "from-pink-500 to-rose-600" },
  "baby-kids": { name: "Baby & Kids", description: "Products for little ones", color: "from-purple-500 to-violet-600" },
  "sports-outdoors": { name: "Sports & Outdoors", description: "Gear for active lifestyles", color: "from-cyan-500 to-teal-600" },
  "office-business": { name: "Office & Business", description: "Professional supplies and equipment", color: "from-slate-500 to-gray-600" },
  "trans-fat-free": { name: "Trans Fat Free", description: "Healthier options without trans fats", color: "from-lime-500 to-green-600" },
  "no-sugar": { name: "No Added Sugar", description: "Products without added sugars", color: "from-teal-500 to-cyan-600" },
  "lactose-free": { name: "Lactose Free", description: "Dairy alternatives and lactose-free products", color: "from-sky-500 to-blue-600" },
  "cocktails": { name: "Cocktails & Spirits", description: "Premium beverages and mixers", color: "from-violet-500 to-purple-600" },
  "home-style": { name: "Your Home, Your Style", description: "Home decor and furnishing", color: "from-rose-500 to-pink-600" },
  "wellness": { name: "Wellness", description: "Health and wellness essentials", color: "from-emerald-500 to-teal-600" },
  "gluten-free": { name: "Gluten Free", description: "Gluten-free alternatives for every meal", color: "from-yellow-500 to-orange-600" },
  "organic": { name: "Organic", description: "Certified organic products", color: "from-green-600 to-emerald-700" },
  "kosher": { name: "Kosher", description: "Kosher certified products", color: "from-indigo-500 to-blue-600" },
  "bakery": { name: "Bakery Shop", description: "Fresh baked goods daily", color: "from-amber-600 to-orange-600" },
  "kitchen": { name: "PriceSmart Kitchen", description: "Kitchen essentials and cookware", color: "from-red-500 to-rose-600" },
  "health-wellness": { name: "Health & Wellness", description: "Products for a healthier lifestyle", color: "from-teal-500 to-emerald-600" },
  "savings": { name: "Manufacturer Savings", description: "Special deals from top brands", color: "from-red-500 to-orange-600" },
  "business": { name: "Business Services", description: "Solutions for your business needs", color: "from-slate-600 to-gray-700" },
  "staff-picks": { name: "Staff Picks", description: "Our team's favorite products", color: "from-fuchsia-500 to-pink-600" },
};

function getCategoryInfo(slug: string, apiCategory?: Category | null) {
  if (apiCategory) {
    return {
      name: apiCategory.name,
      description: apiCategory.description || `Browse our ${apiCategory.name} collection`,
      color: "from-[#0052a1] to-[#003d7a]",
    };
  }
  
  const metadata = categoryMetadata[slug];
  if (metadata) {
    return metadata;
  }
  
  // Fallback: format slug as title
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  return {
    name,
    description: `Browse our ${name} collection`,
    color: "from-[#0052a1] to-[#003d7a]",
  };
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  
  const { results, isLoading, search } = useSearch();
  const { addToCart, isAddingProduct } = useCart();
  
  // Fetch category info
  useEffect(() => {
    async function fetchCategory() {
      try {
        setIsCategoryLoading(true);
        const res = await fetch("/api/categories");
        const data = await res.json();
        
        if (data.success) {
          const foundCategory = data.data.find((c: Category) => c.slug === slug);
          setCategory(foundCategory || null);
        }
      } catch {
        // Category might not exist in API, that's OK
      } finally {
        setIsCategoryLoading(false);
      }
    }
    
    fetchCategory();
  }, [slug]);
  
  // Search products in category
  useEffect(() => {
    search("", { filters: { categories: [slug] } });
  }, [slug, search]);
  
  const handleAddToCart = async (product: ProductListItem) => {
    await addToCart({ productId: product.id, quantity: 1 });
  };
  
  const categoryInfo = getCategoryInfo(slug, category);
  
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Category Hero */}
      <div className={`bg-gradient-to-br ${categoryInfo.color}`}>
        <div className="container mx-auto px-4 py-12">
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{categoryInfo.name}</span>
          </nav>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {isCategoryLoading ? (
                  <span className="inline-block h-10 w-48 bg-white/20 rounded animate-pulse" />
                ) : (
                  categoryInfo.name
                )}
              </h1>
              <p className="text-white/80 text-lg max-w-xl">
                {categoryInfo.description}
              </p>
            </div>
            
            <Link href="/categories">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Categories
              </Button>
            </Link>
          </div>
          
          {/* Product count */}
          {!isLoading && (
            <p className="text-white/60 mt-6">
              {results.length} {results.length === 1 ? "product" : "products"} found
            </p>
          )}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-muted-foreground mb-6">
              We don&apos;t have any products in this category yet.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/products">
                <Button variant="outline">
                  Browse All Products
                </Button>
              </Link>
              <Link href="/categories">
                <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
                  View Categories
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                isAddingToCart={isAddingProduct(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
  isAddingToCart,
}: {
  product: ProductListItem;
  onAddToCart: () => void;
  isAddingToCart: boolean;
}) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice.amount > product.price.amount;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price.amount / product.compareAtPrice!.amount) * 100)
    : 0;

  return (
    <div className="group border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Package className="h-12 w-12 text-gray-300" />
          </div>
        )}
        {hasDiscount && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            -{discountPercent}%
          </Badge>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {product.brand && (
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-[#0052a1] transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold">{product.price.formatted}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {product.compareAtPrice!.formatted}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          className="w-full mt-4 bg-[#0052a1] hover:bg-[#003d7a]"
          disabled={!product.isAvailable || isAddingToCart}
          onClick={onAddToCart}
        >
          {isAddingToCart ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  );
}
