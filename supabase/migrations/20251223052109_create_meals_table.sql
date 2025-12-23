/*
  # Create Meals Table for AI Diet Planner

  ## Overview
  This migration sets up the meals database for the AI diet planner application.

  ## New Tables
  
  ### `meals`
  Stores various meal options with nutritional information
  - `id` (uuid, primary key) - Unique identifier for each meal
  - `name` (text) - Name of the meal/dish
  - `meal_type` (text) - Type: 'breakfast', 'lunch', 'dinner', 'snack'
  - `calories` (integer) - Calorie content
  - `protein` (integer) - Protein in grams
  - `carbs` (integer) - Carbohydrates in grams
  - `fats` (integer) - Fats in grams
  - `description` (text) - Brief description of the meal
  - `suitable_for` (text) - Goal suitability: 'weight_loss', 'muscle_gain', 'maintenance', 'all'
  - `created_at` (timestamptz) - Timestamp of creation

  ## Security
  - Enable RLS on meals table
  - Add policy for public read access (meal data is public)

  ## Sample Data
  Includes a variety of healthy meal options for different goals and meal types
*/

CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  meal_type text NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  calories integer NOT NULL,
  protein integer NOT NULL,
  carbs integer NOT NULL,
  fats integer NOT NULL,
  description text NOT NULL,
  suitable_for text NOT NULL CHECK (suitable_for IN ('weight_loss', 'muscle_gain', 'maintenance', 'all')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view meals"
  ON meals FOR SELECT
  TO public
  USING (true);

-- Insert sample meals
INSERT INTO meals (name, meal_type, calories, protein, carbs, fats, description, suitable_for) VALUES
-- Breakfast options
('Oatmeal with Berries', 'breakfast', 280, 8, 48, 6, 'Steel-cut oats topped with fresh berries and a drizzle of honey', 'all'),
('Greek Yogurt Parfait', 'breakfast', 220, 20, 28, 4, 'Greek yogurt layered with granola and mixed berries', 'weight_loss'),
('Scrambled Eggs & Toast', 'breakfast', 320, 18, 32, 14, 'Two eggs scrambled with whole grain toast and avocado', 'muscle_gain'),
('Protein Smoothie Bowl', 'breakfast', 350, 25, 42, 8, 'Protein powder blended with banana, spinach, and almond milk', 'muscle_gain'),
('Avocado Toast', 'breakfast', 290, 10, 35, 15, 'Whole grain toast with mashed avocado and cherry tomatoes', 'maintenance'),

-- Lunch options
('Grilled Chicken Salad', 'lunch', 380, 35, 28, 12, 'Mixed greens with grilled chicken, vegetables, and light vinaigrette', 'weight_loss'),
('Quinoa Buddha Bowl', 'lunch', 420, 18, 58, 14, 'Quinoa with roasted vegetables, chickpeas, and tahini dressing', 'all'),
('Turkey Wrap', 'lunch', 340, 28, 38, 8, 'Whole wheat wrap with lean turkey, lettuce, tomato, and hummus', 'weight_loss'),
('Salmon & Brown Rice', 'lunch', 480, 32, 52, 16, 'Grilled salmon with brown rice and steamed broccoli', 'muscle_gain'),
('Chicken Stir-Fry', 'lunch', 410, 30, 45, 12, 'Chicken breast with mixed vegetables and brown rice', 'maintenance'),

-- Dinner options
('Baked Cod with Vegetables', 'dinner', 360, 38, 32, 8, 'Oven-baked cod with roasted seasonal vegetables', 'weight_loss'),
('Lean Beef & Sweet Potato', 'dinner', 520, 42, 48, 16, 'Grilled lean beef with baked sweet potato and green beans', 'muscle_gain'),
('Vegetarian Curry', 'dinner', 390, 15, 62, 10, 'Mixed vegetable curry with chickpeas served over basmati rice', 'all'),
('Grilled Chicken Breast', 'dinner', 420, 45, 35, 10, 'Herb-marinated chicken breast with quinoa and asparagus', 'muscle_gain'),
('Shrimp Pasta Primavera', 'dinner', 450, 28, 58, 12, 'Whole wheat pasta with shrimp and seasonal vegetables', 'maintenance'),
('Tofu Stir-Fry', 'dinner', 340, 22, 42, 10, 'Crispy tofu with mixed vegetables in ginger-soy sauce', 'weight_loss'),

-- Snack options
('Apple with Almond Butter', 'snack', 180, 4, 22, 9, 'Sliced apple with natural almond butter', 'all'),
('Protein Shake', 'snack', 160, 24, 12, 2, 'Whey protein shake with water', 'muscle_gain'),
('Carrot Sticks & Hummus', 'snack', 120, 4, 18, 4, 'Fresh carrot sticks with homemade hummus', 'weight_loss'),
('Mixed Nuts', 'snack', 200, 6, 8, 18, 'Handful of mixed almonds, walnuts, and cashews', 'all'),
('Cottage Cheese & Fruit', 'snack', 140, 14, 18, 2, 'Low-fat cottage cheese with fresh pineapple', 'weight_loss');