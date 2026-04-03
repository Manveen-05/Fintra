import React from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Plus,
  User,
  Calendar,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRightLeft,
  LayoutDashboard,
  Shield,
  Zap,
} from 'lucide-react';
import { UserRole, SearchCommand } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import QuickSettingsDialog from './QuickSettingsDialog';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';

import { useToast } from './ui/toast';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: { name: string; email: string; phone: string };
  globalSearchTerm: string;
  onSearch: (term: string) => void;
  suggestions: SearchCommand[];
  onDeposit?: (type: 'now' | 'schedule') => void;
  onMenuClick?: () => void;
  setActiveTab: (tab: string) => void;
  settings: any;
  setSettings: (settings: any) => void;
}

export default function Header({ role, setRole, user, globalSearchTerm, onSearch, suggestions, onDeposit, onMenuClick, setActiveTab, settings, setSettings }: HeaderProps) {
  const { toast } = useToast();
  const [showDepositMenu, setShowDepositMenu] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showQuickSettings, setShowQuickSettings] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      suggestions[selectedIndex].handler();
      onSearch('');
      setSelectedIndex(-1);
    } else if (e.key === 'Escape') {
      onSearch('');
      setSelectedIndex(-1);
    }
  };

  const handleNotificationClick = () => {
    toast('No new institutional alerts', 'success');
  };

  const depositMenuRef = React.useRef<HTMLDivElement>(null);
  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (depositMenuRef.current && !depositMenuRef.current.contains(event.target as Node)) {
        setShowDepositMenu(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full flex justify-center pt-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-40 transition-all pointer-events-none">
      <div
        className={cn(
          "flex items-center justify-between w-full max-w-7xl px-3 py-2 pointer-events-auto",
          "rounded-full",
          "bg-white/70 dark:bg-black/40 backdrop-blur-xl",
          "border border-[#235347]/10 dark:border-white/5",
          "shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-500"
        )}
      >
        {/* LEFT - MENU & SEARCH */}
        <div className="flex items-center gap-2 lg:gap-4 flex-1">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#051F20] dark:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="relative group flex-1 max-w-[400px] pointer-events-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#235347]/40 dark:text-gray-500 group-focus-within:text-[#051F20] dark:group-focus-within:text-brand-green transition-colors" />
            <input
              placeholder="Search transactions, settings, news..."
              value={globalSearchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 py-2 w-full rounded-full bg-black/5 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-[#235347]/10 dark:focus:border-brand-green/20 outline-none text-sm transition-all font-medium placeholder:text-[#235347]/30 dark:placeholder:text-gray-600 text-[#051F20] dark:text-white"
            />
            <AnimatePresence>
              {globalSearchTerm && (
                <div className="absolute top-12 left-0 right-0 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-50 p-2">
                  {suggestions.length > 0 ? (
                    <div className="space-y-1">
                      {suggestions.map((cmd, idx) => {
                        const Icon = cmd.icon;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => {
                              cmd.handler();
                              onSearch('');
                              setSelectedIndex(-1);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group/btn text-left",
                              idx === selectedIndex ? "bg-brand-green text-black" : "hover:bg-black/5 dark:hover:bg-white/5"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                                idx === selectedIndex ? "bg-black/10" : "bg-black/5 dark:bg-white/5"
                              )}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className={cn(
                                  "text-[11px] font-black uppercase tracking-tight",
                                  idx === selectedIndex ? "text-black" : "text-[#051F20] dark:text-white"
                                )}>
                                  {cmd.label}
                                </p>
                                <p className={cn(
                                  "text-[9px] font-bold uppercase tracking-widest opacity-40",
                                  idx === selectedIndex ? "text-black" : "text-[#235347] dark:text-gray-400"
                                )}>
                                  {cmd.category}
                                </p>
                              </div>
                            </div>
                            {idx === selectedIndex && (
                              <Zap className="w-3 h-3 animate-pulse" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Search className="w-5 h-5 opacity-20" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#235347]/40 dark:text-gray-600">
                        No matches found in security ledger
                      </p>
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CENTER - ROLE (HIDDEN ON MOBILE) */}
        <div className="hidden md:flex items-center mx-4">
          <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-[#235347]/5 dark:border-white/5">
            <button
              onClick={() => setRole('viewer')}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all duration-300",
                role === 'viewer' ? "bg-white dark:bg-white/10 text-[#051F20] dark:text-white shadow-sm" : "text-[#235347]/40 dark:text-gray-500 hover:text-[#051F20] dark:hover:text-white"
              )}
            >
              Viewer
            </button>
            <button
              onClick={() => setRole('admin')}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all duration-300",
                role === 'admin' ? "bg-[#051F20] dark:bg-brand-green text-white dark:text-black shadow-sm" : "text-[#235347]/40 dark:text-gray-500 hover:text-[#051F20] dark:hover:text-white"
              )}
            >
              Admin
            </button>
          </div>
        </div>

        {/* RIGHT - ACTIONS */}
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            <AnimatedThemeToggler
              darkMode={settings.darkMode}
              onToggle={(isDark) => setSettings((prev: any) => ({ ...prev, darkMode: isDark }))}
            />
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#235347]/60 dark:text-gray-400 hover:text-[#051F20] dark:hover:text-white transition-all relative"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full border border-white dark:border-[#0B0D10]"></div>
            </button>
          </div>

          <div className="relative" ref={depositMenuRef}>
            <button
              onClick={() => setShowDepositMenu(!showDepositMenu)}
              className="flex items-center gap-2 bg-[#051F20] dark:bg-brand-green text-white dark:text-black px-4 sm:px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-wider skeuo-button transition-transform active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deposit</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", showDepositMenu && "rotate-180")} />
            </button>

            <AnimatePresence>
              {showDepositMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-48 bg-white/95 dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl p-1.5"
                >
                  <button
                    onClick={() => {
                      onDeposit?.('now');
                      setShowDepositMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[11px] font-black uppercase text-[#051F20] dark:text-white transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                    Add Now
                  </button>
                  <button
                    onClick={() => {
                      onDeposit?.('schedule');
                      setShowDepositMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[11px] font-black uppercase text-[#051F20] dark:text-white transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    Schedule
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profileMenuRef}>
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 cursor-pointer group p-1 pr-1 sm:pr-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#051F20] dark:from-brand-green to-emerald-700 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0D10] flex items-center justify-center overflow-hidden">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#051F20] dark:text-brand-green" />
                </div>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-black text-[#051F20] dark:text-white leading-tight uppercase">{user.name.split(' ')[0]}</p>
                <p className="text-[10px] text-[#235347]/40 dark:text-gray-500 font-bold uppercase tracking-widest">{role}</p>
              </div>
            </div>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10 rounded-[24px] shadow-2xl overflow-hidden z-50 backdrop-blur-xl p-1.5"
                >
                  <div className="p-3 mb-1 border-b border-black/5 dark:border-white/5 lg:hidden">
                    <p className="text-xs font-black text-[#051F20] dark:text-white uppercase">{user.name}</p>
                    <p className="text-[10px] text-[#235347]/40 dark:text-gray-500 uppercase font-bold">{role}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowQuickSettings(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[11px] font-black uppercase text-[#051F20] dark:text-white transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    Quick Settings
                  </button>
                  <div className="md:hidden mt-1 pt-1 border-t border-black/5 dark:border-white/5 space-y-1">
                    <button
                      onClick={() => { setRole('viewer'); setShowProfileMenu(false); }}
                      className={cn(
                        "w-full px-4 py-2 rounded-xl text-[10px] font-black uppercase text-left transition-colors",
                        role === 'viewer' ? "bg-[#051F20] text-white" : "text-[#235347]/40 hover:bg-black/5"
                      )}
                    >
                      Viewer Mode
                    </button>
                    <button
                      onClick={() => { setRole('admin'); setShowProfileMenu(false); }}
                      className={cn(
                        "w-full px-4 py-2 rounded-xl text-[10px] font-black uppercase text-left transition-colors",
                        role === 'admin' ? "bg-brand-green text-black" : "text-[#235347]/40 hover:bg-black/5"
                      )}
                    >
                      Admin Mode
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <QuickSettingsDialog
              open={showQuickSettings}
              onOpenChange={setShowQuickSettings}
              settings={settings}
              setSettings={setSettings}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
