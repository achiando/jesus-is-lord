export interface Event {
  id: string;
  title: string;
  church: string;
  time: string; // e.g., "05:00 AM - 07:00 AM"
  date: string; // e.g., "2026-01-06"
  type: "Prayer" | "Youth" | "Service" | "Other";
  region: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Morning Glory Prayer",
    church: "Nakuru Main Altar",
    time: "05:00 AM - 07:00 AM",
    date: "2026-01-07", // Today
    type: "Prayer",
    region: "Rift Valley",
  },
  {
    id: "2",
    title: "Mid-Week Service",
    church: "Nairobi Headquarters",
    time: "05:00 PM - 08:00 PM",
    date: "2026-01-07", // Today
    type: "Service",
    region: "Nairobi",
  },
  {
    id: "3",
    title: "National Youth Conference",
    church: "Nakuru Menengai Ground",
    time: "08:00 AM - 05:00 PM",
    date: "2026-01-10",
    type: "Youth",
    region: "National",
  },
  {
    id: "4",
    title: "Healing & Deliverance Service",
    church: "Kisumu Central Altar",
    time: "02:00 PM - 06:00 PM",
    date: "2026-01-11",
    type: "Service",
    region: "Nyanza",
  },
  {
    id: "5",
    title: "All Night Vigil",
    church: "Mombasa Altar",
    time: "09:00 PM - 04:00 AM",
    date: "2026-01-16",
    type: "Prayer",
    region: "Coast",
  },
];