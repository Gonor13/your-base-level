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
  other: {
    'base:app_id': '697845b888e3bac59cf3dab8',
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
        {/* Base App ID - REQUIRED */}
        <meta name="base:app_id" content="697845b888e3bac59cf3dab8" />
        
        {/* Open Graph - for embeds */}
        <meta property="og:title" content="Your Base Level" />
        <meta property="og:description" content="Discover your status in the Base ecosystem" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-base-level.vercel.app" />
        <meta property="og:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Your Base Level" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Base Level" />
        <meta name="twitter:description" content="Discover your status in the Base ecosystem" />
        <meta name="twitter:image" content="https://your-base-level.vercel.app/preview.png" />
        
        {/* Farcaster Frame - REQUIRED format for embeds */}
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta name="fc:frame:button:1" content="Open App" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta name="fc:frame:button:1:target" content="https://your-base-level.vercel.app" />
        
        {/* Farcaster Mini App */}
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://your-base-level.vercel.app/preview.png","button":{"title":"Open Base Level","action":{"type":"launch_miniapp","name":"Your Base Level","url":"https://your-base-level.vercel.app","splashImageUrl":"https://your-base-level.vercel.app/splash.png","splashBackgroundColor":"#0052FF"}}}' />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/icon.png" />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  )
}