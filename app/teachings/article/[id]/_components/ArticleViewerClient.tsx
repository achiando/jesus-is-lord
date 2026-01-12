"use client";

import { WordPressPost } from "@/app/actions/data-fetchers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ArticleViewerClientProps {
  article: WordPressPost;
}

export function ArticleViewerClient({ article }: ArticleViewerClientProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{article.title}</CardTitle>
        <CardDescription>Published: {new Date(article.date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dangerously set inner HTML for the excerpt, as it comes from WordPress */}
        <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
        <Button asChild>
          <Link href={article.link} target="_blank" rel="noopener noreferrer">
            Read Full Article
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
