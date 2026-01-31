import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types/database'
import { Percent, Clock, Star } from 'lucide-react'

export default async function DealsPage() {
  const supabase = createServerSupabaseClient()

  // Fetch products with discounts
  const { data: dealProducts } = await supabase
    .from('products')
    .select('*')
    .gt('discount', 0)
    .eq('is_active', true)
    .order('discount', { ascending: false })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Percent className="h-8 w-8 text-brand-accent" />
          <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary">
            Hot Deals
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Don't miss out on these amazing deals! Limited time offers on premium electronics.
        </p>
      </div>

      {/* Deal Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white text-center">
          <Percent className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Up to 50% Off</h3>
          <p className="text-white/90">Selected electronics</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
          <Clock className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Flash Sales</h3>
          <p className="text-white/90">Limited time offers</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white text-center">
          <Star className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Featured Deals</h3>
          <p className="text-white/90">Handpicked savings</p>
        </div>
      </div>

      {/* Deal Products */}
      {dealProducts && dealProducts.length > 0 ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-brand-secondary">All Deals</h2>
            <Badge className="bg-brand-highlight text-white">
              {dealProducts.length} deals available
            </Badge>
          </div>
          <ProductGrid products={dealProducts as Product[]} />
        </div>
      ) : (
        <div className="text-center py-16">
          <Percent className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-brand-secondary mb-2">No deals available</h2>
          <p className="text-muted-foreground">Check back soon for amazing deals!</p>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-brand-accent/10 rounded-2xl p-8 mt-16 text-center">
        <h3 className="text-2xl font-bold text-brand-secondary mb-4">
          Never Miss a Deal
        </h3>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter and be the first to know about exclusive deals and offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-brand-accent"
          />
          <button className="px-6 py-2 bg-brand-accent text-white rounded-lg hover:bg-brand-accent/90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
