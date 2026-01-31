import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Contact Us
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question or need help? We're here to assist you. Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-brand-secondary mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-secondary mb-1">Email</h3>
                <p className="text-muted-foreground">support@modernmart.com</p>
                <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-secondary mb-1">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-secondary mb-1">Address</h3>
                <p className="text-muted-foreground">123 Tech Street</p>
                <p className="text-muted-foreground">Digital City, DC 12345</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-secondary mb-1">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                />
              </div>

              <Button className="w-full bg-brand-accent hover:bg-brand-accent/90">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}