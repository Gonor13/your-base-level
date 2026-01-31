'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'

const contractAddress = '0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a'

const levelNames = [
  'Beginner',
  'Explorer',
  'Rising',
  'Active',
  'Established',
  'Veteran',
  'Elite',
  'Master',
  'Legend',
  'OG'
]

const levelColors = [
  '#9E9E9E', // Gray
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#3F51B5', // Indigo
  '#9C27B0', // Purple
  '#FF5722', // Orange
  '#FF9800', // Amber
  '#FFC107', // Yellow
  '#FFEB3B', // Lime
  '#0052FF'  // Base Blue
]

interface UserData {
  address: string
  level: number
  name: string
  color: string
}

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [hasMinted, setHasMinted] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.listAccounts()
      if (accounts.length > 0) {
        setConnected(true)
        const address = accounts[0].address
        calculateLevel(address)
      }
    }
  }

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      checkConnection()
    } catch (error) {
      console.error('Connection error:', error)
    }
  }

  const calculateLevel = async (address: string) => {
    setLoading(true)
    
    // Mock data for demo
    const mockLevel = Math.floor(Math.random() * 10) + 1
    
    setUserData({
      address: address.slice(0, 6) + '...' + address.slice(-4),
      level: mockLevel,
      name: levelNames[mockLevel - 1],
      color: levelColors[mockLevel - 1]
    })
    
    setLoading(false)
  }

  const handleMint = async () => {
    if (!userData) return
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        contractAddress,
        ['function mint() public'],
        signer
      )
      
      const tx = await contract.mint()
      await tx.wait()
      setHasMinted(true)
      alert('NFT minted successfully!')
    } catch (error) {
      console.error('Mint error:', error)
      alert('Mint failed. Check console for details.')
    }
  }

  const handleShare = () => {
    if (!userData) return
    
    const shareText = My Base Level is  🔵\nCheck yours ↓\nhttps://your-base-level.vercel.app
    
    if (navigator.share) {
      navigator.share({ 
        title: 'Base Level', 
        text: shareText 
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Link copied to clipboard!')
    }
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={connectWallet}
          className="px-8 py-4 bg-[#0052FF] text-white rounded-lg font-bold text-lg"
        >
          Connect Wallet
        </motion.button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Analyzing...</div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">No data found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{ color: userData.color }}>
            {userData.level}
          </h1>
          <p className="text-xl text-gray-400 mb-4">{userData.name}</p>
          <p className="text-sm text-gray-500">{userData.address}</p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="w-full py-3 bg-[#0052FF] text-white rounded-lg font-semibold hover:bg-[#0044cc] transition"
          >
            Share my Base Level
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMint}
            disabled={hasMinted}
            className={w-full py-3 rounded-lg font-semibold }
          >
            {hasMinted ? '✅ Already Minted' : 'Mint as NFT'}
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>Pay only gas fees</p>
        </div>
      </motion.div>
    </div>
  )
}
