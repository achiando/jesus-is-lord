import { RadioPlayer } from "@/components/Player/RadioPlayer"; // Import the new RadioPlayer
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { weeklySchedule } from "@/data/schedule";
import { cn } from "@/lib/utils";
import { BookOpen, Calendar, Mic2 } from "lucide-react";

export default function Home() {
  return (
    <div className="container flex flex-col gap-12 py-8 md:py-12">
      <section className="mx-auto max-w-2xl w-full">
        <RadioPlayer variant="page-full" /> {/* Use the new RadioPlayer with variant */}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif font-bold">Today's Highlights</h3>
          <Button variant="link" className="text-primary">
            View Schedule
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklySchedule.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border bg-card shadow-sm">
              <div
                className={cn(
                  "p-3 rounded-full",
                  item.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                )}
              >
                {item.icon || <Mic2 className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              {item.active && (
                <Badge variant="outline" className="ml-auto text-primary border-primary/20">
                  NOW
                </Badge>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground">
          <div className="relative z-10">
            <h4 className="text-2xl font-serif font-bold mb-2">Latest Teachings</h4>
            <p className="mb-6 opacity-90">Deepen your faith with our audio and video collection.</p>
            <Button variant="secondary" className="rounded-full">
              <BookOpen className="mr-2 h-4 w-4" /> Browse Library
            </Button>
          </div>
          <BookOpen className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" />
        </div>
        <div className="group relative overflow-hidden rounded-3xl bg-accent p-8 text-accent-foreground">
          <div className="relative z-10">
            <h4 className="text-2xl font-serif font-bold mb-2">Upcoming Events</h4>
            <p className="mb-6 opacity-90">Join our community in prayer and celebration.</p>
            <Button variant="outline" className="rounded-full bg-background/50 backdrop-blur-sm">
              <Calendar className="mr-2 h-4 w-4" /> View Events
            </Button>
          </div>
          <Calendar className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" />
        </div>
      </section>
    </div>
  )
}
