import { ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or directly on the carrier's website. You can also check your order status by logging into your account and visiting the 'My Orders' section."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We currently accept MBONE token payments through our crypto payment system. Traditional payment methods (credit cards, PayPal) will be available soon. All crypto payments are processed securely on the Polygon network."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping (free on orders over $50) takes 5-7 business days. Express shipping ($9.99) takes 2-3 business days, and overnight shipping ($24.99) delivers the next business day. Processing time is 1-2 business days for all orders."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Items must be in original condition with all packaging and accessories. Contact our support team to initiate a return, and we'll provide a prepaid return label. Refunds are processed within 5-7 business days after we receive your return."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within the United States to all 50 states. International shipping is not available at this time, but we're working to expand our shipping options in the future."
  },
  {
    question: "How do I connect my crypto wallet?",
    answer: "After signing in to your account, you'll see a 'Connect Wallet' button in the header. Click it to connect your Web3 wallet (MetaMask, WalletConnect, etc.). Make sure you're on the Polygon network to make MBONE token payments."
  },
  {
    question: "What is MBONE token?",
    answer: "MBONE is our native cryptocurrency token used for payments on ModernMart. It's built on the Polygon network for fast and low-cost transactions. The current price is displayed during checkout, and you can pay for your orders using MBONE tokens."
  },
  {
    question: "Are your products authentic?",
    answer: "Yes, all products sold on ModernMart are 100% authentic. We work directly with manufacturers and authorized distributors to ensure you receive genuine products with full manufacturer warranties."
  },
  {
    question: "How do I cancel my order?",
    answer: "You can cancel your order within 1 hour of placing it by contacting our customer service team. Once an order has been processed and shipped, it cannot be canceled, but you can return it using our 30-day return policy."
  },
  {
    question: "Do you offer price matching?",
    answer: "We strive to offer competitive prices on all our products. While we don't have a formal price matching policy, we regularly review our prices to ensure they remain competitive in the market."
  },
  {
    question: "How do I create an account?",
    answer: "Click the 'Sign In' button in the header and then select 'Create Account'. Fill in your details including name, email, and password. You can also sign up using your Google account for faster registration."
  },
  {
    question: "What if I receive a damaged item?",
    answer: "If you receive a damaged item, please contact our customer service team immediately with photos of the damage. We'll arrange for a replacement or full refund at no cost to you, including return shipping."
  }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about shopping, shipping, returns, and more.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border/50 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-brand-secondary pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Contact Section */}
      <div className="bg-brand-accent/10 rounded-2xl p-8 mt-16 text-center">
        <h3 className="text-2xl font-bold text-brand-secondary mb-4">
          Still Have Questions?
        </h3>
        <p className="text-muted-foreground mb-6">
          Can't find what you're looking for? Our customer service team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-accent/90 transition-colors"
          >
            Contact Support
          </a>
          <a 
            href="mailto:support@modernmart.com" 
            className="px-6 py-3 border border-brand-accent text-brand-accent rounded-lg hover:bg-brand-accent/10 transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}
            