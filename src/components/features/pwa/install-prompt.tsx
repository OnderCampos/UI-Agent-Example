"use client";

import { useState, useEffect } from "react";
import { Download, X, Smartphone, Zap, WifiOff, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePWA } from "@/hooks/use-pwa";

interface InstallPromptProps {
  variant?: "banner" | "modal" | "minimal";
  onDismiss?: () => void;
  className?: string;
}

export function InstallPrompt({
  variant = "banner",
  onDismiss,
  className,
}: InstallPromptProps) {
  const { isInstallable, install } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Check if user has dismissed before
  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      // Re-show after 7 days
      if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) {
        setIsDismissed(true);
      }
    }
  }, []);

  if (!isInstallable || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    const success = await install();
    setIsInstalling(false);
    
    if (success) {
      setIsDismissed(true);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
    setIsDismissed(true);
    onDismiss?.();
  };

  if (variant === "minimal") {
    return (
      <Button
        onClick={handleInstall}
        disabled={isInstalling}
        size="sm"
        className={cn("bg-[#0052a1] hover:bg-[#003d7a]", className)}
      >
        <Download className="w-4 h-4 mr-2" />
        {isInstalling ? "Installing..." : "Install App"}
      </Button>
    );
  }

  if (variant === "modal") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className={cn(
          "bg-white rounded-2xl max-w-md w-full p-6",
          className
        )}>
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#e6f0fa] rounded-2xl flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-[#0052a1]" />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-xl font-bold text-center text-gray-900">
            Install PriceSmart App
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Get a faster, app-like experience with offline support
          </p>

          {/* Features */}
          <div className="mt-6 space-y-3">
            <Feature icon={Zap} text="Faster loading times" />
            <Feature icon={WifiOff} text="Works offline" />
            <Feature icon={Bell} text="Push notifications" />
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="flex-1"
            >
              Not Now
            </Button>
            <Button
              onClick={handleInstall}
              disabled={isInstalling}
              className="flex-1 bg-[#0052a1] hover:bg-[#003d7a]"
            >
              <Download className="w-4 h-4 mr-2" />
              {isInstalling ? "Installing..." : "Install"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40",
      "sm:bottom-4 sm:left-4 sm:right-auto sm:w-96 sm:rounded-xl sm:border",
      className
    )}>
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-[#e6f0fa] rounded-xl flex items-center justify-center shrink-0">
          <Smartphone className="w-6 h-6 text-[#0052a1]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">Install App</h3>
          <p className="text-sm text-gray-600 mt-0.5">
            Add to home screen for the best experience
          </p>
          <Button
            onClick={handleInstall}
            disabled={isInstalling}
            size="sm"
            className="mt-3 bg-[#0052a1] hover:bg-[#003d7a]"
          >
            <Download className="w-4 h-4 mr-2" />
            {isInstalling ? "Installing..." : "Install"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <Icon className="w-4 h-4 text-green-600" />
      </div>
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}

/**
 * iOS Install Instructions (Safari doesn't support beforeinstallprompt)
 */
export function IOSInstallInstructions({
  onDismiss,
  className,
}: {
  onDismiss?: () => void;
  className?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Detect iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone;
    
    if (isIOS && isSafari && !isStandalone) {
      const dismissed = localStorage.getItem("ios-install-dismissed");
      if (!dismissed) {
        setShow(true);
      }
    }
  }, []);

  if (!show) return null;

  const handleDismiss = () => {
    localStorage.setItem("ios-install-dismissed", "true");
    setShow(false);
    onDismiss?.();
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40",
      className
    )}>
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-700">
          Install this app: tap{" "}
          <span className="inline-block w-5 h-5 align-middle">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#0052a1]">
              <path d="M12 2L12 14M12 2L7 7M12 2L17 7M3 12V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V12" 
                    stroke="currentColor" 
                    fill="none" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
            </svg>
          </span>{" "}
          then "Add to Home Screen"
        </p>
      </div>
    </div>
  );
}
