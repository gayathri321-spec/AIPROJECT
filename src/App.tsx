import { useState } from 'react';
import { UserInputForm } from './components/UserInputForm';
import { DietPlanDisplay } from './components/DietPlanDisplay';
import { generateDietPlan, calculateDailyCalories } from './utils/dietCalculator';
import { UserInput, DietPlan } from './types/diet';
import { Utensils, Sparkles } from 'lucide-react';

function App() {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [targetCalories, setTargetCalories] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const calories = calculateDailyCalories(input);
      const plan = await generateDietPlan(input);
      setTargetCalories(calories);
      setDietPlan(plan);
    } catch (err) {
      setError('Failed to generate diet plan. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDietPlan(null);
    setTargetCalories(0);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-lg">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              AI Diet Planner
            </h1>
            <Sparkles className="w-6 h-6 text-emerald-500" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get personalized meal plans tailored to your goals, powered by smart nutrition science
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {!dietPlan ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Tell Us About Yourself
                </h2>
              </div>
              <UserInputForm onSubmit={handleSubmit} isLoading={isLoading} />
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <DietPlanDisplay
              plan={dietPlan}
              targetCalories={targetCalories}
              onReset={handleReset}
            />
          )}
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Personalized nutrition guidance for your health journey</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
