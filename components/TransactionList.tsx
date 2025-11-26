
import React from 'react';
import { Transaction } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
  type: 'income' | 'expense';
  title: string;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, type, title }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const filtered = transactions.filter(t => t.type === type);

  return (
    <div className="bg-card rounded-xl border border-gray-700/50 shadow-lg overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-gray-700 bg-gray-800/30">
        <h3 className={`font-bold ${type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
          {title}
        </h3>
      </div>
      
      <div className="overflow-auto flex-1 custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800/50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Descrição</th>
              {type === 'expense' && <th className="px-4 py-2">Categoria</th>}
              <th className="px-4 py-2 text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-2 text-gray-400 whitespace-nowrap">{formatDate(t.date)}</td>
                <td className="px-4 py-2 text-gray-200">{t.description}</td>
                {type === 'expense' && (
                  <td className="px-4 py-2 text-gray-400 text-xs">
                    <span className="px-2 py-0.5 rounded bg-gray-700/50 border border-gray-600/50">
                      {t.category}
                    </span>
                  </td>
                )}
                <td className={`px-4 py-2 text-right font-medium ${type === 'income' ? 'text-emerald-400' : 'text-gray-200'}`}>
                  {formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={type === 'expense' ? 4 : 3} className="px-4 py-8 text-center text-gray-500">
                  Nenhum registro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
