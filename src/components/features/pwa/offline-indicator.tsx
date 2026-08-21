"use client";

import { useState, useEffect } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOnlineStatus } from "@/hooks/use-pwa";

interface OfflineIndicatorProps {
  variant?: "banner" | "toast" | "inline";
  showOnline?: boolean;
  className?: string;
}

export function OfflineIndicator({
  variant = "toast",
  showOnline = false,
  className,
}: OfflineIndicatorProps) {
  const isOnline = useOnlineStatus();
  const [showOnlineNotification, setShowOnlineNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  // Track offline -> online transition
  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline && showOnline) {
      setShowOnlineNotification(true);
      const timer = setTimeout(() => {
        setShowOnlineNotification(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline, showOnline]);

  // Don't show anything if online and not showing online notification
  if (isOnline && !showOnlineNotification) {
    return null;
  }

  if (variant === "inline") {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm",
        isOnline 
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700",
        className
      )}>
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Offline</span>
          </>
        )}
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "py-2 px-4 text-center text-sm font-medium",
        isOnline 
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white",
        className
      )}>
        <div className="container mx-auto flex items-center justify-center gap-2">
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4" />
              <span>You're back online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              <span>You're offline. Some features may be limited.</span>
            </>
          )}
        </div>
      </div>
    );
  }

  // Toast variant (default)
  return (
    <div className={cn(
      "fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50",
      "rounded-xl shadow-lg overflow-hidden",
      "animate-in slide-in-from-bottom-4 fade-in",
      isOnline ? "bg-green-500" : "bg-gray-900",
      className
    )}>
      <div className="flex items-center gap-3 p-4 text-white">
        {isOnline ? (
          <>
            <Wifi className="w-5 h-5 shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Back Online</p>
              <p className="text-sm text-white/80">
                Connection restored
              </p>
            </div>
          </>
        ) : (
          <>
            <WifiOff className="w-5 h-5 shrink-0" />
            <div className="flex-1">
              <p className="font-medium">You're Offline</p>
              <p className="text-sm text-white/70">
                Check your internet connection
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-white hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Full-page offline fallback
 */
export function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-12 h-12 text-gray-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You're Offline
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          It looks like you've lost your internet connection. 
          Some features may not be available until you're back online.
        </p>
        
        <div className="space-y-3">
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#0052a1] hover:bg-[#003d7a]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <p className="text-sm text-gray-500">
            Cached content may still be available
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Update available notification
 */
export function UpdateAvailable({
  onUpdate,
  onDismiss,
  className,
}: {
  onUpdate: () => void;
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <div className={cn(
      "fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50",
      "bg-white rounded-xl shadow-lg border border-gray-200 p-4",
      className
    )}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-[#e6f0fa] rounded-full flex items-center justify-center shrink-0">
          <RefreshCw className="w-5 h-5 text-[#0052a1]" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Update Available</h3>
          <p className="text-sm text-gray-600 mt-0.5">
            A new version of the app is ready
          </p>
          <div className="flex gap-2 mt-3">
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
              >
                Later
              </Button>
            )}
            <Button
              size="sm"
              onClick={onUpdate}
              className="bg-[#0052a1] hover:bg-[#003d7a]"
            >
              Update Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
