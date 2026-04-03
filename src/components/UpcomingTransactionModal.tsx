import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, DollarSign, Tag } from 'lucide-react';

interface UpcomingTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: any) => void;
}

export default function UpcomingTransactionModal({ isOpen, onClose, onSave }: UpcomingTransactionModalProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !date) return;

    onSave({
      id: Math.random().toString(36).substr(2, 9),
      name,
      amount: parseFloat(amount),
      date,
      type,
      isIcon: type === 'income', // Defaulting to icon for income as per user preference
      image: type === 'expense' ? 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=150&auto=format&fit=crop' : undefined
    });
    
    // Reset and Close
    setName('');
    setAmount('');
    setDate('');
    setType('expense');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-[#8EB69B] dark:bg-[#0B0D10] border border-light-border dark:border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-light-border dark:border-white/5 flex items-center justify-between bg-gradient-to-r from-[#051F20] dark:from-brand-green/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#051F20]/20 dark:bg-brand-green/20 flex items-center justify-center border border-[#235347]/30 dark:border-brand-green/30 text-[#051F20] dark:text-brand-green">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-light-text dark:text-white tracking-tight">Schedule Transaction</h2>
                  <p className="text-xs text-light-text-subtle dark:text-gray-400 mt-0.5">Track your future activities</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#8EB69B] dark:hover:bg-[#8EB69B]/30 dark:bg-white/5 rounded-full text-light-text-subtle dark:text-gray-500 hover:text-light-text dark:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Type Switcher */}
              <div className="flex p-1 bg-[#8EB69B]/30 dark:bg-white/5 rounded-2xl border border-light-border dark:border-white/5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    type === 'expense' 
                      ? 'bg-[#8EB69B] dark:bg-white/10 text-light-text dark:text-white shadow-lg border border-light-border dark:border-white/10' 
                      : 'text-light-text-subtle dark:text-gray-500 hover:text-[#235347] dark:text-gray-300'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    type === 'income' 
                      ? 'bg-[#051F20] dark:bg-brand-green text-[#EAF2EC] dark:text-black shadow-lg shadow-brand-green/20' 
                      : 'text-light-text-subtle dark:text-gray-500 hover:text-[#235347] dark:text-gray-300'
                  }`}
                >
                  Income
                </button>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-light-text-subtle dark:text-gray-500 uppercase tracking-widest pl-1">Transaction Name</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text-subtle dark:text-gray-500 group-focus-within:text-[#051F20] dark:text-brand-green transition-colors">
                      <Tag className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Disney+ Subscription"
                      className="w-full bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-light-text dark:text-white outline-none focus:border-[#235347]/50 dark:border-brand-green/50 hover:border-light-border dark:border-white/10 transition-all font-medium placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-light-text-subtle dark:text-gray-500 uppercase tracking-widest pl-1">Amount</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text-subtle dark:text-gray-500 group-focus-within:text-[#051F20] dark:text-brand-green transition-colors">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-light-text dark:text-white outline-none focus:border-[#235347]/50 dark:border-brand-green/50 hover:border-light-border dark:border-white/10 transition-all font-bold placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-light-text-subtle dark:text-gray-500 uppercase tracking-widest pl-1">Target Date</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="e.g. April 20"
                        className="w-full bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/5 rounded-2xl py-4 px-4 text-light-text dark:text-white outline-none focus:border-[#235347]/50 dark:border-brand-green/50 hover:border-light-border dark:border-white/10 transition-all font-medium placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#051F20] dark:bg-brand-green hover:bg-[#051F20]/90 dark:bg-brand-green/90 text-[#EAF2EC] dark:text-black font-bold py-4 rounded-2xl shadow-xl shadow-brand-green/10 transition-all active:scale-[0.98] mt-2 group"
              >
                Schedule Transaction
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
