/**
 * PWA Utilities
 * Helper functions for Progressive Web App features
 */

/**
 * Check if running as installed PWA
 */
export function isInstalledPWA(): boolean {
  if (typeof window === "undefined") return false;
  
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/**
 * Check if PWA is installable
 */
export function isPWAInstallable(): boolean {
  if (typeof window === "undefined") return false;
  
  // Check if already installed
  if (isInstalledPWA()) return false;
  
  // Check browser support
  return "serviceWorker" in navigator && "BeforeInstallPromptEvent" in window;
}

/**
 * Register service worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    
    console.log("[PWA] Service worker registered:", registration.scope);
    
    // Check for updates
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            // New content is available
            dispatchEvent(new CustomEvent("pwa-update-available"));
          }
        });
      }
    });
    
    return registration;
  } catch (error) {
    console.error("[PWA] Service worker registration failed:", error);
    return null;
  }
}

/**
 * Unregister service worker
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return false;
  }
  
  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.unregister();
  } catch (error) {
    console.error("[PWA] Service worker unregistration failed:", error);
    return false;
  }
}

/**
 * Request push notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  
  if (Notification.permission === "granted") {
    return "granted";
  }
  
  return Notification.requestPermission();
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPush(vapidPublicKey: string): Promise<PushSubscription | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.ready;
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
    
    console.log("[PWA] Push subscription:", subscription.endpoint);
    return subscription;
  } catch (error) {
    console.error("[PWA] Push subscription failed:", error);
    return null;
  }
}

/**
 * Get current push subscription
 */
export async function getPushSubscription(): Promise<PushSubscription | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.pushManager.getSubscription();
  } catch (error) {
    console.error("[PWA] Get push subscription failed:", error);
    return null;
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPush(): Promise<boolean> {
  const subscription = await getPushSubscription();
  
  if (!subscription) {
    return true;
  }
  
  return subscription.unsubscribe();
}

/**
 * Check if online
 */
export function isOnline(): boolean {
  if (typeof window === "undefined") return true;
  return navigator.onLine;
}

/**
 * Add online/offline event listeners
 */
export function addNetworkListeners(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  
  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);
  
  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", onOffline);
  };
}

/**
 * Cache data for offline use
 */
export async function cacheForOffline(key: string, data: unknown): Promise<void> {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(`offline-${key}`, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.error("[PWA] Failed to cache offline data:", error);
  }
}

/**
 * Get cached offline data
 */
export function getOfflineCache<T>(key: string, maxAge?: number): T | null {
  if (typeof window === "undefined") return null;
  
  try {
    const item = localStorage.getItem(`offline-${key}`);
    if (!item) return null;
    
    const { data, timestamp } = JSON.parse(item);
    
    // Check if data is expired
    if (maxAge && Date.now() - timestamp > maxAge) {
      localStorage.removeItem(`offline-${key}`);
      return null;
    }
    
    return data as T;
  } catch (error) {
    console.error("[PWA] Failed to get offline cache:", error);
    return null;
  }
}

/**
 * Clear offline cache
 */
export function clearOfflineCache(key?: string): void {
  if (typeof window === "undefined") return;
  
  if (key) {
    localStorage.removeItem(`offline-${key}`);
    return;
  }
  
  // Clear all offline cache
  const keys = Object.keys(localStorage).filter((k) => k.startsWith("offline-"));
  keys.forEach((k) => localStorage.removeItem(k));
}

/**
 * Request background sync
 */
export async function requestBackgroundSync(tag: string): Promise<void> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }
  
  try {
    const registration = await navigator.serviceWorker.ready;
    
    if ("sync" in registration) {
      await (registration as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }).sync.register(tag);
      console.log("[PWA] Background sync registered:", tag);
    }
  } catch (error) {
    console.error("[PWA] Background sync registration failed:", error);
  }
}

/**
 * Share content using Web Share API
 */
export async function shareContent(data: ShareData): Promise<boolean> {
  if (typeof window === "undefined" || !navigator.share) {
    return false;
  }
  
  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    if ((error as Error).name !== "AbortError") {
      console.error("[PWA] Share failed:", error);
    }
    return false;
  }
}

/**
 * Check if Web Share is supported
 */
export function canShare(data?: ShareData): boolean {
  if (typeof window === "undefined" || !navigator.share) {
    return false;
  }
  
  if (data && navigator.canShare) {
    return navigator.canShare(data);
  }
  
  return true;
}

/**
 * Convert VAPID key to ArrayBuffer
 */
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray.buffer.slice(0);
}

/**
 * Install prompt event type
 */
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

/**
 * Store the install prompt event
 */
let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;

/**
 * Capture the install prompt
 */
export function captureInstallPrompt(): void {
  if (typeof window === "undefined") return;
  
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e as BeforeInstallPromptEvent;
    dispatchEvent(new CustomEvent("pwa-install-available"));
  });
}

/**
 * Show install prompt
 */
export async function showInstallPrompt(): Promise<boolean> {
  if (!deferredInstallPrompt) {
    return false;
  }
  
  await deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  
  deferredInstallPrompt = null;
  
  return outcome === "accepted";
}

/**
 * Check if install prompt is available
 */
export function isInstallPromptAvailable(): boolean {
  return deferredInstallPrompt !== null;
}
