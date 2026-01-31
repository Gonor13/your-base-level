'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const levelNames = ['Beginner','Explorer','Rising','Active','Established','Veteran','Elite','Master','Legend','OG']
const levelColors = ['#9E9E9E','#4CAF50','#2196F3','#3F51B5','#9C27B0','#FF5722','#FF9800','#FFC107','#FFEB3B','#0052FF']

export default function Home() {
  const [connected, setConnected] = useState(false)
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
    const mockLevel = Math.floor(Math.random() * 10) + 1
    setLevel(mockLevel)
    setLevelName(levelNames[mockLevel - 1])
    setLevelColor(levelColors[mockLevel - 1])
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
    return React.createElement('div', { className: 'min-h-screen bg-black flex items-center justify-center' },
      React.createElement('button', {
        onClick: connectWallet,
        className: 'px-8 py-4 bg-[#0052FF] text-white rounded-lg font-bold text-lg hover:bg-[#0044cc]'
      }, 'Connect Wallet')
    )
  }

  if (level === 0) {
    return React.createElement('div', { className: 'min-h-screen bg-black flex items-center justify-center text-white text-2xl' },
      'Loading...'
    )
  }

  return React.createElement('div', { className: 'min-h-screen bg-black flex items-center justify-center p-4' },
    React.createElement('div', { className: 'w-full max-w-md bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center' },
      React.createElement('h1', { 
        className: 'text-4xl font-bold mb-2',
        style: { color: levelColor }
      }, level),
      React.createElement('p', { className: 'text-lg text-gray-400 mb-1' }, levelName),
      React.createElement('p', { className: 'text-sm text-gray-500 mb-6' }, address),
      
      React.createElement('div', { className: 'space-y-3' },
        React.createElement('button', {
          onClick: handleShare,
          className: 'w-full py-2 bg-[#0052FF] text-white rounded font-medium'
        }, 'Share Level'),
        
        React.createElement('button', {
          onClick: handleMint,
          disabled: hasMinted,
          className: hasMinted 
            ? 'w-full py-2 bg-gray-700 text-gray-400 rounded cursor-not-allowed'
            : 'w-full py-2 bg-white text-black rounded font-medium hover:bg-gray-200'
        }, hasMinted ? 'Minted' : 'Mint NFT')
      ),
      
      React.createElement('div', { className: 'mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500' },
        'Gas fees only'
      )
    )
  )
}