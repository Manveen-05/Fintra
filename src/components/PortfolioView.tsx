import React from 'react';
import { motion } from 'motion/react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCw,
  Coins,
  Briefcase,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from './ui/toast';
import BuyAssetModal from './BuyAssetModal';

const ALLOCATION_DATA = [
  { name: 'Crypto', value: 45, color: '#22C55E' },
  { name: 'Stocks', value: 35, color: '#10B981' },
  { name: 'Cash', value: 15, color: '#051F20' },
  { name: 'Commodities', value: 5, color: '#8EB69B' },
];

const PERFORMANCE_DATA = [
  { name: 'Mon', value: 118000 },
  { name: 'Tue', value: 120500 },
  { name: 'Wed', value: 119800 },
  { name: 'Thu', value: 122400 },
  { name: 'Fri', value: 121000 },
  { name: 'Sat', value: 124000 },
  { name: 'Sun', value: 125800 },
];

const HOLDINGS = [
  { name: 'Bitcoin', symbol: 'BTC', amount: '1.24', value: '$84,200', change: '+5.2%', up: true, icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
  { name: 'Ethereum', symbol: 'ETH', amount: '12.5', value: '$32,150', change: '-1.4%', up: false, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { name: 'Nvidia Corp', symbol: 'NVDA', amount: '24', value: '$18,400', change: '+8.7%', up: true, icon: 'https://logo.clearbit.com/nvidia.com' },
  { name: 'Apple Inc', symbol: 'AAPL', amount: '15', value: '$3,200', change: '+0.5%', up: true, icon: 'https://logo.clearbit.com/apple.com' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function PortfolioView() {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = React.useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    toast('Syncing with institutional providers...', 'info');
    
    setTimeout(() => {
      setIsSyncing(false);
      toast('Portfolio successfully synchronized', 'success');
    }, 2000);
  };

  const handleBuyAsset = () => {
    setIsBuyModalOpen(true);
  };

  const handleAssetClick = (name: string) => {
    toast(`Opening deep-dive analysis for ${name}`, 'info');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#051F20] dark:text-white uppercase">Portfolio Overview</h1>
          <p className="text-sm text-[#235347]/60 dark:text-gray-400 mt-1 font-bold">Track your asset distribution and performance.</p>
        </div>
        <div className="flex flex-wrap gap-3">
           <button 
             onClick={handleSync}
             disabled={isSyncing}
             className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white/50 dark:bg-white/5 text-[#051F20] dark:text-white px-4 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all disabled:opacity-50 shadow-sm"
           >
              <RefreshCw className={cn("w-3.5 h-3.5", isSyncing && "animate-spin")} />
              {isSyncing ? 'Syncing...' : 'Sync'}
           </button>
           <button 
             onClick={handleBuyAsset}
             className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#051F20] dark:bg-brand-green text-white dark:text-black px-4 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform active:scale-95"
           >
              <Plus className="w-3.5 h-3.5" />
              Buy Asset
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* MAIN STATS & CHART */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
             {/* Net Worth Summary */}
             <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-[40px] bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#235347]/40 dark:text-gray-500 tracking-[0.2em]">
                      <Wallet className="w-4 h-4" />
                      Net Worth
                   </div>
                   <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-[#051F20] dark:text-white tracking-tighter">$125,800.45</span>
                      <span className="text-[9px] font-black text-brand-green px-2 py-1 rounded-lg bg-brand-green/10 flex items-center gap-0.5 animate-pulse uppercase tracking-tighter">
                         <TrendingUp className="w-2.5 h-2.5" />
                         +12.4%
                      </span>
                   </div>
                   <p className="text-[10px] text-[#235347]/60 dark:text-gray-400 font-bold leading-relaxed">Equities & Crypto weighted average. Updated 2min ago.</p>
                </div>
                <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Briefcase className="w-24 h-24 text-brand-green" />
                </div>
             </motion.div>

             {/* Daily Performance Mini Chart */}
             <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-[40px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col justify-between min-h-[180px]">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-[10px] font-black uppercase text-[#235347]/40 dark:text-gray-500 tracking-[0.2em]">Weekly Gain</p>
                      <p className="text-2xl font-black text-[#051F20] dark:text-white tracking-tight">+$1,450.00</p>
                   </div>
                   <div className="w-10 h-10 rounded-2xl bg-brand-green/20 flex items-center justify-center text-brand-green border border-brand-green/20">
                      <Zap className="w-5 h-5 fill-current" />
                   </div>
                </div>
                <div className="h-16 w-full -mb-4 overflow-hidden -mx-4 sm:-mx-6">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={PERFORMANCE_DATA}>
                         <defs>
                            <linearGradient id="pColor" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <Area type="monotone" dataKey="value" stroke="#22C55E" fillOpacity={1} fill="url(#pColor)" strokeWidth={3} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </motion.div>
          </div>

          {/* Holdings Section */}
          <motion.div variants={itemVariants} className="space-y-4">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
                <h3 className="text-lg sm:text-xl font-black text-[#051F20] dark:text-white uppercase tracking-tight">Top Holdings</h3>
                <button 
                  onClick={() => toast('Complete asset overview is under verification', 'info')}
                  className="text-[10px] font-black text-brand-green hover:underline uppercase tracking-widest text-left"
                >
                  View All Assets
                </button>
             </div>
             <div className="rounded-[40px] bg-white/70 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead>
                         <tr className="border-b border-black/5 dark:border-white/5">
                            <th className="px-6 sm:px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-[#235347]/40 dark:text-gray-500 whitespace-nowrap">Asset</th>
                            <th className="px-6 sm:px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-[#235347]/40 dark:text-gray-500 whitespace-nowrap">Amount</th>
                            <th className="px-6 sm:px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-[#235347]/40 dark:text-gray-500 whitespace-nowrap">Value</th>
                            <th className="px-6 sm:px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-[#235347]/40 dark:text-gray-500 whitespace-nowrap">24h Change</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5">
                         {HOLDINGS.map((asset, i) => (
                            <tr 
                               key={i} 
                               onClick={() => handleAssetClick(asset.name)}
                               className="group hover:bg-[#EAF2EC] dark:hover:bg-white/10 transition-all cursor-pointer"
                            >
                               <td className="px-6 sm:px-8 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/5 p-2 flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/5 shadow-sm group-hover:scale-110 transition-transform">
                                        <img src={asset.icon} alt={asset.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80" />
                                     </div>
                                     <div>
                                        <p className="font-black text-sm text-[#051F20] dark:text-white uppercase tracking-tight">{asset.name}</p>
                                        <p className="text-[10px] font-black text-brand-green opacity-70 tracking-[0.2em]">{asset.symbol}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 sm:px-8 py-5 text-right whitespace-nowrap">
                                  <span className="font-bold text-sm text-[#051F20] dark:text-white">{asset.amount}</span>
                                  <span className="text-[10px] font-black text-[#235347]/40 dark:text-gray-500 ml-1.5 uppercase">{asset.symbol}</span>
                               </td>
                               <td className="px-6 sm:px-8 py-5 text-right font-black text-sm text-[#051F20] dark:text-white whitespace-nowrap">{asset.value}</td>
                               <td className="px-6 sm:px-8 py-5 text-right whitespace-nowrap">
                                  <div className={cn(
                                     "inline-flex items-center gap-1 font-black text-[10px] px-3 py-1.5 rounded-xl uppercase tracking-tighter",
                                     asset.up ? "bg-brand-green/10 text-brand-green" : "bg-red-500/10 text-red-500"
                                  )}>
                                     {asset.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                     {asset.change}
                                  </div>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </motion.div>
        </div>

        {/* SIDE COLUMN - ALLOCATION */}
        <div className="space-y-6 sm:space-y-8">
           <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-[40px] bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 shadow-2xl space-y-8 flex flex-col h-full min-h-[500px]">
              <div className="flex items-center justify-between">
                 <h3 className="text-lg sm:text-xl font-black text-[#051F20] dark:text-white uppercase tracking-tight">Allocation</h3>
                 <div className="p-2 rounded-xl bg-brand-green/10 text-brand-green border border-brand-green/20">
                    <Coins className="w-4 h-4" />
                 </div>
              </div>
              
              <div className="h-56 sm:h-64 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={ALLOCATION_DATA}
                          innerRadius="65%"
                          outerRadius="90%"
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                       >
                          {ALLOCATION_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl sm:text-3xl font-black text-[#051F20] dark:text-white tracking-tighter">100%</span>
                    <span className="text-[8px] font-black uppercase text-[#235347]/40 tracking-[0.2em]">Cap</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                 {ALLOCATION_DATA.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => toast(`Filtering portfolio for ${item.name}`, 'info')}
                      className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 group hover:bg-brand-green/10 hover:border-brand-green/20 transition-all cursor-pointer"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="font-black text-[10px] text-[#051F20] dark:text-white uppercase tracking-widest">{item.name}</span>
                       </div>
                       <span className="font-black text-xs text-brand-green">{item.value}%</span>
                    </div>
                 ))}
              </div>

              <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5">
                 <p className="text-[10px] font-black text-[#235347]/40 dark:text-gray-500 uppercase tracking-widest leading-relaxed text-center">Institutional portfolio rebalanced for yield potential.</p>
              </div>
           </motion.div>
        </div>
      </div>

      <BuyAssetModal 
        isOpen={isBuyModalOpen} 
        onClose={() => setIsBuyModalOpen(false)} 
      />
    </motion.div>
  );
}
