import { Truck, Clock, Shield, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Shipping Information
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Fast, reliable shipping to get your products to you quickly and safely.
        </p>
      </div>

      {/* Shipping Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-brand-accent" />
              Free Standard Shipping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Free shipping on all orders over $50. Delivery within 5-7 business days.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Orders over $50</li>
              <li>• 5-7 business days</li>
              <li>• Tracking included</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-accent" />
              Express Shipping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get your order faster with express shipping. Delivery within 2-3 business days.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• $9.99 flat rate</li>
              <li>• 2-3 business days</li>
              <li>• Priority handling</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-brand-accent" />
              Overnight Shipping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Need it tomorrow? Overnight shipping available for urgent orders.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• $24.99 flat rate</li>
              <li>• Next business day</li>
              <li>• Signature required</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Shipping Policies */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Processing Time</h3>
              <p className="text-muted-foreground">
                Orders are processed within 1-2 business days. Orders placed on weekends or holidays 
                will be processed the next business day.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Shipping Locations</h3>
              <p className="text-muted-foreground">
                We currently ship to all 50 US states. International shipping is not available at this time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Order Tracking</h3>
              <p className="text-muted-foreground">
                Once your order ships, you'll receive a tracking number via email. You can track your 
                package on our website or the carrier's website.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Delivery Issues</h3>
              <p className="text-muted-foreground">
                If you experience any issues with delivery, please contact our customer service team 
                within 48 hours of the expected delivery date.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-accent" />
              Secure Packaging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              All orders are carefully packaged to ensure your items arrive in perfect condition.
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>• Protective packaging materials</li>
              <li>• Fragile items receive extra protection</li>
              <li>• Eco-friendly packaging when possible</li>
              <li>• Discreet packaging for privacy</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
