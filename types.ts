
export type TransactionType = 'income' | 'expense';

export interface User {
  name: string;
  email: string;
  password?: string; // Only used for auth check, usually not stored in frontend state in prod
  isGuest?: boolean;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string; // ISO String
  category: string;
}

export interface Bill {
  id: string;
  dueDate: string;
  installmentCurrent?: number;
  installmentTotal?: number;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  accountType: string; // e.g. 'Nubank', 'Itaú', 'Boleto'
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  projectedBalance: number;
}

export enum FilterType {
  ALL = 'ALL',
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}
