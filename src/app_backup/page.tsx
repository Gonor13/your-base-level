'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function Home() {
  const [address, setAddress] = useState<string | null>(null)
  const [level, setLevel] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).ethereum) {
      setError('⚠️ Install MetaMask or Base Wallet extension')
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      setError('Please install MetaMask or Base Wallet')
      return
    }

    try {
      setError(null)
      setLoading(true)
      
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      const signer = await provider.getSigner()
      const addr = await signer.getAddress()
      setAddress(addr)

      // Mock calculation (in prod: fetch real Base activity)
      const hash = addr.toLowerCase().split('0x')[1].split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
      const score = (hash % 1000) / 100
      const lvl = Math.min(Math.max(Math.floor(score) + 1, 1), 10)
      setLevel(lvl)

      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Connection failed')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 border-4 border-[#0052FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Analyzing your Base activity...</p>
      </div>
    )
  }

  if (level !== null && address) {
    const colors = ['#6B7280','#9CA3AF','#FBBF24','#F59E0B','#EF4444','#EC4899','#8B5CF6','#6366F1','#3B82F6','#0EA5E9']
    const levelColor = colors[Math.min(level - 1, 9)]
    const shortAddr = `${address.slice(0, 6)}...${address.slice(-4)}`
    
    return (
      <div className="max-w-md mx-auto bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#0052FF]/30">
        <div className="h-48 bg-gradient-to-br from-[#0052FF]/10 to-transparent relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[100px] font-bold text-[#0052FF]">
            B
          </div>
        </div>
        <div className="p-6 text-center">
          <div className="inline-block px-8 py-3 rounded-2xl mb-4" style={{ background: `linear-gradient(135deg, ${levelColor}30, ${levelColor}10)`, border: `2px solid ${levelColor}40` }}>
            <span className="text-7xl font-bold" style={{ color: levelColor }}>{level}</span>
          </div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: levelColor }}>Base Level {level}</h2>
          <p className="text-gray-400 mb-6">{shortAddr}</p>
          <button 
            onClick={() => {
              const text = `My Base Level is ${level} 🔵\nCheck yours ↓\nhttps://your-base-level.vercel.app`
              navigator.clipboard.writeText(text)
              alert('✅ Copied! Paste anywhere to share.')
            }}
            className="w-full bg-[#0052FF] hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-[#0052FF]/30 text-lg"
          >
            Share My Base Level
          </button>
          <button 
            onClick={() => alert('Minting (gas only) coming soon!')}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
          >
            Mint as NFT (Gas Only)
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center max-w-md mx-auto p-6">
      <div className="w-24 h-24 bg-[#0052FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <div className="w-16 h-16 bg-[#0052FF] rounded-xl flex items-center justify-center">
          <span className="text-4xl font-bold text-white">B</span>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#0052FF] to-cyan-400 bg-clip-text text-transparent">
        Your Base Level
      </h1>
      <p className="text-gray-400 mb-8 max-w-sm mx-auto">
        Discover your status in the Base ecosystem. Connect wallet to calculate your unique Base Level (1-10).
      </p>
      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
      <button 
        onClick={connectWallet}
        className="w-full bg-[#0052FF] hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-[#0052FF]/50 text-lg"
      >
        Connect Wallet
      </button>
      <div className="mt-10 text-sm text-gray-600 space-y-2">
        <p>✓ Analyze Base activity</p>
        <p>✓ Calculate Base Level (1-10)</p>
        <p>✓ Share & mint as NFT</p>
      </div>
    </div>
  )
}