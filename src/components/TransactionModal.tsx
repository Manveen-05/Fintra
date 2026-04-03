import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Transaction, TransactionType } from '../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  transaction?: Transaction | null;
}

export default function TransactionModal({ isOpen, onClose, onSave, transaction }: TransactionModalProps) {
  const [formData, setFormData] = useState<Partial<Transaction>>({
    description: '',
    amount: 0,
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    } else {
      setFormData({
        description: '',
        amount: 0,
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [transaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: transaction?.id || Math.random().toString(36).substr(2, 9),
      description: formData.description || '',
      amount: Number(formData.amount) || 0,
      category: formData.category || 'Misc',
      type: formData.type as TransactionType || 'expense',
      date: formData.date || new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-md p-6 rounded-[var(--radius-skeuo)] border border-[#235347]/30 dark:border-brand-green/30 relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{transaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
          <button onClick={onClose} className="p-1 text-light-text-subtle dark:text-gray-400 hover:text-light-text dark:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-light-text-subtle dark:text-gray-400 uppercase tracking-wider mb-2">Description</label>
            <input 
              required
              type="text" 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl px-4 py-3 text-sm text-light-text dark:text-white focus:outline-none focus:border-[#235347]/50 dark:border-brand-green/50"
              placeholder="e.g. Lunch at Bistro"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-light-text-subtle dark:text-gray-400 uppercase tracking-wider mb-2">Amount</label>
              <input 
                required
                type="number" 
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
                className="w-full bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl px-4 py-3 text-sm text-light-text dark:text-white focus:outline-none focus:border-[#235347]/50 dark:border-brand-green/50"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-light-text-subtle dark:text-gray-400 uppercase tracking-wider mb-2">Date</label>
              <input 
                required
                type="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl px-4 py-3 text-sm text-light-text dark:text-white focus:outline-none focus:border-[#235347]/50 dark:border-brand-green/50 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-[10px] font-bold text-light-text-subtle dark:text-gray-400 uppercase tracking-wider mb-2">Type</label>
               <select 
                  value={formData.type} 
                  onChange={e => setFormData({...formData, type: e.target.value as TransactionType})}
                  className="w-full bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl px-4 py-3 text-sm text-light-text dark:text-white focus:outline-none focus:border-[#235347]/50 dark:border-brand-green/50"
               >
                  <option value="expense" className="bg-[#8EB69B] dark:bg-[#1e1e24]">Expense</option>
                  <option value="income" className="bg-[#8EB69B] dark:bg-[#1e1e24]">Income</option>
               </select>
            </div>
            <div>
               <label className="block text-[10px] font-bold text-light-text-subtle dark:text-gray-400 uppercase tracking-wider mb-2">Category</label>
               <input 
                  required
                  type="text" 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl px-4 py-3 text-sm text-light-text dark:text-white focus:outline-none focus:border-[#235347]/50 dark:border-brand-green/50"
                  placeholder="e.g. Food"
               />
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-[#051F20] dark:bg-brand-green text-[#EAF2EC] dark:text-black font-bold py-3 rounded-xl skeuo-button green-glow transition-all active:scale-[0.98]">
              {transaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
