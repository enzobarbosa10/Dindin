
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';
import { CHART_COLORS } from '../utils';

interface FinancialChartProps {
  transactions: Transaction[];
  categories: string[];
}

export const FinancialChart: React.FC<FinancialChartProps> = ({ transactions, categories }) => {
  
  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Ensure we stick to the requested categories
    return categories.map(cat => {
      const value = expenses
        .filter(t => t.category === cat)
        .reduce((acc, curr) => acc + curr.amount, 0);
      return { name: cat, value };
    }).filter(item => item.value > 0);
  }, [transactions, categories]);

  return (
    <div className="bg-card p-4 rounded-xl border border-gray-700/50 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-bold text-white mb-2 text-center">Distribuição</h3>
      
      {data.length > 0 ? (
        <div className="flex-1 w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }}
                itemStyle={{ color: '#f3f4f6' }}
                formatter={(value: number) => 
                  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
          Sem dados de despesas
        </div>
      )}
    </div>
  );
};
