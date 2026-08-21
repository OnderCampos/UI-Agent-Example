import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "PriceSmart",
    template: "%s | PriceSmart",
  },
  description: "Shop smart with PriceSmart - Quality products at wholesale prices",
  keywords: ["ecommerce", "shopping", "store", "products", "wholesale", "pricesmart"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PriceSmart",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "PriceSmart",
    title: "PriceSmart",
    description: "Shop smart with PriceSmart - Quality products at wholesale prices",
  },
  twitter: {
    card: "summary_large_image",
    title: "PriceSmart",
    description: "Shop smart with PriceSmart - Quality products at wholesale prices",
  },
};

export const viewport: Viewport = {
  themeColor: "#0052a1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
