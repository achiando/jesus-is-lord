use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Event } from "@/data/events";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EventFormProps {
  event?: Event;
}

// This is a simplified simulation. In a real app, this would be an API call.
async function saveEventAction(eventData: Event) {
  console.log("Saving event:", eventData);
  // Here, the agent would intercept this and use its tools to write to the file.
  alert(`Event "${eventData.title}" saved!\n(Check console for data)`);
  return { success: true };
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Event>>(
    event || {
      title: "",
      church: "",
      region: "",
      date: "",
      time: "00:00 AM - 00:00 AM",
      type: "Service",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      alert("Please fill all required fields.");
      return;
    }

    const eventData: Event = {
      id: event?.id || formData.title!.toLowerCase().replace(/\s+/g, '-'),
      ...formData,
    } as Event;

    await saveEventAction(eventData);
    router.push("/admin/events");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Healing & Deliverance Service"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="church">Church / Location</Label>
          <Input
            id="church"
            value={formData.church}
            onChange={(e) => setFormData({ ...formData, church: e.target.value })}
            placeholder="e.g., Nakuru Main Altar"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Input
            id="region"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            placeholder="e.g., Rift Valley"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time Range</Label>
          <Input
            id="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="e.g., 05:00 AM - 07:00 AM"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Event Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as Event['type'] })}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Service">Service</SelectItem>
            <SelectItem value="Prayer">Prayer</SelectItem>
            <SelectItem value="Youth">Youth</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit">Save Event</Button>
      </div>
    </form>
  );
}