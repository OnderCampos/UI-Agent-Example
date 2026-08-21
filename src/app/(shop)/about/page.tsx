import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Globe, 
  Award, 
  Heart,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | PriceSmart",
  description: "Learn about PriceSmart's mission, values, and commitment to providing quality products at wholesale prices.",
};

// Company stats
const stats = [
  { label: "Years of Service", value: "25+", icon: Award },
  { label: "Club Locations", value: "50+", icon: Globe },
  { label: "Happy Members", value: "2M+", icon: Users },
  { label: "Products Available", value: "10K+", icon: Sparkles },
];

// Company values
const values = [
  {
    title: "Quality First",
    description: "We carefully select every product to ensure it meets our high standards of quality.",
    icon: Award,
  },
  {
    title: "Member Focus",
    description: "Our members are at the heart of everything we do. Your satisfaction is our priority.",
    icon: Heart,
  },
  {
    title: "Value Driven",
    description: "We negotiate directly with manufacturers to bring you the best prices possible.",
    icon: Target,
  },
  {
    title: "Community Impact",
    description: "We're committed to making a positive impact in the communities we serve.",
    icon: Users,
  },
];

// Timeline milestones
const milestones = [
  { year: "1996", title: "Founded", description: "PriceSmart opens its first club in Panama City" },
  { year: "2000", title: "Expansion", description: "Expanded to Costa Rica, Guatemala, and Honduras" },
  { year: "2010", title: "Digital Era", description: "Launched online shopping platform" },
  { year: "2020", title: "Innovation", description: "Introduced mobile app and enhanced delivery services" },
  { year: "2024", title: "Today", description: "Serving over 2 million members across Central America and the Caribbean" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0052a1] to-[#003d7a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Better Selection,
              <br />
              Better Value.
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              For over 25 years, PriceSmart has been committed to bringing quality products 
              at wholesale prices to families and businesses across Central America and the Caribbean.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-[#f5a623] hover:bg-[#d4900f] text-white">
                Become a Member
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-[#e6f0fa] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#0052a1]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At PriceSmart, our mission is to be the best membership warehouse club 
                providing quality brand name merchandise at the lowest possible prices, 
                while providing excellent service to our members.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that everyone deserves access to quality products at fair prices. 
                Through our membership model, we eliminate the middleman and pass the savings 
                directly to you.
              </p>
              <p className="text-lg text-gray-600">
                From groceries and electronics to home goods and clothing, we offer a 
                carefully curated selection of products that meet our strict quality standards.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
                alt="Inside a PriceSmart warehouse"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              These core values guide everything we do and shape how we serve our members.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="p-6 bg-gray-50 rounded-xl text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0052a1] to-[#003d7a] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              From a single club to a regional leader in warehouse retail.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#0052a1]/20 -translate-x-1/2" />
              
              {/* Milestones */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-start gap-6 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`} />
                    <div className="relative z-10 w-16 h-16 rounded-full bg-[#0052a1] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {milestone.year}
                    </div>
                    <div className="flex-1 pt-3">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800"
                alt="Community involvement"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Community Commitment
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe in giving back to the communities that have supported us. 
                Through various programs and initiatives, we work to make a positive 
                impact where we live and operate.
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#e6f0fa] flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-3 h-3 text-[#0052a1]" />
                  </div>
                  <span>Supporting local food banks and disaster relief efforts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#e6f0fa] flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-3 h-3 text-[#0052a1]" />
                  </div>
                  <span>Educational scholarships for employees and their families</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#e6f0fa] flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-3 h-3 text-[#0052a1]" />
                  </div>
                  <span>Environmental sustainability programs across all locations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0052a1] to-[#003d7a] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the PriceSmart Family
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Experience the benefits of membership and start saving today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-[#f5a623] hover:bg-[#d4900f] text-white w-full sm:w-auto">
                  Become a Member
                </Button>
              </Link>
              <Link href="/stores">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Find a Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
