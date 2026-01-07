"use client"

import { Button } from "@/components/ui/button";
import { Bell, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DesktopNav } from "../Navigation/DesktopNav";
// MobileNav is the bottom bar, not part of the header sheet trigger

// Placeholder for Language Selector
const LanguageSelector = () => (
  <Button variant="ghost" size="icon">
    <Globe className="h-5 w-5" />
    <span className="sr-only">Select language</span>
  </Button>
)

// Placeholder for Notification Button
const NotificationButton = () => (
  <Button variant="ghost" size="icon">
    <Bell className="h-5 w-5" />
    <span className="sr-only">View notifications</span>
  </Button>
)

// Placeholder for Profile Menu
const ProfileMenu = () => (
  <div className="hidden lg:block">
    <Button variant="ghost" size="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      <span className="sr-only">User profile</span>
    </Button>
  </div>
)


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Desktop Logo and Nav */}
        <div className="mr-4 hidden lg:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Jesus Is Lord Radio" width={32} height={32} />
            <span className="font-bold">Jesus Is Lord Radio</span>
          </Link>

        </div>

        {/* Mobile Menu Trigger and Logo */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Jesus Is Lord Radio" width={28} height={28} />
            <span className="font-bold text-md">Jesus Is Lord Radio</span>
          </Link>
        </div>

        {/* Right section: Language, Notifications, Profile */}
        <div className="flex items-center gap-2 ml-auto"> {/* ml-auto to push to right */}

          <DesktopNav />
          <LanguageSelector />
        </div>
      </div>
    </header>
  )
}