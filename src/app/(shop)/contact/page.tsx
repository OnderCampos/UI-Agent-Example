import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/features/support";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | PriceSmart",
  description: "Get in touch with PriceSmart customer support. We're here to help with your questions about orders, membership, and more.",
};

// Contact methods
const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with a representative",
    value: "1-800-PRICESMART",
    link: "tel:1-800-774-2372",
    hours: "Mon-Sat 8AM-8PM, Sun 9AM-6PM",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us a message",
    value: "support@pricesmart.com",
    link: "mailto:support@pricesmart.com",
    hours: "Response within 24-48 hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our team",
    value: "Start a conversation",
    link: "#chat",
    hours: "Available 24/7",
  },
];

// Quick links
const quickLinks = [
  { href: "/faq", label: "FAQs", icon: HelpCircle },
  { href: "/help", label: "Help Center", icon: HelpCircle },
  { href: "/stores", label: "Find a Store", icon: MapPin },
  { href: "/account/orders", label: "Track Order", icon: ChevronRight },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0052a1] to-[#003d7a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/80">
              Have questions? We're here to help. Choose your preferred way to reach us.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.title}
                  href={method.link}
                  className="block p-6 bg-gray-50 rounded-xl hover:shadow-lg hover:bg-white transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#e6f0fa] flex items-center justify-center mb-4 group-hover:bg-[#0052a1] transition-colors">
                    <Icon className="w-7 h-7 text-[#0052a1] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{method.description}</p>
                  <p className="font-medium text-[#0052a1] mb-2">{method.value}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {method.hours}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#0052a1]" />
                        <span className="text-gray-700 group-hover:text-[#0052a1]">
                          {link.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Customer Service Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">10:00 AM - 5:00 PM</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  * Times shown in local timezone
                </p>
              </div>

              {/* Corporate Address */}
              <div className="bg-[#e6f0fa] rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Corporate Office</h3>
                <address className="text-sm text-gray-600 not-italic space-y-2">
                  <p className="font-medium text-gray-900">PriceSmart, Inc.</p>
                  <p>9740 Scranton Road</p>
                  <p>San Diego, CA 92121</p>
                  <p>United States</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Locator CTA */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <MapPin className="w-12 h-12 text-[#0052a1] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Visit Us In Person
            </h2>
            <p className="text-gray-600 mb-6">
              Find your nearest PriceSmart location for in-person assistance.
            </p>
            <Link href="/stores">
              <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
                Find a Store
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
