/*
  # Add Coupons Table

  1. New Tables
    - `coupons`
      - `id` (uuid, primary key)
      - `code` (text, unique) - The coupon code
      - `discount_type` (text) - 'percentage' or 'fixed'
      - `discount_value` (numeric) - The discount amount
      - `min_order_value` (numeric) - Minimum order value required
      - `max_discount` (numeric) - Maximum discount amount (for percentage)
      - `is_active` (boolean) - Whether coupon is active
      - `valid_from` (timestamptz) - Start date
      - `valid_until` (timestamptz) - End date
      - `usage_limit` (integer) - Max number of times it can be used
      - `used_count` (integer) - Current usage count
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `coupons` table
    - Add policy for public to read active coupons
    - Add policy for authenticated users to read
*/

CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value numeric NOT NULL CHECK (discount_value > 0),
  min_order_value numeric DEFAULT 0,
  max_discount numeric,
  is_active boolean DEFAULT true,
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  usage_limit integer,
  used_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active coupons"
  ON coupons
  FOR SELECT
  USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

-- Insert sample coupons
INSERT INTO coupons (code, discount_type, discount_value, min_order_value, max_discount, usage_limit)
VALUES 
  ('WELCOME10', 'percentage', 10, 20, 5, NULL),
  ('SAVE5', 'fixed', 5, 15, NULL, 100)
ON CONFLICT (code) DO NOTHING;
