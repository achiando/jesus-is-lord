"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalytics } from "@/lib/context/AnalyticsContext";
import { useMemo } from "react";

export function RegionDistributionChart() {
  const { submissions } = useAnalytics();

  const regionData = useMemo(() => {
    const counts = submissions.reduce((acc, { region }) => {
      const normalizedRegion = region.trim();
      acc[normalizedRegion] = (acc[normalizedRegion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [submissions]);

  const maxCount = Math.max(...regionData.map(d => d.count), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listener Distribution by Region</CardTitle>
        <CardDescription>
          A breakdown of where your listeners are tuning in from based on {submissions.length} submissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground">
            No location data submitted yet.
          </div>
        ) : (
          <div className="space-y-4">
            {regionData.map((data) => {
              const barWidth = maxCount > 0 ? (data.count / maxCount) * 100 : 0;
              return (
                <div key={data.name} className="grid grid-cols-4 items-center gap-4 text-sm">
                  <div className="font-medium truncate col-span-1">{data.name}</div>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-4">
                      <div
                        className="bg-primary h-4 rounded-full"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <div className="font-bold w-10 text-right">{data.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
