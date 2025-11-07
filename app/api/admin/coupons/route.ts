import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: coupons, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching coupons:', error);
      return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
    }

    return NextResponse.json({ coupons });
  } catch (error) {
    console.error('Error in /api/admin/coupons:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data: coupon, error } = await supabase
      .from('coupons')
      .insert({
        code: body.code.toUpperCase(),
        discount_type: body.discount_type,
        discount_value: body.discount_value,
        min_order_value: body.min_order_value || 0,
        max_discount: body.max_discount || null,
        is_active: body.is_active !== undefined ? body.is_active : true,
        valid_from: body.valid_from || new Date().toISOString(),
        valid_until: body.valid_until || null,
        usage_limit: body.usage_limit || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating coupon:', error);
      return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
    }

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Error in POST /api/admin/coupons:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
