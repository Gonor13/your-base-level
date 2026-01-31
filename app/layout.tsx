import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Base Level',
  description: 'Discover your status in the Base ecosystem',
  openGraph: {
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/og-image.png',
    'fc:frame:button:1': 'Check My Level',
    'fc:frame:post_url': '/api/frame',
  },
}

// Импортируем полифиллы на стороне клиента
if (typeof window !== 'undefined') {
  require('../polyfills');
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/og-image.png" />
        <meta property="fc:frame:button:1" content="Check My Level" />
        <meta property="fc:frame:post_url" content="/api/frame" />
        <meta property="og:title" content="Your Base Level" />
        <meta property="og:description" content="Discover your status in the Base ecosystem" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
