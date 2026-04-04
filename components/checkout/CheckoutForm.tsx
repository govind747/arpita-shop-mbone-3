'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Wallet, Truck, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { CryptoPayment } from './CryptoPayment'
import { cn } from '@/lib/utils'

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto')
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }))
  }

  const inputClasses = "h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-900 focus:ring-2 focus:ring-brand-accent/20 transition-all placeholder:text-slate-300 placeholder:font-medium"
  const labelClasses = "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block"

  return (
    <div className="space-y-12">
      {/* Section 1: Destination */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-accent/10 rounded-xl flex items-center justify-center">
            <MapPin className="h-5 w-5 text-brand-accent" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Shipping Destination</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Where should we send your gear?</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label className={labelClasses}>Full Legal Name</Label>
            <Input
              className={inputClasses}
              value={shippingInfo.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label className={labelClasses}>Communication Email</Label>
            <Input
              className={inputClasses}
              type="email"
              value={shippingInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label className={labelClasses}>Physical Address</Label>
            <Input
              className={inputClasses}
              value={shippingInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Street name, suite, or apartment"
            />
          </div>
          
          <div className="grid grid-cols-2 md:col-span-2 gap-4">
            <div>
              <Label className={labelClasses}>City</Label>
              <Input
                className={inputClasses}
                value={shippingInfo.city}
                placeholder="City"
              />
            </div>
            <div>
              <Label className={labelClasses}>Zip Code</Label>
              <Input
                className={inputClasses}
                value={shippingInfo.zipCode}
                placeholder="00000"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-100" />

      {/* Section 2: Payment Protocol */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Payment Protocol</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select your preferred transaction method</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* MBONE Payment Card */}
          <button 
            onClick={() => setPaymentMethod('crypto')}
            className={cn(
              "relative p-6 rounded-[2rem] border-2 text-left transition-all group",
              paymentMethod === 'crypto' 
                ? "border-brand-accent bg-brand-accent/5 ring-4 ring-brand-accent/5" 
                : "border-slate-100 bg-white hover:border-slate-200"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center transition-colors",
                paymentMethod === 'crypto' ? "bg-brand-accent text-white" : "bg-slate-100 text-slate-400"
              )}>
                <Wallet className="h-6 w-6" />
              </div>
              {paymentMethod === 'crypto' && <CheckCircle2 className="h-6 w-6 text-brand-accent" />}
            </div>
            <h4 className="font-black text-slate-900 tracking-tight">MBONE Token</h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Web3 Native Payment</p>
          </button>

          {/* Card Payment Card (Disabled) */}
          <div className="relative p-6 rounded-[2rem] border-2 border-slate-100 bg-slate-50/50 opacity-60 cursor-not-allowed">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                <CreditCard className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black bg-slate-200 text-slate-500 px-2 py-1 rounded-md uppercase tracking-widest">Legacy</span>
            </div>
            <h4 className="font-black text-slate-400 tracking-tight">Fiat Currency</h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter italic">Coming soon via Stripe</p>
          </div>
        </div>

        {/* Dynamic Payment Content */}
        <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
          {paymentMethod === 'crypto' ? (
            <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full" />
               <CryptoPayment />
            </div>
          ) : (
            <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem]">
              <p className="text-slate-400 font-bold">Standard card processing is temporarily offline for maintenance.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}