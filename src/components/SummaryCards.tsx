import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useToast } from './ui/toast';

interface SummaryCardsProps {
  totalBalance: number;
  income: number;
  expenses: number;
}

export default function SummaryCards({ totalBalance, income, expenses }: SummaryCardsProps) {
  const { toast } = useToast();
  
  const cards = [
    {
      label: 'Total Balance',
      value: totalBalance,
      icon: Wallet,
      change: '+12.5%',
      trend: 'up',
      color: 'text-[#235347] dark:text-brand-green'
    },
    {
      label: 'Monthly Income',
      value: income,
      icon: ArrowUpRight,
      change: '+8.2%',
      trend: 'up',
      color: 'text-[#235347] dark:text-brand-green'
    },
    {
      label: 'Monthly Expenses',
      value: expenses,
      icon: ArrowDownLeft,
      change: '-2.4%',
      trend: 'down',
      color: 'text-red-800 dark:text-red-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => toast(`Opening details for ${card.label}`, 'info')}
          className="glass-card p-6 rounded-[var(--radius-skeuo)] relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#051F20]/5 dark:bg-brand-green/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#051F20]/10 dark:bg-brand-green/10 transition-all duration-500" />

          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/5">
              <card.icon className={card.color + " w-6 h-6"} />
            </div>
            <div className={(card.trend === 'up' ? 'text-[#235347] dark:text-brand-green' : 'text-red-800 dark:text-red-400') + " flex items-center text-xs font-bold bg-[#8EB69B]/30 dark:bg-white/5 px-2 py-1 rounded-lg"}>
              {card.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {card.change}
            </div>
          </div>

          <div>
            <p className="text-light-text-subtle dark:text-gray-400 text-sm font-medium mb-1">{card.label}</p>
            <h3 className="text-3xl font-bold tracking-tight">
              ${card.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
