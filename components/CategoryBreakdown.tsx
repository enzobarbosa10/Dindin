
import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils';

interface CategoryBreakdownProps {
  transactions: Transaction[];
  categories: string[];
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ transactions, categories }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const calculateCategoryStats = (category: string) => {
    const amount = expenses
      .filter(t => t.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
    
    return { amount, percentage };
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-gray-700/50 shadow-lg h-full">
      <h3 className="text-lg font-bold text-white mb-4">Índice de Gastos</h3>
      <div className="space-y-4">
        {categories.map((cat) => {
          const stats = calculateCategoryStats(cat);
          if (stats.amount === 0) return null;
          
          return (
            <div key={cat} className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-gray-300">{cat}</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">{formatCurrency(stats.amount)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full opacity-80"
                    style={{ width: `${stats.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-10 text-right">{stats.percentage.toFixed(0)}%</span>
              </div>
            </div>
          );
        })}
        {expenses.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhum gasto registrado.</p>
        )}
      </div>
    </div>
  );
};
