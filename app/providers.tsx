'use client'

import { BaseSepoliaTestnet, Base } from '@thirdweb-dev/chains'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider
      activeChain={BaseSepoliaTestnet}
      supportedChains={[BaseSepoliaTestnet, Base]}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""}
      // Для версии 4.x может понадобиться authConfig
      authConfig={{
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
        authUrl: "/api/auth",
      }}
    >
      {children}
    </ThirdwebProvider>
  )
}
