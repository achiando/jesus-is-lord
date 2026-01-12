
"use client";

import { updateTeachingsCache } from '@/app/actions/update-teachings';
import { TeachingsContent } from '@/app/teachings/_components/TeachingsContent';
import { getUniqueYears } from '@/app/teachings/page';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import spotifyData from '@/data/spotify-cache.json';
import wordpressData from '@/data/wordpress-cache.json';
import youtubeData from '@/data/youtube-cache.json';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Suspense, useState } from 'react';
import { useFormStatus } from 'react-dom';

// Defines the structure for the result message
interface SyncResult {
  success: boolean;
  message: string;
}

// A helper component to manage the button's pending state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Syncing...' : 'Sync All Teachings'}
    </Button>
  );
}

export default function AdminTeachingsPage() {
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
   const uniqueYears = getUniqueYears(
    youtubeData.videos, 
    spotifyData.episodes, 
    wordpressData.articles
  );

  const handleSync = async () => {
    // Reset previous result
    setSyncResult(null);
    
    const result = await updateTeachingsCache();
    setSyncResult(result);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Teachings Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Sync Content</CardTitle>
          <CardDescription>
            Click the button below to fetch the latest videos from YouTube and audio from Spotify.
            The new content will be saved and displayed on the public "Teachings" page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSync} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <SubmitButton />
          </form>

          {syncResult && (
            <Alert className={`mt-6 ${syncResult.success ? 'border-green-500' : 'border-red-500'}`}>
              {syncResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertTitle className={syncResult.success ? 'text-green-700' : 'text-red-700'}>
                {syncResult.success ? 'Success' : 'Error'}
              </AlertTitle>
              <AlertDescription>
                {syncResult.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
          <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-serif font-bold text-primary">Teachings Library</h1>
        <p className="text-lg text-muted-foreground">Explore a rich collection of sermons, teachings, and articles.</p>
      </div>
      <Suspense fallback={<div className="text-center">Loading Teachings...</div>}>
        <TeachingsContent 
          videos={youtubeData.videos}
          episodes={spotifyData.episodes}
          articles={wordpressData.articles}
          years={uniqueYears}
        />
      </Suspense>
    </div>
    </div>
  );
}
