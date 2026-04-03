import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface GainsLossesCardProps {
  totalGains: number;
  totalLosses: number;
}

export default function GainsLossesCard({ totalGains, totalLosses }: GainsLossesCardProps) {
  const net = totalGains - totalLosses;
  const isPositive = net >= 0;

  return (
    <div className="glass-card p-4 rounded-[var(--radius-skeuo)] relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 opacity-5">
        <DollarSign className="w-24 h-24" />
      </div>

      <h3 className="text-lg font-bold mb-4">Analysize</h3>

      <div className="space-y-3 relative z-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-light-text-subtle dark:text-gray-400 uppercase tracking-widest font-bold mb-0.5">Total Gains</p>
            <p className="text-xl font-bold text-[#163832] dark:text-emerald-400">+${totalGains.toLocaleString()}</p>
          </div>
          <TrendingUp className="text-[#163832] dark:text-emerald-400 w-6 h-6 opacity-20" />
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-light-text-subtle dark:text-gray-400 uppercase tracking-widest font-bold mb-0.5">Total Losses</p>
            <p className="text-xl font-bold text-red-800 dark:text-red-400">-${totalLosses.toLocaleString()}</p>
          </div>
          <TrendingDown className="text-red-800 dark:text-red-400 w-6 h-6 opacity-20" />
        </div>

        <div className="pt-3 border-t border-light-border dark:border-white/5">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-[#235347] dark:text-gray-300">Net Profit</p>
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isPositive ? 'bg-emerald-500/10 text-[#163832] dark:text-emerald-400' : 'bg-red-700/10 dark:bg-red-500/10 text-red-800 dark:text-red-400'}`}>
              {isPositive ? '+' : '-'}${Math.abs(net).toLocaleString()}
            </div>
          </div>
          <div className="mt-2 w-full h-1.5 bg-[#8EB69B]/30 dark:bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${isPositive ? 'bg-emerald-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(Math.max((totalGains / (totalGains + totalLosses)) * 100, 10), 90)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
