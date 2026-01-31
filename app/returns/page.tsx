import { RotateCcw, Shield, Clock, CircleCheck as CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Returns & Exchanges
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Not satisfied with your purchase? We offer hassle-free returns and exchanges 
          to ensure your complete satisfaction.
        </p>
      </div>

      {/* Return Process */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-brand-accent">1</span>
          </div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-muted-foreground">
            Reach out to our support team to initiate your return
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-brand-accent">2</span>
          </div>
          <h3 className="font-semibold mb-2">Get Return Label</h3>
          <p className="text-sm text-muted-foreground">
            We'll provide a prepaid return shipping label
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-brand-accent">3</span>
          </div>
          <h3 className="font-semibold mb-2">Ship It Back</h3>
          <p className="text-sm text-muted-foreground">
            Package your item and ship it back using our label
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-brand-accent">4</span>
          </div>
          <h3 className="font-semibold mb-2">Get Refund</h3>
          <p className="text-sm text-muted-foreground">
            Receive your refund within 5-7 business days
          </p>
        </div>
      </div>

      {/* Return Policies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-accent" />
              Return Window
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You have 30 days from the date of delivery to return most items for a full refund.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 30-day return window</li>
              <li>• Items must be in original condition</li>
              <li>• Original packaging required</li>
              <li>• All accessories included</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-accent" />
              Return Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              To ensure a smooth return process, please make sure your item meets these conditions:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Unused and in original condition</li>
              <li>• No signs of wear or damage</li>
              <li>• All tags and labels attached</li>
              <li>• Original receipt or order number</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Non-Returnable Items */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle>Non-Returnable Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            For health and safety reasons, the following items cannot be returned:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Personalized or customized items</li>
              <li>• Items damaged by misuse</li>
              <li>• Software with broken seals</li>
            </ul>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Items without original packaging</li>
              <li>• Gift cards and digital products</li>
              <li>• Items returned after 30 days</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Exchanges */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-brand-accent" />
            Exchanges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Need a different size or color? We offer free exchanges for the same item.
          </p>
          <ul className="text-muted-foreground space-y-2 mb-6">
            <li>• Free exchanges for same item</li>
            <li>• Subject to availability</li>
            <li>• Same return conditions apply</li>
            <li>• Processing time: 3-5 business days</li>
          </ul>
          <Button className="bg-brand-accent hover:bg-brand-accent/90">
            Start Exchange Process
          </Button>
        </CardContent>
      </Card>

      {/* Refund Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-brand-accent" />
            Refund Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Processing Time</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Refunds are processed within 2-3 business days after we receive your return.
              </p>
              
              <h3 className="font-semibold mb-2">Refund Method</h3>
              <p className="text-sm text-muted-foreground">
                Refunds are issued to the original payment method used for the purchase.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Crypto Payments</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For MBONE token payments, refunds will be processed in USD equivalent.
              </p>
              
              <h3 className="font-semibold mb-2">Partial Refunds</h3>
              <p className="text-sm text-muted-foreground">
                Items showing signs of use may receive a partial refund based on condition.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
