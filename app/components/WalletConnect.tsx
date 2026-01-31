'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export interface LevelInfo {
  level: number
  name: string
  color: string
}

interface WalletConnectProps {
  onConnect: (address: string, levelInfo: LevelInfo) => void
}

const levelNames = ['Beginner', 'Explorer', 'Rising', 'Active', 'Established', 'Veteran', 'Elite', 'Master', 'Legend', 'OG']
const levelColors = ['#9E9E9E', '#4CAF50', '#2196F3', '#3F51B5', '#9C27B0', '#FF5722', '#FF9800', '#FFC107', '#FFEB3B', '#0052FF']

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)

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
    
    // Mock calculation
    const mockLevel = Math.floor(Math.random() * 10) + 1
    
    onConnect(address, {
      level: mockLevel,
      name: levelNames[mockLevel - 1],
      color: levelColors[mockLevel - 1]
    })
    
    setLoading(false)
  }

  if (connected) {
    return null
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <button
        onClick={connectWallet}
        disabled={loading}
        className="px-8 py-4 bg-[#0052FF] text-white rounded-lg font-bold text-lg hover:bg-[#0044cc] transition disabled:opacity-50"
      >
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  )
}