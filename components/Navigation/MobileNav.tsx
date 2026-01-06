"use client"

import { cn } from "@/lib/utils"
import { BookOpen, Calendar, Home, Radio } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "radio", label: "Radio", icon: Radio, href: "/listen" },
  { id: "teachings", label: "Teachings", icon: BookOpen, href: "/teachings" },
  { id: "events", label: "Events", icon: Calendar, href: "/events" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white px-4 lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 py-2 transition-colors",
              isActive ? "text-blue-600" : "text-gray-700", // Active: #2563EB, Inactive: #6B7280
              "text-[12px] font-medium" // 12px font size
            )}
          >
            <item.icon className="h-6 w-6" /> {/* 24px icon size */}
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}