import { MessageCircle, Mail, Phone, Clock, CircleHelp as HelpCircle, Book } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Customer Support
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're here to help! Get the support you need with our comprehensive help resources 
          and dedicated customer service team.
        </p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center hover-lift cursor-pointer">
          <CardHeader>
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-brand-accent" />
            </div>
            <CardTitle>Live Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get instant help with our live chat support. Available during business hours.
            </p>
            <Button className="bg-brand-accent hover:bg-brand-accent/90">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover-lift cursor-pointer">
          <CardHeader>
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-brand-accent" />
            </div>
            <CardTitle>Email Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Send us an email and we'll respond within 24 hours with a detailed solution.
            </p>
            <Button variant="outline">
              <a href="mailto:support@modernmart.com">Send Email</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover-lift cursor-pointer">
          <CardHeader>
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-brand-accent" />
            </div>
            <CardTitle>Phone Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Speak directly with our support team for immediate assistance.
            </p>
            <Button variant="outline">
              <a href="tel:+15551234567">Call Now</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Hours */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand-accent" />
            Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Live Chat & Phone</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
                <li>Saturday: 10:00 AM - 4:00 PM EST</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>24/7 - We respond within 24 hours</li>
                <li>Priority support for urgent issues</li>
                <li>Detailed responses with solutions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-brand-accent" />
              Quick Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/faq" className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Frequently Asked Questions</h4>
                <p className="text-sm text-muted-foreground">Find answers to common questions</p>
              </Link>
              
              <Link href="/orders" className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Track Your Order</h4>
                <p className="text-sm text-muted-foreground">Check your order status and tracking</p>
              </Link>
              
              <Link href="/returns" className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Returns & Exchanges</h4>
                <p className="text-sm text-muted-foreground">Learn about our return policy</p>
              </Link>
              
              <Link href="/shipping" className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <h4 className="font-medium">Shipping Information</h4>
                <p className="text-sm text-muted-foreground">Delivery options and policies</p>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-brand-accent" />
              Help Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-1">Account & Login Issues</h4>
                <p className="text-sm text-muted-foreground">Password reset, account creation, login problems</p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-1">Payment & Crypto Wallet</h4>
                <p className="text-sm text-muted-foreground">MBONE payments, wallet connection, transaction issues</p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-1">Product Information</h4>
                <p className="text-sm text-muted-foreground">Specifications, compatibility, warranty details</p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-1">Technical Support</h4>
                <p className="text-sm text-muted-foreground">Website issues, app problems, technical difficulties</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Urgent Issue?
        </h3>
        <p className="text-red-700 mb-4">
          For urgent matters like payment issues or order problems, contact us immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Phone className="h-4 w-4 mr-2" />
            Call: +1 (555) 123-4567
          </Button>
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
            <Mail className="h-4 w-4 mr-2" />
            Email: urgent@modernmart.com
          </Button>
        </div>
      </div>
    </div>
  )
}
