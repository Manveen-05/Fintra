export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export type UserRole = 'viewer' | 'admin';

export interface SearchCommand {
  id: string;
  label: string;
  category: 'Navigation' | 'Setting' | 'Transaction' | 'Action';
  icon: any;
  handler: () => void;
  matches?: string[]; // Extra keywords to match
}

export interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  balanceHistory: { date: string; balance: number }[];
  transactions: Transaction[];
  news: { id: string; title: string; time: string; source: string }[];
}
