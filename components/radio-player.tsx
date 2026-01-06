"use client"

import { useState } from "react"
import { Play, Pause, Volume2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { LiveChat } from "@/components/live-chat"

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/5 p-8 shadow-xl border border-primary/5">
      <div className="flex flex-col items-center text-center">
        <Badge variant="destructive" className="mb-6 animate-pulse bg-red-600 px-3 py-1 font-bold">
          🔴 LIVE
        </Badge>

        <div className="relative mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-background shadow-inner">
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-primary/20 blur-2xl transition-opacity duration-1000",
              isPlaying ? "opacity-100 animate-pulse-slow" : "opacity-0",
            )}
          />

          <div className="relative flex items-center justify-center gap-1.5 h-12">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn("w-1.5 rounded-full bg-primary", isPlaying ? "animate-wave" : "h-2")}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        <h2 className="mb-1 text-2xl font-serif font-bold text-foreground">Global Prayer Service</h2>
        <p className="mb-8 text-sm text-muted-foreground">Spreading the word of God across the nations</p>

        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
            <Volume2 className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
            className="h-16 w-16 rounded-full shadow-lg transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
            <Share2 className="h-6 w-6" />
          </Button>
        </div>

        <LiveChat />
      </div>
    </div>
  )
}
