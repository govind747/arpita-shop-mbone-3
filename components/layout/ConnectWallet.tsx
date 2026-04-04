'use client'

import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

// Dynamically import ConnectButton with no SSR
export const ConnectWallet = dynamic(
  () => import('@rainbow-me/rainbowkit').then(mod => ({ 
    default: () => <mod.ConnectButton 
      chainStatus="none"
      showBalance={false}
      accountStatus="avatar"
    />
  })),
  { 
    ssr: false,
    loading: () => (
      <Button variant="outline" size="sm" className="rounded-full">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Connect
      </Button>
    )
  }
)