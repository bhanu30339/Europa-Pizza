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

export async function GET(request: Request) {
  const admin = authenticateAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: pizzas, error } = await supabase
      .from('pizzas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pizzas:', error);
      return NextResponse.json({ error: 'Failed to fetch pizzas' }, { status: 500 });
    }

    return NextResponse.json({ pizzas });
  } catch (error) {
    console.error('Error in GET /api/admin/menu:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = authenticateAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, base_price, image_url, ingredients, is_available, is_popular } = body;

    if (!name || !description || !base_price || !image_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: pizza, error } = await supabase
      .from('pizzas')
      .insert({
        name,
        description,
        base_price,
        image_url,
        ingredients: ingredients || [],
        is_available: is_available !== undefined ? is_available : true,
        is_popular: is_popular || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating pizza:', error);
      return NextResponse.json({ error: 'Failed to create pizza' }, { status: 500 });
    }

    return NextResponse.json({ pizza });
  } catch (error) {
    console.error('Error in POST /api/admin/menu:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
