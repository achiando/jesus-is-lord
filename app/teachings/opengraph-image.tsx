
import { generateOgImage } from '@/components/shared/OgImage';

export const runtime = 'edge';
export const alt = 'Teachings Library | Jesus Is Lord Radio';
export const contentType = 'image/png';

// This file generates the OG image for the Teachings page.
export default async function Image() {
  return generateOgImage('Teachings Library');
}
