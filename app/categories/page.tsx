import Link from 'next/link'
import { Headphones, Watch, Laptop, Smartphone, Camera, Gamepad2, Speaker, Usb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    name: 'Headphones & Audio',
    icon: Headphones,
    count: '25+ items',
    description: 'Premium headphones, earbuds, and audio accessories',
    color: 'bg-blue-500'
  },
  {
    name: 'Smartwatches',
    icon: Watch,
    count: '15+ items',
    description: 'Fitness trackers and smart wearables',
    color: 'bg-green-500'
  },
  {
    name: 'Laptops & Computers',
    icon: Laptop,
    count: '30+ items',
    description: 'Laptops, accessories, and computer peripherals',
    color: 'bg-purple-500'
  },
  {
    name: 'Smartphones',
    icon: Smartphone,
    count: '20+ items',
    description: 'Latest smartphones and mobile accessories',
    color: 'bg-red-500'
  },
  {
    name: 'Cameras',
    icon: Camera,
    count: '18+ items',
    description: 'Digital cameras, webcams, and photography gear',
    color: 'bg-yellow-500'
  },
  {
    name: 'Gaming',
    icon: Gamepad2,
    count: '35+ items',
    description: 'Gaming keyboards, mice, and accessories',
    color: 'bg-indigo-500'
  },
  {
    name: 'Speakers',
    icon: Speaker,
    count: '22+ items',
    description: 'Bluetooth speakers and sound systems',
    color: 'bg-pink-500'
  },
  {
    name: 'Accessories',
    icon: Usb,
    count: '50+ items',
    description: 'Cables, chargers, and tech accessories',
    color: 'bg-orange-500'
  }
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Shop by Category
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our wide range of electronics and gadgets organized by category. 
          Find exactly what you're looking for.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Link key={category.name} href="/products">
              <Card className="group hover-lift cursor-pointer border-border/50">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-secondary mb-2 group-hover:text-brand-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <div className="text-xs text-brand-accent font-medium">
                    {category.count}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Featured Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-brand-secondary mb-8 text-center">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/products">
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white hover-lift cursor-pointer overflow-hidden">
              <div className="relative z-10">
                <Headphones className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Audio & Headphones</h3>
                <p className="text-white/90 text-sm">Premium sound quality</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            </div>
          </Link>

          <Link href="/products">
            <div className="relative bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white hover-lift cursor-pointer overflow-hidden">
              <div className="relative z-10">
                <Watch className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Wearables</h3>
                <p className="text-white/90 text-sm">Track your fitness goals</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            </div>
          </Link>

          <Link href="/products">
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white hover-lift cursor-pointer overflow-hidden">
              <div className="relative z-10">
                <Gamepad2 className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Gaming Gear</h3>
                <p className="text-white/90 text-sm">Level up your game</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}