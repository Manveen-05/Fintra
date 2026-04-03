import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Eye, ArrowRight, ChevronLeft, HelpCircle, FileText, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

type Step = 'auth' | 'role';
type AuthMode = 'signin' | 'signup';

import Logo from './Logo';

export default function LoginView({ onLogin }: LoginViewProps) {
  const [step, setStep] = useState<Step>('auth');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth verification
    setTimeout(() => {
      setIsLoading(false);
      setStep('role');
    }, 800);
  };

  const roles = [
    {
      id: 'viewer' as UserRole,
      title: 'Viewer Dashboard',
      description: 'Read-only access to all institutional data.',
      icon: Eye,
      color: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      id: 'admin' as UserRole,
      title: 'Admin Dashboard',
      description: 'Full write access and security management.',
      icon: ShieldCheck,
      color: 'bg-brand-green/20 text-brand-green',
    },
    {
      id: 'viewer' as UserRole, // Using viewer for now as a "Guest" placeholder to match 3-item list
      title: 'Guest Access',
      description: 'Limited public preview of dashboard features.',
      icon: HelpCircle,
      color: 'bg-blue-500/20 text-blue-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Background radial glow matching the image top-left beam */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/[0.03] blur-[120px] rounded-full rotate-45 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] px-6 relative z-10"
      >
        <div className="relative group">
          {/* Main Card */}
          <div className="bg-[#121212]/80 backdrop-blur-3xl border border-white/[0.08] rounded-[40px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Top Progress Bar */}
            <div className="flex gap-2 mb-10 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div 
                  key={i} 
                  initial={false}
                  animate={{
                    backgroundColor: (step === 'auth' && i === 1) || (step === 'role' && i <= 2) ? '#22c55e' : 'rgba(255,255,255,0.05)'
                  }}
                  className={cn(
                    "h-[3px] flex-1 rounded-full",
                    ((step === 'auth' && i === 1) || (step === 'role' && i <= 2)) && "shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  )} 
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 'auth' ? (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Fintra Logo */}
                  <div className="flex justify-center mb-8">
                    <div className="relative group/logo">
                      <div className="absolute -inset-4 bg-brand-green/20 rounded-full blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700" />
                      <Logo className="w-24 h-24 relative z-10 drop-shadow-2xl scale-125" />
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase selection:bg-brand-green selection:text-black">
                      Fintra - Financial Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 font-bold max-w-[280px] mx-auto leading-relaxed">
                      Access your unified financial ledger and institutional controls.
                    </p>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="relative group/input">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500 group-focus-within/input:text-brand-green transition-colors" />
                        <input
                          required
                          type="email"
                          placeholder="Institutional Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-brand-green/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white placeholder:text-gray-600 outline-none transition-all"
                        />
                      </div>
                      <div className="relative group/input">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500 group-focus-within/input:text-brand-green transition-colors" />
                        <input
                          required
                          type="password"
                          placeholder="Security Token"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-brand-green/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white placeholder:text-gray-600 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-white text-black font-black uppercase text-xs tracking-widest py-4 rounded-2xl hover:bg-brand-green transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          {authMode === 'signin' ? 'Verify Identity' : 'Register Profile'}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="pt-4 text-center">
                    <button 
                      onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                      className="text-[10px] font-black uppercase text-gray-500 hover:text-brand-green transition-colors tracking-widest flex items-center justify-center gap-2 mx-auto"
                    >
                      {authMode === 'signin' ? (
                        <>
                          <UserPlus className="w-3 h-3" />
                          New Institutional User? Create Account
                        </>
                      ) : (
                        <>
                          <LogIn className="w-3 h-3" />
                          Returning Administrator? Sign In
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="role"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Folder Header Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/[0.03] rounded-3xl flex items-center justify-center border border-white/[0.05] shadow-inner transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
                        <div className="w-14 h-16 bg-[#1A1A1A] rounded-lg border border-white/[0.1] shadow-2xl p-2 flex flex-col items-center justify-center gap-1">
                          <FileText className="w-6 h-6 text-white/40" />
                          <span className="text-[6px] font-black uppercase text-white/20 tracking-widest">Fintra</span>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green/20 rounded-full blur-md animate-pulse" />
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="text-center space-y-2 mb-10">
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase selection:bg-brand-green selection:text-black">Choose access level</h1>
                    <p className="text-sm text-gray-500 font-bold max-w-[280px] mx-auto leading-relaxed">
                      What type of institutional collaboration do you have in mind?
                    </p>
                  </div>

                  {/* Role Options */}
                  <div className="space-y-3">
                    {roles.map((role, idx) => (
                      <motion.button
                        key={role.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.1 }}
                        onClick={() => onLogin(role.id)}
                        className="w-full flex items-center justify-between p-4 rounded-[24px] bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.15] transition-all group/item text-left outline-none"
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform", role.color)}>
                            <role.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-[14px] font-black text-white/90 uppercase tracking-tight leading-tight">{role.title}</h3>
                            <p className="text-[11px] text-gray-500 font-bold leading-tight mt-0.5">{role.description}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover/item:bg-brand-green group-hover/item:text-black transition-all">
                          <ArrowRight className="w-4 h-4 opacity-40 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between mt-10">
              <button 
                onClick={() => {
                  if (step === 'role') setStep('auth');
                }}
                className={cn(
                  "flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-all tracking-widest px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] outline-none",
                  step === 'auth' ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                )}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Back
              </button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors tracking-widest px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                Skip
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* Card Shine Effect */}
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Background grid/dots similar to the image subtle texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    </div>
  );
}
