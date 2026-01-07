import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
  title: string;
  description: string;
  link: string;
  type: 'pdf' | 'google-doc' | 'web-link';
}

const typeInfo = {
  pdf: { icon: <FileText className="h-5 w-5" />, label: 'Read PDF' },
  'google-doc': { icon: <FileText className="h-5 w-5" />, label: 'Open Document' },
  'web-link': { icon: <LinkIcon className="h-5 w-5" />, label: 'Open Link' },
};

export const DocumentCard: React.FC<DocumentCardProps> = ({ title, description, link, type }) => {
  const { icon, label } = typeInfo[type];

  return (
    <Card className="flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            {React.cloneElement(icon, { className: "mr-2 h-4 w-4" })}
            {label}
          </Link>
        </Button>
      </div>
    </Card>
  );
};
