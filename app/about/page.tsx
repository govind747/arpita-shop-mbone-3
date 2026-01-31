import { Shield, Truck, Star, Users, Award, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          About ModernMart
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're passionate about bringing you the latest technology and premium electronics 
          at prices that won't break the bank. Since our founding, we've been committed to 
          quality, innovation, and exceptional customer service.
        </p>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center p-6">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-brand-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-muted-foreground">
              We carefully curate every product to ensure you get the best quality and value.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-brand-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Focused</h3>
            <p className="text-muted-foreground">
              Your satisfaction is our priority. We're here to help every step of the way.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-brand-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We stay ahead of the curve to bring you the latest technological innovations.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Story Section */}
      <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-4">
              ModernMart was founded with a simple mission: to make cutting-edge technology 
              accessible to everyone. What started as a small online store has grown into a 
              trusted destination for tech enthusiasts and everyday consumers alike.
            </p>
            <p className="mb-4">
              We believe that everyone deserves access to quality electronics without paying 
              premium prices. That's why we work directly with manufacturers and leverage our 
              buying power to offer you the best deals on the market.
            </p>
            <p>
              Today, we're proud to serve thousands of customers worldwide, and we're just 
              getting started. Thank you for being part of our journey.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Truck className="h-6 w-6 text-brand-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-brand-secondary mb-2">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Free shipping on orders over $50 with fast delivery options available.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-brand-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-brand-secondary mb-2">Secure Shopping</h3>
            <p className="text-sm text-muted-foreground">
              Your personal and payment information is always protected with us.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Heart className="h-6 w-6 text-brand-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-brand-secondary mb-2">Customer Support</h3>
            <p className="text-sm text-muted-foreground">
              Our friendly support team is here to help you with any questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}