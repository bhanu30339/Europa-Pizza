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
      .eq('is_available', true)
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

    const { data: sizes, error: sizesError } = await supabase
      .from('sizes')
      .select('*')
      .order('display_order', { ascending: true });

    if (sizesError) {
      console.error('Error fetching sizes:', sizesError);
    }

    const { data: pizzaSizes, error: pizzaSizesError } = await supabase
      .from('pizza_sizes')
      .select('*');

    if (pizzaSizesError) {
      console.error('Error fetching pizza sizes:', pizzaSizesError);
    }

    const enrichedPizzas = pizzas?.map(pizza => {
      const pizzaSizeData = pizzaSizes?.filter(ps => ps.pizza_id === pizza.id) || [];
      const sizesForPizza = pizzaSizeData.map(ps => {
        const sizeInfo = sizes?.find(s => s.id === ps.size_id);
        return {
          name: sizeInfo?.name || 'Unknown',
          price: ps.price_adjustment || 0
        };
      });

      return {
        ...pizza,
        sizes: sizesForPizza.length > 0 ? sizesForPizza : [
          { name: 'Small', price: 0 },
          { name: 'Medium', price: 2 },
          { name: 'Large', price: 4 }
        ]
      };
    });

    return NextResponse.json({
      pizzas: enrichedPizzas,
      toppings: toppings || []
    });
  } catch (error) {
    console.error('Error in /api/menu:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
