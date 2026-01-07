import { RadioPlayerProvider } from "@/lib/context/RadioPlayerContext"; // Import RadioPlayerProvider
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { MobileNav } from "@/components/Navigation/MobileNav";
import { MiniPlayerWrapper } from "@/components/Player/MiniPlayerWrapper";
import { Footer } from "@/components/shared/Footer"; // Import the Footer
import { Header } from "@/components/shared/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jesus is Lord Radio",
  description: "Live radio streaming, teachings, and events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased p-2", inter.className)}>
        <RadioPlayerProvider>
         <Header /> {/* New Header component */}
          <main>{children} <Footer /></main>
         
          <MobileNav /> {/* New MobileNav component */}
          <MiniPlayerWrapper /> {/* Mini-player wrapper */}
          <Analytics />
        </RadioPlayerProvider>
      </body>
    </html>
  );
}