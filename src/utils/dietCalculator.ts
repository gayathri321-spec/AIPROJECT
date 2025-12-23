import { supabase } from '../lib/supabase';
import { Meal, DietPlan, UserInput } from '../types/diet';

export function calculateDailyCalories(input: UserInput): number {
  let bmr: number;

  if (input.gender === 'male') {
    bmr = 10 * input.weight + 6.25 * input.height - 5 * input.age + 5;
  } else {
    bmr = 10 * input.weight + 6.25 * input.height - 5 * input.age - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  let tdee = bmr * activityMultipliers[input.activityLevel];

  if (input.goal === 'weight_loss') {
    tdee -= 500;
  } else if (input.goal === 'muscle_gain') {
    tdee += 300;
  }

  return Math.round(tdee);
}

export async function generateDietPlan(input: UserInput): Promise<DietPlan> {
  const targetCalories = calculateDailyCalories(input);

  const { data: allMeals, error } = await supabase
    .from('meals')
    .select('*')
    .or(`suitable_for.eq.${input.goal},suitable_for.eq.all`);

  if (error || !allMeals) {
    throw new Error('Failed to fetch meals');
  }

  const breakfastOptions = allMeals.filter((m) => m.meal_type === 'breakfast');
  const lunchOptions = allMeals.filter((m) => m.meal_type === 'lunch');
  const dinnerOptions = allMeals.filter((m) => m.meal_type === 'dinner');
  const snackOptions = allMeals.filter((m) => m.meal_type === 'snack');

  const calorieDistribution = {
    breakfast: 0.25,
    lunch: 0.35,
    dinner: 0.3,
    snack: 0.1,
  };

  const breakfast = selectBestMeal(
    breakfastOptions,
    targetCalories * calorieDistribution.breakfast
  );
  const lunch = selectBestMeal(
    lunchOptions,
    targetCalories * calorieDistribution.lunch
  );
  const dinner = selectBestMeal(
    dinnerOptions,
    targetCalories * calorieDistribution.dinner
  );
  const snack = selectBestMeal(
    snackOptions,
    targetCalories * calorieDistribution.snack
  );

  return {
    breakfast,
    lunch,
    dinner,
    snack,
    totalCalories: breakfast.calories + lunch.calories + dinner.calories + snack.calories,
    totalProtein: breakfast.protein + lunch.protein + dinner.protein + snack.protein,
    totalCarbs: breakfast.carbs + lunch.carbs + dinner.carbs + snack.carbs,
    totalFats: breakfast.fats + lunch.fats + dinner.fats + snack.fats,
  };
}

function selectBestMeal(meals: Meal[], targetCalories: number): Meal {
  if (meals.length === 0) {
    throw new Error('No meals available');
  }

  return meals.reduce((best, current) => {
    const currentDiff = Math.abs(current.calories - targetCalories);
    const bestDiff = Math.abs(best.calories - targetCalories);
    return currentDiff < bestDiff ? current : best;
  });
}
