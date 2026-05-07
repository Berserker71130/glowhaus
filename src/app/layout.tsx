import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer"; // 1. Import the Drawer
import { Toaster } from "react-hot-toast"; // 2. Import the Toast provider
import OfflineBanner from "@/components/layout/OffllineBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "GlowHaus | Luxury Beauty Suite",
  description: "Premium Hair, Nails, and Accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-black">
        {/* OFFLINE BANNER */}
        <OfflineBanner />
        {/*  Global Toaster (positioned at bottom-center as requested) */}
        <Toaster
          position="bottom-right"
          {...({ limit: 3 } as any)}
          containerStyle={{
            bottom: 40,
            right: 40,
            zIndex: 99999, // Ensures it stays above the Navbar/Drawer
          }}
          toastOptions={{
            // Default styling for all toasts
            style: {
              background: "#FCF9F2", // Your Ivory/Linen background
              color: "#1A1A1A", // Noir text
              border: "1px solid rgba(212, 175, 55, 0.2)", // Subtle gold border
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.05em",
              padding: "16px 24px",
              maxWidth: "400px",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
            },
            // Ensure the animations are smooth
            duration: 3500,
          }}
        />

        <Navbar />

        {/* 4. The Cart Drawer stays here so it can be opened from any page */}
        <CartDrawer />

        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
