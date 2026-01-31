import { Cookie, Settings, Eye, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Cookie Policy
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn about how we use cookies and similar technologies to improve your experience on our website.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: January 30, 2024
        </p>
      </div>

      {/* Cookie Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cookie className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Essential Cookies</h3>
            <p className="text-sm text-muted-foreground">
              Required for basic website functionality
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Help us understand how you use our site
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Remember your settings and choices
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-brand-accent" />
            </div>
            <h3 className="font-semibold mb-2">Your Control</h3>
            <p className="text-sm text-muted-foreground">
              Manage your cookie preferences anytime
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Policy Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>What Are Cookies?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
            <p className="text-muted-foreground">
              We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Types of Cookies We Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Cookie className="h-4 w-4 text-brand-accent" />
                Essential Cookies
              </h3>
              <p className="text-muted-foreground mb-2">
                These cookies are necessary for the website to function properly. They cannot be disabled.
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Authentication and login status</li>
                <li>• Shopping cart contents</li>
                <li>• Security and fraud prevention</li>
                <li>• Website functionality and navigation</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4 text-brand-accent" />
                Analytics Cookies
              </h3>
              <p className="text-muted-foreground mb-2">
                These cookies help us understand how visitors interact with our website.
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Page views and user behavior</li>
                <li>• Traffic sources and referrals</li>
                <li>• Popular products and pages</li>
                <li>• Website performance metrics</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4 text-brand-accent" />
                Functional Cookies
              </h3>
              <p className="text-muted-foreground mb-2">
                These cookies enable enhanced functionality and personalization.
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Language and region preferences</li>
                <li>• Theme and display settings</li>
                <li>• Recently viewed products</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Marketing Cookies</h3>
              <p className="text-muted-foreground mb-2">
                These cookies are used to deliver relevant advertisements and track campaign effectiveness.
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Targeted advertising</li>
                <li>• Social media integration</li>
                <li>• Email marketing optimization</li>
                <li>• Conversion tracking</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We may use third-party services that set their own cookies. These include:
            </p>
            <ul className="text-muted-foreground space-y-2 ml-4">
              <li>• <strong>Google Analytics:</strong> For website analytics and performance tracking</li>
              <li>• <strong>Payment Processors:</strong> For secure payment processing</li>
              <li>• <strong>Social Media:</strong> For social sharing and login functionality</li>
              <li>• <strong>Customer Support:</strong> For chat and support services</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              These third parties have their own privacy policies and cookie practices, which we encourage you to review.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Managing Your Cookie Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Browser Settings</h3>
              <p className="text-muted-foreground mb-2">
                You can control cookies through your browser settings:
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Block all cookies</li>
                <li>• Block third-party cookies only</li>
                <li>• Delete existing cookies</li>
                <li>• Set cookies to expire when you close your browser</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cookie Consent</h3>
              <p className="text-muted-foreground mb-4">
                When you first visit our website, you'll see a cookie consent banner. You can:
              </p>
              <ul className="text-muted-foreground space-y-1 ml-4">
                <li>• Accept all cookies</li>
                <li>• Customize your preferences</li>
                <li>• Reject non-essential cookies</li>
                <li>• Change your preferences anytime</li>
              </ul>
              <Button className="mt-4 bg-brand-accent hover:bg-brand-accent/90">
                Manage Cookie Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact of Disabling Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              While you can disable cookies, doing so may affect your experience on our website:
            </p>
            <ul className="text-muted-foreground space-y-2 ml-4">
              <li>• You may need to re-enter information repeatedly</li>
              <li>• Some features may not work properly</li>
              <li>• Your preferences won't be remembered</li>
              <li>• Shopping cart contents may not persist</li>
              <li>• Personalized recommendations won't be available</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Updates to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
            <p className="text-muted-foreground">
              We will notify you of any significant changes by posting the updated policy on our website and updating the "Last updated" date at the top of this page.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our use of cookies, please contact us:
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