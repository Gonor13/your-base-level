"use client";

import { useState } from 'react';
import { analyzeWallet, formatNumber } from './utils/walletAnalyzer';
import { calculateLevel } from './utils/levelCalculator';

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [levelInfo, setLevelInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Подключение кошелька
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        const address = accounts[0];
        setWalletAddress(address);
        setIsConnected(true);
        
        // Анализируем кошелёк
        const walletStats = await analyzeWallet(address);
        setStats(walletStats);
        
        // Рассчитываем уровень
        const level = calculateLevel(walletStats);
        setLevelInfo(level);
        
        console.log("✅ Аналитика загружена:", walletStats);
        
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка подключения");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Установите MetaMask или Coinbase Wallet!");
    }
  };

  // Минт NFT
  const handleMint = async () => {
    if (!walletAddress) return;
    
    alert(`🎉 NFT будет заминчен для кошелька ${walletAddress.substring(0, 8)}...\nУровень: ${levelInfo?.level || "N/A"}\n\nИспользуй Base Mainnet и немного ETH для газа!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Base Level</h1>
          <p className="text-gray-600">Discover your status in the Base ecosystem</p>
        </div>

        {!isConnected ? (
          // Экран подключения
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">🔵</div>
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">Connect to see your Base network analytics and mint NFT</p>
            <button
              onClick={connectWallet}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Connecting..." : "Connect Wallet"}
            </button>
            <p className="text-sm text-gray-500 mt-4">MetaMask • Coinbase Wallet • Base Wallet</p>
          </div>
        ) : (
          // Основной контент
          <div className="space-y-6">
            {/* Баннер сверху */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Your Base Level: {levelInfo?.title || "Loading..."}</h2>
                  <p className="opacity-90">Protocol: Base • {stats?.address}</p>
                </div>
                <div className="mt-4 md:mt-0 text-center">
                  <div className="text-5xl font-bold">{levelInfo?.level || "0"}</div>
                  <p className="text-sm opacity-90">Level</p>
                </div>
              </div>
            </div>

            {/* Основная аналитика */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Левая колонка - Аналитика */}
              <div className="lg:col-span-2 space-y-6">
                {/* Рейтинг */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-4">📊 Wallet Analysis</h3>
                  
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-800">Your wallet is in TOP {stats?.rankPercent}%</p>
                        <p className="text-sm text-green-600">Better than {formatNumber(stats?.betterThan || 0)} of {formatNumber(stats?.totalParticipants || 0)} participants</p>
                      </div>
                      <div className="text-3xl">🏆</div>
                    </div>
                  </div>

                  {/* Активность */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-700 mb-3">Interactions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Transaction Count</p>
                        <p className="text-2xl font-bold">{formatNumber(stats?.transactionCount || 0)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Contracts Interactions</p>
                        <p className="text-2xl font-bold">{formatNumber(stats?.contractInteractions || 0)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Contracts Created</p>
                        <p className="text-2xl font-bold">{formatNumber(stats?.contractsCreated || 0)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Финансы */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-700 mb-3">Finances</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Wallet Balance</p>
                        <p className="text-2xl font-bold">{stats?.balance || "0.00"} ETH</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Volume</p>
                        <p className="text-2xl font-bold">{stats?.volume || "0.00"} ETH</p>
                      </div>
                    </div>
                  </div>

                  {/* Активность по времени */}
                  <div>
                    <h4 className="font-bold text-gray-700 mb-3">Activity</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Active Days</p>
                        <p className="text-2xl font-bold">{formatNumber(stats?.activeDays || 0)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Active Weeks</p>
                        <p className="text-2xl font-bold">{formatNumber(stats?.activeWeeks || 0)}</p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Start of use: {stats?.firstTxDate || "N/A"}</p>
                      <p>Last use: {stats?.lastTxDate || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Правая колонка - NFT и действия */}
              <div className="space-y-6">
                {/* NFT блок */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-4">🎨 Your Base Level NFT</h3>
                  
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gray-800">{levelInfo?.level || "0"}</div>
                      <p className="text-gray-600 mt-2">Level {levelInfo?.level || "0"}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Mint a unique NFT that represents your status in the Base ecosystem.
                    The NFT will include your wallet address, level, and analytics.
                  </p>
                  
                  <button
                    onClick={handleMint}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
                  >
                    Mint NFT
                  </button>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p>✓ Pay only gas fees</p>
                    <p>✓ One NFT per wallet</p>
                    <p>✓ Dynamic metadata</p>
                  </div>
                </div>

                {/* Информация о сети */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-4">🌐 Network Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network</span>
                      <span className="font-semibold">Base Mainnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chain ID</span>
                      <span className="font-semibold">8453</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RPC</span>
                      <span className="font-semibold">https://mainnet.base.org</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contract</span>
                      <span className="font-semibold">0xa61878...c11a</span>
                    </div>
                  </div>
                </div>

                {/* Действия */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-4">⚡ Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition">
                      📊 View on Basescan
                    </button>
                    <button className="w-full bg-purple-50 text-purple-700 py-2 rounded-lg hover:bg-purple-100 transition">
                      🔗 Share Result
                    </button>
                    <button className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition">
                      🔄 Refresh Data
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Подвал */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <p className="text-gray-600">
                🔵 This is a demonstration of Base network analytics. 
                For real-time data, connect an API key from <a href="https://basescan.org" className="text-blue-600 underline">BaseScan</a>.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Connected: {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 4)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
