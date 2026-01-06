import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search } from "lucide-react"
import { Suspense } from "react"
import { SpotifyEpisodeEmbed } from "./_components/SpotifyEpisodeEmbed"
import type { TeachingCardProps } from "./_components/TeachingCard"; // Import TeachingCardProps interface
import { TeachingCard } from "./_components/TeachingCard"; // Import TeachingCard component
import { TeachingsFilterSidebar } from "./_components/TeachingsFilterSidebar"; // Import the sidebar
import { YouTubePlaylistEmbed } from "./_components/YouTubePlaylistEmbed"

// Placeholder data for teachings
const audioTeachings: TeachingCardProps[] = [
  {
    type: "audio",
    title: "Walking in Divine Purpose",
    speaker: "Senior Pastor John Doe",
    series: "Foundations of Faith",
    duration: "45:20",
    description: "Discover how to align your daily walk with God's eternal plan for your life and ministry.",
    thumbnail: "/images/teaching-cover-1.jpg", // Placeholder
    link: "#",
    downloadLink: "#",
  },
  {
    type: "audio",
    title: "The Power of Forgiveness",
    speaker: "Dr. Sarah Adams",
    series: "Living by Grace",
    duration: "30:15",
    description: "Learn about the liberating power of forgiveness and how it transforms your life.",
    thumbnail: "/images/teaching-cover-2.jpg", // Placeholder
    link: "#",
    downloadLink: "#",
  },
  {
    type: "audio",
    title: "Faith in Action",
    speaker: "Pastor David Chen",
    series: "Practical Christianity",
    duration: "55:00",
    description: "Understand how to put your faith into action and see God's promises manifest.",
    thumbnail: "/images/spotify-cover-1.jpg", // Placeholder for Spotify
    link: "#",
    spotifyLink: "https://open.spotify.com/show/2U0AsCwsoPnNwtDMQ8j775", // Example Spotify link
    spotifyEmbedUrl: "https://open.spotify.com/embed/show/2U0AsCwsoPnNwtDMQ8j775", // Spotify embed URL
  },
];

const videoTeachings: TeachingCardProps[] = [
  {
    type: "video",
    title: "Understanding the Holy Spirit",
    speaker: "Bishop Michael",
    series: "Divine Encounters",
    duration: "60:00",
    description: "A deep dive into the person and work of the Holy Spirit in a believer's life.",
    thumbnail: "/images/video-cover-1.jpg", // Placeholder
    link: "#",
  },
  {
    type: "video",
    title: "The Kingdom of God",
    speaker: "Evangelist Grace",
    series: "Gospel Truths",
    duration: "40:00",
    description: "Explore the principles and realities of God's kingdom and how to live in it.",
    thumbnail: "/images/video-cover-2.jpg", // Placeholder
    link: "#",
  },
];

const articles: TeachingCardProps[] = [
  {
    type: "article",
    title: "The Importance of Daily Devotion",
    date: "Jan 15, 2024",
    description: "Discover why a consistent daily devotion time is crucial for spiritual growth and intimacy with God.",
    thumbnail: "/images/article-cover-1.jpg", // Placeholder
    link: "#",
    downloadLink: "#",
  },
  {
    type: "article",
    title: "Navigating Life's Challenges with Faith",
    date: "Dec 20, 2023",
    description: "Practical steps and biblical principles to overcome adversity and maintain your faith.",
    thumbnail: "/images/article-cover-2.jpg", // Placeholder
    link: "#",
    downloadLink: "#",
  },
];


export default function TeachingsPage() {
  return (
    <div className="container py-8 md:py-12">
      <Suspense fallback={null}>
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-serif font-bold text-primary">Teachings Library</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our collection of spiritual teachings, available for streaming and download to support your
            spiritual journey.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title, speaker, or keyword..." className="pl-10" />
          </div>
          <Button variant="outline" className="md:w-auto bg-transparent">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <TeachingsFilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Tabs defaultValue="audio" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-8 h-12">
                <TabsTrigger value="audio" className="text-base">
                  Audio Teachings
                </TabsTrigger>
                <TabsTrigger value="video" className="text-base">
                  Video Teachings
                </TabsTrigger>
                <TabsTrigger value="articles" className="text-base">
                  Articles
                </TabsTrigger>
              </TabsList>

              <TabsContent value="audio">
                {/* Standalone Spotify Episode Embed Example */}
                <div className="mb-8">
                  <h3 className="text-xl font-serif font-bold mb-4">Featured Episode</h3>
                  <SpotifyEpisodeEmbed playlistId="1xD1LP2bWQx2KPBktwZlsf" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {audioTeachings.map((teaching, i) => (
                    <TeachingCard key={i} {...teaching} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-8">
                {/* YouTube Playlist Embed */}
                <div className="mb-8">
                  <YouTubePlaylistEmbed 
                    playlistId="PLYOUR_PLAYLIST_ID_HERE"
                    title="Featured Video Teachings"
                  />
                </div>
                
                {/* Individual Video Cards */}
                <div>
                  <h3 className="text-xl font-serif font-bold mb-6">More Video Teachings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videoTeachings.map((teaching, i) => (
                      <TeachingCard key={i} {...teaching} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="articles">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, i) => (
                    <TeachingCard key={i} {...article} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-8 text-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}
