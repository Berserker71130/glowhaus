import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Toaster } from "react-hot-toast";
import OfflineBanner from "@/components/layout/OffllineBanner";
// 1. Import the ThemeProvider
import { ThemeProvider } from "@/components/theme-provider";

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
      // 2. Add this to prevent hydration errors
      suppressHydrationWarning
    >
      {/* 3. Removed bg-[#FAF7F2] and text-black from body to let ThemeProvider handle it */}
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <OfflineBanner />
          <Toaster
            position="bottom-right"
            {...({ limit: 3 } as any)}
            containerStyle={{
              bottom: 40,
              right: 40,
              zIndex: 99999,
            }}
            toastOptions={{
              style: {
                background: "#FCF9F2",
                color: "#1A1A1A",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.05em",
                padding: "16px 24px",
                maxWidth: "400px",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
              },
              duration: 3500,
            }}
          />

          <Navbar />
          <CartDrawer />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
