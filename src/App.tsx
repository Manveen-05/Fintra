import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import BalanceChart from './components/BalanceChart';
import TransactionsTable from './components/TransactionsTable';
import NewsCard from './components/NewsCard';
import InsightsSection from './components/InsightsSection';
import GainsLossesCard from './components/GainsLossesCard';
import CategoriesChartCard from './components/CategoriesChartCard';
import TransactionModal from './components/TransactionModal';
import QuickTransactionsCard from './components/QuickTransactionsCard';
import UpcomingTransactionsCard from './components/UpcomingTransactionsCard';
import UpcomingTransactionModal from './components/UpcomingTransactionModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import PermissionModal from './components/PermissionModal';
import SettingsView from './components/SettingsView';
import VideoBackground from './components/VideoBackground';
import AnalyticsView from './components/AnalyticsView';
import PortfolioView from './components/PortfolioView';
import SecurityView from './components/SecurityView';
import CardsView from './components/CardsView';
import LoginView from './components/LoginView';
import GeometricBackground from './components/ui/geometric';
import { ToastProvider, useToast } from './components/ui/toast';
import { MOCK_DATA } from './constants';
import { UserRole, Transaction, SearchCommand } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  X, 
  Plus,
  LayoutDashboard,
  ArrowRightLeft,
  CreditCard,
  Wallet,
  PieChart,
  Settings,
  Bell,
  Moon,
  Sun,
  LogOut,
  Download
} from 'lucide-react';
import { cn } from './lib/utils';

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

export default function App() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settings, setSettings] = useState({
    notifications: true,
    twoFactor: true,
    darkMode: true,
    emailUpdates: true,
  });
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_DATA.transactions);
  const [upcomingTransactions, setUpcomingTransactions] = useState([
    {
      id: 'up-1',
      name: 'Tech Corp Salary',
      date: 'Tomorrow, 9:00 AM',
      amount: 4500.00,
      type: 'income',
      isIcon: true,
    },
    {
      id: 'up-2',
      name: 'Netflix OTT',
      date: 'April 14, 2026',
      amount: 15.99,
      type: 'expense',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png',
    },
    {
      id: 'up-3',
      name: 'Spotify Premium',
      date: 'April 19, 2026',
      amount: 11.99,
      type: 'expense',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    }
  ] as any[]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deleteModalTarget, setDeleteModalTarget] = useState<string | null>(null);
  const [cancelingUpcoming, setCancelingUpcoming] = useState<any | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('fintra_auth') === 'true';
  });
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('fintra_role') as UserRole) || 'viewer';
  });
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);


  // Search-to-Navigation Logic (Auto-jump for specific keys)
  React.useEffect(() => {
    if (!globalSearchTerm || globalSearchTerm.length < 4) return;
    // ... existing jump logic or leave for suggestions ...
  }, [globalSearchTerm]);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    localStorage.setItem('fintra_auth', 'true');
    localStorage.setItem('fintra_role', selectedRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fintra_auth');
    localStorage.removeItem('fintra_role');
  };

  const [user, setUser] = useState({
    name: 'Manveen Singh',
    email: 'manveen@example.com',
    phone: '+1 (555) 000-0000'
  });

  // Scroll to top when changing tabs
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const requireAdmin = (action: () => void) => {
    if (role === 'admin') {
      action();
    } else {
      setPendingAction(() => action);
      setShowPermissionModal(true);
    }
  };

  const handleAddTransaction = () => {
    requireAdmin(() => {
      setEditingTransaction(null);
      setShowAddModal(true);
    });
  };

  const handleEditTransaction = (t: Transaction) => {
    requireAdmin(() => {
      setEditingTransaction(t);
      setShowAddModal(true);
    });
  };

  const handleDeleteTransaction = (id: string) => {
    requireAdmin(() => {
      setDeleteModalTarget(id);
    });
  };

  const executeDelete = () => {
    if (role !== 'admin' || !deleteModalTarget) return;
    setTransactions(prev => prev.filter(t => t.id !== deleteModalTarget));
    setDeleteModalTarget(null);
  };

  const handleSaveTransaction = (transaction: Transaction) => {
    if (editingTransaction) {
      setTransactions(prev => prev.map(t => t.id === transaction.id ? transaction : t));
    } else {
      setTransactions(prev => [transaction, ...prev]);
    }
    setShowAddModal(false);
    setEditingTransaction(null);
  };

  const handleQuickSend = (amount: number) => {
    requireAdmin(() => {
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        amount: amount,
        category: 'Quick Transfer',
        type: 'expense',
        description: 'Quick Beneficiary Transfer'
      };

      setTransactions(prev => [newTransaction, ...prev]);
    });
  };

  const handleCancelUpcoming = (id: string) => {
    requireAdmin(() => {
      const target = upcomingTransactions.find(t => t.id === id);
      if (target) {
        setCancelingUpcoming(target);
      }
    });
  };

  const confirmCancelUpcoming = () => {
    if (!cancelingUpcoming) return;
    setUpcomingTransactions(prev => prev.filter(t => t.id !== cancelingUpcoming.id));
    setCancelingUpcoming(null);
  };

  const handleSaveUpcoming = (newUpcoming: any) => {
    requireAdmin(() => {
      setUpcomingTransactions(prev => [newUpcoming, ...prev]);
    });
  };

  const dynamics = useMemo(() => {
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

    // We use the most recent transaction date as our "current" date to ensure the demo always matches the mock data properly, 
    // or we can just use today's date. Today is fine since MOCK_DATA ends near today.
    const today = new Date();

    transactions.forEach(t => {
      const tDate = new Date(t.date);
      const isThisMonth = tDate.getMonth() === today.getMonth() && tDate.getFullYear() === today.getFullYear();

      if (t.type === 'income') {
        totalIncome += t.amount;
        if (isThisMonth) monthlyIncome += t.amount;
      } else {
        totalExpenses += t.amount;
        if (isThisMonth) monthlyExpenses += t.amount;
      }
    });

    const baseBalance = 0; // Base starting balance
    const totalBalance = baseBalance + totalIncome - totalExpenses;

    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const balanceHistory = [];

    // Generate the last 7 days of balance trend
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      let tempBal = baseBalance;
      for (const t of sorted) {
        // Compare dates by stripping time
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

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      totalIncome,
      totalExpenses,
      balanceHistory
    };
  }, [transactions]);

  const highestCategory = useMemo(() => {
    const categories: Record<string, number> = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      }
    });
    const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || 'N/A';
  }, [transactions]);

  const allCommands: SearchCommand[] = React.useMemo(() => {
    const commands: SearchCommand[] = [
      // Navigation
      { id: 'nav-dash', label: 'Go to Dashboard', category: 'Navigation', icon: LayoutDashboard, handler: () => setActiveTab('dashboard') },
      { id: 'nav-trans', label: 'View Transactions', category: 'Navigation', icon: ArrowRightLeft, handler: () => setActiveTab('transactions'), matches: ['ledger', 'history'] },
      { id: 'nav-cards', label: 'My Cards', category: 'Navigation', icon: CreditCard, handler: () => setActiveTab('cards') },
      { id: 'nav-port', label: 'Institutional Portfolio', category: 'Navigation', icon: Wallet, handler: () => setActiveTab('portfolio'), matches: ['invest', 'stocks'] },
      { id: 'nav-anal', label: 'Analytics & Insights', category: 'Navigation', icon: PieChart, handler: () => setActiveTab('analytics'), matches: ['chart', 'graph'] },
      { id: 'nav-sett', label: 'Settings & Security', category: 'Navigation', icon: Settings, handler: () => setActiveTab('settings'), matches: ['profile', 'config'] },
      
      // Settings
      { 
        id: 'set-dark', 
        label: settings.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode', 
        category: 'Setting', 
        icon: settings.darkMode ? Sun : Moon, 
        handler: () => setSettings(s => ({ ...s, darkMode: !s.darkMode })) 
      },
      { 
        id: 'set-notif', 
        label: settings.notifications ? 'Disable Notifications' : 'Enable Notifications', 
        category: 'Setting', 
        icon: Bell, 
        handler: () => setSettings(s => ({ ...s, notifications: !s.notifications })) 
      },

      // Actions
      { id: 'act-add', label: 'Add New Transaction', category: 'Action', icon: Plus, handler: handleAddTransaction },
      { id: 'act-log', label: 'Institutional Logout', category: 'Action', icon: LogOut, handler: handleLogout },
    ];

    // Add specific transactions as suggestions if search is active
    if (globalSearchTerm.length >= 2) {
      transactions.slice(0, 10).forEach(t => {
        if (t.description.toLowerCase().includes(globalSearchTerm.toLowerCase())) {
          commands.push({
            id: `trans-${t.id}`,
            label: `View: ${t.description}`,
            category: 'Transaction',
            icon: ArrowRightLeft,
            handler: () => {
              setActiveTab('transactions');
              setGlobalSearchTerm(t.description);
            }
          });
        }
      });
    }

    // Add news articles as suggestions
    if (globalSearchTerm.length >= 3) {
      MOCK_DATA.news.forEach(n => {
        if (n.title.toLowerCase().includes(globalSearchTerm.toLowerCase())) {
          commands.push({
            id: `news-${n.id}`,
            label: `News: ${n.title}`,
            category: 'Action',
            icon: Bell,
            handler: () => {
              setActiveTab('dashboard');
              toast(`Opening article: ${n.title}`, 'info');
            }
          });
        }
      });
    }

    return commands;
  }, [settings, transactions, globalSearchTerm, toast, setActiveTab]);

  const suggestions = useMemo(() => {
    if (!globalSearchTerm || globalSearchTerm.length < 2) return [];
    const term = globalSearchTerm.toLowerCase();
    return allCommands.filter(c => 
      c.label.toLowerCase().includes(term) || 
      c.category.toLowerCase().includes(term) ||
      c.matches?.some(m => m.includes(term))
    ).slice(0, 6);
  }, [allCommands, globalSearchTerm]);

  return (
    <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginView onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "min-h-screen flex transition-colors duration-1000 relative",
              settings.darkMode ? "dark bg-[var(--color-glass-bg)] text-white" : "bg-[#EAF2EC] text-[#051F20]"
            )}
          >
            <VideoBackground darkMode={settings.darkMode} />
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              onLogout={handleLogout}
            />

        <GeometricBackground
          className="flex-1 lg:ml-[290px] min-h-screen flex flex-col transition-all duration-500"
          showShapes={settings.darkMode}
        >
          <Header
            role={role}
            setRole={setRole}
            user={user}
            globalSearchTerm={globalSearchTerm}
            onSearch={setGlobalSearchTerm}
            suggestions={suggestions}
            onDeposit={(type) => {
              requireAdmin(() => {
                if (type === 'now') {
                  setEditingTransaction(null);
                  setShowAddModal(true);
                } else {
                  setShowUpcomingModal(true);
                }
              });
            }}
            onMenuClick={() => setIsSidebarOpen(true)}
            setActiveTab={setActiveTab}
            settings={settings}
            setSettings={setSettings}
          />

          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' ? (
                <motion.div 
                  key="dashboard"
                  variants={containerVariants} 
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                {/* Welcome Section */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#051F20] dark:text-white uppercase">Good afternoon, {user.name.split(' ')[0]}</h1>
                    <p className="text-sm text-[#235347]/60 dark:text-gray-400 mt-1 font-bold">Here's what's happening with your finances today.</p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-[#235347]/40 dark:text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      Live Market
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div>2h ago</div>
                  </div>
                </motion.div>

                {/* Role Alert */}
                {role === 'viewer' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#EAF2EC]/60 dark:bg-brand-green/5 border border-[#235347]/10 dark:border-white/10 p-4 rounded-3xl flex items-center gap-4 backdrop-blur-xl"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-brand-green border border-brand-green/20">
                      <AlertCircle className="w-5 h-5 transition-transform hover:rotate-12" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-[#051F20] dark:text-brand-green tracking-wider mb-0.5">Viewer Mode</p>
                      <p className="text-[11px] font-bold text-[#235347]/60 dark:text-gray-400">
                        Switch to <span className="text-[#051F20] dark:text-white underline underline-offset-4 decoration-brand-green/30">Admin Mode</span> in the header to perform write actions.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Summary Cards */}
                <motion.div variants={itemVariants}>
                  <SummaryCards
                    totalBalance={dynamics.totalBalance}
                    income={dynamics.monthlyIncome}
                    expenses={dynamics.monthlyExpenses}
                  />
                </motion.div>

                {/* Main Dashboard Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                    <BalanceChart transactions={transactions} />
                    <TransactionsTable
                      transactions={transactions}
                      role={role}
                      externalSearchTerm={globalSearchTerm}
                      onAddTransaction={handleAddTransaction}
                      onEditTransaction={handleEditTransaction}
                      onDeleteTransaction={handleDeleteTransaction}
                      limit={7}
                      onViewMore={() => setActiveTab('transactions')}
                    />
                  </div>

                  <div className="space-y-6">
                    <CategoriesChartCard transactions={transactions} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                      <GainsLossesCard totalGains={dynamics.totalIncome} totalLosses={dynamics.totalExpenses} />
                      <NewsCard news={MOCK_DATA.news} />
                    </div>
                  </div>
                </motion.div>

                {/* Insights Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h3 className="text-xl font-bold">Financial Insights</h3>
                  <InsightsSection
                    highestCategory={highestCategory}
                    monthlyComparison="+15.4%"
                  />
                </motion.div>
              </motion.div>
            ) : activeTab === 'cards' ? (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CardsView />
                </motion.div>
              ) : activeTab === 'transactions' ? (
                <motion.div
                  key="transactions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <QuickTransactionsCard
                      onQuickSend={handleQuickSend}
                      onQuickSchedule={(amount) => {
                        requireAdmin(() => {
                          setShowUpcomingModal(true);
                        });
                      }}
                    />
                    <UpcomingTransactionsCard
                      transactions={upcomingTransactions}
                      onCancel={handleCancelUpcoming}
                      onAdd={() => {
                        requireAdmin(() => {
                          setShowUpcomingModal(true);
                        });
                      }}
                      role={role}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#051F20] dark:text-white uppercase">Transactions History</h1>
                        <p className="text-sm text-[#235347]/60 dark:text-gray-400 mt-1 font-bold">Detailed view of all your financial activities.</p>
                      </div>
                    </div>
                  </motion.div>

                  <TransactionsTable
                    transactions={transactions}
                    role={role}
                    externalSearchTerm={globalSearchTerm}
                    onAddTransaction={handleAddTransaction}
                    onEditTransaction={handleEditTransaction}
                    onDeleteTransaction={handleDeleteTransaction}
                  />
                </motion.div>
              ) : activeTab === 'settings' ? (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <SettingsView
                    user={user}
                    onUpdateUser={(updated) => setUser(prev => ({ ...prev, ...updated }))}
                    settings={settings}
                    setSettings={setSettings}
                  />
                </motion.div>
              ) : activeTab === 'security' ? (
                <motion.div key="security" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <SecurityView />
                </motion.div>
              ) : activeTab === 'portfolio' ? (
                <motion.div key="portfolio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                   <PortfolioView />
                </motion.div>
              ) : activeTab === 'analytics' ? (
                <motion.div key="analytics" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <AnalyticsView />
                </motion.div>
              ) : (
                <motion.div 
                  key="fallback" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-center h-[50vh] rounded-3xl border border-dashed border-light-border dark:border-white/10"
                >
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-bold tracking-widest uppercase text-light-text dark:text-white/50">{activeTab}</p>
                    <p className="text-light-text-subtle dark:text-gray-500">This section is currently under development.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <footer className={cn(
            "mt-auto p-6 sm:p-8 border-t text-center",
            settings.darkMode ? "border-white/5 text-gray-500" : "border-black/5 text-[#235347]/40"
          )}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">© 2026 Fintra Finance. Institutional Grade Dashboard.</p>
          </footer>
        </GeometricBackground>

        <TransactionModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setEditingTransaction(null);
          }}
          onSave={handleSaveTransaction}
          transaction={editingTransaction}
        />

        <ConfirmDeleteModal
          isOpen={!!deleteModalTarget}
          onConfirm={executeDelete}
          onCancel={() => setDeleteModalTarget(null)}
          message={<>Are you sure you want to<br />delete this transaction?</>}
        />

        <ConfirmDeleteModal
          isOpen={!!cancelingUpcoming}
          onConfirm={confirmCancelUpcoming}
          onCancel={() => setCancelingUpcoming(null)}
          message={cancelingUpcoming ? <>Are you sure you want to cancel<br /><span className="text-[#051F20] dark:text-brand-green font-bold">{cancelingUpcoming.name}</span>?</> : ''}
        />

        <UpcomingTransactionModal
          isOpen={showUpcomingModal}
          onClose={() => setShowUpcomingModal(false)}
          onSave={handleSaveUpcoming}
        />

        <PermissionModal
          isOpen={showPermissionModal}
          onClose={() => {
            setShowPermissionModal(false);
            setPendingAction(null);
          }}
          onSwitchToAdmin={() => {
            setRole('admin');
            if (pendingAction) {
              // Delay slightly so the modal transition feels smooth
              setTimeout(() => {
                pendingAction();
                setPendingAction(null);
              }, 300);
            }
          }}
        />
          </motion.div>
        )}
      </AnimatePresence>
  );
}
