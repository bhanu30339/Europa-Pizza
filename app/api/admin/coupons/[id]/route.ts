import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const { data: coupon, error } = await supabase
      .from('coupons')
      .update({
        code: body.code?.toUpperCase(),
        discount_type: body.discount_type,
        discount_value: body.discount_value,
        min_order_value: body.min_order_value,
        max_discount: body.max_discount,
        is_active: body.is_active,
        valid_from: body.valid_from,
        valid_until: body.valid_until,
        usage_limit: body.usage_limit,
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating coupon:', error);
      return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
    }

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Error in PUT /api/admin/coupons/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting coupon:', error);
      return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/coupons/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
