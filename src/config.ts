import { createConfig } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { http } from 'viem'

export const config = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
