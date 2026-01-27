import type { BrowserProvider } from 'ethers'

declare global {
  interface Window {
    ethereum?: any
  }
}
