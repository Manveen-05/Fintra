import React from 'react';
import {
  LayoutDashboard,
  Shield,
  Users,
  Percent,
  Code,
  Settings,
  LogOut,
  TrendingUp,
  Wallet,
  PieChart,
  CreditCard,
  ArrowRightLeft,
  BarChart3,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

import { useToast } from './ui/toast';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose, onLogout }: SidebarProps) {
  const { toast } = useToast();

  const handleLogout = () => {
    toast('Institutional session terminated safely', 'success');
    if (onLogout) {
      setTimeout(() => {
        onLogout();
      }, 1500);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const handleTabChange = (id: string, label: string) => {
    setActiveTab(id);
    if (activeTab !== id) {
      toast(`Accessing ${label}`, 'info');
    }
  };
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  const SECONDARY_NAV_ITEMS = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen z-[100] transition-transform duration-500 ease-in-out lg:z-50 lg:translate-x-0 lg:p-5",
          isOpen ? "translate-x-0 p-4" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div
          className={cn(
            "w-[280px] lg:w-[260px] h-full lg:h-[95vh] flex flex-col justify-between p-6",
            "rounded-[32px]",
            "bg-gradient-to-b from-[#E5F0E8] to-[#8EB69B]/40 dark:from-[#14171C] dark:to-[#0B0D10]/80",
            "backdrop-blur-3xl",
            "border border-white/20 dark:border-white/5",
            "shadow-2xl lg:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          )}
        >
          {/* TOP SECTION */}
          <div>
            {/* LOGO & CLOSE BUTTON */}
            <div className="flex items-center justify-between mb-10 px-2">
              <div className="flex items-center gap-3">
                <Logo className="w-11 h-11" />
                <h1 className="text-xl font-extrabold tracking-tight text-[#051F20] dark:text-white">Fintra</h1>
              </div>
              
              {onClose && (
                <button 
                  onClick={onClose}
                  className="lg:hidden p-2 rounded-xl bg-black/5 dark:bg-white/5 text-[#051F20] dark:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* MAIN NAVIGATION */}
            <nav className="space-y-1.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleTabChange(item.id, item.label);
                    if (onClose) onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group text-left",
                    activeTab === item.id
                      ? "bg-white/90 dark:bg-white/10 text-[#051F20] dark:text-brand-green shadow-sm scale-[1.02]"
                      : "text-[#235347]/70 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/5 hover:text-[#051F20] dark:hover:text-white"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    activeTab === item.id ? "bg-[#051F20]/5 dark:bg-brand-green/20" : "bg-black/5 dark:bg-white/5 group-hover:bg-white/50 dark:group-hover:bg-white/10"
                  )}>
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[14px] font-bold tracking-wide">{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-[#235347] dark:bg-brand-green ring-4 ring-[#235347]/10"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* BOTTOM SECTION */}
          <div className="space-y-1.5">
            <div className="mx-2 border-t border-[#235347]/10 dark:border-white/5 my-4" />

            {SECONDARY_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleTabChange(item.id, item.label);
                  if (onClose) onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group text-left",
                  activeTab === item.id
                    ? "bg-white/90 dark:bg-white/10 text-[#051F20] dark:text-brand-green shadow-sm scale-[1.02]"
                    : "text-[#235347]/70 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/5 hover:text-[#051F20] dark:hover:text-white"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  activeTab === item.id ? "bg-[#051F20]/5 dark:bg-brand-green/20" : "bg-black/5 dark:bg-white/5"
                )}>
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[14px] font-bold tracking-wide">{item.label}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600/80 dark:text-red-400/80 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 transition-all cursor-pointer group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/5 flex items-center justify-center group-hover:bg-red-500/10">
                <LogOut className="w-4.5 h-4.5" />
              </div>
              <span className="text-[14px] font-bold tracking-wide">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
