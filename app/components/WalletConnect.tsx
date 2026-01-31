'use client'

import { ConnectWallet } from '@thirdweb-dev/react'

export default function WalletConnect() {
  return (
    <ConnectWallet
      theme="dark"
      switchToActiveChain={true}
      modalSize="wide"
      btnTitle="Connect Wallet"
      modalTitle="Connect to Your Base Level"
      welcomeScreen={{
        title: "Welcome to Your Base Level",
        subtitle: "Connect your wallet to discover your status in the Base ecosystem",
      }}
    />
  )
}
