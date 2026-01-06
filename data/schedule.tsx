// data/schedule.ts
import { Mic2 } from "lucide-react";

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  active: boolean;
  description?: string;
  speaker?: string;
  icon?: React.ReactNode;
}

export const weeklySchedule: ScheduleItem[] = [
  {
    id: 'monday-devotion',
    title: 'Morning Devotion',
    time: '06:00 AM',
    active: false,
    description: 'Start your day with prayer and devotion',
    speaker: 'Pastor John',
    icon: <Mic2 className="h-5 w-5" />
  },
  {
    id: 'gospel-hour',
    title: 'Gospel Hour',
    time: '10:00 AM',
    active: true,
    description: 'Inspiring gospel music and messages',
    speaker: 'Various Artists',
    icon: <Mic2 className="h-5 w-5" />
  },
  {
    id: 'evening-prayer',
    title: 'Evening Prayer',
    time: '06:00 PM',
    active: false,
    description: 'Evening prayer and reflection',
    speaker: 'Prayer Team',
    icon: <Mic2 className="h-5 w-5" />
  }
  // Add more schedule items as needed
];