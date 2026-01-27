import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import Web3ModalProvider from '@/context'
import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Base Level',
  description: 'Discover your status in the Base ecosystem. Mint your unique Base Level NFT.',
  
  openGraph: {
    title: 'Your Base Level',
    description: 'Discover your status in the Base ecosystem. Mint your unique Base Level NFT.',
    type: 'website',
    url: 'https://your-base-level.vercel.app',
    siteName: 'Your Base Level',
    images: [
      {
        url: 'https://your-base-level.vercel.app/og-image.png',
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
    images: ['https://your-base-level.vercel.app/og-image.png'],
  },
  
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://your-base-level.vercel.app/frame-image.png',
    'fc:frame:image:aspect_ratio': '1.91:1',
    'fc:frame:button:1': 'Check My Base Level',
    'fc:frame:button:1:action': 'post',
    'fc:frame:button:1:target': 'https://your-base-level.vercel.app/api/frame',
    'fc:frame:post_url': 'https://your-base-level.vercel.app/api/frame',
    
    'og:image:width': '1200',
    'og:image:height': '630',
    'theme-color': '#0052FF',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = headers()
  const initialState = cookieToInitialState(config, headersList.get('cookie'))

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Web3ModalProvider initialState={initialState}>
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
