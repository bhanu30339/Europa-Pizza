/*
  # Add Missing Fields

  1. Changes
    - Add order_number field to orders table
    - Add ingredients array field to pizzas table
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'order_number'
  ) THEN
    ALTER TABLE orders ADD COLUMN order_number text UNIQUE;
    CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pizzas' AND column_name = 'ingredients'
  ) THEN
    ALTER TABLE pizzas ADD COLUMN ingredients text[] DEFAULT '{}';
  END IF;
END $$;
