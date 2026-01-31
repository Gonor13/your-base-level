// Дополнительный модуль для запросов к The Graph
export async function getDeFiActivity(address: string) {
  try {
    // GraphQL запрос к subgraph Base (если есть публичный)
    const query = \`
      query {
        account(id: "\${address.toLowerCase()}") {
          id
          balances {
            token {
              symbol
            }
            amount
          }
          swaps {
            id
            timestamp
          }
        }
      }
    \`;
    
    // Публичные The Graph endpoints для Base (если доступны)
    const response = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    return data.data || null;
    
  } catch (error) {
    console.log('The Graph not available:', error);
    return null;
  }
}

// Функция для получения данных из нескольких источников
export async function getEnhancedWalletStats(address: string) {
  // 1. Основные данные через RPC
  const basicStats = await analyzeWallet(address);
  
  // 2. Пытаемся получить DeFi данные (опционально)
  const defiData = await getDeFiActivity(address);
  
  // 3. Обогащаем данные
  let defiScore = 0;
  let swapCount = 0;
  
  if (defiData?.account) {
    swapCount = defiData.account.swaps?.length || 0;
    defiScore = swapCount * 5; // 5 баллов за каждый своп
  }
  
  // 4. Рассчитываем финальный уровень
  const finalScore = basicStats.activityScore + defiScore;
  
  return {
    ...basicStats,
    defiSwaps: swapCount,
    defiScore,
    totalScore: finalScore,
    // Дополнительная информация для уровня
    hasDeFiActivity: swapCount > 0,
    estimatedValue: (parseFloat(basicStats.balance) * 2000).toFixed(2) // Примерная оценка в USD
  };
}
