import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/events";
import { EventForm } from "../_components/EventForm";

export default async function EventEditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const isNew = id === 'new';
  
  const event = isNew 
    ? undefined 
    : events.find((e) => e.id === id);

  if (!isNew && !event) {
    return <div>Event not found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {isNew ? "Create New Event" : "Edit Event"}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>{isNew ? "Event Details" : event?.title}</CardTitle>
          <CardDescription>
            {isNew ? "Fill out the form to add a new event." : `Editing details for the event.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventForm event={event} />
        </CardContent>
      </Card>
    </div>
  );
}
