import { events } from '@/data/events';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export const UpcomingEvents = () => {
  const now = new Date();
  // Get the next 3 upcoming events
  const upcoming = events
    .filter(event => parseISO(event.date) >= now)
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .slice(0, 3);

  return (
    <section className="w-full">
      <h2 className="text-2xl font-serif font-bold mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {upcoming.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="block p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center justify-center text-primary font-bold">
                <span className="text-sm uppercase">{format(parseISO(event.date), "MMM")}</span>
                <span className="text-2xl">{format(parseISO(event.date), "dd")}</span>
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-1">{event.type}</Badge>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  {event.church}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
