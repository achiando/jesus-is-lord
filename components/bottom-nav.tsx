"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Radio, BookOpen, Calendar, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Listen", icon: Radio, href: "/listen" },
  { label: "Teachings", icon: BookOpen, href: "/teachings" },
  { label: "Events", icon: Calendar, href: "/events" },
  { label: "More", icon: MoreHorizontal, href: "/more" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/80 px-4 backdrop-blur-lg md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
