import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: pizzas, error } = await supabase
      .from('pizzas')
      .select(`
        *,
        pizza_toppings (
          id,
          topping_id,
          is_default,
          is_removable
        )
      `)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching pizzas:', error);
      return NextResponse.json({ error: 'Failed to fetch pizzas' }, { status: 500 });
    }

    const { data: toppings, error: toppingsError } = await supabase
      .from('toppings')
      .select('*')
      .eq('is_available', true)
      .order('name', { ascending: true });

    if (toppingsError) {
      console.error('Error fetching toppings:', toppingsError);
    }

    return NextResponse.json({
      pizzas,
      toppings: toppings || []
    });
  } catch (error) {
    console.error('Error in /api/menu:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
