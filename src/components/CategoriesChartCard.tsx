import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';
import { ChevronDown } from 'lucide-react';

interface CategoriesChartCardProps {
  transactions: Transaction[];
}

// Colors are mapped from CSS variables to support light/dark theme toggles in SVG fills
const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

const FILTER_OPTIONS = ['This Month', 'Last Month', 'Last 3 Months', 'All Time'];

export default function CategoriesChartCard({ transactions }: CategoriesChartCardProps) {
  const [timeFilter, setTimeFilter] = useState('Last Month');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const chartData = useMemo(() => {
    const today = new Date();

    // Filter transactions based on selected time frame
    const filteredTxs = transactions.filter(t => {
      if (timeFilter === 'All Time') return true;

      const tDate = new Date(t.date);
      const diffMonths = (today.getFullYear() - tDate.getFullYear()) * 12 + (today.getMonth() - tDate.getMonth());

      if (timeFilter === 'This Month') return diffMonths === 0;
      if (timeFilter === 'Last Month') return diffMonths === 1;
      if (timeFilter === 'Last 3 Months') return diffMonths >= 0 && diffMonths <= 3;

      return true;
    });

    const expenses: Record<string, number> = {};
    let totalExpense = 0;

    filteredTxs.forEach(t => {
      if (t.type === 'expense') {
        expenses[t.category] = (expenses[t.category] || 0) + t.amount;
        totalExpense += t.amount;
      }
    });

    const sorted = Object.entries(expenses).sort((a, b) => b[1] - a[1]);

    const top5 = sorted.slice(0, 5);
    const othersValue = sorted.slice(5).reduce((sum, [, val]) => sum + val, 0);

    const dataPairs = top5.map(([name, value]) => ({ name, value }));
    if (othersValue > 0) {
      dataPairs.push({ name: 'other', value: othersValue });
    }

    return dataPairs.map((item, index) => ({
      name: item.name,
      value: item.value,
      percentage: totalExpense > 0 ? Math.round((item.value / totalExpense) * 100) : 0,
      color: COLORS[index % COLORS.length]
    }));
  }, [transactions, timeFilter]);

  return (
    <div className="glass-card p-6 rounded-[var(--radius-skeuo)] relative overflow-visible bg-[#8EB69B] dark:bg-[#1e1e24]/80 text-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Categories</h3>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 text-xs text-light-text-subtle dark:text-gray-400 font-medium bg-[#8EB69B]/30 dark:bg-white/5 px-2 py-1 rounded-md hover:bg-[#235347] dark:hover:bg-[#8EB69B] dark:bg-white/10 transition"
          >
            {timeFilter.toLowerCase()} <ChevronDown className="w-3 h-3" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-[#8EB69B] dark:bg-[#2A2E35] border border-light-border dark:border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
              {FILTER_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    setTimeFilter(option);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-[#8EB69B] dark:hover:bg-[#8EB69B]/30 dark:bg-white/5 ${timeFilter === option ? 'text-[#051F20] dark:text-brand-green font-bold bg-[#051F20]/10 dark:bg-brand-green/10' : 'text-[#235347] dark:text-gray-300'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pb-2 relative z-10">
        <div className="relative w-[160px] h-[160px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.length > 0 ? chartData : [{ name: 'Empty', value: 1, color: '#333', percentage: 0 }]}
                innerRadius={60}
                outerRadius={80}
                cornerRadius={12}
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {chartData.length > 0 ? chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                )) : <Cell fill="#333" />}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-light-text dark:text-white leading-none mb-1">100%</span>
            <span className="text-[10px] text-light-text-subtle dark:text-gray-400 font-medium">expenses</span>
          </div>
        </div>

        <div className="flex-1 pl-4 flex flex-col justify-center space-y-3">
          {chartData.length > 0 ? chartData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
              <div className="flex justify-between items-center w-full text-xs">
                <span className="text-[#235347] dark:text-gray-300 font-medium truncate" title={entry.name}>
                  {entry.name.toLowerCase()}
                </span>
                <span className="text-light-text-subtle dark:text-gray-400 ml-2 shrink-0">{entry.percentage}%</span>
              </div>
            </div>
          )) : (
            <div className="text-xs text-light-text-subtle dark:text-gray-500 font-medium flex items-center justify-center h-full">
              No transactions
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
