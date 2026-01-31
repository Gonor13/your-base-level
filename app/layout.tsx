'use client'

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Base Mini App */}
        <meta name="fc:miniapp" content="Your Base Level" />
        <meta name="base:app_id" content="697845b888e3bac59cf3dab8" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Your Base Level" />
        <meta property="og:description" content="Discover your status in the Base ecosystem" />
        <meta property="og:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta property="og:url" content="https://your-base-level.vercel.app" />
        <meta property="og:type" content="website" />
        
        {/* Farcaster Frame */}
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta name="fc:frame:button:1" content="Open App" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta name="fc:frame:button:1:target" content="https://your-base-level.vercel.app" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
