import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-brand-secondary text-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-brand-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">ModernMart</span>
            </div>
            <p className="text-white/80 text-sm">
              Your trusted destination for premium electronics and gadgets. 
              Quality products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-brand-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-brand-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-brand-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-white/80 hover:text-brand-accent transition-colors text-sm">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-accent" />
                <span className="text-white/80 text-sm">support@modernmart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-accent" />
                <span className="text-white/80 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-brand-accent" />
                <span className="text-white/80 text-sm">123 Tech Street, Digital City, DC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 ModernMart. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-white/60 hover:text-brand-accent transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-brand-accent transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-white/60 hover:text-brand-accent transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}