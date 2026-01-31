import { createPublicClient, http, formatEther } from 'viem'
import { base, baseSepolia } from 'viem/chains'

// Контракт NFT (примерный адрес — нужно заменить на твой)
const NFT_CONTRACT_ADDRESS = '0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a'

export interface WalletStats {
  address: string
  totalTransactions: number
  totalVolumeETH: string
  nftCount: number
  firstTransactionDate: string | null
  daysActive: number
  averageTransactionValue: string
  network: 'base' | 'base-sepolia'
}

export async function analyzeBaseWallet(address: string): Promise<WalletStats> {
  const client = createPublicClient({
    chain: base,
    transport: http()
  })

  try {
    // 1. Получаем баланс
    const balance = await client.getBalance({ address: address as `0x${string}` })
    
    // 2. Получаем транзакции (последние 1000)
    const blockNumber = await client.getBlockNumber()
    
    // 3. Проверяем NFT контракт на минты
    const hasMintedNFT = await checkNFTOwnership(address)
    
    // 4. Получаем первую транзакцию
    const firstTx = await getFirstTransaction(address)
    
    // Рассчитываем статистику
    const stats: WalletStats = {
      address,
      totalTransactions: await estimateTransactionCount(address),
      totalVolumeETH: formatEther(balance),
      nftCount: hasMintedNFT ? 1 : 0,
      firstTransactionDate: firstTx ? new Date(Number(firstTx.blockTimestamp) * 1000).toISOString() : null,
      daysActive: firstTx ? Math.floor((Date.now() - Number(firstTx.blockTimestamp) * 1000) / (1000 * 60 * 60 * 24)) : 0,
      averageTransactionValue: "0.05", // Заглушка - нужно реализовать расчёт
      network: 'base'
    }
    
    return stats
  } catch (error) {
    console.error('Error analyzing wallet:', error)
    throw new Error('Failed to analyze wallet')
  }
}

export function calculateBaseLevel(stats: WalletStats): number {
  let score = 0
  
  // 1. Транзакции (макс 30 баллов)
  score += Math.min(stats.totalTransactions * 0.5, 30)
  
  // 2. Объём (макс 25 баллов)
  const volume = parseFloat(stats.totalVolumeETH)
  score += Math.min(volume * 10, 25)
  
  // 3. Активность (макс 20 баллов)
  score += Math.min(stats.daysActive * 0.5, 20)
  
  // 4. NFT (макс 15 баллов)
  score += stats.nftCount * 15
  
  // 5. Средняя транзакция (макс 10 баллов)
  const avgTx = parseFloat(stats.averageTransactionValue)
  score += Math.min(avgTx * 100, 10)
  
  // Конвертируем в уровень 1-10
  const level = Math.floor((score / 100) * 10) + 1
  return Math.min(level, 10)
}

async function checkNFTOwnership(address: string): Promise<boolean> {
  // Реальная проверка владения NFT
  // TODO: Интегрировать вызов контракта ERC-721 balanceOf
  return false
}

async function estimateTransactionCount(address: string): Promise<number> {
  // TODO: Реальный вызов API Base для подсчёта транзакций
  // Временная реализация через Etherscan API
  return 42 // Примерное число
}

async function getFirstTransaction(address: string): Promise<any> {
  // TODO: Реальный запрос к Base API
  return null
}
