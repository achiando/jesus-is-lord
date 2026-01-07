"use client"

import { RadioPlayer } from "@/components/Player/RadioPlayer"
import { useRouter } from "next/navigation"
import { UpcomingPrograms } from "./UpcomingPrograms"
import { RecentTeachings } from "./RecentTeachings"
import { UpcomingEvents } from "./UpcomingEvents"
import { AnnouncementCarousel } from "./AnnouncementCarousel"
import { Mission } from "@/components/shared/Mission"
import { ImageGallery } from "./ImageGallery"
import { ListeningFromForm } from "./ListeningFromForm"

export function HomePageClient() {
  const router = useRouter()
  
  return (
    <div className="flex flex-col gap-12 py-8 md:py-12">
      {/* Main Content Area */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <RadioPlayer variant="home-featured" onNavigateToFull={() => router.push('/listen')} />
            <UpcomingPrograms />
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-10">
            <RecentTeachings />
            <UpcomingEvents />
          </aside>
        </div>
      </div>

      {/* Other full-width sections */}
      <AnnouncementCarousel />
      <Mission />
      <ImageGallery />
      <ListeningFromForm />
    </div>
  )
}