import { DietPlan } from '../types/diet';
import { Sunrise, Sun, Sunset, Coffee, Flame, Apple } from 'lucide-react';

interface DietPlanDisplayProps {
  plan: DietPlan;
  targetCalories: number;
  onReset: () => void;
}

export function DietPlanDisplay({ plan, targetCalories, onReset }: DietPlanDisplayProps) {
  const mealIcons = {
    breakfast: Sunrise,
    lunch: Sun,
    dinner: Sunset,
    snack: Coffee,
  };

  const mealTimes = {
    breakfast: '7:00 - 9:00 AM',
    lunch: '12:00 - 2:00 PM',
    dinner: '6:00 - 8:00 PM',
    snack: '3:00 - 4:00 PM',
  };

  const meals = [
    { type: 'breakfast', data: plan.breakfast },
    { type: 'lunch', data: plan.lunch },
    { type: 'snack', data: plan.snack },
    { type: 'dinner', data: plan.dinner },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Your Personalized Diet Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Flame className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">{plan.totalCalories}</div>
            <div className="text-sm opacity-90">Total Calories</div>
            <div className="text-xs mt-1 opacity-75">Target: {targetCalories}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">{plan.totalProtein}g</div>
            <div className="text-sm opacity-90">Protein</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">{plan.totalCarbs}g</div>
            <div className="text-sm opacity-90">Carbs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">{plan.totalFats}g</div>
            <div className="text-sm opacity-90">Fats</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meals.map(({ type, data }) => {
          const Icon = mealIcons[type as keyof typeof mealIcons];
          return (
            <div
              key={type}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.02]"
            >
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 p-2 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg capitalize">
                        {type}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {mealTimes[type as keyof typeof mealTimes]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-gray-900">{data.calories}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-xl text-gray-900 mb-2">{data.name}</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {data.description}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-700">{data.protein}g</div>
                    <div className="text-xs text-blue-600">Protein</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-amber-700">{data.carbs}g</div>
                    <div className="text-xs text-amber-600">Carbs</div>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-rose-700">{data.fats}g</div>
                    <div className="text-xs text-rose-600">Fats</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
        <Apple className="w-8 h-8 text-emerald-600" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">Pro Tip</h3>
          <p className="text-sm text-gray-600">
            Stay hydrated by drinking at least 8 glasses of water throughout the day. Adjust
            portion sizes based on your hunger levels and energy needs.
          </p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-all"
      >
        Create New Plan
      </button>
    </div>
  );
}
