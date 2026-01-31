'use client'

import WalletConnect from './components/WalletConnect'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Your Base Level
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          Discover your status in the Base ecosystem. Analyze activity, calculate level.
        </p>
        
        <div className="mb-8">
          <WalletConnect />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Transactions</h3>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-gray-500">On Base network</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">NFTs Held</h3>
            <p className="text-3xl font-bold">7</p>
            <p className="text-sm text-gray-500">Base NFTs</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Days Active</h3>
            <p className="text-3xl font-bold">89</p>
            <p className="text-sm text-gray-500">Since first transaction</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">??</div>
            <h2 className="text-2xl font-bold mb-4">Base Mini App Ready</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This app is optimized for Base network and ready for Mini App integration.
              Connect your wallet to discover your Base Level.
            </p>
            <p className="text-sm text-gray-500">
              Share this page to see your frame on Farcaster!
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>This Mini App runs on the Base network and analyzes your on-chain activity.</p>
          <p className="mt-2">Frame Valid: Ready for Farcaster integration</p>
        </div>
      </div>
    </main>
  )
}
