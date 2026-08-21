"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User, 
  MapPin, 
  ChevronDown, 
  Phone, 
  HelpCircle, 
  Package,
  ShoppingBasket,
  Star,
  Tv,
  Home,
  Heart,
  Baby,
  Dumbbell,
  Briefcase,
  ChevronRight,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

const categories = [
  { name: "Grocery Aisle", href: "/categories/grocery", icon: ShoppingBasket, color: "bg-green-100 text-green-600" },
  { name: "Member's Selection", href: "/categories/members-selection", icon: Star, color: "bg-amber-100 text-amber-600" },
  { name: "Electronics", href: "/categories/electronics", icon: Tv, color: "bg-blue-100 text-blue-600" },
  { name: "Home & Garden", href: "/categories/home-garden", icon: Home, color: "bg-orange-100 text-orange-600" },
  { name: "Health & Beauty", href: "/categories/health-beauty", icon: Heart, color: "bg-pink-100 text-pink-600" },
  { name: "Baby & Kids", href: "/categories/baby-kids", icon: Baby, color: "bg-purple-100 text-purple-600" },
  { name: "Sports & Outdoors", href: "/categories/sports-outdoors", icon: Dumbbell, color: "bg-cyan-100 text-cyan-600" },
  { name: "Office & Business", href: "/categories/office-business", icon: Briefcase, color: "bg-slate-100 text-slate-600" },
];

const countries = [
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "PA", name: "Panama", flag: "🇵🇦" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻" },
  { code: "HN", name: "Honduras", flag: "🇭🇳" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮" },
  { code: "DO", name: "Dominican Republic", flag: "🇩🇴" },
  { code: "TT", name: "Trinidad & Tobago", flag: "🇹🇹" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲" },
  { code: "BB", name: "Barbados", flag: "🇧🇧" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "US", name: "United States", flag: "🇺🇸" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const countryMenuRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();

  const itemCount = cart?.itemCount ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
      if (countryMenuRef.current && !countryMenuRef.current.contains(event.target as Node)) {
        setIsCountryMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setIsCountryMenuOpen(false);
    // In a real app, this would update the locale/region context
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#003d7a] text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-9">
            {/* Left - Location */}
            <div className="flex items-center gap-4">
              <div className="relative" ref={countryMenuRef}>
                <button 
                  onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
                  className="flex items-center gap-1.5 hover:text-[#f5a623] transition-colors"
                >
                  <AnimatedIcon icon={MapPin} className="w-4 h-4" hoverAnimation="bounce" />
                  <span className="hidden sm:inline">{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", isCountryMenuOpen && "rotate-180")} />
                </button>

                {/* Country Dropdown */}
                {isCountryMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border py-2 z-50 max-h-80 overflow-y-auto">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Select Your Location</p>
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-[#0052a1] transition-colors flex items-center gap-3",
                          selectedCountry.code === country.code && "bg-blue-50 text-[#0052a1] font-medium"
                        )}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right - Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/help" className="flex items-center gap-1.5 hover:text-[#f5a623] transition-colors group">
                <AnimatedIcon icon={HelpCircle} className="w-4 h-4" hoverAnimation="rotate" />
                <span>Help Center</span>
              </Link>
              <Link href="/track-order" className="flex items-center gap-1.5 hover:text-[#f5a623] transition-colors group">
                <AnimatedIcon icon={Package} className="w-4 h-4" hoverAnimation="bounce" />
                <span>Track Order</span>
              </Link>
              <a href="tel:+506-2201-0101" className="flex items-center gap-1.5 hover:text-[#f5a623] transition-colors group">
                <AnimatedIcon icon={Phone} className="w-4 h-4" hoverAnimation="shake" />
                <span>+506 2201-0101</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-[#0052a1]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                Price<span className="text-[#f5a623]">Smart</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className={cn(
                "flex w-full rounded-lg overflow-hidden transition-all",
                isSearchFocused ? "ring-2 ring-[#f5a623]" : ""
              )}>
                <Input
                  type="search"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="flex-1 h-11 rounded-none rounded-l-lg border-0 focus-visible:ring-0 bg-white text-gray-900"
                />
                <Button
                  type="submit"
                  className="h-11 px-6 rounded-none rounded-r-lg bg-[#f5a623] hover:bg-[#d4900f] text-white"
                >
                  <AnimatedIcon icon={Search} className="w-5 h-5" hoverAnimation="scale" tapAnimation="press" />
                </Button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Account */}
              <Link
                href="/login"
                className="hidden sm:flex flex-col items-start text-white hover:text-[#f5a623] transition-colors group"
              >
                <span className="text-xs opacity-80">Hola</span>
                <span className="text-sm font-semibold flex items-center gap-1">
                  Sign In
                  <AnimatedIcon icon={User} className="w-4 h-4" hoverAnimation="bounce" />
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 bg-[#003d7a] hover:bg-[#002d5c] text-white px-4 py-2.5 rounded-lg transition-colors group"
              >
                <AnimatedIcon icon={ShoppingCart} className="w-5 h-5" hoverAnimation="bounce" />
                <span className="hidden sm:inline text-sm font-medium">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] flex items-center justify-center bg-[#f5a623] text-white text-xs font-bold rounded-full px-1">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-white hover:bg-[#003d7a] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <AnimatedIcon icon={X} className="w-6 h-6" animation="scaleIn" hoverAnimation="rotate" />
                ) : (
                  <AnimatedIcon icon={Menu} className="w-6 h-6" hoverAnimation="rotate" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="flex rounded-lg overflow-hidden">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-10 rounded-none rounded-l-lg border-0 focus-visible:ring-0 bg-white text-gray-900"
              />
              <Button
                type="submit"
                className="h-10 px-4 rounded-none rounded-r-lg bg-[#f5a623] hover:bg-[#d4900f] text-white"
              >
                <AnimatedIcon icon={Search} className="w-4 h-4" hoverAnimation="scale" tapAnimation="press" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#003d7a] border-t border-[#004d99]">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12 gap-6">
            {/* Shop by Category Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 text-white font-medium hover:text-[#f5a623] transition-colors"
              >
                <AnimatedIcon icon={Menu} className="w-5 h-5" hoverAnimation="rotate" />
                <span>Shop by Category</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isCategoryMenuOpen && "rotate-180")} />
              </button>

              {/* Category Dropdown - Improved Design */}
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#0052a1] to-[#003d7a] px-4 py-3">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Shop by Department</h3>
                  </div>
                  
                  {/* Categories Grid */}
                  <div className="p-3">
                    <div className="grid gap-1">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <Link
                            key={category.href}
                            href={category.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 group transition-all"
                            onClick={() => setIsCategoryMenuOpen(false)}
                          >
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", category.color)}>
                              <AnimatedIcon icon={IconComponent} className="w-5 h-5" hoverAnimation="bounce" />
                            </div>
                            <span className="font-medium group-hover:text-[#0052a1] transition-colors flex-1">
                              {category.name}
                            </span>
                            <AnimatedIcon icon={ChevronRight} className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all" hoverAnimation="lift" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="border-t bg-gray-50 px-4 py-3">
                    <Link
                      href="/categories"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-[#0052a1] hover:bg-[#003d7a] text-white rounded-lg font-medium transition-colors group"
                      onClick={() => setIsCategoryMenuOpen(false)}
                    >
                      View All Categories
                      <AnimatedIcon icon={ChevronRight} className="w-4 h-4" hoverAnimation="lift" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/products"
                className={cn(
                  "text-white hover:text-[#f5a623] transition-colors font-medium",
                  pathname === "/products" && "text-[#f5a623]"
                )}
              >
                All Products
              </Link>
              <Link
                href="/deals"
                className="text-[#f5a623] hover:text-[#ffc233] transition-colors font-medium flex items-center gap-1 group"
              >
                <AnimatedIcon icon={Flame} className="w-4 h-4" animation="pulse" continuous hoverAnimation="scale" />
                Today&apos;s Deals
              </Link>
              <Link
                href="/members-selection"
                className="text-white hover:text-[#f5a623] transition-colors font-medium"
              >
                Member&apos;s Selection
              </Link>
              <Link
                href="/new-arrivals"
                className="text-white hover:text-[#f5a623] transition-colors font-medium"
              >
                New Arrivals
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Categories */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase">Categories</p>
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block py-2 text-gray-700 hover:text-[#0052a1] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <Link
                href="/deals"
                className="flex items-center gap-2 py-2 text-[#f5a623] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <AnimatedIcon icon={Flame} className="w-4 h-4" animation="pulse" continuous />
                Today&apos;s Deals
              </Link>
              <Link
                href="/login"
                className="block py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In / Register
              </Link>
              <Link
                href="/help"
                className="block py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Help Center
              </Link>
              <Link
                href="/track-order"
                className="block py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
