import { AnnouncementCarousel } from "./_components/AnnouncementCarousel";
import { HomePageClient } from "./_components/HomePageClient";
import { ImageGallery } from "./_components/ImageGallery";
import { ListeningFromForm } from "./_components/ListeningFromForm";
import { Mission } from "@/components/shared/Mission"; // Import the Mission component

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