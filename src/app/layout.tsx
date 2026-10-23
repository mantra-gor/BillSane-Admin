import type { Metadata } from "next";
import { Anek_Latin, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Inter for UI and reading, shared with the desktop app. Anek Latin (Ek Type)
// for headlines: signboard energy, and a family that extends to Indian scripts.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anek = Anek_Latin({
  variable: "--font-anek",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "BillSane",
  description: "Simplify Your Billing",
  icons: {
    icon: "/favicon_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${anek.variable}`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
