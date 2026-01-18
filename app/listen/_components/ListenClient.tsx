"use client"

import { RadioPlayer } from "@/components/Player/RadioPlayer";
import { LiveIndicator } from "@/components/shared/LiveIndicator"; // Assuming LiveIndicator exists
import { Button } from "@/components/ui/button";
import { dailyPrograms } from "@/data/programs";
import { useRadioPlayer } from "@/lib/context/RadioPlayerContext";
import { cn } from "@/lib/utils";
import { Clock, Globe, Languages, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IntegratedChat } from "./IntegratedChat";

export function ListenClient() {
  const [now, setNow] = useState(new Date());
  const { isLive, currentProgram } = useRadioPlayer();

  useEffect(() => {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Jesus Is Lord Radio - Live Broadcast",
        text: `Tuning into ${currentProgram?.title || 'the live broadcast'} on Jesus Is Lord Radio!`,
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Share functionality not supported in this browser.');
    }
  };

  return (
    <div className="container flex flex-col lg:flex-row gap-8 py-4 md:py-6 min-h-[calc(100vh-150px)]">
      {/* Left Column: Player and Info */}
      <div className="lg:w-7/12 flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-col">
            <h1 className="text-4xl font-serif font-bold text-primary">Live Broadcast</h1>
            {isLive && <LiveIndicator size="md" />}
          </div>
          <p className="text-lg text-muted-foreground text-center">Tuning in from around the world to hear the Word of God.</p>
        </div>

        <div className="relative flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg shadow-lg">
          <RadioPlayer variant="page-full" />
          <Button variant="outline" className="mt-4" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share Broadcast
          </Button>
        </div>

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

      {/* Right Column: Today's Schedule & Chat */}
      <div className="lg:w-5/12 flex flex-col gap-4 overflow-hidden">
        <h3 className="text-xl font-serif font-bold flex-shrink-0">Today's Schedule</h3>
        <div className="space-y-4 overflow-y-auto border rounded-lg p-4">
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
        
        {/* Integrated Chat for Desktop */}
        <div className="flex-1 min-h-0">
          <IntegratedChat />
        </div>
      </div>
    </div>
  );
}
