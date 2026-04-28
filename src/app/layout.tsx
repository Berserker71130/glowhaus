import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer"; // 1. Import the Drawer
import { Toaster } from "react-hot-toast"; // 2. Import the Toast provider

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
        {/* 3. Global Toaster (positioned at bottom-center as requested) */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
              fontSize: "12px",
              textTransform: "uppercase",
            },
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
