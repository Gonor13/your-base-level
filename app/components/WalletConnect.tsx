'use client'

import { useState } from 'react'

export default function WalletConnect() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [level, setLevel] = useState<number | null>(null)

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        setAddress(accounts[0])
        setConnected(true)
      } catch (error) {
        console.error('Error connecting wallet:', error)
        alert('Error connecting wallet')
      }
    } else {
      alert('Please install MetaMask or Coinbase Wallet')
    }
  }

  const calculateLevel = () => {
    const calculatedLevel = Math.floor(Math.random() * 10) + 1
    setLevel(calculatedLevel)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!connected ? (
        <button
          onClick={connectWallet}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity mb-6"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="mb-6">
          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 py-3 px-4 rounded-lg mb-4">
            <p className="text-sm">Connected Wallet</p>
            <p className="font-mono text-lg">{address.slice(0, 6)}...{address.slice(-4)}</p>
          </div>
          
          <button
            onClick={calculateLevel}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity mb-6"
          >
            Calculate My Base Level
          </button>
        </div>
      )}

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
            {level >= 8 ? "?? Elite Base User" : 
             level >= 5 ? "? Active Contributor" : 
             "?? Growing in Base"}
          </p>
        </div>
      )}
    </div>
  )
}
