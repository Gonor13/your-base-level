import { ethers } from 'ethers';
import { WalletStats } from './walletAnalyzer';
import { calculateLevel } from './levelCalculator';

const CONTRACT_ADDRESS = "0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a";
const CONTRACT_ABI = [
  "function mint(uint256 level) external",
  "function balanceOf(address owner) external view returns (uint256)",
  "function hasMinted(address) external view returns (bool)"
];

export class MintService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;

  async connect(walletProvider: any) {
    this.provider = new ethers.BrowserProvider(walletProvider);
    this.signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);
  }

  async checkEligibility(address: string): Promise<{ canMint: boolean; reason?: string }> {
    if (!this.contract) return { canMint: false, reason: "Not connected" };
    
    try {
      const hasMinted = await this.contract.hasMinted(address);
      if (hasMinted) {
        return { canMint: false, reason: "Already minted NFT" };
      }
      
      const balance = await this.contract.balanceOf(address);
      if (balance > 0) {
        return { canMint: false, reason: "Already owns NFT" };
      }
      
      return { canMint: true };
    } catch (error) {
      return { canMint: false, reason: "Error checking eligibility" };
    }
  }

  async mintNFT(address: string): Promise<{ success: boolean; txHash?: string; error?: string }> {
    if (!this.signer || !this.contract) {
      return { success: false, error: "Wallet not connected" };
    }

    try {
      // 1. Анализируем кошелёк и получаем уровень
      // Для этого нужно импортировать и использовать analyzeWallet
      // const stats = await analyzeWallet(address);
      // const levelInfo = calculateLevel(stats);
      
      // 2. Временно используем уровень 1 для теста
      const level = 1;
      
      // 3. Вызываем минт
      const tx = await this.contract.mint(level);
      const receipt = await tx.wait();
      
      return { 
        success: true, 
        txHash: receipt.hash,
        message: `NFT minted! Level: ${level}`
      };
    } catch (error: any) {
      console.error("Mint error:", error);
      return { 
        success: false, 
        error: error.message || "Unknown error during mint"
      };
    }
  }

  async getNFTMetadata(tokenId: number) {
    // Получение метаданных NFT
    // Нужно добавить функцию tokenURI в ABI
    return null;
  }
}
