
import React from 'react';
import { Target } from 'lucide-react';
import { formatCurrency } from '../utils';

interface SavingsGoalProps {
  goal: number;
  current: number;
}

export const SavingsGoal: React.FC<SavingsGoalProps> = ({ goal, current }) => {
  const percentage = Math.min(100, Math.max(0, (current / goal) * 100));
  
  return (
    <div className="bg-card p-6 rounded-xl border border-gray-700/50 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          Meta de Economia
        </h3>
        <span className="text-sm font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
          {percentage.toFixed(1)}%
        </span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">Atual: <strong className="text-white">{formatCurrency(current)}</strong></span>
        <span className="text-gray-400">Meta: <strong className="text-white">{formatCurrency(goal)}</strong></span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-700">
        <div 
          className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};
