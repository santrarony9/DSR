import type { Metadata } from "next";
import { Bricolage_Grotesque, Karla } from "next/font/google";
import "./globals.css";
import PublicWrapper from "@/components/layout/PublicWrapper";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/shared/WhatsAppWidget";
import ScrollToTop from "@/components/layout/ScrollToTop";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "DSR Event Planner - Best Event Planner in Kolkata",
  description: "DSR Event Planner is the best event planning service in Kolkata. We specialize in weddings, corporate events, and parties.",
  keywords: ["Event Planner", "Kolkata", "Wedding Planner", "Corporate Events", "DSR Event Planner"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${karla.variable} antialiased bg-[#FAFAF5] text-[#1a1a1a]`}
      >
        <PublicWrapper
          header={<Header />}
          footer={<Footer />}
          whatsapp={<WhatsAppWidget />}
          scrollToTop={<ScrollToTop />}
        >
          {children}
        </PublicWrapper>
      </body>
    </html>
  );
}
