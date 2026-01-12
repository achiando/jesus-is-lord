import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Teachings Library | Jesus Is Lord Radio',
  description: 'Explore a rich collection of sermons, teachings, and articles from Jesus Is Lord Radio. Filter by year and search by title or description.',
  openGraph: {
    title: 'Teachings Library | Jesus Is Lord Radio',
    description: 'Explore a rich collection of sermons, teachings, and articles from Jesus Is Lord Radio. Filter by year and search by title or description.',
    url: '/teachings',
  },
};

export default function TeachingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
