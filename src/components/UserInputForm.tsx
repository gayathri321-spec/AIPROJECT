import { useState } from 'react';
import { UserInput } from '../types/diet';
import { Scale, Activity, Target } from 'lucide-react';

interface UserInputFormProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
}

export function UserInputForm({ onSubmit, isLoading }: UserInputFormProps) {
  const [formData, setFormData] = useState<UserInput>({
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    goal: 'maintenance',
    activityLevel: 'moderate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof UserInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age (years)
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            min="15"
            max="100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg)
          </label>
          <div className="relative">
            <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange('weight', parseInt(e.target.value))}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              min="30"
              max="300"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleChange('height', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            min="120"
            max="250"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Target className="inline w-5 h-5 mr-2 text-emerald-600" />
          Your Goal
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: 'weight_loss', label: 'Weight Loss', emoji: '🔥' },
            { value: 'maintenance', label: 'Maintain', emoji: '⚖️' },
            { value: 'muscle_gain', label: 'Muscle Gain', emoji: '💪' },
          ].map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() => handleChange('goal', goal.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.goal === goal.value
                  ? 'border-emerald-500 bg-emerald-50 shadow-md'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <div className="text-2xl mb-1">{goal.emoji}</div>
              <div className="font-medium text-gray-900">{goal.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Activity className="inline w-5 h-5 mr-2 text-emerald-600" />
          Activity Level
        </label>
        <select
          value={formData.activityLevel}
          onChange={(e) => handleChange('activityLevel', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
          required
        >
          <option value="sedentary">Sedentary (Little to no exercise)</option>
          <option value="light">Light (Exercise 1-3 days/week)</option>
          <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
          <option value="active">Active (Exercise 6-7 days/week)</option>
          <option value="very_active">Very Active (Physical job or 2x training)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
      >
        {isLoading ? 'Generating Your Plan...' : 'Generate My Diet Plan'}
      </button>
    </form>
  );
}
