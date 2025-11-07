import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

export type Pizza = {
  id: string;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  ingredients: string[];
  is_available: boolean;
  category_id: string | null;
  is_vegetarian: boolean;
  is_popular?: boolean;
  sizes: { name: string; price: number }[];
  pizza_toppings?: PizzaTopping[];
  created_at: string;
  updated_at: string;
};

export type Topping = {
  id: string;
  name: string;
  category: string;
  price: number;
  is_vegetarian: boolean;
  is_available: boolean;
  created_at: string;
};

export type PizzaTopping = {
  id: string;
  pizza_id: string;
  topping_id: string;
  is_default: boolean;
  is_removable: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_time: string;
  total_amount: number;
  status: 'pending' | 'accepted' | 'ready' | 'picked_up' | 'cancelled';
  otp: string;
  is_acknowledged: boolean;
  payment_status: string;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  pizza_id: string;
  quantity: number;
  price: number;
  customizations: {
    topping_id: string;
    topping_name: string;
    topping_price: number;
  }[];
  created_at: string;
};

export type CartItem = {
  id: string;
  pizza: Pizza;
  size: string;
  quantity: number;
  selectedToppings: Topping[];
  removedToppings: string[];
  comments?: string;
  totalPrice: number;
  toppings: Topping[];
};
