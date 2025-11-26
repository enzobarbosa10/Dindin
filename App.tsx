
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Wallet, Settings, ChevronLeft, ChevronRight, LogOut, User as UserIcon, Info } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionTable } from './components/TransactionList';
import { FinancialChart } from './components/FinancialChart';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { BillList } from './components/BillList';
import { SavingsGoal } from './components/SavingsGoal';
import { CategoryManager } from './components/CategoryManager';
import { LandingPage } from './components/LandingPage';
import { AuthScreen } from './components/AuthScreen';
import { Transaction, Bill, DashboardSummary, TransactionType, User } from './types';
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

type ViewState = 'landing' | 'login' | 'register' | 'dashboard';

const App: React.FC = () => {
  // --- Global State ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // --- Data State ---
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [savingsGoal, setSavingsGoal] = useState(2000); 
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  // Filtering
  const [currentDate, setCurrentDate] = useState(getCurrentMonthYear());

  // Modal / Editing State
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingItem, setEditingItem] = useState<Transaction | Bill | null>(null);

  // --- Auth & Navigation Logic ---

  useEffect(() => {
    // Check if user was previously logged in
    const savedUserStr = localStorage.getItem('dindin_current_user');
    if (savedUserStr) {
      const user = JSON.parse(savedUserStr);
      setCurrentUser(user);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('dindin_current_user', JSON.stringify(user));
    setCurrentView('dashboard');
  };

  const handleGuestLogin = () => {
    const guestUser: User = {
      name: 'Visitante',
      email: 'guest@dindin.app',
      isGuest: true
    };
    // We do NOT save guest user to 'dindin_current_user' effectively,
    // or if we do, we might want to distinguish. 
    // For simplicity, we can save it so refreshing keeps the session active.
    handleLoginSuccess(guestUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('dindin_current_user');
    setCurrentView('landing');
    setTransactions([]);
    setBills([]);
  };

  // --- Data Loading Logic (User Dependent) ---
  
  // Load data whenever currentUser changes
  useEffect(() => {
    if (!currentUser) return;

    const userEmail = currentUser.email;
    const transKey = `fin_transactions_${userEmail}`;
    const billsKey = `fin_bills_${userEmail}`;
    const catsKey = `fin_categories_${userEmail}`;
    const firstVisitKey = `fin_first_visit_${userEmail}`;

    try {
      const savedTransactions = localStorage.getItem(transKey);
      const savedBills = localStorage.getItem(billsKey);
      const savedCategories = localStorage.getItem(catsKey);
      const isFirstVisit = !localStorage.getItem(firstVisitKey);

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else if (isFirstVisit) {
        // Seed new users with data so the app looks good
        setTransactions(SEED_TRANSACTIONS);
      } else {
        setTransactions([]);
      }

      if (savedBills) {
        setBills(JSON.parse(savedBills));
      } else if (isFirstVisit) {
        setBills(SEED_BILLS);
      } else {
        setBills([]);
      }

      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        setCategories(DEFAULT_CATEGORIES);
      }

      if (isFirstVisit) {
        localStorage.setItem(firstVisitKey, 'true');
      }
    } catch (error) {
      console.error("Failed to load user data", error);
    }
    
    setIsDataLoaded(true);
  }, [currentUser]);

  // Save data whenever it changes (if user is logged in)
  useEffect(() => {
    if (!currentUser || !isDataLoaded) return;

    const userEmail = currentUser.email;
    localStorage.setItem(`fin_transactions_${userEmail}`, JSON.stringify(transactions));
    localStorage.setItem(`fin_bills_${userEmail}`, JSON.stringify(bills));
    localStorage.setItem(`fin_categories_${userEmail}`, JSON.stringify(categories));
  }, [transactions, bills, categories, currentUser, isDataLoaded]);


  // --- Handlers ---
  const addTransaction = useCallback((description: string, amount: number, type: TransactionType, date: string, category: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description,
      amount,
      type,
      date,
      category
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, description: string, amount: number, type: TransactionType, date: string, category: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, description, amount, type, date, category } : t));
    setEditingItem(null);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const addBill = useCallback((description: string, amount: number, dueDate: string, installmentCurrent: string, installmentTotal: string, accountType: string) => {
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
  }, []);

  const editBill = useCallback((id: string, description: string, amount: number, dueDate: string, installmentCurrent: string, installmentTotal: string, accountType: string) => {
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
  }, []);

  const deleteBill = useCallback((id: string) => {
    setBills(prev => prev.filter(b => b.id !== id));
  }, []);

  const toggleBillStatus = useCallback((id: string) => {
    setBills(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'paid' ? 'pending' : 'paid' } : b));
  }, []);

  const changeMonth = useCallback((direction: 'prev' | 'next') => {
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
  }, []);

  // --- Filtered Data ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      // Simple date parsing. In production use a library like date-fns
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

  // --- Render Views ---

  if (currentView === 'landing') {
    return (
      <LandingPage 
        onGetStarted={() => setCurrentView('register')} 
        onLogin={() => setCurrentView('login')} 
        onGuestAccess={handleGuestLogin}
      />
    );
  }

  if (currentView === 'login' || currentView === 'register') {
    return (
      <AuthScreen 
        initialMode={currentView === 'register' ? 'register' : 'login'} 
        onAuthSuccess={handleLoginSuccess}
        onGuestAccess={handleGuestLogin}
      />
    );
  }

  // --- Dashboard View ---
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

          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-2 mr-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentUser?.isGuest ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-gradient-to-tr from-emerald-500 to-blue-500 text-white'}`}>
                  {currentUser?.isGuest ? <UserIcon className="w-4 h-4" /> : currentUser?.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-300 max-w-[100px] truncate">{currentUser?.name}</span>
             </div>

            <button 
              onClick={() => setShowCategoryManager(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Gerenciar Categorias"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors border-l border-gray-700 ml-1 pl-3"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Guest Warning Banner */}
        {currentUser?.isGuest && (
          <div className="bg-orange-600/10 border-b border-orange-600/20 py-2 px-4 text-center text-xs font-medium text-orange-400 flex items-center justify-center gap-2">
            <Info className="w-3.5 h-3.5" />
            Modo Visitante: Seus dados estão salvos neste navegador. Crie uma conta para sincronizar (em breve).
          </div>
        )}
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
