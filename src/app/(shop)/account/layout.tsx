"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  MapPin,
  Package,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { AnimatedIcon } from "@/components/ui/animated-icon";

const accountNavItems = [
  {
    name: "Profile",
    href: "/account/profile",
    icon: User,
    description: "Manage your personal information",
  },
  {
    name: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
    description: "Shipping and billing addresses",
  },
  {
    name: "Orders",
    href: "/account/orders",
    icon: Package,
    description: "View order history and tracking",
  },
  {
    name: "Membership",
    href: "/account/membership",
    icon: CreditCard,
    description: "Your PriceSmart membership",
  },
  {
    name: "Settings",
    href: "/account/settings",
    icon: Settings,
    description: "Preferences and notifications",
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/account");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-4 py-8">
        {/* Account Header */}
        <div className="bg-gradient-to-r from-[#0052a1] to-[#003d7a] rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user?.fullName || "Welcome"}
              </h1>
              <p className="text-white/80">{user?.email}</p>
              {user?.membership && (
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-[#f5a623] text-[#003d7a] text-xs font-semibold rounded-full">
                  {user.membership.tier} Member
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">My Account</h2>
              </div>
              <ul className="py-2">
                {accountNavItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/account" && pathname.startsWith(item.href));
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          isActive
                            ? "bg-[#0052a1]/5 text-[#0052a1] border-r-2 border-[#0052a1]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <AnimatedIcon 
                          icon={item.icon} 
                          className={`w-5 h-5 ${isActive ? "text-[#0052a1]" : "text-gray-400"}`}
                          hoverAnimation="scale"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${isActive ? "text-[#0052a1]" : ""}`}>
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? "text-[#0052a1]" : "text-gray-300"}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              {/* Logout Button */}
              <div className="p-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </Button>
              </div>
            </nav>

            {/* Membership Card Preview */}
            {user?.membership && (
              <div className="mt-6 bg-gradient-to-br from-[#f5a623] to-[#e09000] rounded-xl p-5 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium opacity-90">PriceSmart</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {user.membership.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-lg font-bold tracking-wider mb-1">
                  {user.membership.memberId}
                </p>
                <p className="text-sm opacity-90">{user.fullName}</p>
                <div className="mt-4 pt-3 border-t border-white/20 flex justify-between text-xs">
                  <span>Points: {user.membership.points?.toLocaleString()}</span>
                  <span>Valid until {new Date(user.membership.expirationDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
