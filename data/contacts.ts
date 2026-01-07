export interface Location {
  name: string;
  address: string;
  phone: string;
}

export interface FeedbackContact {
  email: string;
  purpose: string;
}

export const locations: Location[] = [
  {
    name: 'Nairobi Headquarters',
    address: 'Runda, Nairobi, Kenya',
    phone: '+254 712 345 678',
  },
  {
    name: 'Nakuru Main Altar',
    address: 'Menengai Ground, Nakuru, Kenya',
    phone: '+254 723 456 789',
  },
];

export const feedbackContacts: FeedbackContact[] = [
  {
    email: 'feedback@jesusislordradio.info',
    purpose: 'General Feedback & Inquiries',
  },
  {
    email: 'prayers@jesusislordradio.info',
    purpose: 'Prayer Requests',
  },
];
