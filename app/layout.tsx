import { RadioPlayerProvider } from "@/lib/context/RadioPlayerContext";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { MobileNav } from "@/components/Navigation/MobileNav";
import { MiniPlayerWrapper } from "@/components/Player/MiniPlayerWrapper";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { AnalyticsProvider } from "@/lib/context/AnalyticsContext"; // Import AnalyticsProvider
import { ChatProvider } from "@/lib/context/ChatContext";

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
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        "flex flex-col items-center",
        inter.className
      )}>
        <RadioPlayerProvider>
          <ChatProvider>
            <AnalyticsProvider>
              <div className="w-full max-w-[2000px] px-4">
                <Header />
                <main className="w-full">{children}</main>
                <Footer />
                <MobileNav />
                <MiniPlayerWrapper />
              </div>
              <Analytics />
            </AnalyticsProvider>
          </ChatProvider>
        </RadioPlayerProvider>
      </body>
    </html>
  );
}