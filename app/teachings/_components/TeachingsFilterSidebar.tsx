"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TeachingsFilterSidebarProps {
  // Props for filter values and handlers will go here
}

export const TeachingsFilterSidebar: React.FC<TeachingsFilterSidebarProps> = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="space-y-6 p-4 border-r border-gray-200 h-full">
      <h3 className="text-lg font-serif font-bold">Filter Teachings</h3>

      <div className="space-y-2">
        <Label htmlFor="speaker">Speaker</Label>
        <Select>
          <SelectTrigger id="speaker">
            <SelectValue placeholder="Select Speaker" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="john_doe">Pastor John Doe</SelectItem>
            <SelectItem value="sarah_adams">Dr. Sarah Adams</SelectItem>
            <SelectItem value="david_chen">Pastor David Chen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="series">Series</Label>
        <Select>
          <SelectTrigger id="series">
            <SelectValue placeholder="Select Series" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="living_by_word">Living by the Word</SelectItem>
            <SelectItem value="communion_god">Communion with God</SelectItem>
            <SelectItem value="foundations_faith">Foundations of Faith</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date-range">Date Range</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic-tags">Topic Tags</Label>
        <Input id="topic-tags" placeholder="e.g., healing, finance, family" />
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  );
};
