"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DailyProgram } from "@/data/programs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProgramFormProps {
  program?: DailyProgram;
}

// This is a simplified simulation. In a real app, this would be an API call.
async function saveProgramAction(programData: DailyProgram) {
  console.log("Saving program:", programData);
  // Here, the agent would intercept this and use its tools to write to the file.
  // For now, we'll just log it and navigate back.
  alert(`Program "${programData.title}" saved!\n(Check console for data)`);
  return { success: true };
}

const daysOfWeek = [
  { id: 1, label: "Monday" },
  { id: 2, label: "Tuesday" },
  { id: 3, label: "Wednesday" },
  { id: 4, label: "Thursday" },
  { id: 5, label: "Friday" },
  { id: 6, label: "Saturday" },
  { id: 0, label: "Sunday" },
];

export function ProgramForm({ program }: ProgramFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<DailyProgram>>(
    program || {
      title: "",
      speaker: "",
      startTime: "00:00",
      endTime: "00:00",
      days: [],
    }
  );

  const handleDayChange = (dayId: number) => {
    const currentDays = formData.days || [];
    const newDays = currentDays.includes(dayId)
      ? currentDays.filter((d) => d !== dayId)
      : [...currentDays, dayId];
    setFormData({ ...formData, days: newDays.sort() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.title || !formData.startTime || !formData.endTime) {
      alert("Please fill all required fields.");
      return;
    }

    const programData: DailyProgram = {
      id: program?.id || formData.title!.toLowerCase().replace(/\s+/g, '-'),
      displayTime: formData.startTime!, // This could be formatted better
      ...formData,
    } as DailyProgram;

    await saveProgramAction(programData);
    router.push("/admin/programs");
    router.refresh(); // Refresh server components
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Program Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Morning Glory Prayer"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="speaker">Speaker / Host</Label>
        <Input
          id="speaker"
          value={formData.speaker}
          onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
          placeholder="e.g., Prayer Team"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time (24hr)</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time (24hr)</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-3">
        <Label>Days of the Week</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {daysOfWeek.map((day) => (
            <div key={day.id} className="flex items-center space-x-2">
              <Checkbox
                id={`day-${day.id}`}
                checked={formData.days?.includes(day.id)}
                onCheckedChange={() => handleDayChange(day.id)}
              />
              <Label htmlFor={`day-${day.id}`} className="font-normal">
                {day.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit">Save Program</Button>
      </div>
    </form>
  );
}