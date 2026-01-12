import youtubeData from '@/data/youtube-cache.json';

const typedYoutubeData: { videos: YouTubeVideo[] } = youtubeData;
import type { Metadata } from 'next';
import type { YouTubeVideo } from '@/app/actions/data-fetchers';
import { notFound } from 'next/navigation';
import { VideoPlayerClient } from './_components/VideoPlayerClient'; // Will create this next

interface VideoPageProps {
  params: { id: string };
}

// Dynamic Metadata (Phase 3) - Placeholder for now
export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const param = await params;
  const video = youtubeData.videos.find(v => v.videoId === param.id);
  if (!video) {
    return notFound();
  }
  return {
    title: video.title,
    description: video.description.substring(0, 150) + '...',
    openGraph: {
      title: video.title,
      description: video.description.substring(0, 150) + '...',
      images: [video.thumbnailUrl],
    },
  };
}

export default function VideoPage({ params }: VideoPageProps) {
    const videos = youtubeData.videos as YouTubeVideo[];
  const video = videos.find(v => v.videoId === params.id);

  if (!video) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <VideoPlayerClient video={video} />
    </div>
  );
}
