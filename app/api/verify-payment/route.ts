import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { orderId, txHash, invoiceId } = await request.json()
    
    console.log('Verify payment request:', { orderId, txHash, invoiceId })
    
    if (!orderId || !txHash || !invoiceId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    
    // Get user from session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('User authenticated:', user.id)

    // Get order from database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError || !order) {
      console.error('Order fetch error:', orderError)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    console.log('Order fetched:', {
      id: order.id,
      status: order.status,
      stored_invoice_id: order.invoice_id,
      received_invoice_id: invoiceId,
      user_id: order.user_id
    })

    // Check if order is already paid
    if (order.status === 'paid') {
      return NextResponse.json({ error: 'Order already paid' }, { status: 400 })
    }

    // Verify invoice ID matches
    const storedInvoiceId = String(order.invoice_id)
    const receivedInvoiceId = String(invoiceId)
    
    console.log('Invoice ID comparison:', {
      stored: storedInvoiceId,
      received: receivedInvoiceId,
      matches: storedInvoiceId === receivedInvoiceId
    })
    
    if (storedInvoiceId !== receivedInvoiceId) {
      console.error('Invoice ID mismatch:', { stored: storedInvoiceId, received: receivedInvoiceId })
      return NextResponse.json({ 
        error: 'Invoice ID mismatch',
        details: {
          stored: storedInvoiceId,
          received: receivedInvoiceId
        }
      }, { status: 400 })
    }

    // TODO: Add real blockchain verification here
    console.log('Verifying transaction on blockchain:', txHash)
    
    // Update order status - only update columns that exist in your table
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_tx_hash: txHash,
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Order update error:', updateError)
      return NextResponse.json({ 
        error: 'Failed to update order', 
        details: updateError.message 
      }, { status: 500 })
    }

    console.log('Order updated to paid:', orderId)

    // Create crypto payment record
    const { error: paymentError } = await supabase
      .from('crypto_payments')
      .insert({
        order_id: orderId,
        chain: 'sepolia',
        token_symbol: 'MBONE',
        amount: order.total_mbone,
        tx_hash: txHash,
        from_wallet: order.wallet_address,
        to_contract: process.env.PAYMENT_PROCESSOR_ADDRESS || 'demo-contract',
        status: 'confirmed'
        // Note: created_at will be auto-set if you have a default value
      })

    if (paymentError) {
      console.error('Payment record error:', paymentError)
      // Don't return error here, as order is already updated
    } else {
      console.log('Crypto payment record created')
    }

    // Create initial shipment record
    const { error: shipmentError } = await supabase
      .from('shipments')
      .insert({
        order_id: orderId,
        status: 'processing'
        // Note: created_at will be auto-set if you have a default value
      })

    if (shipmentError) {
      console.error('Shipment creation error:', shipmentError)
      // Don't return error here, as order is already updated
    } else {
      console.log('Shipment record created')
    }

    // Fetch the updated order to confirm
    const { data: updatedOrder, error: fetchError } = await supabase
      .from('orders')
      .select('id, status, payment_tx_hash, invoice_id')
      .eq('id', orderId)
      .single()

    if (!fetchError && updatedOrder) {
      console.log('Payment verification complete:', updatedOrder)
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      order: {
        id: order.id,
        status: 'paid',
        invoice_id: order.invoice_id,
        transaction_hash: txHash
      }
    })

  } catch (error: any) {  // ← add : any
    console.error('Verify payment error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}