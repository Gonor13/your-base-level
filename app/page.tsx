"use client";

import { useState, useEffect } from 'react';
import { analyzeWallet } from './utils/walletAnalyzer';
import { calculateLevel, getWalletLevel } from './utils/levelCalculator';

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [levelInfo, setLevelInfo] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
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
        
        console.log("✅ Кошелёк проанализирован:", walletStats);
        
      } catch (error) {
        console.error("❌ Ошибка подключения:", error);
        alert("Ошибка подключения кошелька");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Установите MetaMask или Coinbase Wallet!");
    }
  };

  // Функция минта NFT (заглушка)
  const handleMint = async () => {
    if (!walletAddress) return;
    
    alert("Функция минта будет доступна после добавления mintService.ts");
    console.log("Minting NFT for:", walletAddress);
    
    // Здесь будет вызов контракта
    // const result = await mintNFT(walletAddress, levelInfo.level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Your Base Level</h1>
        <p className="text-center text-gray-600 mb-8">
          Discover your status in the Base ecosystem
        </p>

        {!isConnected ? (
          <div className="text-center">
            <button
              onClick={connectWallet}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Подключаем..." : "Connect Wallet"}
            </button>
            <p className="mt-4 text-gray-500">
              Connect to see your Base level and mint NFT
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Информация о кошельке */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold">Wallet Connected</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Connected
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                  </span>
                </div>
              </div>
              
              {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Balance</p>
                    <p className="text-lg font-bold">{stats.balance} ETH</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Transactions</p>
                    <p className="text-lg font-bold">{stats.transactionCount}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Activity Score</p>
                    <p className="text-lg font-bold">{stats.activityScore}/100</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Estimated Level</p>
                    <p className="text-lg font-bold">{stats.level}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Уровень */}
            {levelInfo && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">{levelInfo.level}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{levelInfo.title}</h3>
                <p className="mb-4 opacity-90">{levelInfo.description}</p>
                <div className="flex justify-center gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full">{levelInfo.icon}</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full">Level {levelInfo.level}</span>
                </div>
              </div>
            )}

            {/* Кнопка минта */}
            <div className="text-center">
              <button
                onClick={handleMint}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-bold text-lg hover:opacity-90 transition"
              >
                Mint Your Base Level NFT
              </button>
              <p className="text-gray-500 text-sm mt-2">
                Pay only gas fees · One NFT per wallet
              </p>
              <p className="text-gray-400 text-xs mt-1">
                (Mint service will be added in the next update)
              </p>
            </div>

            {/* Демо-информация */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
              <p className="font-medium mb-2">📊 Это демо-версия с тестовыми данными:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Баланс и транзакции - демо-данные</li>
                <li>Для реальной аналитики нужен API ключ Basescan</li>
                <li>Mint функция будет добавлена в mintService.ts</li>
                <li>Контракт: 0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
