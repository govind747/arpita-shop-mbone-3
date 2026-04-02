import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { generateInvoiceId } from '@/lib/web3/config'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import { PROCESSOR_ABI } from '@/lib/web3/config'
import { keccak256, toBytes, toHex } from 'viem'

export async function POST(request: NextRequest) {
  try {
    const { cartItems, walletAddress } = await request.json()
    
    if (!cartItems || !walletAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    
    // Get user from session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get MBONE price from settings
    const { data: mboneSetting, error: settingError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'mbone_price_usd')
      .single()

    if (settingError || !mboneSetting) {
      return NextResponse.json({ error: 'MBONE price not configured' }, { status: 500 })
    }

    const mbonePriceUsd = parseFloat(mboneSetting.value)

    // Calculate totals
    let totalUSD = 0
    const orderItems = []

    for (const item of cartItems) {
      const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', item.product.id)
        .single()

      if (!product) {
        return NextResponse.json({ error: `Product ${item.product.id} not found` }, { status: 404 })
      }

      const itemTotal = product.final_mrp * item.quantity
      totalUSD += itemTotal

      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price_usd: product.final_mrp,
        price_mbone: product.final_mrp / mbonePriceUsd
      })
    }

    // Calculate MBONE amount
    const totalMBONEFloat = totalUSD / mbonePriceUsd
    const totalMBONE = BigInt(Math.floor(totalMBONEFloat * 1e18))

    // Generate a proper bytes32 hash from the order ID
    const orderId = crypto.randomUUID()
    
    // Method 1: Use keccak256 hash of the order ID (recommended)
    const orderHashBytes = keccak256(toBytes(orderId))
    
    // Method 2: Alternative - pad the UUID to 32 bytes
    // const orderHashBytes = `0x${Buffer.from(orderId.replace(/-/g, ''), 'hex').toString('hex').padEnd(64, '0')}` as `0x${string}`
    
    const orderHash = orderHashBytes as `0x${string}`
    const invoiceId = generateInvoiceId(orderId)

    console.log('Generated order hash:', {
      orderId,
      orderHash,
      orderHashLength: orderHash.length,
      invoiceId
    })

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        user_id: user.id,
        wallet_address: walletAddress,
        total_usd: totalUSD,
        total_mbone: totalMBONE.toString(),
        status: 'created',
        order_hash: orderHash,
        invoice_id: invoiceId
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create order items
    const orderItemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsWithOrderId)

    if (itemsError) {
      console.error('❌ Order items failed:', itemsError)
      
      // rollback order (IMPORTANT)
      await supabase.from('orders').delete().eq('id', order.id)

      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 })
    }

    // 🔥 CRITICAL: Create order on blockchain
    // Check if we have the admin private key
    if (!process.env.ADMIN_PRIVATE_KEY) {
      console.error('ADMIN_PRIVATE_KEY is not set')
      // Don't fail the order creation, just log error
    } else {
      try {
        const account = privateKeyToAccount(`0x${process.env.ADMIN_PRIVATE_KEY.replace('0x', '')}` as `0x${string}`)
        
        const walletClient = createWalletClient({
          account,
          chain: sepolia,
          transport: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.gateway.tenderly.co')
        })

        console.log('Creating order on blockchain:', {
          contract: process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_ADDRESS,
          orderHash,
          buyer: walletAddress,
          amount: totalMBONE.toString()
        })

        // Verify orderHash is 32 bytes (66 characters including 0x)
        if (orderHash.length !== 66) {
          throw new Error(`Invalid order hash length: ${orderHash.length}. Expected 66 characters (0x + 64 hex chars)`)
        }

        const hash = await walletClient.writeContract({
          address: process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_ADDRESS as `0x${string}`,
          abi: PROCESSOR_ABI,
          functionName: 'createOrder',
          args: [orderHash, walletAddress as `0x${string}`, totalMBONE]
        })

        console.log('✅ Order created on blockchain, tx hash:', hash)
      } catch (contractError: any) {
        console.error('Contract interaction error:', contractError)
        // Don't fail the order creation, just log error
        // You might want to implement a retry mechanism here
      }
    }

    return NextResponse.json({
      orderId: order.id,
      orderHash,
      invoiceId,
      totalUSD,
      totalMBONE: totalMBONE.toString(),
      mbonePriceUsd,
      success: true
    })

  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}