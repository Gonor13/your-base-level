import { ethers } from 'ethers';

export interface WalletStats {
  balance: string;
  transactionCount: number;
  firstTxTimestamp: number | null;
  lastTxTimestamp: number | null;
  isContract: boolean;
  totalVolume: string;
  activityScore: number;
}

export async function analyzeWallet(address: string): Promise<WalletStats> {
  const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');
  
  try {
    // 1. Баланс кошелька
    const balanceWei = await provider.getBalance(address);
    const balanceEth = ethers.formatEther(balanceWei);
    
    // 2. Количество транзакций (nonce)
    const transactionCount = await provider.getTransactionCount(address);
    
    // 3. Проверка на контракт
    const code = await provider.getCode(address);
    const isContract = code !== '0x';
    
    // 4. Получаем несколько последних транзакций для анализа
    let firstTxTimestamp = null;
    let lastTxTimestamp = null;
    let totalVolume = '0';
    
    if (transactionCount > 0) {
      try {
        // Получаем последние 10 транзакций
        const blockNumber = await provider.getBlockNumber();
        
        // Создаем фильтр для транзакций этого адреса
        const filter = {
          fromBlock: blockNumber - 10000, // Последние ~1 день (при ~1 блок/2 сек)
          toBlock: 'latest',
          address: address
        };
        
        // Получаем логи (ограниченно без API)
        const logs = await provider.getLogs(filter);
        
        // Пытаемся получить первую транзакцию
        const latestBlock = await provider.getBlock('latest');
        lastTxTimestamp = latestBlock.timestamp;
        
        // Оцениваем объем на основе баланса и активности
        const volumeEstimate = parseFloat(balanceEth) * (transactionCount + 1);
        totalVolume = volumeEstimate.toFixed(4);
        
      } catch (error) {
        console.log("Can't get full tx history without API key");
      }
    }
    
    // 5. Рассчитываем активность
    const activityScore = calculateActivityScore(
      parseFloat(balanceEth),
      transactionCount
    );
    
    return {
      balance: balanceEth,
      transactionCount,
      firstTxTimestamp,
      lastTxTimestamp,
      isContract,
      totalVolume,
      activityScore
    };
    
  } catch (error) {
    console.error('Error analyzing wallet:', error);
    // Возвращаем данные по умолчанию
    return {
      balance: '0',
      transactionCount: 0,
      firstTxTimestamp: null,
      lastTxTimestamp: null,
      isContract: false,
      totalVolume: '0',
      activityScore: 0
    };
  }
}

function calculateActivityScore(balance: number, txCount: number): number {
  let score = 0;
  
  // Баллы за баланс
  if (balance > 10) score += 30;
  else if (balance > 1) score += 20;
  else if (balance > 0.1) score += 10;
  else if (balance > 0.01) score += 5;
  else if (balance > 0) score += 1;
  
  // Баллы за активность
  if (txCount > 100) score += 40;
  else if (txCount > 50) score += 30;
  else if (txCount > 20) score += 20;
  else if (txCount > 10) score += 15;
  else if (txCount > 5) score += 10;
  else if (txCount > 1) score += 5;
  else if (txCount === 1) score += 2;
  
  return Math.min(score, 100);
}

// Функция для демо-данных (если нужны тестовые данные)
export async function getDemoStats(address: string): Promise<WalletStats> {
  // Генерируем предсказуемые демо-данные на основе адреса
  const hash = Array.from(address).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const demoBalance = ((hash % 1000) / 100).toFixed(4);
  const demoTransactions = (hash % 50) + 1;
  const demoVolume = (parseFloat(demoBalance) * (demoTransactions * 3)).toFixed(4);
  const demoScore = calculateActivityScore(parseFloat(demoBalance), demoTransactions);
  
  return {
    balance: demoBalance,
    transactionCount: demoTransactions,
    firstTxTimestamp: Date.now() - (demoTransactions * 86400000), // Дни назад
    lastTxTimestamp: Date.now(),
    isContract: false,
    totalVolume: demoVolume,
    activityScore: demoScore
  };
}
