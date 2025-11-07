/*
  # Add is_popular field to pizzas table

  1. Changes
    - Add `is_popular` boolean field to `pizzas` table
    - Default value is false
    - This field is used to mark pizzas that should appear in "People also ordered" suggestions
  
  2. Purpose
    - Enable admins to mark certain pizzas as popular
    - Used for smart product recommendations in checkout
    - Helps improve cross-selling and upselling
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pizzas' AND column_name = 'is_popular'
  ) THEN
    ALTER TABLE pizzas ADD COLUMN is_popular boolean DEFAULT false;
  END IF;
END $$;
