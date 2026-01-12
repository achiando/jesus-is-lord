
import { generateOgImage } from '@/components/shared/OgImage';

export const runtime = 'edge';
export const alt = 'Upcoming Events | Jesus Is Lord Radio';
export const contentType = 'image/png';

// This file generates the OG image for the Events page.
export default async function Image() {
  return generateOgImage('Upcoming Events');
}
