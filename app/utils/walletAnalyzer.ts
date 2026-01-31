// Анализ кошелька Base
export interface WalletStats {
  balance: string;
  transactionCount: number;
  activityScore: number;
  level: number;
}

// Простая функция для демо - без API ключа
export async function analyzeWallet(address: string): Promise<WalletStats> {
  console.log("Анализируем кошелёк:", address);
  
  // Демо-данные (позже заменим на реальные)
  const demoBalance = "0.5"; // ETH
  const demoTxCount = 15;
  
  // Простой расчёт активности
  const activityScore = calculateSimpleScore(demoBalance, demoTxCount);
  
  return {
    balance: demoBalance,
    transactionCount: demoTxCount,
    activityScore: activityScore,
    level: Math.min(Math.floor(activityScore / 10) + 1, 10)
  };
}

function calculateSimpleScore(balanceStr: string, txCount: number): number {
  const balance = parseFloat(balanceStr);
  let score = 0;
  
  // Очки за баланс
  if (balance > 1) score += 30;
  else if (balance > 0.5) score += 20;
  else if (balance > 0.1) score += 15;
  else if (balance > 0.01) score += 10;
  else if (balance > 0) score += 5;
  
  // Очки за транзакции
  if (txCount > 50) score += 40;
  else if (txCount > 20) score += 30;
  else if (txCount > 10) score += 20;
  else if (txCount > 5) score += 15;
  else if (txCount > 1) score += 10;
  else if (txCount === 1) score += 5;
  
  return Math.min(score, 100);
}
