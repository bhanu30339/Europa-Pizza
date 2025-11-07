/*
  # Create Initial Schema for Pizza Ordering System

  1. New Tables
    - `categories` - Pizza categories (Traditional, Signature, Vegan, etc.)
    - `pizzas` - Menu items with pricing and details
    - `toppings` - Available toppings for customization
    - `pizza_toppings` - Junction table linking pizzas to default/removable toppings
    - `sizes` - Pizza sizes with pricing adjustments
    - `pizza_sizes` - Junction table for pizza sizes
    - `orders` - Customer orders
    - `order_items` - Individual items in orders
    - `coupons` - Discount codes
    - `admins` - Admin user accounts

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for public and authenticated access
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Toppings table
CREATE TABLE IF NOT EXISTS toppings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  price numeric(10, 2) DEFAULT 0,
  category text DEFAULT 'vegetable',
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE toppings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Toppings are viewable by everyone"
  ON toppings FOR SELECT
  TO public
  USING (is_available = true);

-- Sizes table
CREATE TABLE IF NOT EXISTS sizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sizes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sizes are viewable by everyone"
  ON sizes FOR SELECT
  TO public
  USING (true);

-- Pizzas table
CREATE TABLE IF NOT EXISTS pizzas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  base_price numeric(10, 2) NOT NULL,
  image_url text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  is_vegetarian boolean DEFAULT false,
  is_vegan boolean DEFAULT false,
  is_popular boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pizzas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pizzas are viewable by everyone"
  ON pizzas FOR SELECT
  TO public
  USING (is_available = true);

-- Pizza sizes junction table
CREATE TABLE IF NOT EXISTS pizza_sizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pizza_id uuid NOT NULL REFERENCES pizzas(id) ON DELETE CASCADE,
  size_id uuid NOT NULL REFERENCES sizes(id) ON DELETE CASCADE,
  price_adjustment numeric(10, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(pizza_id, size_id)
);

ALTER TABLE pizza_sizes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pizza sizes are viewable by everyone"
  ON pizza_sizes FOR SELECT
  TO public
  USING (true);

-- Pizza toppings junction table
CREATE TABLE IF NOT EXISTS pizza_toppings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pizza_id uuid NOT NULL REFERENCES pizzas(id) ON DELETE CASCADE,
  topping_id uuid NOT NULL REFERENCES toppings(id) ON DELETE CASCADE,
  is_default boolean DEFAULT false,
  is_removable boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(pizza_id, topping_id)
);

ALTER TABLE pizza_toppings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pizza toppings are viewable by everyone"
  ON pizza_toppings FOR SELECT
  TO public
  USING (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  delivery_address text,
  delivery_type text DEFAULT 'pickup',
  delivery_date date,
  delivery_time text,
  total_amount numeric(10, 2) NOT NULL,
  discount_amount numeric(10, 2) DEFAULT 0,
  coupon_code text,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  payment_intent_id text,
  otp text,
  special_instructions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orders are viewable by authenticated users"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  pizza_id uuid REFERENCES pizzas(id),
  pizza_name text NOT NULL,
  size text NOT NULL,
  base_price numeric(10, 2) NOT NULL,
  size_price numeric(10, 2) DEFAULT 0,
  quantity integer NOT NULL DEFAULT 1,
  customizations jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order items viewable by authenticated users"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  description text,
  discount_type text NOT NULL,
  discount_value numeric(10, 2) NOT NULL,
  min_order_amount numeric(10, 2) DEFAULT 0,
  usage_limit integer,
  usage_count integer DEFAULT 0,
  expiry_date date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active coupons are viewable by everyone"
  ON coupons FOR SELECT
  TO public
  USING (is_active = true AND (expiry_date IS NULL OR expiry_date >= CURRENT_DATE));

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  name text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins cannot be viewed by anyone"
  ON admins FOR SELECT
  TO public
  USING (false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pizzas_category_id ON pizzas(category_id);
CREATE INDEX IF NOT EXISTS idx_pizzas_is_available ON pizzas(is_available);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
