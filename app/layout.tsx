import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Barima Rentals | Construction Equipment Rentals',
  description:
    'Barima Rentals provides scaffolds, concrete mixers and plate compactors for contractors, builders and homeowners in Georgetown and East Coast Demerara, Guyana.',

  openGraph: {
    title: 'Barima Rentals',
    description:
      'Reliable construction equipment including scaffolds, concrete mixers and plate compactors.',
    url: 'https://barima-rentals-site.vercel.app',
    siteName: 'Barima Rentals',
    images: [
      {
        url: 'https://barima-rentals-site.vercel.app/images/hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Barima Rentals Equipment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
