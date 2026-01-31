import { WalletStats } from './walletAnalyzer';

export interface LevelInfo {
  level: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export function calculateLevel(stats: WalletStats): LevelInfo {
  const level = stats.level;
  
  const levelData = [
    { level: 1, title: "Newcomer", icon: "🚀", color: "gray", desc: "Welcome to Base!" },
    { level: 2, title: "Beginner", icon: "🌱", color: "green", desc: "Getting started" },
    { level: 3, title: "Explorer", icon: "🧭", color: "blue", desc: "Discovering Base" },
    { level: 4, title: "Active", icon: "⚡", color: "purple", desc: "Regular user" },
    { level: 5, title: "Regular", icon: "🔥", color: "orange", desc: "Frequent activity" },
    { level: 6, title: "Contributor", icon: "💎", color: "teal", desc: "Valuable member" },
    { level: 7, title: "Influencer", icon: "🌟", color: "yellow", desc: "Network impact" },
    { level: 8, title: "Veteran", icon: "🏆", color: "red", desc: "Base expert" },
    { level: 9, title: "Champion", icon: "👑", color: "gold", desc: "Top contributor" },
    { level: 10, title: "Legend", icon: "🏛️", color: "rainbow", desc: "Hall of fame" }
  ];
  
  const data = levelData[level - 1] || levelData[0];
  
  return {
    level: data.level,
    title: `${data.icon} ${data.title} - Level ${data.level}`,
    description: `${data.desc} | Balance: ${stats.balance} ETH | TXs: ${stats.transactionCount}`,
    icon: data.icon,
    color: data.color
  };
}

// Альтернативная функция для прямого получения уровня по адресу
export async function getWalletLevel(address: string): Promise<LevelInfo> {
  // Импортируем динамически, чтобы избежать циклических зависимостей
  const { analyzeWallet } = await import('./walletAnalyzer');
  const stats = await analyzeWallet(address);
  return calculateLevel(stats);
}
