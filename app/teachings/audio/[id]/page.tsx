import type { SpotifyEpisode } from '@/app/actions/data-fetchers';
import spotifyData from '@/data/spotify-cache.json';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudioPlayerClient } from './_components/AudioPlayerClient'; // Will create this next

const typedSpotifyData: { episodes: SpotifyEpisode[] } = spotifyData;

interface AudioPageProps {
  params: { id: string };
}

// Dynamic Metadata (Phase 3) - Placeholder for now
export async function generateMetadata({ params }: AudioPageProps): Promise<Metadata> {
  const param = await params;
  const episode = typedSpotifyData.episodes.find(e => e.id === param.id);
  if (!episode) {
    return {};
  }
  return {
    title: episode.title,
    description: episode.description.substring(0, 150) + '...',
    openGraph: {
      title: episode.title,
      description: episode.description.substring(0, 150) + '...',
      images: [episode.thumbnailUrl],
    },
  };
}

export default function AudioPage({ params }: AudioPageProps) {
    const episodes = typedSpotifyData.episodes;
  const episode = episodes.find(e => e.id === params.id);

  if (!episode) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <AudioPlayerClient episode={episode} />
    </div>
  );
}
