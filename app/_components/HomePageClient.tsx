"use client"

import { RadioPlayer } from "@/components/Player/RadioPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { weeklySchedule, ScheduleItem } from "@/data/schedule"; // Import ScheduleItem
import { cn } from "@/lib/utils";
import { Mic2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AnnouncementCarousel } from "./AnnouncementCarousel";
import { ListeningFromForm } from "./ListeningFromForm";
import { ImageGallery } from "./ImageGallery"; // Import the new ImageGallery component
import { isWithinInterval, parse, addHours, subHours } from 'date-fns'; // Import date-fns functions

interface ListeningDetails {
  name: string;
  country: string;
  region: string;
  place: string;
}

const LISTENING_DETAILS_KEY = 'listeningDetails';

// Helper function to check if a schedule item is active within a 3-hour window
const isNowActive = (item: ScheduleItem): boolean => {
  const now = new Date();
  const startTime = parse(item.startTime, 'hh:mm a', now);
  const endTime = parse(item.endTime, 'hh:mm a', now);

  // Define a 3-hour window around the start time (1.5 hours before and 1.5 hours after)
  const windowStart = subHours(startTime, 1.5);
  const windowEnd = addHours(startTime, 1.5);

  return isWithinInterval(now, { start: windowStart, end: windowEnd });
};

export const HomePageClient: React.FC = () => {
  const [isListeningFormOpen, setIsListeningFormOpen] = useState(false);
  const [listeningDetails, setListeningDetails] = useState<ListeningDetails | null>(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem(LISTENING_DETAILS_KEY);
    if (storedDetails) {
      setListeningDetails(JSON.parse(storedDetails));
    }
  }, []);

  const handleSaveListeningDetails = (data: ListeningDetails) => {
    localStorage.setItem(LISTENING_DETAILS_KEY, JSON.stringify(data));
    setListeningDetails(data);
    setIsListeningFormOpen(false);
  };

  return (
    <div className="container flex flex-col gap-12 py-8 md:py-12">
      <section className="mx-auto max-w-2xl w-full">
        <RadioPlayer variant="page-full" /> {/* Use the new RadioPlayer with variant */}
      </section>

      <AnnouncementCarousel /> {/* New carousel section */}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif font-bold">Today's Highlights</h3>
          <Button variant="link" className="text-primary">
            View Schedule
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklySchedule.slice(0, 3).map((item) => (
            <div key={item.id} className="flex flex-col gap-2 p-4 rounded-2xl border bg-card shadow-sm">
              <div className="flex items-center gap-4">
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
                {isNowActive(item) && ( // Use the new isNowActive helper
                  <Badge variant="outline" className="ml-auto text-primary border-primary/20">
                    NOW
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground pl-16"> {/* Indent to align with text */}
                {item.placeName && <p>{item.placeName}, {item.region}</p>}
                {item.pastorBishop && <p>{item.pastorBishop}</p>}
                {item.phoneNumber && <p>{item.phoneNumber}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          {!listeningDetails ? (
            <Button onClick={() => setIsListeningFormOpen(true)}>
              Tell Us Where You're Listening From!
            </Button>
          ) : (
            <p className="text-muted-foreground">
              Thanks for listening from {listeningDetails.place}, {listeningDetails.region}, {listeningDetails.country}!
            </p>
          )}
        </div>
      </section>

      <ImageGallery /> {/* New Image Gallery section */}

      <ListeningFromForm
        isOpen={isListeningFormOpen}
        onClose={() => setIsListeningFormOpen(false)}
        onSave={handleSaveListeningDetails}
      />
    </div>
  )
}