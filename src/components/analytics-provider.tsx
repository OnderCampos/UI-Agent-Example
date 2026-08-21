"use client";

import { useAnalytics } from "@/hooks/use-analytics";

/**
 * Analytics Provider Component
 * Wrap your app with this to enable analytics tracking
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Initialize analytics and track page views
  useAnalytics();

  return <>{children}</>;
}
