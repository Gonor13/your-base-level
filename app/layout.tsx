import './globals.css'

export const metadata = {
  title: 'Your Base Level',
  description: 'Discover your Base network level',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-base-level.vercel.app',
    siteName: 'Your Base Level',
    images: [
      {
        url: 'https://your-base-level.vercel.app/preview.png',
        width: 1200,
        height: 630,
        alt: 'Your Base Level',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem',
    images: ['https://your-base-level.vercel.app/preview.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Base App ID */}
        <meta name="base:app_id" content="697845b888e3bac59cf3dab8" />
        
        {/* Farcaster Frame - vNext format (REQUIRED) */}
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta name="fc:frame:button:1" content="Open App" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta name="fc:frame:button:1:target" content="https://your-base-level.vercel.app" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Your Base Level" />
        <meta property="og:description" content="Discover your status in the Base ecosystem" />
        <meta property="og:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta property="og:url" content="https://your-base-level.vercel.app" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Base Level" />
        <meta name="twitter:description" content="Discover your status in the Base ecosystem" />
        <meta name="twitter:image" content="https://your-base-level.vercel.app/preview.png" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  )
}