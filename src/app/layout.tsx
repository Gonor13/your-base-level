import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Base Level',
  description: 'Discover your Base network level',
  
  // Критически важные для Base Mini App
  other: {
    // Base chain tags - ОБЯЗАТЕЛЬНЫ
    'eth:chain': 'base',
    'eth:network': '8453',
    'base:app_id': '697845b888e3bac59cf3dab8',
    
    // Farcaster Frame
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://your-base-level.vercel.app/preview.png',
    'fc:frame:button:1': 'Open App',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://your-base-level.vercel.app',
    
    // OpenGraph
    'og:title': 'Your Base Level',
    'og:description': 'Discover your status in the Base ecosystem',
    'og:image': 'https://your-base-level.vercel.app/preview.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:url': 'https://your-base-level.vercel.app',
    'og:type': 'website',
    
    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Your Base Level',
    'twitter:description': 'Discover your status in the Base ecosystem',
    'twitter:image': 'https://your-base-level.vercel.app/preview.png',
    'twitter:image:width': '1200',
    'twitter:image:height': '630',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Явно добавляем самые важные теги которые Next.js может пропустить */}
        <meta name="eth:chain" content="base" />
        <meta name="eth:network" content="8453" />
        <meta name="base:app_id" content="697845b888e3bac59cf3dab8" />
      </head>
      <body className={`${inter.className} bg-black`}>
        {children}
      </body>
    </html>
  )
}
