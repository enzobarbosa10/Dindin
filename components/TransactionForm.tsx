
<<<<<<< HEAD
import React, { useState } from 'react';
import { PlusCircle, X, AlertCircle } from 'lucide-react';
import { TransactionType } from '../types';
=======
import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Save } from 'lucide-react';
import { TransactionType, Transaction, Bill } from '../types';
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
import { Button } from './Button';
import { isValidAmount, isValidDate, isValidDescription } from '../utils';

interface TransactionFormProps {
  onAddTransaction: (description: string, amount: number, type: TransactionType, date: string, category: string) => void;
  onEditTransaction: (id: string, description: string, amount: number, type: TransactionType, date: string, category: string) => void;
  onAddBill: (description: string, amount: number, dueDate: string, installmentCurrent: string, installmentTotal: string, accountType: string) => void;
  onEditBill: (id: string, description: string, amount: number, dueDate: string, installmentCurrent: string, installmentTotal: string, accountType: string) => void;
  categories: string[];
  editingItem: Transaction | Bill | null;
  onCloseEdit: () => void;
  isBillMode?: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  onEditTransaction,
  onAddBill,
  onEditBill,
  categories,
  editingItem,
  onCloseEdit,
  isBillMode = false
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

<<<<<<< HEAD
  // Error State
  const [error, setError] = useState<string | null>(null);

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (!isValidDescription(desc)) {
      setError('Descrição inválida (máximo 100 caracteres)');
      return;
    }

    const amountNum = parseFloat(amount);
    if (!isValidAmount(amountNum)) {
      setError('Valor deve ser positivo e menor que R$ 999.999,99');
      return;
    }

    if (!isValidDate(date)) {
      setError('Data inválida (máximo 1 ano no futuro)');
      return;
    }

    onAddTransaction(desc, amountNum, type, date, category || 'Outros');
    setDesc('');
    setAmount('');
    setError(null);
    setIsOpen(false);
=======
  // Effect to populate form when editing
  useEffect(() => {
    if (editingItem) {
      setIsOpen(true);
      if ('dueDate' in editingItem) {
        // It's a bill
        setTab('bill');
        setBillDesc(editingItem.description);
        setBillAmount(editingItem.amount.toString());
        setDueDate(editingItem.dueDate);
        setInstCurrent(editingItem.installmentCurrent?.toString() || '');
        setInstTotal(editingItem.installmentTotal?.toString() || '');
        setAccountType(editingItem.accountType);
      } else {
        // It's a transaction
        setTab('transaction');
        setDesc(editingItem.description);
        setAmount(editingItem.amount.toString());
        setType(editingItem.type);
        setDate(editingItem.date);
        setCategory(editingItem.category);
      }
    } else if (isBillMode) {
      setTab('bill');
    }
  }, [editingItem, isBillMode]);

  const resetForms = () => {
    setDesc(''); setAmount(''); setType('expense'); setDate(new Date().toISOString().split('T')[0]); setCategory('');
    setBillDesc(''); setBillAmount(''); setDueDate(new Date().toISOString().split('T')[0]); setInstCurrent(''); setInstTotal(''); setAccountType('');
  };

  const handleClose = () => {
    setIsOpen(false);
    onCloseEdit();
    resetForms();
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && !('dueDate' in editingItem)) {
      onEditTransaction(editingItem.id, desc, parseFloat(amount), type, date, category || 'Outros');
    } else {
      onAddTransaction(desc, parseFloat(amount), type, date, category || 'Outros');
    }
    handleClose();
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
  };

  const handleBillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setError(null);

    // Validações
    if (!isValidDescription(billDesc)) {
      setError('Descrição inválida (máximo 100 caracteres)');
      return;
    }

    const amountNum = parseFloat(billAmount);
    if (!isValidAmount(amountNum)) {
      setError('Valor deve ser positivo e menor que R$ 999.999,99');
      return;
    }

    if (!isValidDate(dueDate, 365)) {
      setError('Data inválida (máximo 1 ano no futuro)');
      return;
    }

    onAddBill(billDesc, amountNum, dueDate, instCurrent, instTotal, accountType);
    setBillDesc('');
    setBillAmount('');
    setInstCurrent('');
    setInstTotal('');
    setError(null);
    setIsOpen(false);
=======
    if (editingItem && 'dueDate' in editingItem) {
      onEditBill(editingItem.id, billDesc, parseFloat(billAmount), dueDate, instCurrent, instTotal, accountType);
    } else {
      onAddBill(billDesc, parseFloat(billAmount), dueDate, instCurrent, instTotal, accountType);
    }
    handleClose();
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <Button
          onClick={() => { setTab('transaction'); setIsOpen(true); }}
          className="shadow-xl rounded-full w-14 h-14 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 hover:scale-105 transition-all"
        >
          <PlusCircle className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full md:max-w-lg rounded-t-2xl md:rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800/50">
          <div className="flex gap-4">
<<<<<<< HEAD
            <button
              onClick={() => setTab('transaction')}
              className={`text-sm font-bold pb-1 border-b-2 transition-colors ${tab === 'transaction' ? 'text-white border-primary' : 'text-gray-400 border-transparent'}`}
=======
            <button 
              type="button"
              onClick={() => !editingItem && setTab('transaction')}
              disabled={!!editingItem}
              className={`text-sm font-bold pb-1 border-b-2 transition-colors ${tab === 'transaction' ? 'text-white border-primary' : 'text-gray-400 border-transparent'} ${editingItem ? 'opacity-50 cursor-not-allowed' : ''}`}
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
            >
              {editingItem && !('dueDate' in editingItem) ? 'Editar Transação' : 'Nova Transação'}
            </button>
<<<<<<< HEAD
            <button
              onClick={() => setTab('bill')}
              className={`text-sm font-bold pb-1 border-b-2 transition-colors ${tab === 'bill' ? 'text-white border-orange-500' : 'text-gray-400 border-transparent'}`}
=======
            <button 
              type="button"
              onClick={() => !editingItem && setTab('bill')}
              disabled={!!editingItem}
              className={`text-sm font-bold pb-1 border-b-2 transition-colors ${tab === 'bill' ? 'text-white border-orange-500' : 'text-gray-400 border-transparent'} ${editingItem ? 'opacity-50 cursor-not-allowed' : ''}`}
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
            >
               {editingItem && 'dueDate' in editingItem ? 'Editar Conta' : 'Nova Conta'}
            </button>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

<<<<<<< HEAD
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

=======
        <div className="p-6 overflow-y-auto custom-scrollbar">
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
          {tab === 'transaction' ? (
            <form onSubmit={handleTransactionSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">Descrição</label>
                <input required value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-primary outline-none" placeholder="Ex: Mercado" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
<<<<<<< HEAD
                <label className="text-xs text-gray-400">Valor</label>
                  <input type="number" step="0.01" min="0.01" max="999999.99" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Data</label>
                  <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
=======
                   <label className="text-xs text-gray-400">Valor</label>
                   <input type="number" step="0.01" min="0.01" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-primary outline-none" />
                </div>
                <div>
                   <label className="text-xs text-gray-400">Data</label>
                   <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-primary outline-none" />
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Tipo</label>
                  <select value={type} onChange={e => setType(e.target.value as any)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-primary outline-none">
                    <option value="expense">Despesa</option>
                    <option value="income">Entrada</option>
                  </select>
                </div>
                <div>
<<<<<<< HEAD
                  <label className="text-xs text-gray-400">Categoria</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white">
                    <option value="">Selecione...</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
=======
                   <label className="text-xs text-gray-400">Categoria</label>
                   <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-primary outline-none">
                     <option value="">Selecione...</option>
                     {categories.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
                </div>
              </div>
              <Button type="submit" className="w-full mt-4 flex justify-center items-center gap-2">
                <Save className="w-4 h-4" />
                {editingItem ? 'Salvar Alterações' : 'Adicionar Transação'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleBillSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">Descrição (ex: Luz, Cartão)</label>
                <input required value={billDesc} onChange={e => setBillDesc(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-orange-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
<<<<<<< HEAD
                  <label className="text-xs text-gray-400">Valor</label>
                  <input type="number" step="0.01" min="0.01" max="999999.99" required value={billAmount} onChange={e => setBillAmount(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Vencimento</label>
                  <input type="date" required value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white" />
=======
                   <label className="text-xs text-gray-400">Valor</label>
                   <input type="number" step="0.01" min="0.01" required value={billAmount} onChange={e => setBillAmount(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-orange-500 outline-none" />
                </div>
                <div>
                   <label className="text-xs text-gray-400">Vencimento</label>
                   <input type="date" required value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-orange-500 outline-none" />
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
<<<<<<< HEAD
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
=======
                   <label className="text-xs text-gray-400">Parcela Atual</label>
                   <input type="number" placeholder="1" value={instCurrent} onChange={e => setInstCurrent(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-orange-500 outline-none" />
                </div>
                <div>
                   <label className="text-xs text-gray-400">Total Parc.</label>
                   <input type="number" placeholder="12" value={instTotal} onChange={e => setInstTotal(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-orange-500 outline-none" />
                </div>
                <div>
                   <label className="text-xs text-gray-400">Conta/Banco</label>
                   <input type="text" placeholder="Nubank" value={accountType} onChange={e => setAccountType(e.target.value)} className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-orange-500 outline-none" />
>>>>>>> 18f73ce9c6a6698752ffe3e34aa505ecb8948855
                </div>
              </div>
              <Button type="submit" className="w-full mt-4 bg-orange-600 hover:bg-orange-700 flex justify-center items-center gap-2">
                 <Save className="w-4 h-4" />
                 {editingItem ? 'Salvar Conta' : 'Agendar Conta'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
