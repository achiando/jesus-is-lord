import { MobileNav } from "@/components/Navigation/MobileNav"; // Import the new MobileNav
import { Header } from "@/components/shared/Header"; // Import the new Header
import { RadioPlayerProvider } from "@/lib/context/RadioPlayerContext"; // Import RadioPlayerProvider
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jesus Is Lord Radio App", // Updated title as per GEMINI.md
  description: "Unified design system for church ministry app across mobile and desktop platforms", // Updated description
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen bg-background`}>
        <RadioPlayerProvider>
          <Header /> {/* New Header component */}
          <main className="pb-16 lg:pb-0">{children}</main> {/* Adjusted padding for mobile nav */}
          <MobileNav /> {/* New MobileNav component */}
          <Analytics />
        </RadioPlayerProvider>
      </body>
    </html>
  )
}