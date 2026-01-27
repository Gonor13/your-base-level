import './globals.css'

export const metadata = {
  title: 'Your Base Level',
  description: 'Discover your Base network level',
  openGraph: {
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem',
    url: 'https://your-base-level.vercel.app',
    siteName: 'Your Base Level',
    images: [
      {
        url: 'https://your-base-level.vercel.app/preview.png',
        width: 1200,
        height: 630,
        alt: 'Your Base Level',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
    <html lang="en">
      <head>
        <meta name="base:app_id" content="697845b888e3bac59cf3dab8" />
        <meta name="base-mini-app" content="true" />
        <meta name="base-mini-app-title" content="Your Base Level" />
        <meta name="base-mini-app-description" content="What's your Base Level?" />
        <meta name="base-mini-app-color" content="#0052FF" />
        <link rel="icon" href="/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}