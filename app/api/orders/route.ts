import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateOTP, generateOrderNumber } from '@/lib/auth';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      pickup_time,
      items,
      total_amount,
      payment_status = 'pending',
      shipping_method = 'pickup',
      delivery_address = null,
      delivery_date = null,
      delivery_time = null
    } = body;

    if (!customer_name || !customer_email || !customer_phone || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();
    const otp = generateOTP();

    const pickupDateTime = delivery_date && delivery_time
      ? `${delivery_date}T${delivery_time}:00`
      : pickup_time || new Date(Date.now() + 30 * 60000).toISOString();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name,
        customer_email,
        customer_phone,
        pickup_time: pickupDateTime,
        total_amount,
        status: 'pending',
        otp,
        is_acknowledged: false,
        payment_status,
        items,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    const emailItems = items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price * item.quantity,
    }));

    await sendOrderConfirmationEmail(customer_email, customer_name, orderNumber, otp, {
      items: emailItems,
      totalAmount: total_amount,
      pickupTime: pickupDateTime,
    });

    await sendAdminNotificationEmail(orderNumber, customer_name, customer_phone, {
      items: emailItems,
      totalAmount: total_amount,
      pickupTime: pickupDateTime,
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error in /api/orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .maybeSingle();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        *,
        pizzas:pizza_id (
          id,
          name,
          image_url
        )
      `)
      .eq('order_id', orderId);

    if (itemsError) {
      console.error('Error fetching order items:', itemsError);
      return NextResponse.json({ error: 'Failed to fetch order items' }, { status: 500 });
    }

    return NextResponse.json({ order, items });
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
