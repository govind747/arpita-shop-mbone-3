import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Shield, Truck, Zap, Globe, Cpu, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/lib/types/database'
import { cn } from '@/lib/utils'

export default async function HomePage() {
  const supabase = createServerSupabaseClient()

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(8)

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-brand-accent selection:text-white">
      {/* Hero Section - Bento Style */}
<section className="relative pt-[10px] pb-12 overflow-hidden min-h-[85vh] flex items-center">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-brand-accent/10 blur-[100px] rounded-full -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 animate-in fade-in slide-in-from-top-2 duration-1000">
              <Zap className="h-3 w-3 text-brand-accent fill-brand-accent" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Next-Gen Protocol Active</span>
            </div>
            
            {/* Reduced from text-8xl to text-6xl/7xl for better fit */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95] text-white uppercase">
              FUTURE OF <br />
              <span className="text-brand-accent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">HARDWARE.</span>
            </h1>
            
            <p className="text-base md:text-lg mb-10 text-slate-400 max-w-xl leading-relaxed font-medium">
              Equip your digital lifestyle with high-performance electronics. 
              Verified on-chain, delivered to your door.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-brand-accent hover:bg-brand-accent/90 text-white font-black text-base shadow-2xl shadow-brand-accent/20 group">
                  Deploy Inventory <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/deals">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-base backdrop-blur-sm">
                  Marketplace Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Protocol Section */}
      <section className="py-12 border-y border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Truck, title: "Global Logistics", desc: "Rapid transit on orders > $50" },
              { icon: Shield, title: "Secured Nodes", desc: "Encryption for every transaction" },
              { icon: Globe, title: "Decentralized Access", desc: "Premium hardware for everyone" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                  <feature.icon className="h-6 w-6 text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest text-white">{feature.title}</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-8 bg-brand-accent rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Featured Hardware</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">ELITE GEAR.</h2>
            </div>
            
            <Link href="/products" className="group">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-brand-accent transition-colors">View All Specs</span>
              <div className="h-0.5 w-full bg-slate-800 mt-1 overflow-hidden">
                <div className="h-full w-0 group-hover:w-full bg-brand-accent transition-all duration-500" />
              </div>
            </Link>
          </div>
          
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-blue-500/20 blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-slate-900/40 rounded-[2.5rem] border border-white/5 p-8 backdrop-blur-sm">
                <ProductGrid products={featuredProducts as Product[]} />
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
              <Cpu className="h-12 w-12 text-slate-700 mx-auto mb-4 animate-pulse" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Awaiting Inventory Sync...</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Grid - Bento Cards */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Categories / Protocols</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Headphones', count: '25+ Units', color: 'from-orange-500/20' },
              { name: 'Smartwatches', count: '15+ Units', color: 'from-brand-accent/20' },
              { name: 'Laptops', count: '30+ Units', color: 'from-blue-500/20' },
              { name: 'Accessories', count: '50+ Units', color: 'from-emerald-500/20' }
            ].map((category) => (
              <Link key={category.name} href="/products">
                <div className={cn(
                  "relative h-48 rounded-[2rem] border border-white/5 bg-slate-900/50 p-8 overflow-hidden group transition-all hover:scale-[1.02] hover:border-white/10",
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity hover:before:opacity-100",
                  category.color
                )}>
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-accent group-hover:border-brand-accent transition-all">
                      <ChevronRight className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight">{category.name}</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{category.count}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer-ready CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-brand-accent rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center shadow-2xl shadow-brand-accent/20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
                READY TO <br />UPGRADE?
              </h2>
              <Link href="/products">
                <Button className="h-16 px-12 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xl uppercase tracking-widest">
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}