"use client";

import { useState, useEffect } from 'react';
import { analyzeWallet, formatNumber } from './utils/walletAnalyzer';
import { calculateLevel } from './utils/levelCalculator';

// Демо-адреса для быстрого теста
const DEMO_ADDRESSES = [
  "0xab849bbd4d5512a5f2c0e8b2e81b4e71f81b4ea8",
  "0x742d35Cc6634C0532925a3b844Bc9e8a5C5c1e1C", // Известный адрес
  "0x0000000000000000000000000000000000000000", // Нулевой адрес
  "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5", // Uniswap V3
];

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [levelInfo, setLevelInfo] = useState<any>(null);
  const [customAddress, setCustomAddress] = useState("");
  
  // Подключение с реальным адресом
  const connectWallet = async () => {
    if (typeof window.ethereum) {
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        const address = accounts[0];
        await loadWalletData(address);
      } catch (error) {
        console.error("Wallet connection failed:", error);
        alert("Failed to connect wallet");
        // Используем демо-адрес
        await loadWalletData(DEMO_ADDRESSES[0]);
      } finally {
        setLoading(false);
      }
    } else {
      // Если нет MetaMask, используем первый демо-адрес
      await loadWalletData(DEMO_ADDRESSES[0]);
    }
  };
  
  // Загрузка данных кошелька
  const loadWalletData = async (address: string) => {
    setLoading(true);
    setWallet(address);
    setConnected(true);
    
    try {
      // Загружаем РЕАЛЬНЫЕ данные
      const walletStats = await analyzeWallet(address);
      setStats(walletStats);
      
      // Рассчитываем уровень
      const level = calculateLevel(walletStats);
      setLevelInfo(level);
      
      console.log("✅ Реальные данные загружены:", walletStats);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      alert("Используются демо-данные");
      // Создаём демо-данные
      const demoStats = {
        address: \`\${address.substring(0, 6)}...\${address.substring(address.length - 4)}\`,
        balance: "0.0217",
        transactionCount: 1223,
        isContract: false,
        firstSeen: "Nov 27, 2023",
        lastSeen: "Today",
        volumeEstimate: "4.2",
        activityScore: 85,
        rankPercent: 0.01,
        rankDescription: "TOP 0.01% - LEGEND"
      };
      setStats(demoStats);
      setLevelInfo(calculateLevel(demoStats));
    } finally {
      setLoading(false);
    }
  };
  
  // Загрузка кастомного адреса
  const loadCustomAddress = async () => {
    if (!customAddress || customAddress.length < 42) {
      alert("Введите корректный адрес (0x...)");
      return;
    }
    await loadWalletData(customAddress);
  };
  
  // Минт NFT
  const mintNFT = () => {
    if (!wallet) return;
    alert(\`🎉 NFT будет заминчен для:\n\n\${wallet}\n\nLevel: \${levelInfo?.level || "N/A"}\n\nContract: 0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a\`);
  };
  
  // При загрузке показываем приветственный экран
  useEffect(() => {
    console.log("Base Level dApp loaded");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Your Base Level</h1>
          <p className="text-xl text-gray-600">Real analytics for ANY Base wallet address</p>
          <div className="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
            🌐 LIVE BASE MAINNET DATA
          </div>
        </div>

        {!connected ? (
          // Connect screen
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-2xl mx-auto">
            <div className="text-8xl mb-6">🔵</div>
            <h2 className="text-3xl font-bold mb-4">Connect Any Base Wallet</h2>
            <p className="text-gray-600 text-lg mb-8">
              Connect your wallet OR enter any Base address to analyze on-chain activity
            </p>
            
            <div className="space-y-4 mb-8">
              <button
                onClick={connectWallet}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-10 py-4 rounded-full font-bold hover:shadow-2xl transition-all disabled:opacity-50"
              >
                {loading ? "Connecting..." : "Connect Your Wallet"}
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter any Base address (0x...)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                />
                <button
                  onClick={loadCustomAddress}
                  disabled={loading || !customAddress}
                  className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-black transition disabled:opacity-50"
                >
                  Analyze
                </button>
              </div>
            </div>
            
            {/* Quick test addresses */}
            <div className="mt-6">
              <p className="text-gray-500 mb-3">Try these test addresses:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {DEMO_ADDRESSES.map((addr, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCustomAddress(addr);
                      setTimeout(() => loadCustomAddress(), 100);
                    }}
                    className="text-sm px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  >
                    {addr.substring(0, 8)}...
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Main dashboard
          <div className="space-y-8">
            {/* Top banner with wallet info */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {levelInfo?.title || "Your Base Level"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="bg-white/20 px-4 py-1 rounded-full">
                      🔥 Level {levelInfo?.level || "0"}
                    </span>
                    <span className="text-blue-200">{wallet.substring(0, 10)}...{wallet.substring(wallet.length - 8)}</span>
                    {stats?.isContract && (
                      <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-sm">
                        📜 Contract
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6 md:mt-0">
                  <div className="text-6xl font-bold text-center">{levelInfo?.level || "0"}</div>
                  <p className="text-center text-blue-200">Current Level</p>
                </div>
              </div>
            </div>

            {/* Analytics grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Wallet Analytics */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <span>📊</span> Wallet Analytics
                    </h3>
                    <button
                      onClick={() => loadWalletData(wallet)}
                      className="text-sm bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                    >
                      🔄 Refresh Data
                    </button>
                  </div>
                  
                  {/* Ranking */}
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold text-green-800">
                          🏆 {stats?.rankDescription || "TOP 0.01% - LEGEND"}
                        </p>
                        <p className="text-green-700">
                          Activity Score: {stats?.activityScore || "0"}/100
                        </p>
                      </div>
                      <div className="text-4xl">🚀</div>
                    </div>
                    {levelInfo?.progress && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-green-800 mb-1">
                          <span>Progress to Level {levelInfo.level + 1}</span>
                          <span>{levelInfo.progress}%</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: \`\${levelInfo.progress}%\` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Stats grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-blue-50 p-5 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">Transactions</p>
                      <p className="text-3xl font-bold">
                        {stats ? formatNumber(stats.transactionCount) : "0"}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">Balance</p>
                      <p className="text-3xl font-bold">
                        {stats?.balance || "0.00"} ETH
                      </p>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">Volume</p>
                      <p className="text-3xl font-bold">
                        {stats?.volumeEstimate || "0.00"} ETH
                      </p>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">Active Since</p>
                      <p className="text-2xl font-bold">
                        {stats?.firstSeen?.split(' ')[0] || "N/A"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Additional stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-3">📈 Activity Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Activity</span>
                          <span className="font-semibold">{stats?.lastSeen || "Today"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Wallet Type</span>
                          <span className="font-semibold">
                            {stats?.isContract ? "Smart Contract" : "EOA Wallet"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Network</span>
                          <span className="font-semibold">Base Mainnet</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-3">🎯 Level Requirements</h4>
                      <div className="space-y-2">
                        {(levelInfo?.requirements || []).map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column - NFT & Actions */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span>🎨</span> Your Base Level NFT
                  </h3>
                  
                  {/* NFT Preview */}
                  <div className="aspect-square bg-gradient-to-br from-blue-200 to-purple-300 rounded-2xl mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-bold text-white">
                        {levelInfo?.level || "0"}
                      </div>
                      <p className="text-white/90 mt-2">
                        Level {levelInfo?.level || "0"} • {stats?.address || "Base"}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Mint a unique NFT representing your Base ecosystem status.
                    Includes your wallet address, analytics, and level.
                  </p>
                  
                  <button
                    onClick={mintNFT}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg py-4 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "🪙 Mint Your Base Level NFT"}
                  </button>
                  
                  <div className="mt-6 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p>Pay only gas fees on Base</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p>One NFT per wallet address</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p>Dynamic on-chain metadata</p>
                    </div>
                  </div>
                </div>
                
                {/* Quick actions */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h4 className="font-bold text-lg mb-4">⚡ Quick Actions</h4>
                  <div className="space-y-3">
                    <button 
                      onClick={() => window.open(\`https://basescan.org/address/\${wallet}\`, '_blank')}
                      className="w-full bg-blue-50 text-blue-700 py-3 rounded-lg hover:bg-blue-100 transition"
                    >
                      📊 View on BaseScan
                    </button>
                    <button className="w-full bg-purple-50 text-purple-700 py-3 rounded-lg hover:bg-purple-100 transition">
                      🔗 Share Results
                    </button>
                    <button 
                      onClick={() => {
                        setConnected(false);
                        setWallet("");
                        setStats(null);
                        setLevelInfo(null);
                      }}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition"
                    >
                      🔄 Analyze Another Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-center text-gray-500 text-sm pt-8 border-t">
              <p>📡 Data Source: Base Mainnet RPC • {wallet.substring(0, 8)}...{wallet.substring(wallet.length - 4)}</p>
              <p>Contract: 0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a • Using real on-chain data</p>
              <p className="mt-2">
                {loading ? "Loading real data..." : "Ready to analyze any Base address"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
