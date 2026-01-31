import { Shield, Eye, Lock, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Privacy Policy
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we collect, use, 
          and protect your personal information.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: January 30, 2024
        </p>
      </div>

      {/* Privacy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Data Protection</h3>
            <p className="text-sm text-muted-foreground">
              We use industry-standard encryption to protect your data
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Transparency</h3>
            <p className="text-sm text-muted-foreground">
              Clear information about what data we collect and why
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Secure Storage</h3>
            <p className="text-sm text-muted-foreground">
              Your information is stored securely and never sold
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Your Control</h3>
            <p className="text-sm text-muted-foreground">
              You can access, update, or delete your data anytime
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <p className="text-muted-foreground mb-2">
                When you create an account or make a purchase, we collect:
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Name and contact information</li>
                <li>• Email address and phone number</li>
                <li>• Shipping and billing addresses</li>
                <li>• Payment information (processed securely)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Crypto Wallet Information</h3>
              <p className="text-muted-foreground mb-2">
                For MBONE token payments, we collect:
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Wallet addresses for transaction processing</li>
                <li>• Transaction hashes for order verification</li>
                <li>• Network information (Polygon blockchain)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Usage Information</h3>
              <p className="text-muted-foreground mb-2">
                We automatically collect certain information when you use our website:
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Browser type and version</li>
                <li>• IP address and location data</li>
                <li>• Pages visited and time spent</li>
                <li>• Device information and screen resolution</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Order Processing</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Process and fulfill your orders</li>
                <li>• Send order confirmations and updates</li>
                <li>• Handle returns and customer service</li>
                <li>• Process crypto payments securely</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Communication</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Send important account notifications</li>
                <li>• Respond to your inquiries and support requests</li>
                <li>• Send promotional emails (with your consent)</li>
                <li>• Provide customer support</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Website Improvement</h3>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Analyze website usage and performance</li>
                <li>• Improve our products and services</li>
                <li>• Personalize your shopping experience</li>
                <li>• Prevent fraud and ensure security</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Information Sharing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="text-muted-foreground space-y-2 ml-4">
              <li>• <strong>Service Providers:</strong> With trusted partners who help us operate our business (shipping, payment processing)</li>
              <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li>• <strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
              <li>• <strong>Consent:</strong> When you explicitly consent to sharing</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your personal information:
            </p>
            <ul className="text-muted-foreground space-y-2 ml-4">
              <li>• SSL encryption for all data transmission</li>
              <li>• Secure servers with regular security updates</li>
              <li>• Limited access to personal information</li>
              <li>• Regular security audits and monitoring</li>
              <li>• Blockchain security for crypto transactions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="text-muted-foreground space-y-2 ml-4">
              <li>• <strong>Access:</strong> Request a copy of your personal data</li>
              <li>• <strong>Correction:</strong> Update or correct inaccurate information</li>
              <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
              <li>• <strong>Portability:</strong> Request your data in a portable format</li>
              <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, contact us at privacy@modernmart.com
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> privacy@modernmart.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Tech Street, Digital City, DC 12345</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
