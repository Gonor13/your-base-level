// ПРОСТОЙ расчёт уровня (фиксированный для теста)
export function calculateLevel(stats: any): { level: number; title: string } {
  const score = stats.transactionCount * 0.1 + parseFloat(stats.balance) * 10 + stats.activeDays * 0.5;
  
  let level = 5;
  if (score > 200) level = 10;
  else if (score > 150) level = 9;
  else if (score > 100) level = 8;
  else if (score > 80) level = 7;
  else if (score > 60) level = 6;
  else if (score > 40) level = 5;
  else if (score > 20) level = 4;
  else if (score > 10) level = 3;
  else if (score > 5) level = 2;
  else level = 1;
  
  const titles = [
    "🚀 Newcomer",
    "🌱 Beginner", 
    "📚 Explorer",
    "⚡ Active",
    "🔥 Regular",
    "💎 Contributor",
    "🌟 Influencer",
    "🏆 Veteran",
    "👑 Champion",
    "🏛️ Legend"
  ];
  
  return {
    level,
    title: titles[level - 1]
  };
}
