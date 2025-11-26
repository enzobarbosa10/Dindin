import React, { useState, useEffect, useMemo } from 'react';
import { Wallet, Trash2 } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionTable } from './components/TransactionList';
import { FinancialChart } from './components/FinancialChart';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { BillList } from './components/BillList';
import { SavingsGoal } from './components/SavingsGoal';
import { ConfirmModal } from './components/ConfirmModal';
import { ToastProvider, useToast } from './context/ToastContext';
import { Transaction, Bill, DashboardSummary, TransactionType } from './types';

// Specific categories as requested
const FIXED_CATEGORIES = ['Comida', 'Luxos', 'Contas', 'Transporte', 'Depósito', 'Necessidades'];

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

const AppContent: React.FC = () => {
  const { addToast } = useToast();
  // --- State ---
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [savingsGoal, setSavingsGoal] = useState(2000);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Modal States
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; type: 'transaction' | 'bill' | null; id: string | null }>({
    isOpen: false,
    type: null,
    id: null,
  });

  // --- Persistence / Seeding ---
  useEffect(() => {
    const savedTransactions = localStorage.getItem('fin_transactions_v2');
    const savedBills = localStorage.getItem('fin_bills_v2');

    // Carregar transações
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (error) {
        console.error('Erro ao carregar transações:', error);
        setTransactions(SEED_TRANSACTIONS);
      }
    } else {
      setTransactions(SEED_TRANSACTIONS);
    }

    // Carregar contas
    if (savedBills) {
      try {
        setBills(JSON.parse(savedBills));
      } catch (error) {
        console.error('Erro ao carregar contas:', error);
        setBills(SEED_BILLS);
      }
    } else {
      setBills(SEED_BILLS);
    }
    
    // Marcar como carregado
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fin_transactions_v2', JSON.stringify(transactions));
      localStorage.setItem('fin_bills_v2', JSON.stringify(bills));
    }
  }, [transactions, bills, isLoaded]);

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
    addToast('Transação adicionada com sucesso!', 'success');
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
    addToast('Conta adicionada com sucesso!', 'success');
  };

  const toggleBillStatus = (id: string) => {
    setBills(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'paid' ? 'pending' : 'paid' } : b));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const deleteBill = (id: string) => {
    setBills(prev => prev.filter(b => b.id !== id));
  };

  const handleConfirmDelete = () => {
    if (deleteModal.type === 'transaction' && deleteModal.id) {
      deleteTransaction(deleteModal.id);
      addToast('Transação deletada com sucesso!', 'success');
    } else if (deleteModal.type === 'bill' && deleteModal.id) {
      deleteBill(deleteModal.id);
      addToast('Conta deletada com sucesso!', 'success');
    } else if (deleteModal.type === null && deleteModal.id === null) {
      // Clear all data
      setTransactions([]);
      setBills([]);
      localStorage.removeItem('fin_transactions_v2');
      localStorage.removeItem('fin_bills_v2');
      addToast('Todos os dados foram deletados!', 'success');
    }
    setDeleteModal({ isOpen: false, type: null, id: null });
  };

  // --- Computed ---
  const summary: DashboardSummary = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      projectedBalance: 0 // Not used yet
    };
  }, [transactions]);

  const currentSavings = useMemo(() => {
    return transactions
      .filter(t => t.category === 'Depósito' && t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  // --- Layout ---
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#020617] text-gray-100 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando suas finanças...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50 mb-6">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Din<span className="text-emerald-500">din</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500">Novembro 2025</div>
            <button
              onClick={() => setDeleteModal({ isOpen: true, type: null, id: null })}
              className="text-xs px-3 py-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded border border-red-600/30 flex items-center gap-1 transition-colors"
              aria-label="Limpar todos os dados"
              title="Limpar todos os dados"
            >
              <Trash2 className="w-4 h-4" />
              Limpar dados
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 space-y-6">
        
        {/* 1. Resumo Geral + 5. Conta Bancária */}
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
               transactions={transactions} 
               type="income" 
               title="Entradas de Dinheiro" 
             />
          </div>

          {/* 2. Gráfico de Pizza + 4. Índice de Gastos (Coluna Direita/Meio) */}
          <div className="lg:col-span-4 h-[400px]">
            <FinancialChart transactions={transactions} categories={FIXED_CATEGORIES} />
          </div>

           <div className="lg:col-span-4 h-[400px]">
            <CategoryBreakdown transactions={transactions} categories={FIXED_CATEGORIES} />
          </div>

        </div>

        {/* 7. Gastos Detalhados (Tabela) */}
        <section>
          <h3 className="text-lg font-bold text-white mb-4 pl-2 border-l-4 border-red-500">Gastos Detalhados</h3>
          <div className="h-[400px]">
            <TransactionTable 
              transactions={transactions} 
              type="expense" 
              title="Histórico de Despesas" 
            />
          </div>
        </section>

        {/* 8. Contas a Vencer */}
        <section>
          <BillList bills={bills} onToggleStatus={toggleBillStatus} />
        </section>

      </main>

      {/* Action Button & Modals */}
      <TransactionForm 
        onAddTransaction={addTransaction} 
        onAddBill={addBill}
        categories={FIXED_CATEGORIES}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Confirmar Deleção"
        message={`Tem certeza que deseja deletar este ${deleteModal.type === 'transaction' ? 'transação' : 'conta'}? Esta ação não pode ser desfeita.`}
        confirmText="Deletar"
        cancelText="Cancelar"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, type: null, id: null })}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;