"use client"

import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EventCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  eventsCount?: number;
}

export const EventCalendar: React.FC<EventCalendarProps> = ({ selectedDate, onSelectDate, eventsCount = 0 }) => {
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          initialFocus
          className="rounded-md border"
        />
        {selectedDate && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">
              {format(selectedDate, "EEEE, MMM d")}
            </p>
            {eventsCount > 0 ? (
              <span className="text-sm text-muted-foreground">
                {eventsCount} Event{eventsCount > 1 ? 's' : ''}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">No events</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
