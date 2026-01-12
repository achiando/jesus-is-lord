import { AnnouncementCarousel } from "./_components/AnnouncementCarousel";
import { HomePageClient } from "./_components/HomePageClient";
import { ImageGallery } from "./_components/ImageGallery";
import { ListeningFromForm } from "./_components/ListeningFromForm";
import { Mission } from "@/components/shared/Mission"; // Import the Mission component
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Jesus Is Lord Radio',
  description: 'Welcome to Jesus Is Lord Radio. Spreading the Gospel of Jesus Christ through live broadcasts, teachings, events, and community.',
  openGraph: {
    title: 'Jesus Is Lord Radio - Spreading the Gospel',
    description: 'Welcome to Jesus Is Lord Radio. Spreading the Gospel of Jesus Christ through live broadcasts, teachings, events, and community.',
    url: '/',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomePageClient />
      <AnnouncementCarousel />
      <Mission />
      <ImageGallery />
      <ListeningFromForm />
    </div>
  );
}