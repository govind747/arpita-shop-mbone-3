import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Terms of Service
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Please read these terms carefully before using our website and services.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: January 30, 2024
        </p>
      </div>

      {/* Terms Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Clear Terms</h3>
            <p className="text-sm text-muted-foreground">
              Straightforward terms that are easy to understand
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Fair Usage</h3>
            <p className="text-sm text-muted-foreground">
              Reasonable terms that protect both you and us
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Your Rights</h3>
            <p className="text-sm text-muted-foreground">
              Clear explanation of your rights as a customer
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Responsibilities</h3>
            <p className="text-sm text-muted-foreground">
              What we expect from users of our platform
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              By accessing and using ModernMart's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use License</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Permission is granted to temporarily download one copy of the materials on ModernMart's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="text-muted-foreground space-y-1 ml-4">
              <li>• Modify or copy the materials</li>
              <li>• Use the materials for any commercial purpose or for any public display</li>
              <li>• Attempt to reverse engineer any software contained on the website</li>
              <li>• Remove any copyright or other proprietary notations from the materials</li>
            </ul>
            <p className="text-muted-foreground">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by ModernMart at any time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account Creation</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• You must provide accurate and complete information</li>
                <li>• You are responsible for maintaining account security</li>
                <li>• You must be at least 18 years old to create an account</li>
                <li>• One account per person is allowed</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Account Responsibilities</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Keep your login credentials secure</li>
                <li>• Notify us immediately of any unauthorized access</li>
                <li>• You are responsible for all activities under your account</li>
                <li>• Update your information when it changes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders and Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Order Processing</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• All orders are subject to acceptance and availability</li>
                <li>• We reserve the right to refuse or cancel any order</li>
                <li>• Prices are subject to change without notice</li>
                <li>• Orders are processed within 1-2 business days</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Crypto Payments</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• MBONE token payments are processed on Polygon network</li>
                <li>• You are responsible for transaction fees</li>
                <li>• Payments are final once confirmed on blockchain</li>
                <li>• Refunds for crypto payments are processed in USD equivalent</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We strive to provide accurate product information, but we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free.
            </p>
            <ul className="text-muted-foreground space-y-1 ml-4">
              <li>• Product images may not reflect exact appearance</li>
              <li>• Specifications are subject to manufacturer changes</li>
              <li>• Availability is not guaranteed until order confirmation</li>
              <li>• We reserve the right to correct errors in pricing or descriptions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping and Returns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Shipping</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Shipping times are estimates and not guaranteed</li>
                <li>• Risk of loss passes to you upon delivery</li>
                <li>• We are not responsible for shipping delays beyond our control</li>
                <li>• Additional fees may apply for remote locations</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Returns</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• 30-day return policy for most items</li>
                <li>• Items must be in original condition</li>
                <li>• Return shipping costs may apply</li>
                <li>• Some items are non-returnable</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              In no event shall ModernMart or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ModernMart's website, even if ModernMart or a ModernMart authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            <p className="text-muted-foreground">
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              ModernMart reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
            <p className="text-muted-foreground">
              We will notify users of significant changes via email or website notification.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> legal@modernmart.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Tech Street, Digital City, DC 12345</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

