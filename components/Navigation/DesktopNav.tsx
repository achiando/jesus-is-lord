"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const DesktopNav = () => {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Radio", href: "/listen" },
    { label: "Teachings", href: "/teachings" },
    { label: "Events", href: "/events" },
  ]

  return (
    <nav className="hidden lg:flex gap-2 items-center"> {/* Changed gap-6 to gap-2 */}
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-md transition-all", // Added padding and rounded corners
              isActive
                ? "bg-blue-100 text-blue-600" // Active: #DBEAFE background, #2563EB text
                : "text-gray-700 hover:bg-gray-100" // Inactive: #374151 text, #F3F4F6 hover background
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
