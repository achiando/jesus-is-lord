import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/events";
import { PlusCircle, Edit } from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function AdminEventsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Add or edit special one-time events.</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Event
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming & Recent Events</CardTitle>
          <CardDescription>{events.length} events configured.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {events.sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()).map((event) => (
              <div key={event.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(parseISO(event.date), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/events/${event.id}`}>
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
