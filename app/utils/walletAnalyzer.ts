// Simple wallet analyzer
export function analyzeWallet(address: string) {
  return {
    address: address.substring(0, 6) + '...' + address.substring(address.length - 4),
    balance: "0.0217",
    transactionCount: 1223,
    isContract: false
  };
}

export function formatNumber(num: number) {
  return num.toLocaleString();
}
