
import React, { useState, useEffect, useMemo } from 'react';
import { Wallet, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionTable } from './components/TransactionList';
import { FinancialChart } from './components/FinancialChart';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { BillList } from './components/BillList';
import { SavingsGoal } from './components/SavingsGoal';
import { CategoryManager } from './components/CategoryManager';
import { Transaction, Bill, DashboardSummary, TransactionType } from './types';
import { getCurrentMonthYear, getMonthName } from './utils';

// Seed data to match user request
const SEED_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salário', amount: 5000, type: 'income', date: '2025-11-05', category: 'Salário' },
  { id: '2', description: 'Extra', amount: 500, type: 'income', date: '2025-11-10', category: 'Extra' },
  { id: '3', description: 'Supermercado', amount: 800, type: 'expense', date: '2025-11-06', category: 'Comida' },
  { id: '4', description: 'Aluguel + Luz', amount: 1200, type: 'expense', date: '2025-11-07', category: 'Contas' },
  { id: '5', description: 'Jantar Fora', amount: 300, type: 'expense', date: '2025-11-12', category: 'Luxos' },
  { id: '6', description: 'Uber/Gasolina', amount: 200, type: 'expense', date: '2025-11-08', category: 'Transporte' },
  { id: '7', description: 'Farmácia/Higiene', amount: 400, type: 'expense', date: '2025-11-15', category: 'Necessidades' },
  { id: '8', description: 'Poupança', amount: 1000, type: 'expense', date: '2025-11-02', category: 'Depósito' },
];

const SEED_BILLS: Bill[] = [
  { id: '101', description: 'Cartão Nubank', amount: 450.50, dueDate: '2025-11-14', status: 'pending', installmentCurrent: 14, installmentTotal: 14, accountType: 'Nubank' },
  { id: '102', description: 'Internet Fibra', amount: 120.00, dueDate: '2025-11-20', status: 'pending', accountType: 'Boleto' },
  { id: '103', description: 'Academia', amount: 90.00, dueDate: '2025-11-10', status: 'paid', accountType: 'Crédito' },
];

const DEFAULT_CATEGORIES = ['Comida', 'Luxos', 'Contas', 'Transporte', 'Depósito', 'Necessidades'];

const App: React.FC = () => {
  // --- State ---
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [savingsGoal, setSavingsGoal] = useState(2000); // Exemplo meta
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Filtering
  const [currentDate, setCurrentDate] = useState(getCurrentMonthYear());

  // Modal / Editing State
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingItem, setEditingItem] = useState<Transaction | Bill | null>(null);

  // --- Persistence / Seeding ---
  useEffect(() => {
    try {
      const savedTransactions = localStorage.getItem('fin_transactions_v2');
      const savedBills = localStorage.getItem('fin_bills_v2');
      const savedCategories = localStorage.getItem('fin_categories');
      const isFirstVisit = !localStorage.getItem('fin_first_visit');

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else if (isFirstVisit) {
        setTransactions(SEED_TRANSACTIONS);
      }

      if (savedBills) {
        setBills(JSON.parse(savedBills));
      } else if (isFirstVisit) {
        setBills(SEED_BILLS);
      }

      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }

      if (isFirstVisit) {
        localStorage.setItem('fin_first_visit', 'true');
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fin_transactions_v2', JSON.stringify(transactions));
      localStorage.setItem('fin_bills_v2', JSON.stringify(bills));
      localStorage.setItem('fin_categories', JSON.stringify(categories));
    }
  }, [transactions, bills, categories, isLoaded]);

  // --- Handlers ---
  const addTransaction = (description: string, amount: number, type: TransactionType, date: string, category: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description,
      amount,
      type,
      date,
      category
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const editTransaction = (id: string, description: string, amount: number, type: TransactionType, date: string, category: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, description, amount, type, date, category } : t));
    setEditingItem(null);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addBill = (description: string, amount: number, dueDate: string, installmentCurrent: string, installmentTotal: string, accountType: string) => {
    const newBill: Bill = {
      id: Date.now().toString(),
      description,
      amount,
      dueDate,
      installmentCurrent: installmentCurrent ? parseInt(installmentCurrent) : undefined,
      installmentTotal: installmentTotal ? parseInt(installmentTotal) : undefined,
      status: 'pending',
      accountType: accountType || 'Geral'
    };
    setBills(prev => [...prev, newBill].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
  };

  const editBill = (id: string, description: string, amount: number, dueDate: string, installmentCurrent: string, installmentTotal: string, accountType: string) => {
     setBills(prev => prev.map(b => b.id === id ? { 
       ...b, 
       description, 
       amount, 
       dueDate, 
       installmentCurrent: installmentCurrent ? parseInt(installmentCurrent) : undefined,
       installmentTotal: installmentTotal ? parseInt(installmentTotal) : undefined,
       accountType 
     } : b).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
     setEditingItem(null);
  };

  const deleteBill = (id: string) => {
    setBills(prev => prev.filter(b => b.id !== id));
  };

  const toggleBillStatus = (id: string) => {
    setBills(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'paid' ? 'pending' : 'paid' } : b));
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      let newMonth = prev.month + (direction === 'next' ? 1 : -1);
      let newYear = prev.year;
      
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      
      return { month: newMonth, year: newYear };
    });
  };

  // --- Filtered Data ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const d = new Date(t.date);
      // Use getMonth/FullYear from UTC or local depending on how dates are stored.
      // Assuming YYYY-MM-DD strings usually parsed as UTC in simple conversions, 
      // but simplistic text slicing is safer for "visual" matching.
      const [y, m] = t.date.split('-').map(Number);
      return y === currentDate.year && (m - 1) === currentDate.month;
    });
  }, [transactions, currentDate]);

  const filteredBills = useMemo(() => {
    return bills.filter(b => {
      const [y, m] = b.dueDate.split('-').map(Number);
      return y === currentDate.year && (m - 1) === currentDate.month;
    });
  }, [bills, currentDate]);

  // --- Computed ---
  const summary: DashboardSummary = useMemo(() => {
    const income = filteredTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = filteredTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      projectedBalance: 0 
    };
  }, [filteredTransactions]);

  const currentSavings = useMemo(() => {
    return filteredTransactions
      .filter(t => t.category === 'Depósito' && t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredTransactions]);

  // --- Layout ---
  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50 mb-6">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-900/20">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Din<span className="text-emerald-500">din</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/50 rounded-full px-2 py-1 border border-slate-700">
            <button onClick={() => changeMonth('prev')} className="p-1 hover:text-white text-gray-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium w-32 text-center select-none">
              {getMonthName(currentDate.month)} {currentDate.year}
            </span>
            <button onClick={() => changeMonth('next')} className="p-1 hover:text-white text-gray-400 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button 
            onClick={() => setShowCategoryManager(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Gerenciar Categorias"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 space-y-6">
        
        {/* 1. Resumo Geral */}
        <section>
          <Dashboard summary={summary} />
        </section>

        {/* 6. Meta de Economia */}
        <section>
          <SavingsGoal goal={savingsGoal} current={currentSavings} />
        </section>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 3. Lista de Entradas (Coluna Esquerda) */}
          <div className="lg:col-span-4 h-[400px]">
             <TransactionTable 
               transactions={filteredTransactions} 
               type="income" 
               title="Entradas de Dinheiro"
               onEdit={(t) => setEditingItem(t)}
               onDelete={deleteTransaction}
             />
          </div>

          {/* 2. Gráfico de Pizza + 4. Índice de Gastos (Coluna Direita/Meio) */}
          <div className="lg:col-span-4 h-[400px]">
            <FinancialChart transactions={filteredTransactions} categories={categories} />
          </div>

           <div className="lg:col-span-4 h-[400px]">
            <CategoryBreakdown transactions={filteredTransactions} categories={categories} />
          </div>

        </div>

        {/* 7. Gastos Detalhados (Tabela) */}
        <section>
          <h3 className="text-lg font-bold text-white mb-4 pl-2 border-l-4 border-red-500">Gastos Detalhados</h3>
          <div className="h-[400px]">
            <TransactionTable 
              transactions={filteredTransactions} 
              type="expense" 
              title="Histórico de Despesas"
              onEdit={(t) => setEditingItem(t)}
              onDelete={deleteTransaction}
            />
          </div>
        </section>

        {/* 8. Contas a Vencer */}
        <section>
          <BillList 
            bills={filteredBills} 
            onToggleStatus={toggleBillStatus}
            onEdit={(b) => setEditingItem(b)}
            onDelete={deleteBill}
          />
        </section>

      </main>

      {/* Action Button & Modals */}
      <TransactionForm 
        onAddTransaction={addTransaction} 
        onEditTransaction={editTransaction}
        onAddBill={addBill}
        onEditBill={editBill}
        categories={categories}
        editingItem={editingItem}
        onCloseEdit={() => setEditingItem(null)}
      />

      <CategoryManager 
        isOpen={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
        categories={categories}
        onAdd={(cat) => setCategories([...categories, cat])}
        onRemove={(cat) => setCategories(categories.filter(c => c !== cat))}
      />
    </div>
  );
};

export default App;
