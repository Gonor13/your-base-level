import { createWalletClient, custom, parseEther } from 'viem'
import { base } from 'viem/chains'

// Адрес реального контракта (нужно заменить на твой)
const NFT_CONTRACT_ADDRESS = '0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a'
const NFT_CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "level", "type": "uint256"}
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

export async function mintNFT(address: string, level: number): Promise<string> {
  if (!window.ethereum) {
    throw new Error('No Ethereum provider found')
  }

  const client = createWalletClient({
    chain: base,
    transport: custom(window.ethereum)
  })

  const [account] = await client.getAddresses()

  try {
    const hash = await client.writeContract({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_CONTRACT_ABI,
      functionName: 'mint',
      args: [account, BigInt(level)],
      value: parseEther('0.001') // Примерная gas цена
    })

    return hash
  } catch (error) {
    console.error('Mint error:', error)
    throw error
  }
}
