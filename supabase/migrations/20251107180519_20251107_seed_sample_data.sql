/*
  # Seed Sample Data

  1. Insert sample categories
  2. Insert sample toppings
  3. Insert sample sizes
  4. Insert sample pizzas with sizes and toppings
*/

-- Insert categories
INSERT INTO categories (name, description, display_order) VALUES
  ('Traditional', 'Classic Italian pizzas with timeless flavors', 1),
  ('Signature', 'Our chef''s special creations', 2),
  ('Vegan', 'Delicious plant-based pizzas', 3),
  ('Vegetarian', 'Loaded with fresh vegetables', 4),
  ('Meat Lovers', 'For those who love hearty portions', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert sizes
INSERT INTO sizes (name, display_order) VALUES
  ('Small', 1),
  ('Medium', 2),
  ('Large', 3),
  ('Extra Large', 4)
ON CONFLICT (name) DO NOTHING;

-- Insert toppings
INSERT INTO toppings (name, price, category, is_available) VALUES
  ('Mozzarella', 0, 'cheese', true),
  ('Parmesan', 1.50, 'cheese', true),
  ('Feta Cheese', 2.00, 'cheese', true),
  ('Pepperoni', 1.50, 'meat', true),
  ('Italian Sausage', 1.75, 'meat', true),
  ('Bacon', 1.50, 'meat', true),
  ('Chicken', 2.00, 'meat', true),
  ('Ham', 1.50, 'meat', true),
  ('Tomato Sauce', 0, 'sauce', true),
  ('White Sauce', 0.50, 'sauce', true),
  ('Pesto', 1.00, 'sauce', true),
  ('Red Peppers', 0.75, 'vegetable', true),
  ('Green Peppers', 0.75, 'vegetable', true),
  ('Onions', 0.50, 'vegetable', true),
  ('Mushrooms', 0.75, 'vegetable', true),
  ('Olives', 1.00, 'vegetable', true),
  ('Spinach', 0.75, 'vegetable', true),
  ('Tomatoes', 0.75, 'vegetable', true),
  ('Fresh Basil', 0.75, 'vegetable', true),
  ('Garlic', 0.50, 'vegetable', true)
ON CONFLICT (name) DO NOTHING;

-- Get IDs for relationships
WITH cat_ids AS (
  SELECT id, name FROM categories
),
size_ids AS (
  SELECT id, name FROM sizes
),
topping_ids AS (
  SELECT id, name FROM toppings
)
INSERT INTO pizzas (name, description, base_price, image_url, category_id, is_vegetarian, is_popular) VALUES
  (
    'Margherita',
    'Fresh mozzarella, tomatoes, basil, and olive oil on a crispy crust',
    12.99,
    'https://images.pexels.com/photos/799599/pizza-pizza-stone-baked-traditionally-799599.jpeg',
    (SELECT id FROM cat_ids WHERE name = 'Traditional'),
    true,
    true
  ),
  (
    'Pepperoni',
    'Classic pepperoni with mozzarella and tomato sauce',
    13.99,
    'https://images.pexels.com/photos/3626331/pexels-photo-3626331.jpeg',
    (SELECT id FROM cat_ids WHERE name = 'Traditional'),
    false,
    true
  ),
  (
    'Meat Feast',
    'Pepperoni, sausage, bacon, and ham - a carnivore''s dream',
    16.99,
    'https://images.pexels.com/photos/3373749/pexels-photo-3373749.jpeg',
    (SELECT id FROM cat_ids WHERE name = 'Meat Lovers'),
    false,
    true
  ),
  (
    'Vegetarian Supreme',
    'Bell peppers, mushrooms, olives, onions, spinach, and tomatoes',
    14.99,
    'https://images.pexels.com/photos/1409097/pexels-photo-1409097.jpeg',
    (SELECT id FROM cat_ids WHERE name = 'Vegetarian'),
    true,
    false
  ),
  (
    'Quattro Formaggi',
    'Four cheese blend: mozzarella, parmesan, feta, and ricotta',
    15.99,
    'https://images.pexels.com/photos/3632549/pexels-photo-3632549.jpeg',
    (SELECT id FROM cat_ids WHERE name = 'Signature'),
    true,
    true
  ),
  (
    'Vegan Delight',
    'Plant-based cheese, fresh vegetables, and olive oil',
    13.99,
    'https://images.pexels.com/photos/5732559/pexels-photo-5732559.jpeg',
    (SELECT id FROM cat_ids WHERE name = 'Vegan'),
    true,
    false
  ),
  (
    'BBQ Chicken',
    'Grilled chicken, BBQ sauce, red onions, and cilantro',
    14.99,
    'https://images.pexels.com/photos/3407817/pexels-photo-3407817.jpeg',
    (SELECT id FROM cat_ids WHERE name = 'Signature'),
    false,
    false
  ),
  (
    'Garden Fresh',
    'Spinach, mushrooms, tomatoes, basil, and garlic on white sauce',
    12.99,
    'https://images.pexels.com/photos/1564690/pexels-photo-1564690.jpeg',
    (SELECT id FROM cat_ids WHERE name = 'Vegetarian'),
    true,
    false
  )
ON CONFLICT DO NOTHING;

-- Insert pizza sizes (price adjustments)
INSERT INTO pizza_sizes (pizza_id, size_id, price_adjustment)
SELECT p.id, s.id, 
  CASE s.name
    WHEN 'Small' THEN 0
    WHEN 'Medium' THEN 2.00
    WHEN 'Large' THEN 4.00
    WHEN 'Extra Large' THEN 6.00
  END
FROM pizzas p
CROSS JOIN sizes s
ON CONFLICT (pizza_id, size_id) DO NOTHING;

-- Insert default toppings for some pizzas
INSERT INTO pizza_toppings (pizza_id, topping_id, is_default, is_removable)
SELECT p.id, t.id, true, true
FROM pizzas p
CROSS JOIN toppings t
WHERE p.name = 'Margherita' AND t.name IN ('Mozzarella', 'Tomato Sauce', 'Fresh Basil')
ON CONFLICT (pizza_id, topping_id) DO NOTHING;

INSERT INTO pizza_toppings (pizza_id, topping_id, is_default, is_removable)
SELECT p.id, t.id, true, true
FROM pizzas p
CROSS JOIN toppings t
WHERE p.name = 'Pepperoni' AND t.name IN ('Mozzarella', 'Tomato Sauce', 'Pepperoni')
ON CONFLICT (pizza_id, topping_id) DO NOTHING;

INSERT INTO pizza_toppings (pizza_id, topping_id, is_default, is_removable)
SELECT p.id, t.id, true, true
FROM pizzas p
CROSS JOIN toppings t
WHERE p.name = 'Meat Feast' AND t.name IN ('Mozzarella', 'Tomato Sauce', 'Pepperoni', 'Italian Sausage', 'Bacon', 'Ham')
ON CONFLICT (pizza_id, topping_id) DO NOTHING;

-- Insert sample coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, usage_limit, expiry_date, is_active) VALUES
  ('PIZZA10', '10% off any order', 'percentage', 10, 0, 100, '2025-12-31', true),
  ('SAVE5', '$5 off orders over $30', 'fixed', 5, 30, 50, '2025-12-31', true),
  ('WELCOME20', '20% off first order', 'percentage', 20, 15, 200, '2025-12-31', true),
  ('FREEDELIVER', 'Free delivery on orders over $40', 'fixed', 5, 40, 100, '2025-12-31', true)
ON CONFLICT (code) DO NOTHING;
