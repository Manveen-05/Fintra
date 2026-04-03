import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, UserRole } from '../types';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash2,
  Plus,
  Download
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { useToast } from './ui/toast';

interface TransactionsTableProps {
  transactions: Transaction[];
  role: UserRole;
  externalSearchTerm?: string;
  onAddTransaction: () => void;
  onEditTransaction: (t: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  limit?: number;
  onViewMore?: () => void;
}

export default function TransactionsTable({ 
  transactions, 
  role, 
  externalSearchTerm = '', 
  onAddTransaction, 
  onEditTransaction, 
  onDeleteTransaction, 
  limit, 
  onViewMore 
}: TransactionsTableProps) {
  const { toast } = useToast();
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const effectiveSearchTerm = externalSearchTerm || localSearchTerm;

  const sortedTransactions = React.useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);

  const filteredTransactions = sortedTransactions.filter(t => {
    const searchLower = effectiveSearchTerm.toLowerCase();
    const dateStr = format(new Date(t.date), 'MMMM dd yyyy').toLowerCase();
    const amountStr = t.amount.toString();
    
    const matchesSearch = 
      t.description.toLowerCase().includes(searchLower) ||
      t.category.toLowerCase().includes(searchLower) ||
      amountStr.includes(searchLower) ||
      dateStr.includes(searchLower);
      
    const matchesFilter = filter === 'all' || t.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = () => {
    if (filteredTransactions.length === 0) {
      toast('No transactions to export', 'error');
      return;
    }
    setIsDownloading(true);
    toast('Exporting transaction history...', 'info');
    
    setTimeout(() => {
      const headers = "Date,Description,Category,Amount,Type\n";
      const rows = filteredTransactions.map(t => 
        `${format(new Date(t.date), 'yyyy-MM-dd')},"${t.description}",${t.category},${t.amount},${t.type}`
      ).join("\n");
      
      const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Transactions_${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
      toast('Transaction history downloaded successfully', 'success');
    }, 1200);
  };

  const displayedTransactions = limit ? filteredTransactions.slice(0, limit) : filteredTransactions;

  const handleKeyDown = (e: React.KeyboardEvent, t: Transaction, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = displayedTransactions[index + 1];
      if (next) setSelectedId(next.id);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = displayedTransactions[index - 1];
      if (prev) setSelectedId(prev.id);
    } else if (e.key === 'Enter') {
      onEditTransaction(t);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      onDeleteTransaction(t.id);
    }
  };

  return (
    <div className="glass-card rounded-[40px] overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl bg-white/50 dark:bg-[#1C1C1E]/50 backdrop-blur-xl">
      <div className="p-6 sm:p-8 border-b border-black/5 dark:border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h3 className="text-xl font-black text-[#051F20] dark:text-white uppercase tracking-tight">Recent Activity</h3>
          <p className="text-[10px] font-black text-[#235347]/40 dark:text-gray-500 uppercase tracking-widest mt-1">Institutional transaction ledger</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#235347]/40 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Filter ledger..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              disabled={!!externalSearchTerm}
              className={cn(
                "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold focus:outline-none focus:border-brand-green/30 w-full transition-all shadow-inner",
                externalSearchTerm && "opacity-50 cursor-not-allowed"
              )}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="flex-1 sm:flex-none bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 px-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-brand-green/30 text-[#235347]/60 dark:text-gray-400 appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="income">Credits</option>
              <option value="expense">Debits</option>
            </select>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-3.5 rounded-2xl bg-white dark:bg-white/5 text-[#051F20] dark:text-white border border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 transition-all disabled:opacity-50 shadow-sm"
              title="Export Statement"
            >
              <Download className={cn("w-4 h-4", isDownloading && "animate-bounce")} />
            </button>

            {role === 'admin' && (
              <button
                onClick={onAddTransaction}
                className="flex items-center gap-2 bg-[#051F20] dark:bg-brand-green text-white dark:text-black py-3 px-6 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Record Transaction
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar" onMouseLeave={() => setActiveMenuId(null)}>
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="text-[#235347]/40 dark:text-gray-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-black/5 dark:border-white/5">
              <th className="px-8 py-5 font-black">Counterparty / Description</th>
              <th className="px-8 py-5 font-black">Classification</th>
              <th className="px-8 py-5 font-black">Execution Date</th>
              <th className="px-8 py-5 font-black">Volume</th>
              <th className="px-8 py-5 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {displayedTransactions.length > 0 ? displayedTransactions.map((t, index) => (
              <tr
                key={t.id}
                tabIndex={0}
                onClick={() => setSelectedId(t.id)}
                onDoubleClick={() => setActiveMenuId(t.id)}
                onKeyDown={(e) => handleKeyDown(e, t, index)}
                className={cn(
                  "transition-all duration-200 group outline-none cursor-pointer relative",
                  selectedId === t.id
                    ? "bg-brand-green/5 dark:bg-brand-green/[0.08] shadow-inner"
                    : "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                )}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-11 h-11 rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border",
                      t.type === 'income' 
                        ? "bg-brand-green/10 text-brand-green border-brand-green/10" 
                        : "bg-red-500/10 text-red-500 border-red-500/10"
                    )}>
                      {t.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div className="max-w-[200px] sm:max-w-xs">
                      <p className={cn("text-sm font-black transition-colors truncate uppercase tracking-tight", selectedId === t.id ? "text-brand-green" : "text-[#051F20] dark:text-white")}>
                        {t.description}
                        {new Date().getTime() - new Date(t.date).getTime() < 3600000 && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-lg bg-brand-green text-[8px] font-black uppercase text-black">Live</span>
                        )}
                      </p>
                      <p className="text-[10px] font-bold text-[#235347]/40 dark:text-gray-500 uppercase tracking-widest">{t.type === 'income' ? 'Institutional Credit' : 'Capital Outflow'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-[#235347]/60 dark:text-gray-400">
                    {t.category}
                  </span>
                </td>
                <td className="px-8 py-5 text-[11px] font-black uppercase tracking-tighter text-[#235347]/70 dark:text-gray-400 whitespace-nowrap">
                  {format(new Date(t.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className={cn(
                    "text-sm font-black tracking-tight",
                    t.type === 'income' ? "text-brand-green" : "text-red-500"
                  )}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-8 py-5 text-right relative">
                  {/* Choice Menu */}
                  <AnimatePresence>
                    {activeMenuId === t.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 bg-white dark:bg-[#1C1C1E] p-2.5 rounded-2xl border border-black/10 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] whitespace-nowrap"
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); onEditTransaction(t); setActiveMenuId(null); }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-black rounded-xl transition-all font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Modify
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeleteTransaction(t.id); setActiveMenuId(null); }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-500/20 whitespace-nowrap"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={cn(
                    "flex items-center justify-end gap-2 transition-all duration-300",
                    (selectedId === t.id || activeMenuId === t.id) ? "opacity-100 translate-x-0" : "opacity-20 translate-x-0"
                  )}>
                    {role === 'admin' ? (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); onEditTransaction(t); }}
                          className="p-2.5 bg-brand-green/5 text-[#235347]/60 dark:text-gray-400 hover:text-brand-green transition-all hover:bg-brand-green/20 rounded-xl border border-transparent hover:border-brand-green/20"
                          title="Modify (Enter)"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeleteTransaction(t.id); }}
                          className="p-2.5 bg-red-500/5 text-[#235347]/60 dark:text-gray-400 hover:text-red-500 transition-all hover:bg-red-500/20 rounded-xl border border-transparent hover:border-red-500/20"
                          title="Delete (Backspace)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="p-2.5 text-[#235347]/20 dark:text-gray-700 cursor-not-allowed">
                        <MoreHorizontal className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-8 py-24 text-center ">
                  <div className="flex flex-col items-center gap-4 text-[#235347]/20 dark:text-gray-700">
                    <Search className="w-12 h-12" />
                    <p className="font-black uppercase text-[10px] tracking-[0.3em]">No records matching current filter</p>
                    {(localSearchTerm || filter !== 'all') && (
                      <button 
                        onClick={() => { setLocalSearchTerm(''); setFilter('all'); }}
                        className="mt-2 text-brand-green text-[10px] font-black uppercase underline underline-offset-4"
                      >
                        Clear local filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {limit && filteredTransactions.length > limit && (
        <div className="p-6 border-t border-black/5 dark:border-white/5 flex justify-center bg-black/[0.02] dark:bg-white/[0.02]">
          <button 
            onClick={onViewMore}
            className="flex items-center gap-2 py-3 px-8 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#051F20] dark:text-brand-green hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
          >
            Expand History <span className="opacity-40 italic">({filteredTransactions.length - limit} more entries)</span>
          </button>
        </div>
      )}
    </div>
  );
}
