import wordpressData from '@/data/wordpress-cache.json';
import type { Metadata } from 'next';
import type { WordPressPost } from '@/app/actions/data-fetchers';
import { notFound } from 'next/navigation';
import { ArticleViewerClient } from './_components/ArticleViewerClient'; // Will create this next

interface ArticlePageProps {
  params: { id: string };
}

// Dynamic Metadata (Phase 3) - Placeholder for now
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const param = await params;
  const article = wordpressData.articles.find(a => a.id === parseInt(param.id));
  if (!article) {
    return {};
  }
  return {
    title: article.title,
    description: article.excerpt.substring(0, 150) + '...',
    openGraph: {
      title: article.title,
      description: article.excerpt.substring(0, 150) + '...',
      images: [article.featuredImageUrl || ''], // Use featured image if available
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = wordpressData.articles.find(a => a.id === parseInt(params.id));

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ArticleViewerClient article={article} />
    </div>
  );
}
