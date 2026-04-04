'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider, createConfig } from 'wagmi'
import { sepolia, polygon } from 'wagmi/chains'
import { http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { metaMaskWallet, walletConnectWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets'
import { useState, useEffect } from 'react'

const queryClient = new QueryClient()
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const chains = [sepolia, polygon] as const

// Manual config without Coinbase
const config = createConfig({
  chains,
  connectors: [
    metaMaskWallet({ projectId, chains }),
    walletConnectWallet({ projectId, chains }),
    rainbowWallet({ projectId, chains }),
  ],
  transports: {
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
  ssr: true,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}