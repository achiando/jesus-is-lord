import { ListenClient } from "./_components/ListenClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listen Live | Jesus Is Lord Radio',
  description: 'Tune in to Jesus Is Lord Radio live. Experience inspiring broadcasts, teachings, and worship music 24/7.',
  openGraph: {
    title: 'Listen Live | Jesus Is Lord Radio',
    description: 'Tune in to Jesus Is Lord Radio live. Experience inspiring broadcasts, teachings, and worship music 24/7.',
    url: '/listen',
  },
};

export default function ListenPage() {
  return <ListenClient />;
}

