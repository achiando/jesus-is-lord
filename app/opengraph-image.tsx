
import { generateOgImage } from '@/components/shared/OgImage';

export const runtime = 'edge';
export const alt = 'Jesus Is Lord Radio';
export const contentType = 'image/png';

// This file generates the OG image for the Home page.
export default async function Image() {
  return generateOgImage('Spreading the Gospel of Jesus Christ');
}
