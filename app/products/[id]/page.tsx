import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ProductDetails } from '@/components/products/ProductDetails'
import { Product } from '@/lib/types/database'
import { notFound } from 'next/navigation'
import { ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import Link from 'next/link'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = createServerSupabaseClient()

  // Parallel data fetching for better performance
  const [productResponse, imagesResponse] = await Promise.all([
    supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .eq('is_active', true)
      .single(),
    supabase
      .from('product_images')
      .select('*')
      .eq('product_id', params.id)
      .order('position')
  ])

  const product = productResponse.data
  const productImages = imagesResponse.data

  if (productResponse.error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Modern Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm font-medium text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <Link href="/products" className="hover:text-brand-accent transition-colors">Shop</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-slate-900 truncate">{product.name}</span>
        </nav>

        {/* The Main Stage */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <ProductDetails 
            product={product as Product} 
            images={productImages || []} 
          />
          
          {/* Bottom Utility Bar (Trust Signals) */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-4 p-8 border-r border-slate-100 group">
              <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">2-Year Warranty</h4>
                <p className="text-xs text-slate-500">Full coverage for any defects</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-8 border-r border-slate-100 group">
              <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Express Shipping</h4>
                <p className="text-xs text-slate-500">Free delivery on orders over $150</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-8 group">
              <div className="p-3 bg-white rounded-2xl text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">30-Day Returns</h4>
                <p className="text-xs text-slate-500">Hassle-free money back guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upsell / Related Products Anchor (Placeholder for your logic) */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900">You might also like</h3>
            <Link href="/products" className="text-sm font-bold text-brand-accent hover:underline">
              View all products
            </Link>
          </div>
          {/* <RelatedProducts currentId={params.id} category={product.category} /> */}
        </div>
      </div>
    </div>
  )
}