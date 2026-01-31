'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const levelNames = ['Beginner', 'Explorer', 'Rising', 'Active', 'Established', 'Veteran', 'Elite', 'Master', 'Legend', 'OG']
const levelColors = ['#9E9E9E', '#4CAF50', '#2196F3', '#3F51B5', '#9C27B0', '#FF5722', '#FF9800', '#FFC107', '#FFEB3B', '#0052FF']

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [level, setLevel] = useState(0)
  const [levelName, setLevelName] = useState('')
  const [levelColor, setLevelColor] = useState('')
  const [address, setAddress] = useState('')
  const [hasMinted, setHasMinted] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setConnected(true)
          const addr = accounts[0].address
          setAddress(addr.slice(0, 6) + '...' + addr.slice(-4))
          calculateLevel()
        }
      } catch (error) {
        console.error('Check connection error:', error)
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

  const calculateLevel = () => {
    setLoading(true)
    const mockLevel = Math.floor(Math.random() * 10) + 1
    setLevel(mockLevel)
    setLevelName(levelNames[mockLevel - 1])
    setLevelColor(levelColors[mockLevel - 1])
    setLoading(false)
  }

  const handleMint = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract('0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a', ['function mint() public'], signer)
      const tx = await contract.mint()
      await tx.wait()
      setHasMinted(true)
      alert('NFT minted successfully!')
    } catch (error) {
      console.error('Mint error:', error)
      alert('Mint failed!')
    }
  }

  const handleShare = () => {
    const shareText = 'My Base Level is ' + level + '\nCheck yours\nhttps://your-base-level.vercel.app'
    if (navigator.share) {
      navigator.share({ title: 'Base Level', text: shareText })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Link copied!')
    }
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <button onClick={connectWallet} className="px-8 py-4 bg-[#0052FF] text-white rounded-lg font-bold text-lg hover:bg-[#0044cc]">
          Connect Wallet
        </button>
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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{ color: levelColor }}>
            {level}
          </h1>
          <p className="text-xl text-gray-400 mb-4">{levelName}</p>
          <p className="text-sm text-gray-500">{address}</p>
        </div>

        <div className="space-y-4">
          <button onClick={handleShare} className="w-full py-3 bg-[#0052FF] text-white rounded-lg font-semibold hover:bg-[#0044cc]">
            Share my Base Level
          </button>

          <button onClick={handleMint} disabled={hasMinted} className={'w-full py-3 rounded-lg font-semibold ' + (hasMinted ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200')}>
            {hasMinted ? 'Already Minted' : 'Mint as NFT'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>Pay only gas fees</p>
        </div>
      </div>
    </div>
  )
}