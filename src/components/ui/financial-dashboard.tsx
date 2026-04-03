import * as React from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  History,
  Library,
  Search,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// --- TYPE DEFINITIONS ---
type QuickAction = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type Activity = {
  icon: React.ReactNode; 
  title: string;
  time: string;
  amount: number;
};

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  isPremium?: boolean;
  hasAction?: boolean;
};

interface FinancialDashboardProps {
  quickActions: QuickAction[];
  recentActivity: Activity[];
  financialServices: Service[];
}

// --- HELPER COMPONENTS ---
const IconWrapper = ({
  icon: Icon,
  className,
}: {
  icon: React.ElementType;
  className?: string;
}) => (
  <div
    className={cn(
      'p-2 rounded-full flex items-center justify-center',
      className
    )}
  >
    <Icon className="w-5 h-5" />
  </div>
);

// --- MAIN COMPONENT ---
export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  quickActions,
  recentActivity,
  financialServices,
}) => {
  // Animation variants from user's specification
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-light-surface dark:bg-[#1c1c1e] text-light-text dark:text-white rounded-[32px] border border-light-border dark:border-white/10 shadow-2xl max-w-2xl mx-auto font-sans overflow-hidden"
    >
      <div className="p-4 md:p-8">
        {/* Search Bar */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-subtle dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search transactions, payments, or type a command..."
            className="bg-[#8EB69B]/30 dark:bg-white/5 w-full border border-light-border dark:border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-green/30 outline-none transition-all placeholder:text-gray-600"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center text-[10px] font-mono text-light-text-subtle dark:text-gray-400 bg-[#8EB69B]/30 dark:bg-white/5 border border-light-border dark:border-white/10 p-1.5 rounded-lg">
            ⌘K
          </kbd>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              className="group text-center p-4 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-light-border dark:border-white/5"
            >
              <IconWrapper
                icon={action.icon}
                className="mx-auto mb-3 bg-[#8EB69B]/30 dark:bg-white/5 group-hover:bg-[#051F20] dark:bg-brand-green group-hover:text-[#EAF2EC] dark:text-black transition-all"
              />
              <p className="text-sm font-bold">{action.title}</p>
              <p className="text-[10px] text-light-text-subtle dark:text-gray-500 uppercase tracking-widest mt-1">
                {action.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-[#051F20] dark:text-brand-green" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-light-text-subtle dark:text-gray-400 text-[11px]">Recent activity</h2>
          </div>
          <motion.ul
            variants={containerVariants}
            className="space-y-5"
          >
            {recentActivity.map((activity, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  {React.isValidElement(activity.icon) ? (
                    activity.icon
                  ) : (
                    <IconWrapper
                      icon={activity.icon as React.ElementType}
                      className="bg-[#8EB69B]/30 dark:bg-white/5 text-light-text-subtle dark:text-gray-400 group-hover:bg-[#051F20]/10 dark:bg-brand-green/10 group-hover:text-[#051F20] dark:text-brand-green transition-all"
                    />
                  )}
                  <div>
                    <p className="font-bold text-sm text-light-text dark:text-white">{activity.title}</p>
                    <p className="text-[10px] text-light-text-subtle dark:text-gray-500 uppercase tracking-tight">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'text-sm font-bold p-1 pr-3 pl-3 rounded-full',
                    activity.amount > 0
                      ? 'text-[#051F20] dark:text-brand-green bg-[#051F20]/10 dark:bg-brand-green/10'
                      : 'text-red-800 dark:text-red-400 bg-red-700/10 dark:bg-red-500/10'
                  )}
                >
                  {activity.amount > 0 ? '+' : '-'}${Math.abs(activity.amount).toFixed(2)}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Financial Services */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <Library className="w-5 h-5 text-[#051F20] dark:text-brand-green" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-light-text-subtle dark:text-gray-400 text-[11px]">Financial services</h2>
          </div>
          <motion.div
            variants={containerVariants}
            className="space-y-3"
          >
            {financialServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
                className="flex items-center justify-between p-4 rounded-[20px] cursor-pointer transition-all border border-light-border dark:border-white/5 hover:border-light-border dark:border-white/10"
              >
                <div className="flex items-center gap-4">
                  <IconWrapper
                    icon={service.icon}
                    className="bg-[#8EB69B]/30 dark:bg-white/5 text-light-text-subtle dark:text-gray-400"
                  />
                  <div>
                    <p className="font-bold text-sm flex items-center gap-2 text-light-text dark:text-white">
                      {service.title}
                      {service.isPremium && (
                        <span className="text-[9px] font-bold text-[#051F20] dark:text-brand-green bg-[#051F20]/10 dark:bg-brand-green/10 px-2 py-0.5 rounded-full uppercase">
                          Premium
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-light-text-subtle dark:text-gray-500">
                      {service.description}
                    </p>
                  </div>
                </div>
                {service.hasAction && (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
