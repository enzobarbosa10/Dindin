
import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { DashboardSummary } from '../types';
import { formatCurrency } from '../utils';

interface DashboardProps {
  summary: DashboardSummary;
}

export const Dashboard: React.FC<DashboardProps> = React.memo(({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Caixa (Receitas) */}
      <div className="bg-card p-4 rounded-xl border-l-4 border-emerald-500 shadow-lg relative overflow-hidden group hover:bg-card/80 transition-colors">
        <div className="flex justify-between items-start z-10 relative">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Caixa (Entradas)</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">{formatCurrency(summary.totalIncome)}</h3>
          </div>
          <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Gasto */}
      <div className="bg-card p-4 rounded-xl border-l-4 border-red-500 shadow-lg relative overflow-hidden group hover:bg-card/80 transition-colors">
        <div className="flex justify-between items-start z-10 relative">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Gasto Total</p>
            <h3 className="text-2xl font-bold text-red-400 mt-1">{formatCurrency(summary.totalExpense)}</h3>
          </div>
          <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
        </div>
      </div>

      {/* Saldo */}
      <div className="bg-card p-4 rounded-xl border-l-4 border-blue-500 shadow-lg relative overflow-hidden group hover:bg-card/80 transition-colors">
        <div className="flex justify-between items-start z-10 relative">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Saldo Atual</p>
            <h3 className={`text-2xl font-bold mt-1 ${summary.balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
              {formatCurrency(summary.balance)}
            </h3>
          </div>
          <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            <Wallet className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Conta Bancária (Simulado como Saldo Acumulado) */}
      <div className="bg-card p-4 rounded-xl border-l-4 border-purple-500 shadow-lg relative overflow-hidden group hover:bg-card/80 transition-colors">
        <div className="flex justify-between items-start z-10 relative">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Em Conta</p>
            <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(summary.balance)}</h3>
          </div>
          <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
            <Building2 className="w-5 h-5 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
});
