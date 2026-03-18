import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'SWAROOP | Best Music Artist in Gadag',
  description: 'Experience the best music in Gadag. An eco-conscious music artist blending pop culture, live concerts, and environmental advocacy (air, water, soil, and sustainable living).',
  keywords: [
    'best music artist in gadag',
    'best music in gadag',
    'pop culture concerts gadag',
    'environmental music artist',
    'eco-friendly business music',
    'sustainable living diet and music',
    'air water soil conservation music',
    'live music gadag'
  ],
  openGraph: {
    title: 'SWAROOP | Best Music Artist in Gadag',
    description: 'Experience the best music in Gadag. An eco-conscious music artist blending pop culture, live concerts, and environmental advocacy.',
    url: 'https://swaroopmusic.com',
    siteName: 'Swaroop',
    images: [
      {
        url: 'https://swaroopmusic.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Swaroop in Gadag',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="antialiased bg-brand-dark text-brand-light">
        <div className="noise-bg"></div>
        {children}
      </body>
    </html>
  );
}
