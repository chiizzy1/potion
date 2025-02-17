import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { ReactLenis } from "@/lib/lenis";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Potion",
  description: "Potion Leaderboard is a gamified platform where every Solana memecoin trader",
  openGraph: {
    title: "Potion",
    description: "Potion Leaderboard is a gamified platform where every Solana memecoin trader",
    type: "website",
    locale: "en-US",
    url: "https://potion-inky.vercel.app/",
    images: "https://potion-inky.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpotion-logo.c832135b.jpg&w=384&q=75",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={`${sora.className} antialiased`}>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </body>
      </ReactLenis>
      <Toaster richColors={true} position="bottom-left" expand={true} />
    </html>
  );
}
