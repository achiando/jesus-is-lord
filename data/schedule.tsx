// data/schedule.ts
import { Mic2 } from "lucide-react";

export interface ScheduleItem {
  id: string;
  title: string;
  time: string; // Display time, e.g., "06:00 AM"
  startTime: string; // Actual start time for comparison, e.g., "06:00 AM"
  endTime: string; // Actual end time for comparison, e.g., "07:00 AM"
  active: boolean;
  description?: string;
  speaker?: string;
  icon?: React.ReactNode;
  region?: string;
  placeName?: string;
  pastorBishop?: string;
  phoneNumber?: string;
}

export const weeklySchedule: ScheduleItem[] = [
  {
    id: 'monday-devotion',
    title: 'Morning Devotion',
    time: '06:00 AM',
    startTime: '06:00 AM',
    endTime: '07:00 AM',
    active: false,
    description: 'Start your day with prayer and devotion',
    speaker: 'Pastor John',
    icon: <Mic2 className="h-5 w-5" />,
    region: 'Nairobi',
    placeName: 'Main Altar',
    pastorBishop: 'Bishop David',
    phoneNumber: '+254712345678'
  },
  {
    id: 'gospel-hour',
    title: 'Gospel Hour',
    time: '10:00 AM',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    active: true,
    description: 'Inspiring gospel music and messages',
    speaker: 'Various Artists',
    icon: <Mic2 className="h-5 w-5" />,
    region: 'Rift Valley',
    placeName: 'Nakuru Branch',
    pastorBishop: 'Pastor Sarah',
    phoneNumber: '+254723456789'
  },
  {
    id: 'evening-prayer',
    title: 'Evening Prayer',
    time: '06:00 PM',
    startTime: '06:00 PM',
    endTime: '07:00 PM',
    active: false,
    description: 'Evening prayer and reflection',
    speaker: 'Prayer Team',
    icon: <Mic2 className="h-5 w-5" />,
    region: 'Coast',
    placeName: 'Mombasa Altar',
    pastorBishop: 'Pastor James',
    phoneNumber: '+254734567890'
  }
  // Add more schedule items as needed
];