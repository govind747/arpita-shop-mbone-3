'use client'

import { useState, useEffect, useRef } from 'react'
import { useAccount, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Wallet, CheckCircle2, AlertCircle, Loader2, ExternalLink, Coins, Zap, ShieldCheck, ArrowRight, Printer, X } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/lib/stores/cartStore'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  MBONE_TOKEN_ADDRESS,
  PAYMENT_PROCESSOR_ADDRESS,
  ERC20_ABI,
  PROCESSOR_ABI,
  usdToMBONE,
} from '@/lib/web3/config'
import { createPublicClient, http, formatUnits } from 'viem'
import { cn } from '@/lib/utils'

type Step = 'connect' | 'approve' | 'pay' | 'confirming' | 'success' | 'error'

interface OrderData {
  orderId: string
  invoiceId: string
  orderHash: string
  totalMBONE: string
  totalUSD: number
  mbonePriceUsd: number
}

export function CryptoPayment() {
  const [step, setStep] = useState<Step>('connect')
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [mbonePrice, setMbonePrice] = useState<number>(0.25)
  const [approvalTxHash, setApprovalTxHash] = useState<`0x${string}` | undefined>()
  const [paymentTxHash, setPaymentTxHash] = useState<`0x${string}` | undefined>()
  const [error, setError] = useState<string>('')
  const [isCheckingBalance, setIsCheckingBalance] = useState(false)
  const [userMBONEBalance, setUserMBONEBalance] = useState<bigint>(BigInt(0))
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)

  const { address, isConnected, chain } = useAccount()
  const { switchChain } = useSwitchChain()

  const { writeContractAsync: approveAsync, isPending: isApprovePending } = useWriteContract()
  const { writeContractAsync: payAsync, isPending: isPayPending } = useWriteContract()

  const { isLoading: isApprovalLoading, isSuccess: isApprovalSuccess } = useWaitForTransactionReceipt({ hash: approvalTxHash })
  const { isLoading: isPaymentLoading, isSuccess: isPaymentSuccess } = useWaitForTransactionReceipt({ hash: paymentTxHash })

  const { items, clearCart, getTotalPrice } = useCartStore()
  const { user } = useAuth()

  const totalUSD = getTotalPrice()
  const totalMBONE = usdToMBONE(totalUSD, mbonePrice)

  const publicClient = useRef(
    createPublicClient({
      chain: sepolia,
      transport: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.gateway.tenderly.co'),
    })
  ).current

  useEffect(() => { fetchMbonePrice() }, [])
  useEffect(() => { if (address && isConnected) { fetchUserMBONEBalance() } }, [address, isConnected])

  const fetchMbonePrice = async () => {
    try {
      const res = await fetch('/api/settings/mbone-price')
      const data = await res.json()
      if (res.ok) setMbonePrice(data.price)
    } catch (e) { console.error('Failed to fetch MBONE price:', e) }
  }

  const fetchUserMBONEBalance = async () => {
    if (!address) return
    setIsLoadingBalance(true)
    try {
      const balance = await publicClient.readContract({
        address: MBONE_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',

        args: [address],
      })
      setUserMBONEBalance(balance)
    } catch (error) { console.error('Failed to fetch MBONE balance:', error) }
    finally { setIsLoadingBalance(false) }
  }

  const isCorrectNetwork = chain?.id === sepolia.id

  useEffect(() => {
    if (!isApprovalSuccess || !approvalTxHash) return
    toast.success('MBONE spending approved!')
    setStep('pay')
  }, [isApprovalSuccess, approvalTxHash])

  useEffect(() => {
    if (!isPaymentSuccess || !paymentTxHash || !orderData) return
    const verifyPayment = async () => {
      try {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: orderData.orderId, txHash: paymentTxHash, invoiceId: orderData.invoiceId }),
        })
        const data = await res.json()
        if (!res.ok) { toast.error(`Verification failed: ${data.error}`) }
      } catch (e) { console.error('Verify payment fetch error:', e) }
      setStep('success')
      // Note: items are still in cart store until clearCart() is called. 
      // We keep them briefly so the receipt can render them before clearing.
      toast.success('Payment successful! Order confirmed.')
    }
    verifyPayment()
  }, [isPaymentSuccess, paymentTxHash, orderData])

  const createOrder = async () => {
    if (!address || !user) { toast.error('Please connect your wallet and sign in'); return }
    if (userMBONEBalance < totalMBONE) { toast.error(`Insufficient MBONE balance.`); return }
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: items, walletAddress: address, totalUSD, totalMBONE: totalMBONE.toString() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create order')
      setOrderData(data)
      setStep('approve')
      toast.success('Order created!')
    } catch (e: any) { setError(e.message); setStep('error'); toast.error(e.message) }
  }

  const approveToken = async () => {
    if (!orderData) return
    try {
      setApprovalTxHash(undefined)
      const hash = await approveAsync({
        address: MBONE_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [PAYMENT_PROCESSOR_ADDRESS, BigInt(orderData.totalMBONE)],
      })
      setApprovalTxHash(hash)
    } catch (e: any) { setError(e.message); setStep('error'); toast.error('Failed to approve MBONE') }
  }

  const checkAllowance = async (): Promise<boolean> => {
    if (!address || !orderData) return false
    try {
      const allowance = await publicClient.readContract({
        address: MBONE_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [address, PAYMENT_PROCESSOR_ADDRESS],
      })
      return allowance >= BigInt(orderData.totalMBONE)
    } catch (e) { return false }
  }

  const checkBalance = async (): Promise<boolean> => {
    if (!address || !orderData) return false
    try {
      const balance = await publicClient.readContract({
        address: MBONE_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address],
      })
      return balance >= BigInt(orderData.totalMBONE)
    } catch (e) { return false }
  }

  const payOrder = async () => {
    if (!orderData) return
    try {
      setPaymentTxHash(undefined)
      setStep('confirming')
      const hash = await payAsync({
        address: PAYMENT_PROCESSOR_ADDRESS,
        abi: PROCESSOR_ABI,
        functionName: 'payOrder',
        args: [orderData.orderHash as `0x${string}`, orderData.invoiceId as string],
      })
      setPaymentTxHash(hash)
    } catch (e: any) { setError(e.shortMessage || e.message); setStep('error') }
  }

  const handlePayOrder = async () => {
    setIsCheckingBalance(true)
    try {
      if (!await checkBalance()) { toast.error("Insufficient balance"); return }
      if (!await checkAllowance()) { toast.error('Approval not detected. Please approve again.'); setStep('approve'); return }
      await payOrder()
    } finally { setIsCheckingBalance(false) }
  }

  const getStepStatus = (stepName: string) => {
    const order = ['connect', 'approve', 'pay', 'confirming']
    const current = order.indexOf(step)
    const target = order.indexOf(stepName)
    if (step === 'success') return 'completed'
    if (step === 'error' && target <= current) return 'error'
    if (target < current) return 'completed'
    return target === current ? 'active' : 'pending'
  }

  const isApproving = isApprovePending || isApprovalLoading
  const isPaying = isPayPending || isPaymentLoading

  return (
    <div className="space-y-8 text-white">
      {/* Wallet Balance Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-brand-accent/20 rounded-2xl flex items-center justify-center">
            <Wallet className="h-6 w-6 text-brand-accent" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Protocol Wallet</p>
            <div className="scale-90 origin-left mt-1"><ConnectButton accountStatus="address" chainStatus="none" showBalance={false} /></div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 px-6 py-3 rounded-2xl border border-white/5 text-right min-w-[140px]">
          <p className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-1 flex items-center justify-end gap-1">
            <Zap className="h-3 w-3 fill-brand-accent" /> Balance
          </p>
          <div className="flex items-center gap-2 justify-end">
            {isLoadingBalance ? <Loader2 className="h-4 w-4 animate-spin" /> : (
              <span className="text-xl font-black">{Number(formatUnits(userMBONEBalance, 18)).toFixed(2)}</span>
            )}
            <span className="text-[10px] font-bold text-slate-500">MBONE</span>
          </div>
        </div>
      </div>

      {/* Modern Stepper */}
      <div className="grid grid-cols-4 gap-4 px-2">
        {['connect', 'approve', 'pay', 'confirming'].map((s) => (
          <div key={s} className="space-y-2">
            <div className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              getStepStatus(s) === 'completed' ? "bg-brand-accent" : 
              getStepStatus(s) === 'active' ? "bg-white animate-pulse" : "bg-white/10"
            )} />
            <p className={cn(
              "text-[9px] font-black uppercase tracking-tighter text-center",
              getStepStatus(s) === 'active' || getStepStatus(s) === 'completed' ? "text-white" : "text-slate-600"
            )}>{s === 'confirming' ? 'verify' : s}</p>
          </div>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white/5 rounded-[2.5rem] border border-white/10 p-8 min-h-[200px] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-brand-accent/5 blur-[80px] rounded-full" />
        
        {step === 'connect' && (
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95">
            {!isConnected ? (
              <div className="space-y-4">
                <p className="text-slate-400 font-medium">Link your wallet to initiate the MBONE transaction.</p>
                <div className="flex justify-center"><ConnectButton /></div>
              </div>
            ) : !isCorrectNetwork ? (
              <Button onClick={() => switchChain?.({ chainId: sepolia.id })} className="w-full h-16 rounded-2xl bg-rose-500 hover:bg-rose-600 font-black text-lg">
                Switch to Sepolia Network
              </Button>
            ) : (
              <Button onClick={createOrder} className="w-full h-16 rounded-2xl bg-brand-accent hover:bg-brand-accent/90 font-black text-lg shadow-xl shadow-brand-accent/20 group">
                Initialize Order <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-all" />
              </Button>
            )}
          </div>
        )}

        {step === 'approve' && (
          <div className="space-y-6 text-center animate-in slide-in-from-bottom-4">
            <ShieldCheck className="h-12 w-12 text-brand-accent mx-auto mb-2" />
            <div>
              <h4 className="text-xl font-black">Contract Permission</h4>
              <p className="text-slate-400 text-sm mt-1">Authorize the MBONE Protocol to process your haul.</p>
            </div>
            <Button onClick={approveToken} disabled={isApproving} className="w-full h-16 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-lg">
              {isApproving ? <Loader2 className="animate-spin mr-2" /> : null}
              {isApproving ? 'Granting Access...' : 'Approve Spending'}
            </Button>
          </div>
        )}

        {step === 'pay' && (
          <div className="space-y-6 text-center animate-in slide-in-from-bottom-4">
            <div className="h-16 w-16 bg-brand-accent rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-2xl shadow-brand-accent/40">
              <Coins className="h-8 w-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-black">Final Settlement</h4>
              <p className="text-slate-400 text-sm mt-1">Ready to clear {formatUnits(BigInt(orderData?.totalMBONE || 0), 18)} MBONE</p>
            </div>
            <Button onClick={handlePayOrder} disabled={isPaying || isCheckingBalance} className="w-full h-16 rounded-2xl bg-brand-accent font-black text-lg shadow-xl shadow-brand-accent/30">
              {isPaying ? <Loader2 className="animate-spin mr-2" /> : null}
              {isPaying ? 'Processing...' : `Confirm Payment`}
            </Button>
          </div>
        )}

        {step === 'confirming' && (
          <div className="text-center space-y-4 py-6">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-brand-accent" />
            <h4 className="text-xl font-black tracking-tight">Syncing with Blockchain</h4>
            <p className="text-slate-400 text-sm">Awaiting block confirmation (approx. 15s)</p>
            {paymentTxHash && (
              <a href={`https://sepolia.etherscan.io/tx/${paymentTxHash}`} target="_blank" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-brand-accent tracking-widest hover:underline mt-4">
                View Tx Hash <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-6 py-6 animate-in zoom-in-95">
            <div className="h-20 w-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-emerald-500 tracking-tighter">Protocol Settled</h4>
              <p className="text-slate-400 text-sm mt-1 font-medium">Order #{orderData?.invoiceId} is now locked in.</p>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <Button 
                onClick={() => setShowReceipt(true)}
                className="bg-white text-slate-900 h-14 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Printer className="h-4 w-4" /> View Digital Receipt
              </Button>
              <Button 
                variant="outline" 
                onClick={() => { clearCart(); setStep('connect'); setOrderData(null); }}
                className="border-white/10 h-12 rounded-xl text-slate-500 font-bold hover:bg-white/5"
              >
                Back to Shop
              </Button>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center space-y-6 animate-in fade-in">
            <div className="h-16 w-16 bg-rose-500/20 rounded-3xl flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-rose-500" />
            </div>
            <div>
              <h4 className="text-xl font-black text-rose-500">Signal Interrupted</h4>
              <p className="text-slate-400 text-xs font-mono max-w-[250px] mx-auto mt-2 leading-relaxed opacity-70">{error}</p>
            </div>
            <Button onClick={() => { setStep('connect'); setError('') }} variant="outline" className="w-full h-14 rounded-xl border-white/10 hover:bg-white/5 font-bold">
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* RECEIPT MODAL OVERLAY */}
      {showReceipt && orderData && (
        <div className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setShowReceipt(false)}
              className="absolute -top-4 -right-4 h-10 w-10 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <OrderReceipt 
              order={{...orderData, items}} 
              user={user} 
              mbonePrice={mbonePrice} 
            />

            <div className="p-6 bg-slate-50 rounded-b-[2.5rem] flex justify-center border-t border-slate-100">
               <Button 
                 onClick={() => window.print()}
                 className="bg-slate-900 text-white font-black px-8 h-12 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-colors"
               >
                 <Printer className="h-4 w-4" /> Download PDF / Print
               </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * DIGITAL RECEIPT SUB-COMPONENT
 */
export function OrderReceipt({ order, user, mbonePrice }: { order: any, user: any, mbonePrice: number }) {
  const subtotal = order.totalUSD;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div id="printable-receipt" className="p-8 md:p-12 bg-white text-slate-900 rounded-t-[2.5rem]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <div>
          <div className="inline-block bg-brand-accent/10 px-3 py-1 rounded-full mb-4">
             <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em]">Official Invoice</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-900">Settlement</h2>
          <p className="text-xs font-bold text-slate-400 mt-2">REFERENCE: <span className="text-slate-900 font-mono">{order.invoiceId}</span></p>
        </div>
        
        <div className="md:text-right">
          <h3 className="font-black text-brand-accent text-2xl tracking-tighter">MBONE PROTOCOL</h3>
          <p className="text-[10px] font-bold text-slate-500 leading-relaxed mt-1 uppercase tracking-wider">
            Web3 Commerce Division<br />
            123 Crypto Plaza, Block 0x1<br />
            Bangalore, KA 560001<br />
            <span className="text-slate-900 font-black">GSTIN: 29AAAAA0000A1Z5</span>
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-y border-slate-100 py-8">
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Billed To</p>
          <div>
            <p className="font-black text-lg text-slate-900 leading-none">{user?.name || 'Anonymous Collector'}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">{user?.email}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 inline-block max-w-full">
            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Source Wallet</p>
            <p className="text-[9px] font-mono text-slate-600 break-all">{order.walletAddress || '0x00...000'}</p>
          </div>
        </div>
        
        <div className="md:text-right space-y-4">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Transaction Date</p>
            <p className="font-black text-lg">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100">
            <CheckCircle2 className="h-4 w-4 fill-emerald-600 text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest">Paid via MBONE</span>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4 mb-12">
        <div className="grid grid-cols-4 text-[10px] font-black uppercase text-slate-400 px-2 tracking-widest">
          <div className="col-span-2">Specified Items</div>
          <div className="text-center">Qty</div>
          <div className="text-right">Amount</div>
        </div>
        <div className="h-px bg-slate-100 w-full" />
        
        {order.items?.map((item: any, i: number) => (
          <div key={i} className="grid grid-cols-4 text-sm font-bold px-2 py-1 items-center">
            <div className="col-span-2">
              <p className="text-slate-900 leading-tight">{item.product.name}</p>
              <p className="text-[10px] text-slate-400 font-medium">UNIT: ${item.product.final_mrp}</p>
            </div>
            <div className="text-center text-slate-500 font-black">×{item.quantity}</div>
            <div className="text-right text-slate-900">${(item.product.final_mrp * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Settlement Totals */}
      <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
        {/* Aesthetic decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 blur-3xl rounded-full -mr-16 -mt-16" />
        
        <div className="space-y-3 relative z-10">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Market Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Protocol GST (8%)</span>
            <span className="text-white">${tax.toFixed(2)}</span>
          </div>
          <div className="h-px bg-white/10 my-4" />
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-2">
            <div>
              <p className="text-[10px] font-black uppercase text-brand-accent tracking-[0.3em] mb-2">Final On-Chain Settlement</p>
              <div className="flex items-center gap-3">
                <p className="text-4xl font-black tracking-tighter leading-none">
                  {Number(formatUnits(BigInt(order.totalMBONE), 18)).toFixed(2)}
                </p>
                <div className="bg-brand-accent px-2 py-1 rounded text-[10px] font-black">MBONE</div>
              </div>
            </div>
            
            <div className="text-right">
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Equivalent Fiat Value</p>
               <p className="text-2xl font-black">${total.toFixed(2)} <span className="text-xs text-slate-500">USD</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center border-t border-slate-50 pt-8">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] leading-relaxed">
          Authorized Digital Signature — Verified via Sepolia Testnet<br />
          Thank you for securing the MBONE network.
        </p>
      </div>
    </div>
  );
}