import './globals.css'

export const metadata = {
  title: 'Your Base Level',
  description: 'Discover your Base network level',
  openGraph: {
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem',
    url: 'https://your-base-level.vercel.app',
    images: [{ url: 'https://your-base-level.vercel.app/preview.png', width: 1200, height: 630 }]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="base:app_id" content="697845b888e3bac59cf3dab8" />
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://your-base-level.vercel.app/preview.png","button":{"title":"Open Base Level","action":{"type":"launch_miniapp","name":"Your Base Level","url":"https://your-base-level.vercel.app","splashImageUrl":"https://your-base-level.vercel.app/splash.png","splashBackgroundColor":"#0052FF"}}}' />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta name="fc:frame:button:1" content="Open App" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta name="fc:frame:button:1:target" content="https://your-base-level.vercel.app" />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  )
}