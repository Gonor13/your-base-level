import './globals.css'

export const metadata = {
  title: 'Your Base Level',
  description: 'Discover your Base network level',
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
      </head>
      <body>{children}</body>
    </html>
  )
}