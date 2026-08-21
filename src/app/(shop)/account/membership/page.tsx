"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Gift, 
  Star, 
  Truck, 
  Percent,
  Calendar,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  Download,
  Share2,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { MembershipCard, MembershipCardBack } from "@/components/features/membership";

// Benefit icons mapping
const benefitIcons: Record<string, typeof Gift> = {
  discount: Percent,
  freeShipping: Truck,
  earlyAccess: Star,
  exclusive: Gift,
  other: CheckCircle,
};

export default function MembershipPage() {
  const { user } = useAuth();
  const [showCardBack, setShowCardBack] = useState(false);

  const membership = user?.membership;

  // Calculate days until expiration
  const expirationDate = membership 
    ? new Date(membership.expirationDate)
    : new Date();
  const today = new Date();
  const daysUntilExpiration = Math.ceil(
    (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  const isExpired = daysUntilExpiration <= 0;

  if (!membership) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No Membership Found
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          You don&apos;t have a PriceSmart membership linked to your account yet.
          Link your existing membership or apply for a new one.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
            Link Existing Membership
          </Button>
          <Button variant="outline" className="border-[#0052a1] text-[#0052a1]">
            Apply for Membership
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Membership</h1>
        <p className="text-gray-600">Your PriceSmart membership details</p>
      </div>

      {/* Expiration Warning */}
      {isExpiringSoon && !isExpired && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800">
              Your membership expires in {daysUntilExpiration} days
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              Renew now to continue enjoying your member benefits without interruption.
            </p>
            <Button 
              size="sm" 
              className="mt-3 bg-yellow-600 hover:bg-yellow-700"
            >
              Renew Membership
            </Button>
          </div>
        </div>
      )}

      {isExpired && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">
              Your membership has expired
            </p>
            <p className="text-sm text-red-700 mt-1">
              Renew your membership to access exclusive prices and benefits.
            </p>
            <Button 
              size="sm" 
              className="mt-3 bg-red-600 hover:bg-red-700"
            >
              Renew Now
            </Button>
          </div>
        </div>
      )}

      {/* Digital Membership Card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Digital Card</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCardBack(!showCardBack)}
              className="text-gray-600"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Flip Card
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div 
            className="transition-transform duration-500 cursor-pointer"
            style={{ 
              transformStyle: "preserve-3d",
              transform: showCardBack ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            onClick={() => setShowCardBack(!showCardBack)}
          >
            {!showCardBack ? (
              <MembershipCard 
                membership={membership} 
                memberName={user?.fullName || "Member"} 
              />
            ) : (
              <div style={{ transform: "rotateY(180deg)" }}>
                <MembershipCardBack membership={membership} />
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Click the card to flip it. Show this at checkout or scan the barcode.
        </p>

        {/* Card Actions */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm" className="text-gray-600">
            <Download className="w-4 h-4 mr-2" />
            Save to Wallet
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Membership Details */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Member ID</p>
          <p className="text-lg font-semibold text-gray-900 font-mono">
            {membership.memberId}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-lg font-semibold text-gray-900 capitalize">
            {membership.type}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Status</p>
          <p className={`text-lg font-semibold capitalize ${
            membership.status === "active" ? "text-green-600" : "text-red-600"
          }`}>
            {membership.status}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Points Balance</p>
          <p className="text-lg font-semibold text-[#0052a1]">
            {membership.points?.toLocaleString() || 0}
          </p>
        </div>
      </div>

      {/* Member Since / Expires */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 p-4 border rounded-lg">
          <div className="w-10 h-10 rounded-full bg-[#0052a1]/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#0052a1]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium text-gray-900">
              {new Date(membership.startDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 border rounded-lg">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isExpired 
              ? "bg-red-100" 
              : isExpiringSoon 
                ? "bg-yellow-100" 
                : "bg-green-100"
          }`}>
            <Calendar className={`w-5 h-5 ${
              isExpired 
                ? "text-red-600" 
                : isExpiringSoon 
                  ? "text-yellow-600" 
                  : "text-green-600"
            }`} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Expires</p>
            <p className={`font-medium ${
              isExpired 
                ? "text-red-600" 
                : isExpiringSoon 
                  ? "text-yellow-600" 
                  : "text-gray-900"
            }`}>
              {expirationDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      {membership.benefits && membership.benefits.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Benefits
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {membership.benefits.map((benefit) => {
              const IconComponent = benefitIcons[benefit.type] || Gift;
              return (
                <div 
                  key={benefit.id}
                  className="flex items-start gap-3 p-4 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[#f5a623]/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-[#f5a623]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{benefit.name}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                    {benefit.value && (
                      <p className="text-sm font-semibold text-[#0052a1] mt-1">
                        {benefit.type === "discount" ? `${benefit.value}% off` : benefit.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Savings Summary */}
      <div className="bg-gradient-to-r from-[#0052a1] to-[#003d7a] rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Your Savings This Year</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-white/70 text-sm">Total Saved</p>
            <p className="text-3xl font-bold">$1,234.56</p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Orders Placed</p>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Points Earned</p>
            <p className="text-3xl font-bold">5,000</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-3">
        <Link href="/account/orders">
          <Button variant="outline" className="border-gray-300">
            View Order History
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <Button variant="outline" className="border-gray-300">
          Membership Terms
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" className="border-gray-300">
          Contact Support
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
