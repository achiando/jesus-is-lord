import { Mic2 } from "lucide-react";

export interface EventItem {
  id: string;
  title: string;
  church: string;
  time: string; // e.g., "05:00 AM - 07:00 AM"
  date: string; // e.g., "2026-01-06" (YYYY-MM-DD)
  type: "Prayer" | "Service" | "Conference" | "Youth" | "Vigil";
  region: string;
  isLive?: boolean; // For live events
  description?: string;
  location?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  expectedAttendance?: string;
  requirements?: string;
  startTime?: string; // e.g., "05:00 AM"
  endTime?: string; // e.g., "07:00 AM"
}

export const events: EventItem[] = [
  {
    id: "1",
    title: "Morning Glory Prayer",
    church: "Nakuru Main Altar",
    time: "05:00 AM - 07:00 AM",
    date: "2026-01-06", // Today
    type: "Prayer",
    region: "Rift Valley",
    isLive: true,
    description:
      "Start your day with powerful intercessory prayer and worship. Join us every morning as we seek God's face and lay our burdens before Him. Experience the refreshing presence of the Holy Spirit.",
    location: "Jesus Is Lord Radio Main Altar, Nakuru Town, Rift Valley Region",
    contactPerson: "Pastor James Mwangi",
    phone: "+254 712 345 678",
    email: "nakuru@jiradio.org",
    expectedAttendance: "50-100 people",
    requirements: "Come with an open heart and spirit of prayer",
    startTime: "05:00 AM",
    endTime: "07:00 AM",
  },
  {
    id: "2",
    title: "Mid-Week Service",
    church: "Nairobi Headquarters",
    time: "05:00 PM - 08:00 PM",
    date: "2026-01-07", // Tomorrow
    type: "Service",
    region: "Nairobi",
    isLive: false,
    description:
      "Join us for a powerful mid-week service featuring worship, testimonies, and the preached Word of God. This is a time to refresh your spirit and be strengthened for the rest of the week.",
    location: "Jesus Is Lord Radio HQ, Ngong Road, Nairobi",
    contactPerson: "Pastor Ruth Wanjiru",
    phone: "+254 720 123 456",
    email: "nairobi@jiradio.org",
    expectedAttendance: "200-300 people",
    requirements: "No special requirements, all are welcome",
    startTime: "05:00 PM",
    endTime: "08:00 PM",
  },
  {
    id: "3",
    title: "National Youth Conference",
    church: "Nakuru Menengai Ground",
    time: "08:00 AM - 05:00 PM",
    date: "2026-01-10",
    type: "Conference",
    region: "National",
    isLive: false,
    description:
      "A three-day national youth conference featuring renowned speakers, worship sessions, workshops, and fellowship. Theme: 'Arise and Shine - The Youth of This Generation.' Registration is required.",
    location: "Menengai Grounds, Nakuru, Rift Valley",
    contactPerson: "Rev. David Kimani",
    phone: "+254 735 987 654",
    email: "youth@jiradio.org",
    expectedAttendance: "1000+ youth",
    requirements: "Registration fee: KSH 500, valid ID required",
    startTime: "08:00 AM",
    endTime: "05:00 PM",
  },
  {
    id: "4",
    title: "Healing & Deliverance Service",
    church: "Kisumu Central Altar",
    time: "02:00 PM - 06:00 PM",
    date: "2026-01-11",
    type: "Service",
    region: "Nyanza",
    isLive: false,
    description:
      "A special service dedicated to healing, deliverance, and restoration. Come with your faith and expect miracles as we pray for the sick and minister deliverance to the oppressed.",
    location: "Kisumu Central Altar, Kondele Area, Kisumu",
    contactPerson: "Pastor Grace Atieno",
    phone: "+254 745 678 901",
    email: "kisumu@jiradio.org",
    expectedAttendance: "150-200 people",
    requirements: "Bring your faith and prayer requests",
    startTime: "02:00 PM",
    endTime: "06:00 PM",
  },
  {
    id: "5",
    title: "All Night Vigil",
    church: "Mombasa Altar",
    time: "09:00 PM - 04:00 AM",
    date: "2026-01-16",
    type: "Vigil",
    region: "Coast",
    isLive: false,
    description:
      "An all-night prayer vigil with worship, intercession, and spiritual warfare. We will pray for our nation, families, and personal breakthroughs. Refreshments will be provided.",
    location: "Jesus Is Lord Radio Mombasa Altar, Nyali Area, Mombasa",
    contactPerson: "Pastor John Omondi",
    phone: "+254 758 234 567",
    email: "mombasa@jiradio.org",
    expectedAttendance: "80-120 people",
    requirements: "Bring warm clothing and Bible",
    startTime: "09:00 PM",
    endTime: "04:00 AM",
  },
];