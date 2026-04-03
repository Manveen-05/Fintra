import React from 'react';
import { Calendar, ChevronRight, DollarSign, X, Plus } from 'lucide-react';

interface UpcomingTransaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  isIcon?: boolean;
  image?: string;
}

interface UpcomingTransactionsCardProps {
  onViewMore?: () => void;
  onCancel?: (id: string) => void;
  onAdd?: () => void;
  transactions: UpcomingTransaction[];
  limit?: number;
  role?: string;
}

export default function UpcomingTransactionsCard({ onViewMore, onCancel, onAdd, transactions, limit, role }: UpcomingTransactionsCardProps) {
  const displayedItems = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="glass-card p-4 rounded-[var(--radius-skeuo)] overflow-hidden relative border border-light-border dark:border-white/5 shadow-2xl h-auto">
      {/* Subtle Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#051F20]/5 dark:bg-brand-green/5 blur-[40px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#051F20] dark:text-brand-green" />
          <h3 className="text-sm font-bold tracking-tight text-light-text dark:text-white/90">Upcoming</h3>
          {role === 'admin' && onAdd && (
            <button
              onClick={onAdd}
              className="ml-1 p-1 bg-[#051F20]/10 dark:bg-brand-green/10 rounded-md text-[#051F20] dark:text-brand-green hover:bg-[#051F20]/20 dark:bg-brand-green/20 transition-all active:scale-95 border border-[#235347]/20 dark:border-brand-green/20"
              title="Schedule Transaction"
            >
              <Plus className="w-3 h-3" />
            </button>
          )}
        </div>
        {onViewMore && (
          <button
            onClick={onViewMore}
            className="flex items-center gap-1 text-[10px] font-bold text-light-text-subtle dark:text-gray-500 hover:text-[#051F20] dark:text-brand-green transition-colors"
          >
            View More
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="space-y-2 relative z-10">
        {displayedItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between group p-2 -mx-1 hover:bg-[#8EB69B] dark:hover:bg-[#8EB69B]/30 dark:bg-white/5 rounded-xl transition-all border border-transparent hover:border-light-border dark:border-white/5 relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                {item.isIcon ? (
                  <div className="w-8 h-8 rounded-lg bg-[#051F20]/20 dark:bg-brand-green/20 flex items-center justify-center border border-[#235347]/30 dark:border-brand-green/30 text-[#051F20] dark:text-brand-green">
                    <DollarSign className="w-4.5 h-4.5" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-[#8EB69B]/30 dark:bg-white/5 p-1 flex items-center justify-center border border-light-border dark:border-white/10 group-hover:border-[#235347]/30 dark:border-brand-green/30 transition-all">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-[11px] text-light-text dark:text-white">{item.name}</p>
                <p className="text-[10px] text-[#051F20]/70 dark:text-brand-green/70">{item.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className={`font-bold text-[11px] ${item.type === 'income' ? 'text-[#051F20] dark:text-brand-green' : 'text-light-text dark:text-white'}`}>
                  {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
                </span>
                <span className="text-[8px] text-light-text-subtle dark:text-gray-500 uppercase tracking-widest group-hover:text-amber-500 transition-colors shrink-0">Pending</span>
              </div>

              {role === 'admin' && onCancel && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel(item.id);
                  }}
                  className="p-1.5 rounded-md bg-red-700/10 dark:bg-red-500/10 text-red-800 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 hover:scale-110"
                  title="Cancel Transaction"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
        {displayedItems.length === 0 && (
          <div className="py-6 text-center">
            <p className="text-[10px] text-light-text-subtle dark:text-gray-500">No scheduled transactions</p>
          </div>
        )}
      </div>
    </div>
  );
}
