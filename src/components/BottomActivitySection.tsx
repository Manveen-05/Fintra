import React from 'react';
import { motion } from 'motion/react';
import QuickTransactionsCard from './QuickTransactionsCard';
import UpcomingTransactionsCard from './UpcomingTransactionsCard';
import TransactionsTable from './TransactionsTable';
import { Transaction, UserRole } from '../types';

interface BottomActivitySectionProps {
  transactions: Transaction[];
  upcomingTransactions: any[];
  role: UserRole;
  onAddTransaction: () => void;
  onEditTransaction: (t: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  onQuickSend: (amount: number) => void;
  onQuickSchedule: (amount: number) => void;
  onCancelUpcoming: (id: string) => void;
  onAddUpcoming: () => void;
  onViewMoreTransactions?: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function BottomActivitySection({
  transactions,
  upcomingTransactions,
  role,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
  onQuickSend,
  onQuickSchedule,
  onCancelUpcoming,
  onAddUpcoming,
  onViewMoreTransactions
}: BottomActivitySectionProps) {
  return (
    <div className="space-y-8 mt-12 pt-12 border-t border-[#235347]/10 dark:border-white/5">
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuickTransactionsCard
          onQuickSend={onQuickSend}
          onQuickSchedule={onQuickSchedule}
        />
        <UpcomingTransactionsCard
          transactions={upcomingTransactions}
          onCancel={onCancelUpcoming}
          onAdd={onAddUpcoming}
          role={role}
          limit={3}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight text-[#051F20] dark:text-white">Recent Activity</h2>
          <p className="text-sm text-light-text-subtle dark:text-gray-400 mt-1">Real-time overview of your institutional transactions.</p>
        </div>
        <TransactionsTable
          transactions={transactions}
          role={role}
          onAddTransaction={onAddTransaction}
          onEditTransaction={onEditTransaction}
          onDeleteTransaction={onDeleteTransaction}
          limit={10}
        />
      </motion.div>
    </div>
  );
}
