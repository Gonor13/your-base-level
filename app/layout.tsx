import './globals.css'

export const metadata = {
  title: 'Your Base Level',
  description: 'Discover your status in the Base ecosystem',
  openGraph: {
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem',
    images: ['https://your-base-level.vercel.app/preview.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="fc:miniapp" content="Your Base Level" />
        <meta name="base:app_id" content="697845b888e3bac59cf3dab8" />
        <meta property="og:title" content="Your Base Level" />
        <meta property="og:description" content="Discover your status in the Base ecosystem" />
        <meta property="og:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta property="og:url" content="https://your-base-level.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://your-base-level.vercel.app/preview.png" />
        <meta name="fc:frame:button:1" content="Open App" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta name="fc:frame:button:1:target" content="https://your-base-level.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  )
}