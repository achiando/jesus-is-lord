"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { audioPlaylists, videoPlaylists, documents } from "@/data/teachings";
import { Search } from "lucide-react";
import { useState } from "react";
import { SpotifyEpisodeEmbed } from "./SpotifyEpisodeEmbed";
import { YouTubePlaylistEmbed } from "./YouTubePlaylistEmbed";
import { DocumentCard } from "./DocumentCard";

export function TeachingsContent() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-serif font-bold text-primary">Teachings Library</h1>
                <p className="text-lg text-muted-foreground">Explore a rich collection of sermons, teachings, and articles.</p>
            </div>

            <div className="mb-8 max-w-2xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search articles and documents..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Tabs defaultValue="audio" className="w-full">
                    <TabsList className="flex w-full mb-8 h-12 overflow-x-auto">
                        <TabsTrigger value="audio" className="text-base">Audio</TabsTrigger>
                        <TabsTrigger value="video" className="text-base">Video</TabsTrigger>
                        <TabsTrigger value="articles" className="text-base">Articles & Docs</TabsTrigger>
                    </TabsList>

                    <TabsContent value="audio" className="space-y-12">
                        {audioPlaylists.map(playlist => (
                            <div key={playlist.playlistId}>
                                <h3 className="text-2xl font-serif font-bold mb-2">{playlist.title}</h3>
                                <p className="text-muted-foreground mb-4">{playlist.description}</p>
                                <SpotifyEpisodeEmbed playlistId={playlist.playlistId} />
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="video" className="space-y-12">
                        {videoPlaylists.map(playlist => (
                            <div key={playlist.playlistId}>
                                <YouTubePlaylistEmbed
                                    playlistId={playlist.playlistId}
                                    title={playlist.title}
                                />
                                <p className="text-muted-foreground mt-4">{playlist.description}</p>
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="articles">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDocuments.map((doc, i) => (
                                <DocumentCard key={i} {...doc} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
