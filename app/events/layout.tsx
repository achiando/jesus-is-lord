import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Events & Schedule | Jesus Is Lord Radio',
  description: 'Stay updated with all upcoming services, programs, and special events from Jesus Is Lord Radio across all regions.',
  openGraph: {
    title: 'Upcoming Events | Jesus Is Lord Radio',
    description: 'Stay updated with all upcoming services, programs, and special events from Jesus Is Lord Radio across all regions.',
    url: '/events',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
