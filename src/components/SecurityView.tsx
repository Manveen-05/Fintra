import React from 'react';
import { motion } from 'motion/react';
import { Shield, Smartphone, Mail, Lock, Globe, Monitor, MoreVertical, LogOut, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Switch } from './ui/switch';
import { cn } from '../lib/utils';
import { useToast } from './ui/toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const INITIAL_SESSIONS = [
  { id: 1, device: "MacBook Pro 16", info: "Chrome • macOS", location: "New Delhi, India", status: "Current Device", ip: "49.36.81.12" },
  { id: 2, device: "iPhone 15 Pro", info: "Mobile App • iOS", location: "Mumbai, India", status: "2 hours ago", ip: "106.211.23.4" },
  { id: 3, device: "Windows Desktop", info: "Edge • Windows 11", location: "Singapore", status: "Active 3 days ago", ip: "13.250.12.1" }
];

export default function SecurityView() {
  const { toast } = useToast();
  const [sessions, setSessions] = React.useState(INITIAL_SESSIONS);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleLogoutSession = (id: number, device: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    toast(`Session on ${device} terminated`, 'success');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    toast('Verifying existing credentials...', 'info');
    
    setTimeout(() => {
      setIsUpdating(false);
      toast('Security credentials updated successfully', 'success');
    }, 2000);
  };

  const handleToggle = (title: string, active: boolean) => {
    toast(`${title} ${active ? 'Enabled' : 'Disabled'}`, 'success');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#051F20] dark:text-white uppercase">Security Settings</h1>
        <p className="text-sm text-[#235347]/60 dark:text-gray-400 mt-1 font-bold">Manage your account protection and active sessions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* LEFT COLUMN - SCORE & TOGGLES */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          
          {/* Security Score Card */}
          <motion.div
            variants={itemVariants}
            className="p-6 sm:p-8 rounded-[40px] bg-gradient-to-br from-[#051F20] to-[#142A2B] text-white overflow-hidden relative shadow-2xl"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
             <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                   <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                      <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="364.4" strokeDashoffset="54.6" className="text-brand-green drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black tracking-tighter">85</span>
                      <span className="text-[8px] font-black uppercase text-brand-green opacity-80 tracking-widest">Strength</span>
                   </div>
                </div>
                <div className="flex-1 space-y-3">
                   <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight">Your account is well protected</h2>
                   <p className="text-white/40 text-xs font-bold leading-relaxed max-w-sm mx-auto sm:mx-0">Achieve 100% security by enabling 2FA for all institutional withdrawals.</p>
                   <button 
                     onClick={() => toast('Security setup wizard started...', 'info')}
                     className="mt-2 px-8 py-3.5 bg-brand-green text-[#051F20] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-0.95 shadow-xl shadow-brand-green/20"
                   >
                      Complete Setup
                   </button>
                </div>
             </div>
          </motion.div>

          {/* Security Features */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               { icon: Smartphone, title: "Two-Factor Auth", desc: "Institutional 2FA via app.", active: true },
               { icon: Mail, title: "Login Alerts", desc: "Email notifications for activity.", active: true },
               { icon: Lock, title: "Face ID / Bio", desc: "Biometric login for mobile.", active: false },
               { icon: ShieldCheck, title: "IP Whitelist", desc: "Restrict to known networks.", active: true }
             ].map((item, i) => (
                <div key={i} className="p-5 rounded-3xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between group hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform border border-brand-green/10">
                         <item.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                         <h3 className="font-black text-xs text-[#051F20] dark:text-white uppercase tracking-tight">{item.title}</h3>
                         <p className="text-[10px] font-bold text-[#235347]/60 dark:text-gray-500 leading-tight">{item.desc}</p>
                      </div>
                   </div>
                   <Switch 
                     defaultChecked={item.active} 
                     onCheckedChange={(checked) => handleToggle(item.title, checked)}
                     className="scale-90"
                   />
                </div>
             ))}
          </motion.div>

          {/* Active Sessions */}
          <motion.div variants={itemVariants} className="space-y-4">
             <h3 className="text-lg font-black text-[#051F20] dark:text-white uppercase tracking-tight px-1">Active Sessions</h3>
             <div className="rounded-[40px] overflow-hidden border border-black/5 dark:border-white/5 bg-white/70 dark:bg-[#1C1C1E]/80 backdrop-blur-xl shadow-2xl">
                <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead>
                         <tr className="border-b border-black/5 dark:border-white/5">
                            <th className="text-left px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-[#235347]/40 dark:text-gray-500 whitespace-nowrap">Device Info</th>
                            <th className="text-left px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-[#235347]/40 dark:text-gray-500 whitespace-nowrap">Location</th>
                            <th className="text-left px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-[#235347]/40 dark:text-gray-500 whitespace-nowrap">Access Status</th>
                            <th className="px-6 py-5"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5">
                         {sessions.map((session) => (
                            <tr key={session.id} className="group hover:bg-[#EAF2EC] dark:hover:bg-white/10 transition-all cursor-pointer">
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform border border-brand-green/10 shadow-inner">
                                        {session.device.includes("Mac") || session.device.includes("Windows") ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                     </div>
                                     <div>
                                        <p className="font-black text-sm text-[#051F20] dark:text-white uppercase tracking-tighter">{session.device}</p>
                                        <p className="text-[10px] font-black text-brand-green opacity-60 tracking-widest">{session.info}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-2 text-[10px] font-black text-[#235347]/70 dark:text-gray-400 whitespace-nowrap">
                                     <Globe className="w-3.5 h-3.5 text-brand-green" />
                                     {session.location}
                                     <span className="opacity-30 ml-1 font-mono tracking-tighter">{session.ip}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <span className={cn(
                                     "text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border",
                                     session.status === "Current Device" ? "bg-brand-green/10 text-brand-green border-brand-green/20" : "bg-black/5 dark:bg-white/5 text-[#235347]/40 dark:text-gray-500 border-black/5 dark:border-white/5"
                                  )}>
                                     {session.status}
                                  </span>
                               </td>
                               <td className="px-6 py-5 text-right">
                                  {session.status !== "Current Device" && (
                                    <button 
                                      onClick={() => handleLogoutSession(session.id, session.device)}
                                      className="p-2.5 rounded-xl hover:bg-red-500/10 text-[#235347]/30 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
                                    >
                                       <LogOut className="w-4 h-4" />
                                    </button>
                                  )}
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - ACTIONS */}
        <div className="space-y-6 sm:space-y-8">
           <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-[40px] bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 shadow-2xl space-y-6">
              <h3 className="text-lg font-black flex items-center gap-3 uppercase tracking-tight text-[#051F20] dark:text-white">
                 <div className="p-2 rounded-xl bg-brand-green/10 text-brand-green border border-brand-green/10">
                    <Lock className="w-4 h-4" />
                 </div>
                 Authentication
              </h3>
              <form onSubmit={handleUpdatePassword} className="space-y-5">
                 {[
                   { label: 'Master Password', placeholder: '••••••••••••' },
                   { label: 'New Security Key', placeholder: '••••••••••••' },
                   { label: 'Confirm New Key', placeholder: '••••••••••••' }
                 ].map((field, i) => (
                    <div key={i} className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase text-[#235347]/40 dark:text-gray-500 ml-1 tracking-[0.2em]">{field.label}</label>
                       <input 
                         type="password" 
                         required 
                         placeholder={field.placeholder} 
                         className="w-full bg-[#EAF2EC] dark:bg-[#0B0D10] border border-[#235347]/10 dark:border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:border-brand-green/30 outline-none transition-all shadow-inner dark:text-white" 
                       />
                    </div>
                 ))}
                 <button 
                   type="submit"
                   disabled={isUpdating}
                   className="w-full py-4.5 bg-[#051F20] dark:bg-brand-green text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] transition-all active:scale-0.98 shadow-xl mt-2 disabled:opacity-50"
                 >
                    {isUpdating ? 'Updating...' : 'Update credentials'}
                 </button>
              </form>
           </motion.div>

           <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-[40px] bg-red-500/5 border border-red-500/10 space-y-5">
              <div className="flex items-center gap-3 text-red-500">
                 <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="w-4 h-4" />
                 </div>
                 <h3 className="font-black text-sm uppercase tracking-tight">Danger Zone</h3>
              </div>
              <p className="text-[11px] text-[#235347]/70 dark:text-gray-400 font-bold leading-relaxed">Permanently delete your account and all associated institutional data. This action is terminal.</p>
              <button 
                onClick={() => toast('Security confirmation required for deletion', 'error')}
                className="w-full py-3.5 border-2 border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest"
              >
                 Deactivate Account
              </button>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
