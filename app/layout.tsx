import './globals.css'

export const metadata = {
  title: 'Your Base Level',
  description: 'Discover your Base network level',
  openGraph: {
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem',
    url: 'https://your-base-level.vercel.app',
    images: [{
      url: 'https://your-base-level.vercel.app/preview.png',
      width: 1200,
      height: 630
    }]
  }
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
        
        {/* ОБЯЗАТЕЛЬНЫЕ МЕТАТЕГИ ДЛЯ BASE EMBEDS */}
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