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
        
        {/* Farcaster Mini App */}
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://your-base-level.vercel.app/preview.png","button":{"title":"Open Base Level","action":{"type":"launch_miniapp","name":"Your Base Level","url":"https://your-base-level.vercel.app","splashImageUrl":"https://your-base-level.vercel.app/preview.png","splashBackgroundColor":"#0052FF"}}}' />
        
        {/* Farcaster Frame */}
        <meta name="fc:frame" content='{"version":"1","imageUrl":"https://your-base-level.vercel.app/preview.png","button":{"title":"Open Base Level","action":{"type":"launch_miniapp","name":"Your Base Level","url":"https://your-base-level.vercel.app","splashImageUrl":"https://your-base-level.vercel.app/preview.png","splashBackgroundColor":"#0052FF"}}}' />
        
        {/* Base Mini App */}
        <meta name="base-mini-app" content="true" />
        <meta name="base-mini-app-title" content="Your Base Level" />
        <meta name="base-mini-app-description" content="What's your Base Level?" />
        <meta name="base-mini-app-color" content="#0052FF" />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  )
}