export interface DailyProgram {
  id: string;
  title: string;
  displayTime: string; // "05:00 AM"
  startTime: string; // "05:00" (24-hour format)
  endTime: string; // "07:00" (24-hour format)
  days: number[]; // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  speaker?: string;
}

export const dailyPrograms: DailyProgram[] = [
  {
    id: 'nightly-prayers',
    displayTime: "12:00 AM",
    title: "Nightly Prayers & Psalms",
    startTime: "00:00",
    endTime: "05:00",
    days: [0, 1, 2, 3, 4, 5, 6],
    speaker: "Audio Bible",
  },
  {
    id: 'morning-glory',
    displayTime: "05:00 AM",
    title: "Morning Glory Prayer",
    startTime: "05:00",
    endTime: "07:00",
    days: [1, 2, 3, 4, 5], // Mon-Fri
    speaker: "Prayer Team",
  },
  {
    id: 'gospel-mix',
    displayTime: "07:00 AM",
    title: "Gospel Music Mix",
    startTime: "07:00",
    endTime: "09:00",
    days: [0, 1, 2, 3, 4, 5, 6],
    speaker: "Various Artists",
  },
  {
    id: 'highway-of-holiness',
    displayTime: "09:00 AM",
    title: "The Highway of Holiness",
    startTime: "09:00",
    endTime: "11:00",
    days: [1, 2, 3, 4, 5, 6], // Mon-Sat
    speaker: "Pastor John",
  },
  {
    id: 'sermon-rebroadcast',
    displayTime: "11:00 AM",
    title: "Sermon Rebroadcast",
    startTime: "11:00",
    endTime: "12:00",
    days: [0, 1, 2, 3, 4, 5, 6],
    speaker: "Archive",
  },
  {
    id: 'lunch-hour',
    displayTime: "12:00 PM",
    title: "Lunch Hour Service",
    startTime: "12:00",
    endTime: "14:00",
    days: [1, 2, 3, 4, 5], // Mon-Fri
    speaker: "Bishop David",
  },
  {
    id: 'instrumental-worship',
    displayTime: "02:00 PM",
    title: "Instrumental Worship",
    startTime: "14:00",
    endTime: "15:00",
    days: [0, 1, 2, 3, 4, 5, 6],
    speaker: "Various Artists",
  },
  {
    id: 'voices-of-prophets',
    displayTime: "03:00 PM",
    title: "Voices of the Prophets",
    startTime: "15:00",
    endTime: "16:00",
    days: [0, 6], // Sun, Sat
    speaker: "Guest Speaker",
  },
  {
    id: 'afternoon-drive',
    displayTime: "04:00 PM",
    title: "Afternoon Drive Gospel Hits",
    startTime: "16:00",
    endTime: "20:00",
    days: [0, 1, 2, 3, 4, 5, 6],
    speaker: "Various Artists",
  },
  {
    id: 'evening-worship',
    displayTime: "08:00 PM",
    title: "Evening Word & Worship",
    startTime: "20:00",
    endTime: "21:00",
    days: [0, 1, 2, 3, 4, 5, 6], // Daily
    speaker: "Worship Team",
  },
  {
    id: 'worship-uninterrupted',
    displayTime: "09:00 PM",
    title: "Worship Uninterrupted",
    startTime: "21:00",
    endTime: "24:00",
    days: [0, 1, 2, 3, 4, 5, 6],
    speaker: "Various Artists",
  },
].sort((a, b) => a.startTime.localeCompare(b.startTime));