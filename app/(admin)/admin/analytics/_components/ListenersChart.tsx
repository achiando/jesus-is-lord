"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the last 7 days
const listenerData = [
  { day: "Mon", listeners: 1150 },
  { day: "Tue", listeners: 1340 },
  { day: "Wed", listeners: 1560 },
  { day: "Thu", listeners: 1480 },
  { day: "Fri", listeners: 1890 },
  { day: "Sat", listeners: 2100 },
  { day: "Sun", listeners: 2300 },
];

export function ListenersChart() {
  const maxListeners = Math.max(...listenerData.map(d => d.listeners), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listener Analytics</CardTitle>
        <CardDescription>Peak concurrent listeners over the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80 bg-muted/50 rounded-md p-4 flex items-end justify-around gap-2">
          {listenerData.map((data) => {
            const barHeight = maxListeners > 0 ? (data.listeners / maxListeners) * 100 : 0;
            return (
              <div key={data.day} className="flex flex-col items-center h-full w-full">
                <div className="w-full h-full flex items-end">
                  <div
                    className="w-full bg-primary rounded-t-md hover:bg-primary/80 transition-colors"
                    style={{ height: `${barHeight}%` }}
                    title={`${data.listeners} listeners`}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground mt-2">{data.day}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
