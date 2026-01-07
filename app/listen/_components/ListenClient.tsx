"use client"

import { AnnouncementCarousel } from "@/app/_components/AnnouncementCarousel";
import { RadioPlayer } from "@/components/Player/RadioPlayer";
import { Mission } from "@/components/shared/Mission";
import { dailyPrograms } from "@/data/programs";
import { cn } from "@/lib/utils";
import { Clock, Globe, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { FloatingChat } from "./FloatingChat";

export function ListenClient() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update the time every minute to re-evaluate the schedule
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentDay = now.getDay();
  const todaysPrograms = dailyPrograms.filter(p => p.days.includes(currentDay));

  const getProgramStatus = (program: { startTime: string; endTime: string; }) => {
    const currentTime = now.getHours() + now.getMinutes() / 60;
    const [startHours, startMinutes] = program.startTime.split(':').map(Number);
    const startTime = startHours + startMinutes / 60;
    const [endHours, endMinutes] = program.endTime.split(':').map(Number);
    const endTime = endHours + endMinutes / 60;

    if (currentTime >= startTime && currentTime < endTime) {
      return "active";
    } else if (currentTime >= endTime) {
      return "past";
    } else {
      return "upcoming";
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full py-8 md:py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-bold text-primary">Live Broadcast</h1>
            <p className="text-lg text-muted-foreground">Tuning in from around the world to hear the Word of God.</p>
          </div>
          <RadioPlayer variant="page-full" />

          <div className="grid grid-cols-3 gap-4">
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
        </div>

        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl font-serif font-bold">Today's Schedule</h3>
          <div className="space-y-4">
            {todaysPrograms.map((item, i) => {
              const status = getProgramStatus(item);
              return (
                <div
                  key={i}
                  className={cn(
                    "relative pl-6 pb-6 border-l last:pb-0",
                    status === "active" ? "border-primary" : "border-muted",
                  )}
                >
                  <div
                    className={cn(
                      "absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full",
                      status === "active" ? "bg-primary animate-pulse" : "bg-muted",
                    )}
                  />
                  <div className={cn(status === "past" && "opacity-50")}>
                    <p className="text-xs font-mono font-medium text-muted-foreground">{item.startTime} - {item.endTime}</p>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.speaker}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
     
      </div>
      <div className="max-w-7xl mx-auto w-full mt-8">
        <Mission />
        <AnnouncementCarousel />
      </div>
      <FloatingChat />
    </div>
  );
}
