import { Truck, Clock, Shield, Package, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-20 space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
          Shipping Information
        </h1>
        <div className="h-1.5 w-24 bg-brand-accent mx-auto rounded-full mb-8" />
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Fast, reliable shipping to get your products to you quickly and safely. 
          Track every step of your order's journey.
        </p>
      </div>

      {/* Shipping Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        
        {/* Free Shipping */}
        <Card className="group border-muted/60 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/5 hover:-translate-y-2 relative overflow-hidden bg-background/50 backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-6 w-6 text-emerald-500" />
              </div>
              Free Standard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-3xl font-bold text-foreground">$0.00</span>
              <span className="text-muted-foreground text-sm"> / orders over $50</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Our standard delivery. Reliable and perfect for your everyday purchases.
            </p>
            <ul className="text-sm text-foreground/80 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" /> 5-7 business days
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" /> Real-time tracking included
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Express Shipping (Highlighted as Popular) */}
        <Card className="group border-brand-accent/30 shadow-lg shadow-brand-accent/5 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/10 hover:-translate-y-2 relative overflow-hidden bg-background/50 backdrop-blur-sm scale-105 md:scale-100 lg:scale-105">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-secondary" />
          <div className="absolute top-4 right-4 bg-brand-accent/10 text-brand-accent text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2.5 bg-brand-accent/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-brand-accent" />
              </div>
              Express Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-3xl font-bold text-foreground">$9.99</span>
              <span className="text-muted-foreground text-sm"> / flat rate</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Get your order faster with express shipping. Perfect for a quick turnaround.
            </p>
            <ul className="text-sm text-foreground/80 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-accent" /> 2-3 business days
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-accent" /> Priority handling
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-accent" /> SMS notifications
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Overnight Shipping */}
        <Card className="group border-muted/60 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/5 hover:-translate-y-2 relative overflow-hidden bg-background/50 backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Package className="h-6 w-6 text-purple-500" />
              </div>
              Overnight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-3xl font-bold text-foreground">$24.99</span>
              <span className="text-muted-foreground text-sm"> / flat rate</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Need it tomorrow? Overnight shipping is available for your urgent orders.
            </p>
            <ul className="text-sm text-foreground/80 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-500" /> Next business day
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-500" /> Signature required
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Shipping Policies & Secure Packaging */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-2 border-muted/60 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-brand-secondary">Core Policies</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="group border-l-2 border-transparent hover:border-brand-accent pl-4 transition-colors duration-200">
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-brand-accent transition-colors">Processing Time</h3>
              <p className="text-muted-foreground text-sm">
                Orders are processed within 1-2 business days. Weekend orders ship on Monday.
              </p>
            </div>

            <div className="group border-l-2 border-transparent hover:border-brand-accent pl-4 transition-colors duration-200">
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-brand-accent transition-colors">Shipping Locations</h3>
              <p className="text-muted-foreground text-sm">
                We ship to all 50 US states. International shipping is not available at this time.
              </p>
            </div>

            <div className="group border-l-2 border-transparent hover:border-brand-accent pl-4 transition-colors duration-200">
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-brand-accent transition-colors">Order Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Once shipped, you'll receive a tracking link via email to monitor your package.
              </p>
            </div>

            <div className="group border-l-2 border-transparent hover:border-brand-accent pl-4 transition-colors duration-200">
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-brand-accent transition-colors">Delivery Issues</h3>
              <p className="text-muted-foreground text-sm">
                If issues occur, contact customer service within 48 hours of expected delivery.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted/60 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-brand-secondary">
              <Shield className="h-5 w-5 text-brand-accent" />
              Packaging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              All orders are carefully packaged to ensure your items arrive in perfect condition.
            </p>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Protective materials
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Extra fragile protection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Eco-friendly boxes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Discreet for privacy
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}