import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useToast } from './ui/toast';

interface InsightsSectionProps {
  highestCategory: string;
  monthlyComparison: string;
}

export default function InsightsSection({ highestCategory, monthlyComparison }: InsightsSectionProps) {
  const { toast } = useToast();
  
  const insights = [
    {
      title: 'Highest Spending',
      description: `Your highest spending category this month is ${highestCategory}. Consider reviewing these expenses.`,
      icon: AlertCircle,
      color: 'text-red-800 dark:text-red-400',
      bg: 'bg-red-700/10 dark:bg-red-500/10'
    },
    {
      title: 'Monthly Growth',
      description: `Your balance has grown by ${monthlyComparison} compared to last month. Great job!`,
      icon: TrendingUp,
      color: 'text-[#051F20] dark:text-brand-green',
      bg: 'bg-[#051F20]/10 dark:bg-brand-green/10'
    },
    {
      title: 'Savings Goal',
      description: "You're on track to reach your savings goal of $150,000 by the end of the year.",
      icon: Lightbulb,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10'
    },
    {
      title: 'Recurring Bills',
      description: "You have 3 recurring bills due in the next 7 days. Total amount: $1,450.",
      icon: Calendar,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {insights.map((insight, idx) => (
        <motion.div
          key={insight.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => toast(`Deep-dive: ${insight.title}`, 'info')}
          className="glass-card p-6 rounded-[var(--radius-skeuo)] relative group overflow-hidden cursor-pointer"
        >
          <div className={insight.bg + " w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-light-border dark:border-white/5 group-hover:scale-110 transition-transform"}>
            <insight.icon className={insight.color + " w-6 h-6"} />
          </div>
          <h4 className="text-sm font-bold mb-2">{insight.title}</h4>
          <p className="text-xs text-light-text-subtle dark:text-gray-400 leading-relaxed">{insight.description}</p>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8EB69B]/30 dark:bg-white/5 group-hover:bg-[#051F20]/30 dark:bg-brand-green/30 transition-all" />
        </motion.div>
      ))}
    </div>
  );
}
