"use client";

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clapperboard, Mic, Newspaper } from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import { YouTubeVideo, SpotifyEpisode, WordPressPost } from "@/app/actions/data-fetchers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Props for the main component
interface TeachingsContentProps {
  videos: YouTubeVideo[];
  episodes: SpotifyEpisode[];
  articles: WordPressPost[];
  years: string[];
}

// Props for the reusable filter controls
interface FilterControlsProps {
  year: string;
  onYearChange: (year: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  years: string[];
}

// A reusable component for the filter controls to avoid duplicating JSX
const FilterControls: React.FC<FilterControlsProps> = ({ year, onYearChange, searchTerm, onSearchChange, years }) => (
  <div className="flex flex-col sm:flex-row gap-2 mb-6">
    <Input 
      placeholder="Search in this category..." 
      className="flex-grow"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <Select value={year} onValueChange={onYearChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="All Years" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Years</SelectItem>
        {(years || []).map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
);

// --- Card Components (re-included for completeness) ---
const VideoCard = ({ video }: { video: YouTubeVideo }) => (
  <Link href={`/teachings/video/${video.videoId}`}>
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0"><div className="aspect-video relative"><Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover"/></div></CardHeader>
      <CardContent className="flex-grow p-4"><CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle><CardDescription className="mt-2 text-sm line-clamp-3">{video.description}</CardDescription></CardContent>
    </Card>
  </Link>
);
const EpisodeCard = ({ episode }: { episode: SpotifyEpisode }) => (
  <Link href={`/teachings/audio/${episode.id}`}>
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0"><div className="aspect-square relative"><Image src={episode.thumbnailUrl} alt={episode.title} fill className="object-cover"/></div></CardHeader>
      <CardContent className="flex-grow p-4"><CardTitle className="text-lg line-clamp-2">{episode.title}</CardTitle></CardContent>
    </Card>
  </Link>
);


export function TeachingsContent({ videos, episodes, articles, years }: TeachingsContentProps) {
    // State for Video filters
    const [videoYear, setVideoYear] = useState('');
    const [videoSearch, setVideoSearch] = useState('');

    // State for Audio filters
    const [audioYear, setAudioYear] = useState('');
    const [audioSearch, setAudioSearch] = useState('');

    // State for Article filters
    const [articleYear, setArticleYear] = useState('');
    const [articleSearch, setArticleSearch] = useState('');

    const filterItems = (items: any[], year: string, searchTerm: string, dateKey: string, titleKey: string, descKey: string) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return items.filter(item => {
            const yearMatch = !year || year === 'all' || item[dateKey]?.startsWith(year);
            const searchMatch = !searchTerm || 
              item[titleKey]?.toLowerCase().includes(lowercasedSearchTerm) ||
              item[descKey]?.toLowerCase().includes(lowercasedSearchTerm);
            return yearMatch && searchMatch;
        });
    };

    const filteredVideos = useMemo(() => filterItems(videos, videoYear, videoSearch, 'publishedAt', 'title', 'description'), [videos, videoYear, videoSearch]);
    const filteredEpisodes = useMemo(() => filterItems(episodes, audioYear, audioSearch, 'releaseDate', 'title', 'description'), [episodes, audioYear, audioSearch]);
    const filteredArticles = useMemo(() => filterItems(articles, articleYear, articleSearch, 'date', 'title', 'excerpt'), [articles, articleYear, articleSearch]);

    return (
        <Tabs defaultValue="video" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14">
                <TabsTrigger value="video" className="text-base"><Clapperboard className="mr-2 h-5 w-5" />Video ({filteredVideos.length})</TabsTrigger>
                <TabsTrigger value="audio" className="text-base"><Mic className="mr-2 h-5 w-5" />Audio ({filteredEpisodes.length})</TabsTrigger>
                <TabsTrigger value="articles" className="text-base"><Newspaper className="mr-2 h-5 w-5" />Articles ({filteredArticles.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="video">
                <FilterControls year={videoYear} onYearChange={setVideoYear} searchTerm={videoSearch} onSearchChange={setVideoSearch} years={years} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.length > 0 ? filteredVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    )) : <p>No videos match your criteria.</p>}
                </div>
            </TabsContent>

            <TabsContent value="audio">
                <FilterControls year={audioYear} onYearChange={setAudioYear} searchTerm={audioSearch} onSearchChange={setAudioSearch} years={years} />
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredEpisodes.length > 0 ? filteredEpisodes.map((episode) => (
                        <EpisodeCard key={episode.id} episode={episode} />
                    )) : <p>No audio matches your criteria.</p>}
                </div>
            </TabsContent>

            <TabsContent value="articles">
                <FilterControls year={articleYear} onYearChange={setArticleYear} searchTerm={articleSearch} onSearchChange={setArticleSearch} years={years} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.length > 0 ? filteredArticles.map((doc) => (
                        <DocumentCard key={doc.id} title={doc.title} description={doc.excerpt} link={`/teachings/article/${doc.id}`} type="web-link" />
                    )) : <p>No articles match your criteria.</p>}
                </div>
            </TabsContent>
        </Tabs>
    );
}