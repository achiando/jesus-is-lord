"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { articles, audioTeachings, videoTeachings } from "@/data/teachings";
import { Search } from "lucide-react";
import { useState } from "react";
import { SpotifyEpisodeEmbed } from "./SpotifyEpisodeEmbed";
import type { TeachingCardProps } from "./TeachingCard";
import { TeachingCard } from "./TeachingCard";
import { YouTubePlaylistEmbed } from "./YouTubePlaylistEmbed";

const filteredTeachings = (teachings: TeachingCardProps[], searchQuery: string) => {
    if (!searchQuery) return teachings;

    const query = searchQuery.toLowerCase();
    return teachings.filter((teaching: TeachingCardProps) =>
        teaching.title.toLowerCase().includes(query) ||
        (teaching.speaker && teaching.speaker.toLowerCase().includes(query)) ||
        (teaching.series && teaching.series.toLowerCase().includes(query)) ||
        teaching.description.toLowerCase().includes(query)
    );
};

export function TeachingsContent() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-serif font-bold text-primary">Teachings Library</h1>

            </div>

            <div className="mb-8 max-w-2xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title, speaker, or keyword..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Tabs defaultValue="audio" className="w-full">
                    <TabsList className="flex w-full mb-8 h-12 overflow-x-auto">
                        <TabsTrigger value="audio" className="text-base">
                            Audio
                        </TabsTrigger>
                        <TabsTrigger value="video" className="text-base">
                            Video
                        </TabsTrigger>
                        <TabsTrigger value="articles" className="text-base">
                            Articles
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="audio">
                        <div className="mb-8">
                            <h3 className="text-xl font-serif font-bold mb-4">Featured Episode</h3>
                            <SpotifyEpisodeEmbed playlistId="1xD1LP2bWQx2KPBktwZlsf" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTeachings(audioTeachings, searchQuery).map((teaching, i) => (
                                <TeachingCard key={i} {...teaching} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="video" className="space-y-8">
                        <div className="mb-8">
                            <YouTubePlaylistEmbed
                                playlistId="PLYOUR_PLAYLIST_ID_HERE"
                                title="Featured Video Teachings"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-serif font-bold mb-6">More Video Teachings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTeachings(videoTeachings, searchQuery).map((teaching, i) => (
                                    <TeachingCard key={i} {...teaching} />
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="articles">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTeachings(articles, searchQuery).map((article, i) => (
                                <TeachingCard key={i} {...article} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
                <div className="mt-8 text-center">
                    <Button variant="outline">Load More</Button>
                </div>
            </div>
        </>
    );
}
