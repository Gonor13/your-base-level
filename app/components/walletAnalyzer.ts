export interface WalletStats {
  transactions: number
  contracts: number
  age: number
  volume: number
}

export const analyzeWallet = async (address: string): Promise<WalletStats> => {
  // Mock data for now
  return {
    transactions: Math.floor(Math.random() * 1000),
    contracts: Math.floor(Math.random() * 50),
    age: Math.floor(Math.random() * 365),
    volume: Math.random() * 10
  }
}

export const calculateLevel = (stats: WalletStats): number => {
  // Simple calculation based on activity
  const score = 
    (stats.transactions / 100) + 
    (stats.contracts / 5) + 
    (stats.age / 365) + 
    (stats.volume * 2)
  
  return Math.min(10, Math.max(1, Math.floor(score)))
}