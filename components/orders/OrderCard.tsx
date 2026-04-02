'use client'

import { useState } from 'react'
import { Package, Clock, CircleCheck as CheckCircle, Circle as XCircle, Truck, ExternalLink, Wallet, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Order, OrderItem, Shipment } from '@/lib/types/database'
import { Separator } from '@/components/ui/separator'

interface OrderWithItems extends Order {
  order_items: OrderItem[]
  shipments: Shipment[]
}

interface OrderCardProps {
  order: OrderWithItems
}

export function OrderCard({ order }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false)
  const shipment = order.shipments?.[0] // Get the first (and likely only) shipment

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'paid':
        return <CheckCircle className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500'
      case 'paid':
        return 'bg-blue-500'
      case 'shipped':
        return 'bg-green-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getShipmentStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500'
      case 'shipped':
        return 'bg-blue-500'
      case 'in_transit':
        return 'bg-purple-500'
      case 'delivered':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  // Format MBONE amount (convert from wei/string to readable number)
  const formatMBONE = (mboneAmount: string | number) => {
    if (!mboneAmount) return '0'
    // If it's a string and looks like it's in wei (very large number)
    const amount = typeof mboneAmount === 'string' ? parseFloat(mboneAmount) : mboneAmount
    // Check if it's likely in wei (has more than 18 digits)
    if (amount > 1e18) {
      return (amount / 1e18).toFixed(2)
    }
    return amount.toFixed(2)
  }

  return (
    <Card className="border-border/50 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {order.invoice_id || `Order #${order.id.slice(-8)}`}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className={`${getStatusColor(order.status)} text-white`}>
              <div className="flex items-center gap-1">
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </Badge>
            {order.wallet_address && (
              <Badge className="bg-brand-accent text-white">
                <Wallet className="h-3 w-3 mr-1" />
                MBONE
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="h-8 w-8 p-0"
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                {order.order_items.length} {order.order_items.length === 1 ? 'item' : 'items'}
              </p>
              <p className="font-semibold text-brand-secondary">
                Total: ${order.total_usd.toFixed(2)}
              </p>
              {order.wallet_address && order.total_mbone && (
                <p className="text-xs text-brand-accent">
                  {formatMBONE(order.total_mbone)} MBONE
                </p>
              )}
            </div>
            <div className="text-right space-y-2">
              {shipment?.status === 'shipped' && shipment.tracking_number && (
                <Button variant="outline" size="sm">
                  Track Package
                </Button>
              )}
              {order.payment_tx_hash && (
                <div>
                  <a 
                    href={`https://sepolia.etherscan.io/tx/${order.payment_tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-accent hover:underline"
                  >
                    View Transaction <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Expanded Details */}
          {expanded && (
            <div className="space-y-4">
              <Separator />
              
              {/* Order Items */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Order Items</h4>
                <div className="space-y-2">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Product ID: {item.product_id.slice(0, 8)}... x {item.quantity}
                      </span>
                      <span>${item.price_usd.toFixed(2)} USD</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipment Information */}
              {shipment && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Shipment Details</h4>
                  <div className="bg-muted/30 p-3 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className={`${getShipmentStatusColor(shipment.status)} text-white text-xs`}>
                        {shipment.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    
                    {shipment.courier_name && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Courier:</span>
                        <span>{shipment.courier_name}</span>
                      </div>
                    )}
                    
                    {shipment.tracking_number && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tracking:</span>
                        <span className="font-mono text-xs">{shipment.tracking_number}</span>
                      </div>
                    )}
                    
                    {shipment.shipped_at && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipped:</span>
                        <span>{new Date(shipment.shipped_at).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    {shipment.estimated_delivery && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Delivery:</span>
                        <span>{new Date(shipment.estimated_delivery).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    {shipment.delivered_at && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivered:</span>
                        <span>{new Date(shipment.delivered_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Wallet Information */}
              {order.wallet_address && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Payment Information</h4>
                  <div className="bg-brand-accent/10 p-3 rounded-lg space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Wallet Address:</p>
                      <p className="text-xs font-mono text-brand-accent break-all">
                        {order.wallet_address}
                      </p>
                    </div>
                    {order.invoice_id && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Invoice ID:</p>
                        <p className="text-xs font-mono">{order.invoice_id}</p>
                      </div>
                    )}
                    {order.order_hash && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Order Hash:</p>
                        <p className="text-xs font-mono break-all">{order.order_hash}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}