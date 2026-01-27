import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Web3ModalProvider from '@/context'
import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Base Level',
  description: 'Discover your status in the Base ecosystem. Mint your unique Base Level NFT.',
  
  // Обязательные meta-теги для Base Mini App
  metadataBase: new URL('https://your-base-level.vercel.app'),
  
  openGraph: {
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem. Mint your unique Base Level NFT.',
    type: 'website',
    url: 'https://your-base-level.vercel.app',
    siteName: 'Your Base Level',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Your Base Level Preview',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem. Mint your unique Base Level NFT.',
    images: ['/og-image.png'],
    creator: '@base',
  },
  
  // Критически важные теги для Base Embed
  other: {
    // Farcaster Frame теги
    'fc:frame': 'vNext',
    'fc:frame:image': '/frame-image.png',
    'fc:frame:image:aspect_ratio': '1.91:1',
    'fc:frame:button:1': 'Check My Base Level',
    'fc:frame:button:1:action': 'post_redirect',
    'fc:frame:post_url': 'https://your-base-level.vercel.app/api/frame',
    
    // Base-specific теги
    'eth:chain': 'base',
    'eth:network': '8453',
    'eth:token': '0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a', // ваш контракт
    
    // Дополнительные OpenGraph
    'og:type': 'website',
    'og:url': 'https://your-base-level.vercel.app',
    'og:title': 'Your Base Level',
    'og:description': 'Discover your Base network status',
    'og:image': '/og-image.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:site': '@base',
    'twitter:title': 'Your Base Level',
    'twitter:description': 'Discover your Base network status',
    'twitter:image': '/og-image.png',
    
    // Мобильная настройка
    'mobile-web-app-capable': 'yes',
    'theme-color': '#0052FF',
    'background-color': '#000000',
  },
  
  // Дополнительные настройки
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Базовые meta-теги которые Next.js может не добавить автоматически */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Your Base Level" />
        <meta name="eth:chain" content="base" />
        <meta name="eth:network" content="8453" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Web3ModalProvider>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Header />
            <main className="py-8">{children}</main>
          </div>
          <Toaster position="bottom-right" />
        </Web3ModalProvider>
      </body>
    </html>
  )
}
