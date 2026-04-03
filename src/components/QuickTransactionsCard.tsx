import React, { useState } from 'react';
import { Edit, Send, Calendar } from 'lucide-react';

interface QuickTransactionsCardProps {
  onQuickSend: (amount: number) => void;
  onQuickSchedule: (amount: number) => void;
}

export default function QuickTransactionsCard({ onQuickSend, onQuickSchedule }: QuickTransactionsCardProps) {
  const [amount, setAmount] = useState('570');

  const handleSend = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      onQuickSend(num);
      setAmount(''); // Reset after send
    }
  };

  const handleSchedule = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      onQuickSchedule(num);
    }
  };

  return (
    <div className="glass-card p-6 rounded-[var(--radius-skeuo)] relative overflow-hidden flex flex-col justify-center border-t border-[#235347]/20 dark:border-brand-green/20 h-full">
      {/* Background glow matching the theme */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#051F20]/10 dark:bg-brand-green/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col mb-8 relative z-10 w-full max-w-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-light-text dark:text-white tracking-tight">Quick Transactions</h3>
            <p className="text-sm text-light-text-subtle dark:text-gray-400 mt-1">List of your beneficiary</p>
          </div>
          <button className="p-2 text-light-text-subtle dark:text-gray-400 hover:text-[#051F20] dark:text-brand-green transition-colors border border-light-border dark:border-white/10 rounded-xl hover:bg-[#8EB69B] dark:hover:bg-[#8EB69B]/30 dark:bg-white/5">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-start gap-4 relative z-10 w-full max-w-2xl">
        {/* Main Input Bar */}
        <div className="flex items-center bg-[#8EB69B] dark:bg-[#0f1115]/80 rounded-[32px] p-1.5 border border-light-border dark:border-white/5 focus-within:border-[#235347]/30 dark:border-brand-green/30 transition-all shadow-2xl h-[64px]">
          <div className="bg-[#051F20] dark:bg-brand-green text-[#EAF2EC] dark:text-black px-6 h-full flex items-center rounded-[26px] font-bold text-sm tracking-wide shadow-lg shrink-0">
            Amount
          </div>
          <div className="flex items-center px-6 gap-2.5 min-w-[160px] justify-center">
            <span className="text-[#051F20] dark:text-brand-green font-bold text-2xl tracking-tight">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="bg-transparent text-light-text dark:text-white font-bold text-2xl w-24 outline-none placeholder-gray-600 focus:ring-0"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Action Buttons Integrated into the row flow with matching height */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSchedule}
            className="w-[64px] h-[64px] flex items-center justify-center bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/10 hover:border-[#235347]/30 dark:border-brand-green/30 text-light-text-subtle dark:text-gray-400 hover:text-[#051F20] dark:text-brand-green rounded-full transition-all active:scale-95 shadow-xl group"
            title="Schedule Transfer"
          >
            <Calendar className="w-5.5 h-5.5" />
          </button>

          <button
            onClick={handleSend}
            className="w-[64px] h-[64px] flex items-center justify-center bg-[#051F20] dark:bg-brand-green border border-[#235347]/30 dark:border-brand-green/30 hover:bg-[#051F20]/90 dark:bg-brand-green/90 text-[#EAF2EC] dark:text-black rounded-full transition-all active:scale-95 shadow-[0_0_25px_rgba(74,222,128,0.25)]"
            title="Send Quick Transfer"
          >
            <Send className="w-5.5 h-5.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
