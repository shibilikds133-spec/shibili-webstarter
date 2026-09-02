import type { Metadata } from 'next';

type SeoOptions = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const DEFAULT_TITLE = 'shibili-webstarter';
const DEFAULT_DESC = 'A production-ready Next.js + TypeScript + Tailwind starter template.';
const DEFAULT_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function buildMetadata(opts: SeoOptions = {}): Metadata {
  const title = opts.title ? `${opts.title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const description = opts.description ?? DEFAULT_DESC;
  const url = opts.url ?? DEFAULT_URL;
  const image = opts.image ?? `${url}/og-default.png`;

  return {
    title,
    description,
    metadataBase: new URL(url),
    openGraph: {
      title,
      description,
      url,
      siteName: DEFAULT_TITLE,
      images: [{ url: image, width: 1200, height: 630 }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

export function generateEventJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Fest OS 2026',
    startDate: '2026-10-15T18:00',
    endDate: '2026-10-17T23:00',
    location: {
      '@type': 'Place',
      name: 'Fest Venue',
      address: 'City, Country'
    },
    image: [`${DEFAULT_URL}/og-default.png`],
    description: 'Join us at Fest OS 2026 - the ultimate web starter festival.',
  };
}
