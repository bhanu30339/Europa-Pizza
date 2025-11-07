import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

function authenticateAdmin(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  return verifyToken(token);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const admin = authenticateAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, base_price, image_url, ingredients, is_available, is_popular } = body;

    const updateData: any = { updated_at: new Date().toISOString() };

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (base_price) updateData.base_price = base_price;
    if (image_url) updateData.image_url = image_url;
    if (ingredients) updateData.ingredients = ingredients;
    if (is_available !== undefined) updateData.is_available = is_available;
    if (is_popular !== undefined) updateData.is_popular = is_popular;

    const { data: pizza, error } = await supabase
      .from('pizzas')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pizza:', error);
      return NextResponse.json({ error: 'Failed to update pizza' }, { status: 500 });
    }

    return NextResponse.json({ pizza });
  } catch (error) {
    console.error('Error in PUT /api/admin/menu/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = authenticateAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { error } = await supabase.from('pizzas').delete().eq('id', params.id);

    if (error) {
      console.error('Error deleting pizza:', error);
      return NextResponse.json({ error: 'Failed to delete pizza' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/menu/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
