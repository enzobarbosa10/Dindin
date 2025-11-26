
import React, { useState } from 'react';
import { PlusCircle, Loader2, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { TransactionType } from '../types';
import { Button } from './Button';

interface TransactionFormProps {
  onAddTransaction: (description: string, amount: number, type: TransactionType, date: string, category: string) => void;
  onAddBill: (description: string, amount: number, dueDate: string, installmentCurrent: string, installmentTotal: string, accountType: string) => void;
  categories: string[];
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ 
  onAddTransaction,
  onAddBill,
  categories
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'transaction' | 'bill'>('transaction');
  
  // Transaction State
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');

  // Bill State
  const [billDesc, setBillDesc] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [instCurrent, setInstCurrent] = useState('');
  const [instTotal, setInstTotal] = useState('');
  const [accountType, setAccountType] = useState('');

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction(desc, parseFloat(amount), type, date, category || 'Outros');
    setDesc(''); setAmount(''); setIsOpen(false);
  };

  const handleBillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBill(billDesc, parseFloat(billAmount), dueDate, instCurrent, instTotal, accountType);
    setBillDesc(''); setBillAmount(''); setInstCurrent(''); setInstTotal(''); setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
         <Button 
          onClick={() => { setTab('transaction'); setIsOpen(true); }}
          className="shadow-xl rounded-full w-14 h-14 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500"
        >
          <PlusCircle className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800/50">
          <div className="flex gap-4">
            <button 
              onClick={() => setTab('transaction')}
              className={`text-sm font-bold pb-1 border-b-2 transition-colors ${tab === 'transaction' ? 'text-white border-primary' : 'text-gray-400 border-transparent'}`}
            >
              Nova Transação
            </button>
            <button 
              onClick={() => setTab('bill')}
              className={`text-sm font-bold pb-1 border-b-2 transition-colors ${tab === 'bill' ? 'text-white border-orange-500' : 'text-gray-400 border-transparent'}`}
            >
              Nova Conta/Parcela
            </button>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {tab === 'transaction' ? (
            <form onSubmit={handleTransactionSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">Descrição</label>
                <input required value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs text-gray-400">Valor</label>
                   <input type="number" step="0.01" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                   <label className="text-xs text-gray-400">Data</label>
                   <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Tipo</label>
                  <select value={type} onChange={e => setType(e.target.value as any)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white">
                    <option value="expense">Despesa</option>
                    <option value="income">Entrada</option>
                  </select>
                </div>
                <div>
                   <label className="text-xs text-gray-400">Categoria</label>
                   <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white">
                     <option value="">Selecione...</option>
                     {categories.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
              </div>
              <Button type="submit" className="w-full mt-4">Adicionar</Button>
            </form>
          ) : (
            <form onSubmit={handleBillSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">Descrição (ex: Luz, Cartão)</label>
                <input required value={billDesc} onChange={e => setBillDesc(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs text-gray-400">Valor</label>
                   <input type="number" step="0.01" required value={billAmount} onChange={e => setBillAmount(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                   <label className="text-xs text-gray-400">Vencimento</label>
                   <input type="date" required value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                   <label className="text-xs text-gray-400">Parcela Atual</label>
                   <input type="number" placeholder="1" value={instCurrent} onChange={e => setInstCurrent(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                   <label className="text-xs text-gray-400">Total Parc.</label>
                   <input type="number" placeholder="12" value={instTotal} onChange={e => setInstTotal(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                   <label className="text-xs text-gray-400">Conta/Banco</label>
                   <input type="text" placeholder="Nubank" value={accountType} onChange={e => setAccountType(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
              </div>
              <Button type="submit" className="w-full mt-4 bg-orange-600 hover:bg-orange-700">Agendar Conta</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
