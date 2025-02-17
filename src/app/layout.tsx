import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { ReactLenis } from "@/lib/lenis";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Potion",
  description: "Potion leadership dashboard for top degenerate trenchers",
  openGraph: {
    title: "Potion",
    description: "Potion leadership dashboard for top degenerate trenchers",
    type: "website",
    locale: "en-US",
    url: "",
    images: "",
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
          </Providers>
        </body>
      </ReactLenis>
      <Toaster richColors={true} position="bottom-left" expand={true} />
    </html>
  );
}
