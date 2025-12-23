export interface Meal {
  id: string;
  name: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
  suitable_for: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'all';
}

export interface DietPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface UserInput {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}
