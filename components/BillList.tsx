
import React from 'react';
import { Bill } from '../types';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils';

interface BillListProps {
  bills: Bill[];
  onToggleStatus: (id: string) => void;
}

export const BillList: React.FC<BillListProps> = ({ bills, onToggleStatus }) => {
  const getStatusStyle = (status: Bill['status'], dueDate: string) => {
    if (status === 'paid') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    
    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) return 'bg-red-500/10 text-red-500 border-red-500/20';
    
    return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
  };

  const getStatusLabel = (status: Bill['status'], dueDate: string) => {
    if (status === 'paid') return 'Pago';
    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) return 'Vencido';
    return 'A vencer';
  };

  return (
    <div className="bg-card rounded-xl border border-gray-700/50 shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700 bg-gray-800/30 flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-400" />
          Contas e Parcelas a Vencer
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
            <tr>
              <th className="px-4 py-3">Vencimento</th>
              <th className="px-4 py-3">Parcela</th>
              <th className="px-4 py-3">Descrição</th>
              <th className="px-4 py-3">Conta</th>
              <th className="px-4 py-3 text-right">Valor</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white">
                  {formatDate(bill.dueDate)}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {bill.installmentTotal ? `${bill.installmentCurrent}/${bill.installmentTotal}` : '-'}
                </td>
                <td className="px-4 py-3 text-gray-300">{bill.description}</td>
                <td className="px-4 py-3 text-gray-400">{bill.accountType}</td>
                <td className="px-4 py-3 text-right font-bold text-white">
                  {formatCurrency(bill.amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggleStatus(bill.id)}
                    className={`px-2 py-1 rounded border text-xs font-medium w-full max-w-[100px] transition-all hover:opacity-80 ${getStatusStyle(bill.status, bill.dueDate)}`}
                  >
                    {getStatusLabel(bill.status, bill.dueDate)}
                  </button>
                </td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Nenhuma conta cadastrada para este mês.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
