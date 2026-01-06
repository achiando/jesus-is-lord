import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-primary">
          <span>Jesus Is Lord Radio</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/listen" className="text-sm font-medium hover:text-primary transition-colors">
            Listen Live
          </Link>
          <Link href="/teachings" className="text-sm font-medium hover:text-primary transition-colors">
            Teachings
          </Link>
          <Link href="/events" className="text-sm font-medium hover:text-primary transition-colors">
            Events
          </Link>
          <div className="flex items-center gap-2 border-l pl-4 border-border">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <div id="google_translate_element" className="translate-widget"></div>
          </div>
        </nav>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon">
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
