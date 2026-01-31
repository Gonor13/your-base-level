import { WalletStats } from './walletAnalyzer';

export interface LevelInfo {
  level: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirements: string[];
  progress: number; // 0-100
}

export function calculateLevel(stats: WalletStats): LevelInfo {
  // Рассчитываем уровень на основе ВСЕХ метрик
  const { level, progress } = calculateLevelFromStats(stats);
  
  const levelData = getLevelData(level);
  
  return {
    level,
    title: \`\${levelData.icon} \${levelData.title} - Level \${level}\`,
    description: \`\${levelData.description} | Score: \${stats.activityScore}\`,
    icon: levelData.icon,
    color: levelData.color,
    requirements: levelData.requirements,
    progress
  };
}

function calculateLevelFromStats(stats: WalletStats): { level: number; progress: number } {
  // Сложная формула расчёта
  const balanceScore = Math.min(parseFloat(stats.balance) * 20, 40);
  const txScore = Math.min(stats.transactionCount * 0.2, 30);
  const activityScore = stats.activityScore * 0.3;
  
  const totalScore = balanceScore + txScore + activityScore;
  
  // Уровни от 1 до 10
  let level = 1;
  if (totalScore > 90) level = 10;
  else if (totalScore > 80) level = 9;
  else if (totalScore > 70) level = 8;
  else if (totalScore > 60) level = 7;
  else if (totalScore > 50) level = 6;
  else if (totalScore > 40) level = 5;
  else if (totalScore > 30) level = 4;
  else if (totalScore > 20) level = 3;
  else if (totalScore > 10) level = 2;
  
  // Прогресс до следующего уровня
  const levelThresholds = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const currentThreshold = levelThresholds[level - 1];
  const nextThreshold = levelThresholds[level] || 100;
  const progress = Math.min(100, ((totalScore - currentThreshold) / (nextThreshold - currentThreshold)) * 100);
  
  return { level, progress: Math.round(progress) };
}

function getLevelData(level: number) {
  const levels = [
    {
      level: 1, title: "Newcomer", icon: "🚀", color: "gray",
      description: "Welcome to Base!",
      requirements: ["Make first transaction", "Have any balance"]
    },
    {
      level: 2, title: "Beginner", icon: "🌱", color: "green",
      description: "Getting started",
      requirements: ["5+ transactions", "0.01+ ETH balance"]
    },
    {
      level: 3, title: "Explorer", icon: "🧭", color: "blue",
      description: "Discovering Base",
      requirements: ["15+ transactions", "Interact with 2+ dApps"]
    },
    {
      level: 4, title: "Active", icon: "⚡", color: "purple",
      description: "Regular activity",
      requirements: ["30+ transactions", "0.1+ ETH balance"]
    },
    {
      level: 5, title: "Regular", icon: "🔥", color: "orange",
      description: "Frequent user",
      requirements: ["50+ transactions", "0.5+ ETH balance"]
    },
    {
      level: 6, title: "Contributor", icon: "💎", color: "teal",
      description: "Valuable member",
      requirements: ["100+ transactions", "Use DeFi protocols"]
    },
    {
      level: 7, title: "Influencer", icon: "🌟", color: "yellow",
      description: "Network impact",
      requirements: ["200+ transactions", "1+ ETH balance"]
    },
    {
      level: 8, title: "Veteran", icon: "🏆", color: "red",
      description: "Base expert",
      requirements: ["500+ transactions", "5+ ETH balance"]
    },
    {
      level: 9, title: "Champion", icon: "👑", color: "gold",
      description: "Top contributor",
      requirements: ["1000+ transactions", "Governance participation"]
    },
    {
      level: 10, title: "Legend", icon: "🏛️", color: "rainbow",
      description: "Hall of fame",
      requirements: ["2000+ transactions", "Ecosystem leadership"]
    }
  ];
  
  return levels[level - 1] || levels[0];
}

// Функция для прямого получения уровня
export async function getWalletLevel(address: string): Promise<LevelInfo> {
  const { analyzeWallet } = await import('./walletAnalyzer');
  const stats = await analyzeWallet(address);
  return calculateLevel(stats);
}
