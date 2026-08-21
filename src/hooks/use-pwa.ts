"use client";

import { useState, useEffect, useCallback } from "react";
import {
  registerServiceWorker,
  isInstalledPWA,
  isOnline,
  addNetworkListeners,
  showInstallPrompt,
  isInstallPromptAvailable,
  captureInstallPrompt,
  requestNotificationPermission,
  shareContent,
  canShare,
} from "@/lib/pwa";

interface UsePWAReturn {
  isInstalled: boolean;
  isOnline: boolean;
  isInstallable: boolean;
  isUpdateAvailable: boolean;
  notificationPermission: NotificationPermission | null;
  install: () => Promise<boolean>;
  requestNotifications: () => Promise<NotificationPermission>;
  share: (data: ShareData) => Promise<boolean>;
  canShare: boolean;
  updateApp: () => void;
}

export function usePWA(): UsePWAReturn {
  const [isInstalled, setIsInstalled] = useState(false);
  const [online, setOnline] = useState(true);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [notificationPermission, setNotificationPermission] = 
    useState<NotificationPermission | null>(null);

  // Initialize PWA features
  useEffect(() => {
    // Check if installed
    setIsInstalled(isInstalledPWA());
    
    // Check online status
    setOnline(isOnline());
    
    // Check notification permission
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
    
    // Register service worker
    registerServiceWorker();
    
    // Capture install prompt
    captureInstallPrompt();
    
    // Listen for install prompt
    const handleInstallAvailable = () => {
      setIsInstallable(true);
    };
    window.addEventListener("pwa-install-available", handleInstallAvailable);
    
    // Listen for update available
    const handleUpdateAvailable = () => {
      setIsUpdateAvailable(true);
    };
    window.addEventListener("pwa-update-available", handleUpdateAvailable);
    
    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };
    window.addEventListener("appinstalled", handleAppInstalled);
    
    // Check if prompt is already available
    setIsInstallable(isInstallPromptAvailable());
    
    // Network listeners
    const cleanup = addNetworkListeners(
      () => setOnline(true),
      () => setOnline(false)
    );
    
    return () => {
      cleanup();
      window.removeEventListener("pwa-install-available", handleInstallAvailable);
      window.removeEventListener("pwa-update-available", handleUpdateAvailable);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Install app
  const install = useCallback(async (): Promise<boolean> => {
    const result = await showInstallPrompt();
    if (result) {
      setIsInstallable(false);
    }
    return result;
  }, []);

  // Request notification permission
  const requestNotifications = useCallback(async (): Promise<NotificationPermission> => {
    const permission = await requestNotificationPermission();
    setNotificationPermission(permission);
    return permission;
  }, []);

  // Share content
  const share = useCallback(async (data: ShareData): Promise<boolean> => {
    return shareContent(data);
  }, []);

  // Update app (reload)
  const updateApp = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  return {
    isInstalled,
    isOnline: online,
    isInstallable,
    isUpdateAvailable,
    notificationPermission,
    install,
    requestNotifications,
    share,
    canShare: typeof window !== "undefined" && canShare(),
    updateApp,
  };
}

/**
 * Hook for online/offline status only
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(isOnline());
    
    return addNetworkListeners(
      () => setOnline(true),
      () => setOnline(false)
    );
  }, []);

  return online;
}
