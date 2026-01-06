import { cn } from "@/lib/utils"
import { RadioPlayer } from "@/components/Player/RadioPlayer" // Import the new RadioPlayer
import { LiveChat } from "@/components/live-chat"
import { Clock, Globe, Languages } from "lucide-react"

export default function ListenPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-bold text-primary">Live Broadcast</h1>
            <p className="text-lg text-muted-foreground">Tuning in from around the world to hear the Word of God.</p>
          </div>
          <RadioPlayer variant="page-full" /> {/* Use the new RadioPlayer with variant */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Listeners", value: "12,450", icon: Globe },
              { label: "Uptime", value: "99.9%", icon: Clock },
              { label: "Languages", value: "15+", icon: Languages },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-secondary/50 flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground leading-none">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:hidden">
            <LiveChat />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="hidden lg:block">
            <LiveChat />
          </div>

          <h3 className="text-xl font-serif font-bold">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: "06:00 - 08:00", event: "Morning Glory", speaker: "Dr. Sarah Adams", status: "past" },
              { time: "08:00 - 10:00", event: "Word Meditation", speaker: "Pastor David Chen", status: "past" },
              { time: "10:00 - 12:00", event: "Global Prayer", speaker: "Ministry Team", status: "active" },
              { time: "12:00 - 14:00", event: "Gospel Melodies", speaker: "Selected Tracks", status: "upcoming" },
              { time: "14:00 - 16:00", event: "Youth Revival", speaker: "Rev. James Wilson", status: "upcoming" },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "relative pl-6 pb-6 border-l last:pb-0",
                  item.status === "active" ? "border-primary" : "border-muted",
                )}
              >
                <div
                  className={cn(
                    "absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full",
                    item.status === "active" ? "bg-primary animate-pulse" : "bg-muted",
                  )}
                />
                <div className={cn(item.status === "past" && "opacity-50")}>
                  <p className="text-xs font-mono font-medium text-muted-foreground">{item.time}</p>
                  <h4 className="font-bold text-foreground">{item.event}</h4>
                  <p className="text-sm text-muted-foreground">{item.speaker}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
