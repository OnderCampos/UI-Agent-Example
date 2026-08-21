"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Smartphone,
  CreditCard,
  Truck,
  Tag,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedIcon } from "@/components/ui/animated-icon";

// Hero slides data matching PriceSmart
const heroSlides = [
  {
    id: 1,
    title: "Member's Selection Hot Picks",
    subtitle: "Premium quality and special savings to start the year right.",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80",
    ctaText: "Shop Now",
    ctaLink: "/categories/members-selection",
  },
  {
    id: 2,
    title: "Healthy New Start",
    subtitle: "Discover healthy foods and wellness products to support you anytime.",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&q=80",
    ctaText: "Explore",
    ctaLink: "/categories/health-wellness",
  },
  {
    id: 3,
    title: "Outdoor Activities",
    subtitle: "Everything you need to enjoy outdoor activities this season.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80",
    ctaText: "Shop Outdoors",
    ctaLink: "/categories/sports-outdoors",
  },
  {
    id: 4,
    title: "Home Comfort Deals",
    subtitle: "Update bedding, towels, linens, and cozy home essentials.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    ctaText: "Shop Home",
    ctaLink: "/categories/home-garden",
  },
  {
    id: 5,
    title: "Start the Year Choosing Better",
    subtitle: "Explore special diet foods, including organic, kosher, gluten-free, and more.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80",
    ctaText: "Discover",
    ctaLink: "/categories/organic",
  },
];

// Quick categories matching PriceSmart (no emojis)
const quickCategories = [
  { name: "Grocery Aisle", href: "/categories/grocery" },
  { name: "Member's Selection", href: "/categories/members-selection" },
  { name: "Manufacturer Savings", href: "/categories/savings" },
  { name: "Business Services", href: "/categories/business" },
  { name: "Staff Picks", href: "/categories/staff-picks" },
];

// Featured categories with images from Unsplash
const featuredCategories = [
  { 
    name: "Trans fat free", 
    href: "/categories/trans-fat-free", 
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&q=80",
  },
  { 
    name: "No added sugar", 
    href: "/categories/no-sugar", 
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&q=80",
  },
  { 
    name: "Lactose free", 
    href: "/categories/lactose-free", 
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=80",
  },
  { 
    name: "Cocktails & Spirits", 
    href: "/categories/cocktails", 
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  },
  { 
    name: "Your Home, Your Style", 
    href: "/categories/home-style", 
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&q=80",
  },
  { 
    name: "Wellness", 
    href: "/categories/wellness", 
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80",
  },
  { 
    name: "Gluten Free", 
    href: "/categories/gluten-free", 
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80",
  },
  { 
    name: "Organic", 
    href: "/categories/organic", 
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=200&q=80",
  },
  { 
    name: "Kosher", 
    href: "/categories/kosher", 
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=200&q=80",
  },
  { 
    name: "Bakery Shop", 
    href: "/categories/bakery", 
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80",
  },
  { 
    name: "PriceSmart Kitchen", 
    href: "/categories/kitchen", 
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
  },
  { 
    name: "Shop by Category", 
    href: "/categories", 
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&q=80",
  },
];

// Value propositions
const valueProps = [
  {
    title: "Better Selection, Better Value.",
    icon: Tag,
  },
  {
    title: "Our Members' favorite products",
    icon: Heart,
  },
  {
    title: "Great price, every day",
    icon: CreditCard,
  },
  {
    title: "Everything you need, online",
    icon: Truck,
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Carousel */}
      <section
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative h-[300px] md:h-[400px] lg:h-[480px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="max-w-lg text-white">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 mb-6">
                    {slide.subtitle}
                  </p>
                  <Link href={slide.ctaLink}>
                    <Button
                      size="lg"
                      className="bg-[#f5a623] hover:bg-[#d4900f] text-white font-semibold px-8 h-12"
                    >
                      {slide.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all z-10 group"
            aria-label="Previous slide"
          >
            <AnimatedIcon icon={ChevronLeft} className="w-6 h-6 text-gray-800" hoverAnimation="lift" tapAnimation="press" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all z-10 group"
            aria-label="Next slide"
          >
            <AnimatedIcon icon={ChevronRight} className="w-6 h-6 text-gray-800" hoverAnimation="lift" tapAnimation="press" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-[#f5a623] w-8"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Categories Pills */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-hide">
            {quickCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="shrink-0 px-5 py-2.5 rounded-full bg-[#0052a1] text-white text-sm font-medium hover:bg-[#003d7a] transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories / Categories */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Stories</h2>
            <Link
              href="/categories"
              className="text-[#0052a1] hover:text-[#003d7a] font-medium text-sm"
            >
              View All Categories →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all border"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-[#0052a1] transition-colors text-center">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-white py-8 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {valueProps.map((prop, index) => {
              const IconComponent = prop.icon;
              return (
                <div key={prop.title} className="flex items-center gap-3 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-[#e6f0fa] flex items-center justify-center shrink-0">
                    <AnimatedIcon 
                      icon={IconComponent} 
                      className="w-6 h-6 text-[#0052a1]" 
                      animation="float"
                      continuous
                      delay={index * 0.2}
                      hoverAnimation="bounce"
                    />
                  </div>
                  <p className="text-sm md:text-base font-medium text-gray-900">{prop.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#0052a1] to-[#003d7a] rounded-2xl p-6 md:p-10 text-white overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Do your shopping from wherever you are!
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  Not only can you carry your Membership in the comfort of your phone, 
                  you can now also order your products! Download our App now!
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors group"
                  >
                    <AnimatedIcon icon={Smartphone} className="w-6 h-6" hoverAnimation="bounce" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wide opacity-80">Download on the</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors group"
                  >
                    <AnimatedIcon icon={Smartphone} className="w-6 h-6" hoverAnimation="bounce" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wide opacity-80">Get it on</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-b from-[#0052a1] to-[#003d7a] flex items-center justify-center">
                      <span className="text-4xl font-bold">
                        Price<span className="text-[#f5a623]">Smart</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Card Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#f5a623] to-[#d4900f] rounded-2xl p-6 md:p-10 text-white overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Your contactless PriceSmart Credit Card purchases turn what you save into so much more.
                </h2>
                <Link
                  href="/credit-card"
                  className="inline-flex items-center gap-2 text-lg font-semibold hover:underline"
                >
                  Learn how to accumulate Cash Back →
                </Link>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="w-80 h-48 bg-gradient-to-br from-[#0052a1] to-[#003d7a] rounded-xl shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform group">
                    <div className="text-center">
                      <AnimatedIcon icon={CreditCard} className="w-12 h-12 mx-auto mb-2 opacity-80" animation="float" continuous hoverAnimation="scale" />
                      <span className="text-xl font-bold">
                        Price<span className="text-[#f5a623]">Smart</span>
                      </span>
                      <p className="text-xs mt-1 opacity-80">Credit Card</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
