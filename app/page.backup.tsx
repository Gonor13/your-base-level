"use client";

import { useState, useEffect } from 'react';
import { analyzeWallet } from './utils/walletAnalyzer';
import { calculateLevel, LevelInfo } from './utils/levelCalculator';
import { MintService } from './utils/mintService';

const mintService = new MintService();

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [mintStatus, setMintStatus] = useState<string>("");

  // Подключение кошелька
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
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
        
        // Подключаем сервис минта
        await mintService.connect(window.ethereum);
        
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask or Coinbase Wallet!");
    }
  };

  // Функция минта NFT
  const handleMint = async () => {
    if (!walletAddress) return;
    
    setMintStatus("Minting...");
    const result = await mintService.mintNFT(walletAddress);
    
    if (result.success) {
      setMintStatus(`Success! TX: ${result.txHash?.substring(0, 20)}...`);
    } else {
      setMintStatus(`Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Your Base Level</h1>
        <p className="text-center text-gray-600 mb-8">
          Discover your status in the Base ecosystem
        </p>

        {!isConnected ? (
          <div className="text-center">
            <button
              onClick={connectWallet}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Connect Wallet
            </button>
            <p className="mt-4 text-gray-500">
              Connect to see your Base level and mint NFT
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Информация о кошельке */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Wallet Connected</h2>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
                </span>
              </div>
              
              {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Balance</p>
                    <p className="text-lg font-bold">{stats.balance} ETH</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Transactions</p>
                    <p className="text-lg font-bold">{stats.transactionCount}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Active Days</p>
                    <p className="text-lg font-bold">{stats.activeDays}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">NFT Count</p>
                    <p className="text-lg font-bold">{stats.nftCount}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Уровень */}
            {levelInfo && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl font-bold mb-2">{levelInfo.level}</div>
                <h3 className="text-2xl font-bold mb-2">{levelInfo.title}</h3>
                <p className="mb-4">{levelInfo.description}</p>
                <p className="text-blue-100">Next level: {levelInfo.nextLevelRequirements}</p>
              </div>
            )}

            {/* Кнопка минта */}
            <div className="text-center">
              <button
                onClick={handleMint}
                disabled={mintStatus.includes("Minting")}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 disabled:opacity-50 transition"
              >
                {mintStatus.includes("Minting") ? "Minting..." : "Mint Your Base Level NFT"}
              </button>
              {mintStatus && (
                <p className={`mt-4 ${mintStatus.includes("Success") ? 'text-green-600' : 'text-red-600'}`}>
                  {mintStatus}
                </p>
              )}
              <p className="text-gray-500 text-sm mt-2">
                Pay only gas fees · One NFT per wallet
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
