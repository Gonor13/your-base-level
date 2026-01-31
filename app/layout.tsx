import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Base Level - Real Base Network Analysis',
  description: 'Discover your real status in the Base ecosystem. Analyze your on-chain activity and mint your unique Base Level NFT.',
  openGraph: {
    title: 'Your Base Level',
    description: 'Real Base network analysis & NFT minting',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Base Level',
    description: 'Real Base network analysis & NFT minting',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/og-image.png',
    'fc:frame:button:1': 'Check My Base Level',
    'fc:frame:post_url': '/api/frame',
  },
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
        <meta property="fc:frame:button:1" content="Check My Base Level" />
        <meta property="fc:frame:post_url" content="/api/frame" />
        <meta property="og:title" content="Your Base Level" />
        <meta property="og:description" content="Real Base network analysis & NFT minting" />
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
