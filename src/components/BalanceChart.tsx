import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { Transaction } from '../types';

interface BalanceChartProps {
  transactions: Transaction[];
  baseBalance?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 rounded-xl border border-light-border dark:border-white/10 shadow-2xl">
        <p className="text-xs text-light-text-subtle dark:text-gray-400 mb-1">{format(new Date(label), 'MMM dd, yyyy')}</p>
        <p className="text-lg font-bold text-[#051F20] dark:text-brand-green">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function BalanceChart({ transactions, baseBalance = 0 }: BalanceChartProps) {
  const [timeFilter, setTimeFilter] = useState('1W');

  const chartData = useMemo(() => {
    let daysToCalculate = 7;
    if (timeFilter === '1M') daysToCalculate = 30;
    else if (timeFilter === '3M') daysToCalculate = 90;
    else if (timeFilter === '1Y') daysToCalculate = 365;
    else if (timeFilter === 'ALL') daysToCalculate = 180; // Defaulting ALL to 180 days for performance/looks

    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const balanceHistory = [];

    // Optimize base calculation if the dataset was huge, but this is fine for MOCK
    for (let i = daysToCalculate - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      let tempBal = baseBalance;
      for (const t of sorted) {
        const tObj = new Date(t.date);
        tObj.setHours(0, 0, 0, 0);
        const loopDate = new Date(d);
        loopDate.setHours(0, 0, 0, 0);

        if (tObj <= loopDate) {
          tempBal += (t.type === 'income' ? t.amount : -t.amount);
        }
      }
      balanceHistory.push({ date: dateStr, balance: tempBal });
    }

    return balanceHistory;
  }, [transactions, timeFilter, baseBalance]);

  return (
    <div className="glass-card p-8 rounded-[var(--radius-skeuo)] h-[400px] relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold">Account Balance Trend</h3>
          <p className="text-sm text-light-text-subtle dark:text-gray-400">
            {timeFilter === '1W' && 'Your financial growth over the last 7 days'}
            {timeFilter === '1M' && 'Your financial growth over the last 30 days'}
            {timeFilter === '3M' && 'Your financial growth over the last 3 months'}
            {timeFilter === '1Y' && 'Your financial growth over the last year'}
            {timeFilter === 'ALL' && 'Your historical financial growth'}
          </p>
        </div>
        <div className="flex bg-[#8EB69B]/30 dark:bg-white/5 rounded-xl p-1 border border-light-border dark:border-white/5">
          {['1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeFilter(range)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeFilter === range ? 'bg-[#051F20] dark:bg-brand-green text-[#EAF2EC] dark:text-black shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'text-light-text-subtle dark:text-gray-400 hover:text-light-text dark:text-white'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-glass-border)" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              tickFormatter={(str) => {
                const d = new Date(str);
                return timeFilter === '1W' || timeFilter === '1M' ? format(d, 'MMM dd') : format(d, 'MMM yyyy');
              }}
              minTickGap={timeFilter === '1W' ? 0 : 30}
              dy={10}
            />
            <YAxis
              hide
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--chart-1)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBalance)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
