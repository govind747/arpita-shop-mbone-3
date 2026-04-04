'use client'

import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, X, LayoutGrid, List, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase/client'
import { Product } from '@/lib/types/database'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState('all')

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProducts()
    }, 300) // Debounce search to prevent excessive DB calls
    return () => clearTimeout(handler)
  }, [searchTerm, sortBy, priceRange])

  const fetchProducts = async () => {
    setLoading(true)
    let query = supabase.from('products').select('*').eq('is_active', true)

    if (searchTerm) query = query.ilike('name', `%${searchTerm}%`)

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      query = query.gte('final_mrp', min)
      if (max) query = query.lte('final_mrp', max)
    }

    if (sortBy === 'price-low') query = query.order('final_mrp', { ascending: true })
    else if (sortBy === 'price-high') query = query.order('final_mrp', { ascending: false })
    else query = query.order(sortBy, { ascending: true })

    const { data, error } = await query
    if (!error) setProducts(data || [])
    setLoading(false)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setPriceRange('all')
    setSortBy('name')
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Header Area */}
      <div className="bg-white border-b border-slate-100 pt-16 pb-12 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-xs">
                <Sparkles className="h-4 w-4" /> Discover
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                All <span className="text-slate-400">Products</span>
              </h1>
              <p className="text-slate-500 max-w-md font-medium">
                Browse our precision-engineered collection of premium electronics.
              </p>
            </div>
            
            {/* Search Bar - High Contrast */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Find your next upgrade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 bg-white border-none shadow-xl rounded-2xl text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 space-y-8 shrink-0">
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h3>
              <div className="space-y-6">
                {/* Price Filter Group */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Price Range</label>
                  <div className="flex flex-col gap-2">
                    {['all', '0-50', '50-100', '100-200', '200-'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setPriceRange(range)}
                        className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          priceRange === range 
                          ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' 
                          : 'bg-white text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {range === 'all' ? 'All Prices' : range.endsWith('-') ? `Over $${range.slice(0,-1)}` : `$${range.replace('-', ' - $')}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Product Area */}
          <div className="flex-1 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] border-none bg-slate-50 font-bold rounded-xl h-10">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem value="name">Alphabetical</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="created_at">Newest Arrivals</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Clear Filters Pill */}
                {(searchTerm || priceRange !== 'all') && (
                  <Button variant="ghost" onClick={clearFilters} className="text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                    Clear All <X className="ml-2 h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button className="p-2 hover:bg-slate-100 rounded-lg text-brand-accent bg-slate-50"><LayoutGrid className="h-4 w-4" /></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg"><List className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center gap-2 px-2">
              <span className="text-sm font-bold text-slate-900">{products.length}</span>
              <span className="text-sm text-slate-500 font-medium">Products Matching your criteria</span>
            </div>

            {/* Products Grid / Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-[2.5rem]" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
                <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}