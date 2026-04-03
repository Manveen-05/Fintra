import React from 'react';
import { motion } from 'motion/react';
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip as ReTooltip,
   ResponsiveContainer,
   AreaChart,
   Area,
   PieChart,
   Pie,
   Cell
} from 'recharts';
import {
   TrendingUp,
   TrendingDown,
   PieChart as PieIcon,
   BarChart3,
   Calendar,
   Filter,
   Download,
   Info,
   ArrowUpRight,
   ArrowDownRight,
   Activity,
   Target,
   Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from './ui/toast';

const SPENDING_DATA = [
   { name: 'Jan', amount: 4500, lastYear: 3800 },
   { name: 'Feb', amount: 5200, lastYear: 4100 },
   { name: 'Mar', amount: 4800, lastYear: 4300 },
   { name: 'Apr', amount: 6100, lastYear: 4500 },
   { name: 'May', amount: 5500, lastYear: 4800 },
   { name: 'Jun', amount: 6700, lastYear: 4900 },
];

const WEEKLY_SPENDING_DATA = [
   { name: 'Week 1', amount: 1200, lastYear: 1100 },
   { name: 'Week 2', amount: 1400, lastYear: 1250 },
   { name: 'Week 3', amount: 1100, lastYear: 1300 },
   { name: 'Week 4', amount: 1600, lastYear: 1400 },
];

const CATEGORY_DATA = [
   { name: 'Housing', value: 35, color: '#051F20' },
   { name: 'Food', value: 20, color: '#22C55E' },
   { name: 'Transport', value: 15, color: '#10B981' },
   { name: 'Entertainment', value: 15, color: '#8EB69B' },
   { name: 'Utilities', value: 15, color: '#D9E6DB' },
];

const CASHFLOW_DATA = [
   { name: 'W1', income: 5000, expense: 4200 },
   { name: 'W2', income: 5500, expense: 3800 },
   { name: 'W3', income: 4800, expense: 4100 },
   { name: 'W4', income: 6200, expense: 4500 },
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

export default function AnalyticsView() {
   const { toast } = useToast();
   const [timeRange, setTimeRange] = React.useState('6M');
   const [spendingView, setSpendingView] = React.useState<'monthly' | 'weekly'>('monthly');
   const [isExporting, setIsExporting] = React.useState(false);

   const handleExport = () => {
      setIsExporting(true);
      toast('Preparing your financial report...', 'info');

      setTimeout(() => {
         const currentData = spendingView === 'monthly' ? SPENDING_DATA : WEEKLY_SPENDING_DATA;
         const headers = "Label,Amount,LastYear\n";
         const rows = currentData.map(d => `${d.name},${d.amount},${d.lastYear}`).join("\n");
         const csvContent = "data:text/csv;charset=utf-8," + headers + rows;

         const encodedUri = encodeURI(csvContent);
         const link = document.createElement("a");
         link.setAttribute("href", encodedUri);
         link.setAttribute("download", `Fintra_Analytics_${spendingView}_${new Date().getFullYear()}.csv`);
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);

         setIsExporting(false);
         toast('Report exported successfully!', 'success');
      }, 1500);
   };

   // ... (toggleTimeRange omitted for brevity or I'll just keep it)
   const toggleTimeRange = () => {
      const nextRange = timeRange === '6M' ? 'YTD' : '6M';
      setTimeRange(nextRange);
      toast(`Viewing ${nextRange === '6M' ? 'Last 6 Months' : 'Year to Date'}`, 'info');
   };

   const currentSpendingData = spendingView === 'monthly' ? SPENDING_DATA : WEEKLY_SPENDING_DATA;

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
               <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#051F20] dark:text-white uppercase">Financial Analytics</h1>
               <p className="text-sm text-[#235347]/60 dark:text-gray-400 mt-1 font-bold">Deep dive into your cashflow and spending patterns.</p>
            </div>
            <div className="flex flex-wrap gap-3">
               <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white/50 dark:bg-white/5 text-[#051F20] dark:text-white px-4 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all disabled:opacity-50 shadow-sm"
               >
                  <Download className={cn("w-3.5 h-3.5", isExporting && "animate-bounce")} />
                  {isExporting ? 'Exporting...' : 'Export'}
               </button>
               <button
                  onClick={toggleTimeRange}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#051F20] dark:bg-brand-green text-white dark:text-black px-4 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform active:scale-95"
               >
                  <Calendar className="w-3.5 h-3.5" />
                  {timeRange}
               </button>
            </div>
         </div>

         {/* TOP SUMMARY CARDS */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
               { title: "Monthly Savings", value: "$3,420.00", change: "+12.5%", up: true, icon: Target },
               { title: "Avg. Weekly Spend", value: "$850.50", change: "-4.2%", up: false, icon: Activity },
               { title: "Income Growth", value: "+18.4%", change: "vs last qtr", up: true, icon: TrendingUp },
               { title: "Financial Score", value: "92/100", change: "Excellent", up: true, icon: Sparkles },
            ].map((stat, i) => (
               <motion.div key={i} variants={itemVariants} className="p-5 sm:p-6 rounded-[32px] bg-white/70 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 shadow-xl group hover:border-brand-green/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 rounded-2xl bg-[#051F20]/5 dark:bg-brand-green/10 flex items-center justify-center text-[#051F20] dark:text-brand-green group-hover:scale-110 transition-transform border border-black/5 dark:border-brand-green/10">
                        <stat.icon className="w-5 h-5" />
                     </div>
                     <div className={cn(
                        "text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter",
                        stat.up ? "bg-brand-green/10 text-brand-green" : "bg-red-500/10 text-red-500"
                      )}>
                        {stat.change}
                     </div>
                  </div>
                  <p className="text-[10px] font-black uppercase text-[#235347]/40 dark:text-gray-500 tracking-[0.15em]">{stat.title}</p>
                  <p className="text-2xl font-black text-[#051F20] dark:text-white mt-1 tracking-tight">{stat.value}</p>
               </motion.div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* SPENDING TRENDS */}
            <motion.div variants={itemVariants} className="lg:col-span-2 p-5 sm:p-8 rounded-[40px] bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 shadow-2xl flex flex-col min-h-[420px]">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] dark:bg-brand-green/10 flex items-center justify-center text-[#235347] dark:text-brand-green border border-[#235347]/10 dark:border-brand-green/20">
                        <BarChart3 className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg sm:text-xl font-black text-[#051F20] dark:text-white uppercase tracking-tight">Spending Trends</h3>
                  </div>
                  <div className="flex bg-black/5 dark:bg-white/5 rounded-2xl p-1 gap-1 w-full sm:w-auto">
                     <button
                        onClick={() => { setSpendingView('monthly'); toast('Switching to Monthly view', 'info'); }}
                        className={cn(
                           "flex-1 sm:flex-initial px-4 py-1.5 text-[10px] font-black uppercase transition-all duration-300 rounded-xl",
                           spendingView === 'monthly'
                              ? "bg-white dark:bg-white/10 text-[#051F20] dark:text-white shadow-sm"
                              : "text-[#235347]/40 dark:text-gray-500 hover:text-[#051F20] dark:hover:text-white"
                        )}
                     >
                        Monthly
                     </button>
                     <button
                        onClick={() => { setSpendingView('weekly'); toast('Switching to Weekly view', 'info'); }}
                        className={cn(
                           "flex-1 sm:flex-initial px-4 py-1.5 text-[10px] font-black uppercase transition-all duration-300 rounded-xl",
                           spendingView === 'weekly'
                              ? "bg-white dark:bg-white/10 text-[#051F20] dark:text-white shadow-sm"
                              : "text-[#235347]/40 dark:text-gray-500 hover:text-[#051F20] dark:hover:text-white"
                        )}
                     >
                        Weekly
                     </button>
                  </div>
               </div>

               <div className="flex-1 h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={currentSpendingData} margin={{ left: -20 }}>
                        <defs>
                           <linearGradient id="spendingTrendsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#22C55E" stopOpacity={1} />
                              <stop offset="100%" stopColor="#051F20" stopOpacity={0.8} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} 
                        />
                        <ReTooltip
                           contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', background: '#051F20', color: '#fff' }}
                           itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                        />
                        <Bar dataKey="amount" fill="url(#spendingTrendsGradient)" radius={[6, 6, 0, 0]} barSize={24} />
                        <Bar dataKey="lastYear" fill="#235347" radius={[6, 6, 0, 0]} barSize={24} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-8 flex flex-wrap gap-6 sm:gap-8 justify-center sm:justify-start">
                  <div className="flex items-center gap-2">
                     <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E]" />
                     <span className="text-[10px] font-black uppercase text-[#235347]/60 dark:text-gray-400 tracking-wider">Current Period</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3.5 h-3.5 rounded-full bg-[#235347]" />
                     <span className="text-[10px] font-black uppercase text-[#235347]/60 dark:text-gray-400 tracking-wider">Previous Period</span>
                  </div>
               </div>
            </motion.div>

            {/* CATEGORY DISTRIBUTION */}
            <motion.div variants={itemVariants} className="p-5 sm:p-8 rounded-[40px] bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 shadow-2xl flex flex-col justify-between">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-[#051F20]/5 dark:bg-brand-green/20 flex items-center justify-center text-[#051F20] dark:text-brand-green border border-black/5 dark:border-brand-green/10">
                     <PieIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#051F20] dark:text-white uppercase tracking-tight">Category Mix</h3>
               </div>

               <div className="h-56 sm:h-64 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={CATEGORY_DATA}
                           innerRadius="65%"
                           outerRadius="90%"
                           paddingAngle={8}
                           dataKey="value"
                           stroke="none"
                        >
                           {CATEGORY_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <ReTooltip />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-2xl sm:text-3xl font-black text-[#051F20] dark:text-white tracking-tighter">72%</span>
                     <span className="text-[8px] font-black uppercase text-[#235347]/40 tracking-widest text-center">Core<br />Outflow</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3 mt-8">
                  {CATEGORY_DATA.map((cat, i) => (
                     <div key={i} className="flex items-center justify-between group p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-2 truncate">
                           <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                           <span className="text-[10px] font-black uppercase text-[#235347]/60 dark:text-white/70 group-hover:text-brand-green truncate tracking-tighter">{cat.name}</span>
                        </div>
                        <span className="text-[10px] font-black text-[#051F20] dark:text-white/40 ml-1">{cat.value}%</span>
                     </div>
                  ))}
               </div>
            </motion.div>

            {/* CASHFLOW ANALYSIS */}
            <motion.div variants={itemVariants} className="lg:col-span-2 p-5 sm:p-8 rounded-[40px] bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 shadow-2xl min-h-[400px]">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green border border-brand-green/20">
                        <TrendingUp className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg sm:text-xl font-black text-[#051F20] dark:text-white uppercase tracking-tight">Cashflow Dynamics</h3>
                  </div>
               </div>

               <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={CASHFLOW_DATA} margin={{ left: -20 }}>
                        <defs>
                           <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                           </linearGradient>
                           <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#051F20" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#051F20" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} />
                        <ReTooltip
                           contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', background: '#051F20', color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="income" stroke="#22C55E" fillOpacity={1} fill="url(#incomeGradient)" strokeWidth={window.innerWidth < 640 ? 3 : 4} />
                        <Area type="monotone" dataKey="expense" stroke="#051F20" fillOpacity={1} fill="url(#expenseGradient)" strokeWidth={window.innerWidth < 640 ? 3 : 4} className="dark:stroke-gray-600" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </motion.div>

            {/* AI INSIGHTS CARD */}
            <motion.div variants={itemVariants} className="p-8 rounded-[40px] bg-gradient-to-br from-[#051F20] to-[#142A2B] text-white relative overflow-hidden group shadow-2xl min-h-[400px]">
               <div className="absolute top-0 right-0 p-8 transform translate-x-1/4 -translate-y-1/4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Sparkles className="w-64 h-64 text-brand-green" />
               </div>
               <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-10 rounded-2xl bg-brand-green/20 backdrop-blur-md flex items-center justify-center text-brand-green border border-brand-green/30">
                        <Sparkles className="w-5 h-5 fill-current" />
                     </div>
                     <h3 className="text-xl font-black uppercase tracking-tight">AI Insights</h3>
                  </div>
                  <div className="space-y-4 flex-1">
                     <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-2 group/card hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-2 text-brand-green">
                           <TrendingUp className="w-4 h-4" />
                           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Efficiency</span>
                        </div>
                        <p className="text-xs font-bold opacity-80 leading-relaxed tracking-tight tracking-wider">Your discretionary spending decreased by <span className="text-brand-green">12%</span> vs last month. Optimal performance.</p>
                     </div>
                     <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-2 group/card hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-2 text-[#8EB69B]">
                           <Info className="w-4 h-4" />
                           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Strategy</span>
                        </div>
                        <p className="text-xs font-bold opacity-80 leading-relaxed tracking-tight tracking-wider">Deploy $5k into liquid savings for <span className="text-white">+4.5%</span> risk-adjusted yield.</p>
                     </div>
                  </div>
                  <button
                     onClick={() => toast('Generating institutional analysis...', 'info')}
                     className="mt-8 w-full py-4 bg-brand-green text-[#051F20] rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-brand-green/20"
                  >
                     Analyze
                  </button>
               </div>
            </motion.div>
         </div>
      </motion.div>
   );
}
