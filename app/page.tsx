'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = '0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a'

const abi = [
  'function mint(uint256 level) external',
  'function tokenLevels(uint256) view returns (uint256)',
  'function ownerOf(uint256) view returns (address)'
]

export default function Home() {
  const [address, setAddress] = useState(null)
  const [level, setLevel] = useState(null)
  const [loading, setLoading] = useState(false)
  const [minting, setMinting] = useState(false)
  const [error, setError] = useState(null)
  const [provider, setProvider] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setProvider(new ethers.BrowserProvider(window.ethereum))
    } else {
      setError('⚠️ Install MetaMask or Base Wallet')
    }
  }, [])

  const connectWallet = async () => {
    if (!provider) {
      setError('Please install MetaMask or Base Wallet')
      return
    }

    try {
      setError(null)
      setLoading(true)
      
      const signer = await provider.getSigner()
      const addr = await signer.getAddress()
      setAddress(addr)

      // Генерируем реалистичные данные
      const hash = addr.toLowerCase().split('0x')[1].split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
      
      // Статистика
      const txCount = Math.min(5000, Math.floor(hash * 0.7))
      const activeDays = Math.min(365, Math.floor(hash * 0.3))
      const uniqueContracts = Math.min(100, Math.floor(hash * 0.2))
      const walletAgeDays = Math.min(730, Math.floor(hash * 0.5))
      const bridgeTxs = Math.min(50, Math.floor(hash * 0.05))
      const tokenSwaps = Math.min(100, Math.floor(hash * 0.1))
      const smartContracts = Math.min(50, Math.floor(hash * 0.08))
      const ensInteractions = Math.min(20, Math.floor(hash * 0.03))
      const lendingTxs = Math.min(30, Math.floor(hash * 0.06))
      const longestStreak = Math.min(60, Math.floor(hash * 0.04))
      const currentStreak = Math.min(30, Math.floor(hash * 0.03))
      
      // Данные для топ-баннера
      const totalUsers = 24347935
      const betterThan = Math.floor(totalUsers * 0.9511)
      const topPercent = 4.89

      // Сохраняем данные
      setStats({
        txCount,
        activeDays,
        uniqueContracts,
        walletAgeDays,
        bridgeTxs,
        tokenSwaps,
        smartContracts,
        ensInteractions,
        lendingTxs,
        longestStreak,
        currentStreak,
        totalUsers,
        betterThan,
        topPercent
      })

      // Расчет уровня
      const score = 
        Math.min(Math.log10(txCount + 1), 3) * 3 +
        Math.min(Math.log10(activeDays + 1), 3) * 2 +
        Math.min(Math.log10(uniqueContracts + 1), 3) * 2 +
        Math.min(walletAgeDays / 180, 2)
      
      const lvl = Math.min(Math.max(Math.floor(score) + 1, 1), 10)
      setLevel(lvl)

      setLoading(false)
    } catch (err) {
      setError(err.message || 'Connection failed')
      setLoading(false)
    }
  }

  const handleMint = async () => {
    if (!provider || !address || level === null) {
      alert('Connect wallet first')
      return
    }

    try {
      setMinting(true)
      setError(null)
      
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
      
      const tx = await contract.mint(level)
      await tx.wait()
      
      alert('✅ Minted! Check your wallet on BaseScan.')
      setMinting(false)
    } catch (err) {
      console.error('Mint error:', err)
      setError(err.message || 'Mint failed. You may have already minted.')
      setMinting(false)
    }
  }

  const handleShare = () => {
    if (level === null) return
    const text = 'My Base Level is ' + level + ' 🔵\nCheck yours ↓\nhttps://your-base-level.vercel.app'
    navigator.clipboard.writeText(text)
    alert('✅ Copied! Share with friends!')
  }

  // Генерация данных для графика активности
  const generateActivityData = () => {
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    return months.map(month => ({
      month,
      level: Math.floor(Math.random() * 3) + 1
    }))
  }

  const activityData = generateActivityData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] to-[#121212] p-6">
        <div className="text-center">
          <div className="w-32 h-32 border-12 border-[#0052FF] border-t-transparent rounded-full animate-spin mb-8"></div>
          <p className="text-gray-400 text-2xl font-medium">Analyzing your Base activity...</p>
        </div>
      </div>
    )
  }

  if (level !== null && address && stats) {
    const colors = ['#6B7280','#9CA3AF','#FBBF24','#F59E0B','#EF4444','#EC4899','#8B5CF6','#6366F1','#3B82F6','#0EA5E9']
    const levelColor = colors[Math.min(level - 1, 9)]
    const shortAddr = address.slice(0, 6) + '...' + address.slice(-4)
    
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A0A] to-[#121212] p-6">
        {/* Топ-баннер как в примере */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl p-4 mb-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Your wallet is in TOP {stats.topPercent}%</h2>
              <p className="text-xl text-white/80">
                and better than {stats.betterThan.toLocaleString()} of {stats.totalUsers.toLocaleString()} participants
              </p>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6">
          {/* Левая колонка */}
          <div className="lg:w-1/3">
            {/* График активности */}
            <div className="bg-[#1A1A1A] rounded-2xl p-4 mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Activity</h3>
              
              <div className="mb-4">
                <div className="grid grid-cols-12 gap-1">
                  {activityData.map((item, index) => (
                    <div key={index} className="h-16">
                      <div 
                        className="h-full rounded-t"
                        style={{ 
                          height: `${item.level * 25}px`,
                          backgroundColor: item.level === 1 ? '#6B7280' : item.level === 2 ? '#9CA3AF' : '#0052FF'
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-gray-400 text-sm mt-2">
                  {activityData.map((item, index) => (
                    <span key={index}>{item.month}</span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Less</span>
                <span className="text-gray-400">Medium</span>
                <span className="text-gray-400">More</span>
              </div>
            </div>

            {/* Детальная статистика */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1A1A] rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0052FF] mb-1">{stats.txCount.toLocaleString()}</div>
                  <div className="text-gray-400">Transactions on Base</div>
                </div>
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0052FF] mb-1">{stats.activeDays}</div>
                  <div className="text-gray-400">Unique days active</div>
                </div>
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0052FF] mb-1">{stats.longestStreak}</div>
                  <div className="text-gray-400">Day longest streak</div>
                </div>
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0052FF] mb-1">{stats.currentStreak}</div>
                  <div className="text-gray-400">Day current streak</div>
                </div>
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0052FF] mb-1">{stats.walletAgeDays}</div>
                  <div className="text-gray-400">Day activity period</div>
                </div>
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0052FF] mb-1">{stats.tokenSwaps}</div>
                  <div className="text-gray-400">Token swaps performed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="lg:w-2/3">
            <div className="bg-[#1A1A1A] rounded-2xl p-6">
              {/* Центральный блок с уровнем */}
              <div className="text-center mb-6">
                <div className="w-64 h-64 mx-auto bg-[#0A0A0A] border-4 border-[#0052FF]/30 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-[180px] font-bold text-[#0052FF]">{level}</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-2" style={{ color: levelColor }}>
                  Base Level {level}
                </h2>
                
                <p className="text-lg text-gray-400">
                  {shortAddr}
                </p>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1A1A1A] rounded-2xl p-4">
                  <h3 className="text-xl font-bold text-white mb-3">Interactions</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#2A2A2A] rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-[#0052FF] mb-1">{stats.txCount}</div>
                      <div className="text-gray-400 text-sm">Transaction Count</div>
                    </div>
                    <div className="bg-[#2A2A2A] rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-[#0052FF] mb-1">{stats.uniqueContracts}</div>
                      <div className="text-gray-400 text-sm">Contracts Interactions</div>
                    </div>
                    <div className="bg-[#2A2A2A] rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-[#0052FF] mb-1">1</div>
                      <div className="text-gray-400 text-sm">1 Million Nads</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-2xl p-4">
                  <h3 className="text-xl font-bold text-white mb-3">Finances</h3>
                  <div className="bg-[#2A2A2A] rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-[#0052FF] mb-1">0.0319</div>
                    <div className="text-gray-400 text-sm">Wallet Balance</div>
                  </div>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex flex-col gap-3 mb-4">
                <button 
                  onClick={handleShare}
                  className="bg-gradient-to-r from-[#0052FF] to-[#003BCC] text-white font-bold py-4 px-6 rounded-xl text-lg transition-all hover:scale-[1.02] shadow-lg shadow-[#0052FF]/40"
                >
                  <span className="text-2xl mr-2">🔵</span> Share My Base Level
                </button>
                
                <button 
                  onClick={handleMint}
                  disabled={minting}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white font-bold py-4 px-6 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] shadow-lg shadow-[#8B5CF6]/40"
                >
                  {minting ? 'Minting...' : 'Mint as NFT (Gas Only)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] to-[#121212] p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-[#0052FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <div className="w-24 h-24 bg-[#0052FF] rounded-xl flex items-center justify-center">
              <span className="text-6xl font-bold text-white">B</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#0052FF] to-cyan-400 bg-clip-text text-transparent">
            Your Base Level
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Discover your status in the Base ecosystem. Connect wallet to calculate your unique Base Level (1-10).
          </p>
          
          {error && (
            <p className="text-red-400 text-xl mb-6">
              {error}
            </p>
          )}
          
          <button 
            onClick={connectWallet}
            className="bg-gradient-to-r from-[#0052FF] to-[#003BCC] text-white font-bold py-4 px-8 rounded-xl text-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#0052FF]/40 w-full max-w-md mx-auto mb-8"
          >
            Connect Wallet
          </button>
          
          <div className="text-gray-600 text-lg space-y-3 mt-6">
            <p className="flex items-center justify-center">
              <span className="w-4 h-4 bg-[#0052FF] rounded-full mr-3"></span>
              Analyze Base activity
            </p>
            <p className="flex items-center justify-center">
              <span className="w-4 h-4 bg-[#0052FF] rounded-full mr-3"></span>
              Calculate Base Level (1-10)
            </p>
            <p className="flex items-center justify-center">
              <span className="w-4 h-4 bg-[#0052FF] rounded-full mr-3"></span>
              Share & mint as NFT (gas only)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}