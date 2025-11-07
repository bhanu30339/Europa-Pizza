/*
  # Update Schema for Menu Categories and Enhanced Features

  ## Changes
  
  1. Add categories table
  2. Add missing columns to pizzas table (category_id, is_vegetarian, sizes)
  3. Add missing columns to toppings table (category, is_vegetarian)
  4. Add missing columns to pizza_toppings (is_default, is_removable)
  5. Insert default data
*/

-- Create categories table if not exists
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Add columns to pizzas table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pizzas' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE pizzas ADD COLUMN category_id uuid REFERENCES categories(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pizzas' AND column_name = 'is_vegetarian'
  ) THEN
    ALTER TABLE pizzas ADD COLUMN is_vegetarian boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pizzas' AND column_name = 'sizes'
  ) THEN
    ALTER TABLE pizzas ADD COLUMN sizes jsonb DEFAULT '[{"name":"Small","price":0},{"name":"Medium","price":3},{"name":"Large","price":5}]'::jsonb;
  END IF;
END $$;

-- Add columns to toppings table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'toppings' AND column_name = 'category'
  ) THEN
    ALTER TABLE toppings ADD COLUMN category text DEFAULT 'Other';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'toppings' AND column_name = 'is_vegetarian'
  ) THEN
    ALTER TABLE toppings ADD COLUMN is_vegetarian boolean DEFAULT true;
  END IF;
END $$;

-- Add columns to pizza_toppings table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pizza_toppings' AND column_name = 'is_default'
  ) THEN
    ALTER TABLE pizza_toppings ADD COLUMN is_default boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pizza_toppings' AND column_name = 'is_removable'
  ) THEN
    ALTER TABLE pizza_toppings ADD COLUMN is_removable boolean DEFAULT true;
  END IF;
END $$;

-- Enable RLS on categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can view active categories" ON categories;
  DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
END $$;

-- Create policies for categories
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Traditional Selection', 'traditional', 'Classic pizzas with timeless flavors', 1),
  ('Signature Selection', 'signature', 'Our unique specialty creations', 2),
  ('Pastas', 'pastas', 'Freshly made pasta dishes', 3),
  ('Desserts', 'desserts', 'Sweet treats to complete your meal', 4)
ON CONFLICT (slug) DO NOTHING;

-- Update toppings with categories if they don't have them
UPDATE toppings SET category = 'Cheeses' WHERE name IN ('Extra Mozzarella', 'Ricotta', 'Cheddar', 'Goat Cheese', 'Parmesan', 'Gorgonzola') AND category = 'Other';
UPDATE toppings SET category = 'Veggies', is_vegetarian = true WHERE name IN ('Olives', 'Mushrooms', 'Jalapeños', 'Bell Peppers', 'Onions', 'Cherry Tomatoes', 'Spinach', 'Corn', 'Basil', 'Arugula') AND category = 'Other';
UPDATE toppings SET category = 'Proteins', is_vegetarian = false WHERE name IN ('Pepperoni', 'Bacon', 'Chicken', 'Anchovies', 'Sausage', 'Ham', 'Prosciutto') AND category = 'Other';

-- Insert additional toppings if they don't exist
INSERT INTO toppings (name, category, price, is_vegetarian) 
SELECT * FROM (VALUES
  ('Extra Mozzarella', 'Cheeses', 2.00, true),
  ('Ricotta', 'Cheeses', 2.50, true),
  ('Cheddar', 'Cheeses', 2.00, true),
  ('Goat Cheese', 'Cheeses', 3.00, true),
  ('Parmesan', 'Cheeses', 2.00, true),
  ('Gorgonzola', 'Cheeses', 2.50, true),
  ('Olives', 'Veggies', 1.50, true),
  ('Mushrooms', 'Veggies', 1.50, true),
  ('Jalapeños', 'Veggies', 1.50, true),
  ('Bell Peppers', 'Veggies', 1.50, true),
  ('Onions', 'Veggies', 1.00, true),
  ('Cherry Tomatoes', 'Veggies', 2.00, true),
  ('Spinach', 'Veggies', 1.50, true),
  ('Corn', 'Veggies', 1.50, true),
  ('Basil', 'Veggies', 1.00, true),
  ('Arugula', 'Veggies', 1.50, true),
  ('Pepperoni', 'Proteins', 2.50, false),
  ('Bacon', 'Proteins', 2.50, false),
  ('Chicken', 'Proteins', 3.00, false),
  ('Anchovies', 'Proteins', 2.50, false),
  ('Sausage', 'Proteins', 2.50, false),
  ('Ham', 'Proteins', 2.50, false),
  ('Prosciutto', 'Proteins', 3.50, false)
) AS t(name, category, price, is_vegetarian)
WHERE NOT EXISTS (SELECT 1 FROM toppings WHERE toppings.name = t.name);
