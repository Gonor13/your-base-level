'use client'

import WalletConnect from './components/WalletConnect'
import { useAddress } from '@thirdweb-dev/react'
import { useState } from 'react'

export default function Home() {
  const address = useAddress()
  const [level, setLevel] = useState<number | null>(null)

  const calculateLevel = () => {
    // Simulate level calculation
    const calculatedLevel = Math.floor(Math.random() * 10) + 1
    setLevel(calculatedLevel)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Your Base Level
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          Discover your status in the Base ecosystem. Analyze activity, calculate level.
        </p>
        
        <div className="mb-8 flex justify-center">
          <WalletConnect />
        </div>

        {address ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Connected Wallet</p>
                <p className="font-mono text-lg">{address.slice(0, 6)}...{address.slice(-4)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Network</p>
                <p className="font-semibold text-green-500">Base</p>
              </div>
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

            <button
              onClick={calculateLevel}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity mb-6"
            >
              Calculate My Base Level
            </button>

            {level !== null && (
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl border-2 border-blue-300">
                <h2 className="text-2xl font-bold mb-2">Your Base Level</h2>
                <div className="text-6xl font-bold mb-4">{level}/10</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full" 
                    style={{ width: `${level * 10}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {level >= 8 ? "🏆 Elite Base User" : 
                   level >= 5 ? "⭐ Active Contributor" : 
                   "🌱 Growing in Base"}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🔑</div>
              <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Connect your wallet to discover your Base Level and see your on-chain activity analysis.
              </p>
              <p className="text-sm text-gray-500">
                Supported wallets: Coinbase Wallet, MetaMask, and more
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>This Mini App runs on the Base network and analyzes your on-chain activity.</p>
          <p className="mt-2">Share to see your frame on Farcaster!</p>
        </div>
      </div>
    </main>
  )
}
