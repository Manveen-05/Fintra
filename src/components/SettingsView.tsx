import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Bell,
  Moon,
  MapPin,
  CreditCard,
  MessageCircle,
  ChevronDown,
  FileText,
  Mail,
  Smartphone,
  Shield,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from './ui/coss-accordion';

interface SettingsViewProps {
  user: { name: string; email: string; phone: string };
  onUpdateUser: (updated: any) => void;
  settings: {
    notifications: boolean;
    twoFactor: boolean;
    darkMode: boolean;
    emailUpdates: boolean;
  };
  setSettings: (settings: any) => void;
}

export default function SettingsView({ user, onUpdateUser, settings, setSettings }: SettingsViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const SettingToggle = ({ label, value, onChange }: any) => (
    <div className="flex items-center justify-between py-4">
      <span className="text-[15px] font-medium text-light-text dark:text-white">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={cn(
          "w-12 h-6 rounded-full transition-all duration-300 relative",
          value ? "bg-[#051F20] dark:bg-brand-green" : "bg-[#8EB69B] dark:bg-white/10"
        )}
      >
        <motion.div
          animate={{ x: value ? 26 : 2 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8 max-w-2xl mx-auto pb-20"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#051F20] dark:text-white uppercase">Settings</h1>
        <p className="text-sm text-[#235347]/60 dark:text-gray-400 font-bold">Manage your account preferences and security.</p>
      </div>

      {/* General Settings Section */}
      <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-light-border dark:border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#051F20]/5 dark:bg-brand-green/5 blur-[50px] -z-10" />

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[10px] font-black text-[#235347]/40 dark:text-gray-500 uppercase tracking-[0.2em]">General Profile</h2>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 text-center sm:text-left">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-[#051F20]/5 dark:bg-brand-green/10 flex items-center justify-center border-2 border-[#235347]/10 dark:border-brand-green/20 text-[#051F20] dark:text-brand-green shadow-inner">
              <User className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#051F20] dark:bg-brand-green rounded-xl border-2 border-white dark:border-[#1C1C1E] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-green dark:bg-black animate-pulse" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-black text-[#051F20] dark:text-white tracking-tight">{user.name}</h3>
            <button
              onClick={() => {
                setEditForm(user);
                setIsEditing(true);
              }}
              className="text-[#235347] dark:text-brand-green text-xs font-black uppercase tracking-widest hover:underline mt-2 inline-flex items-center gap-2"
            >
              Edit Profile <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-5 sm:p-6 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 overflow-hidden"
            >
              <h3 className="text-lg font-black mb-6 uppercase tracking-tight">Edit Profile</h3>
              <div className="space-y-5">
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Phone Number', key: 'phone', type: 'tel' }
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[10px] text-[#235347]/40 dark:text-gray-500 uppercase tracking-widest font-black mb-2 block">{field.label}</label>
                    <input
                      type={field.type}
                      value={(editForm as any)[field.key]}
                      onChange={e => setEditForm({ ...editForm, [field.key]: e.target.value })}
                      className="w-full bg-[#EAF2EC] dark:bg-[#0B0D10] border border-[#235347]/10 dark:border-white/5 rounded-2xl py-3.5 px-4 text-sm font-bold focus:border-brand-green/30 outline-none transition-all shadow-inner"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-8">
                <button
                  onClick={() => {
                    onUpdateUser(editForm);
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-[#051F20] dark:bg-brand-green text-white dark:text-black font-black text-xs uppercase tracking-widest py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 dark:shadow-brand-green/10"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-black/5 dark:bg-white/5 text-[#051F20] dark:text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Accordion className="border-t border-black/5 dark:border-white/5 pt-2">
          <AccordionItem value="account">
            <AccordionTrigger className="hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl px-3 group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] dark:bg-white/5 flex items-center justify-center text-[#235347] dark:text-gray-400 group-hover:bg-brand-green/20 group-hover:text-brand-green transition-all">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-[#235347]/60 dark:text-gray-500 uppercase tracking-[0.15em]">Notifications</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3">
              <div className="bg-black/5 dark:bg-white/5 rounded-[24px] p-5 border border-black/5 dark:border-white/5 space-y-1">
                <SettingToggle
                  label="Push Notifications"
                  value={settings.notifications}
                  onChange={(val: boolean) => setSettings((prev: any) => ({ ...prev, notifications: val }))}
                />
                <SettingToggle
                  label="Email Updates"
                  value={settings.emailUpdates}
                  onChange={(val: boolean) => setSettings((prev: any) => ({ ...prev, emailUpdates: val }))}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="address">
            <AccordionTrigger className="hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl px-3 group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] dark:bg-white/5 flex items-center justify-center text-[#235347] dark:text-gray-400 group-hover:bg-brand-green/20 group-hover:text-brand-green transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-[#235347]/60 dark:text-gray-500 uppercase tracking-[0.15em]">Locations</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3">
              <div className="p-5 bg-black/5 dark:bg-white/5 rounded-[24px] border border-black/5 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                  <span className="text-sm font-bold text-[#235347]/70 dark:text-gray-400">Primary: New York, USA</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <button className="w-full py-3.5 bg-[#051F20] dark:bg-brand-green text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">Add New Address</button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Accordion Action Sections */}
      <div className="glass-card rounded-[32px] border border-light-border dark:border-white/10 shadow-2xl overflow-hidden p-2">
        <Accordion className="w-full">
          <AccordionItem value="subscription">
            <AccordionTrigger className="px-5 group py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] dark:bg-white/5 flex items-center justify-center text-[#235347] dark:text-gray-400 group-hover:bg-brand-green/20 group-hover:text-brand-green transition-all border border-black/5 dark:border-white/5">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="font-black text-sm uppercase tracking-tight text-[#051F20] dark:text-white">Subscription Plan</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <div className="p-6 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#235347]/40 dark:text-gray-500 uppercase font-black tracking-widest">Active Plan</p>
                    <p className="text-xl font-black text-[#051F20] dark:text-brand-green tracking-tight">Professional Premium</p>
                  </div>
                  <span className="px-3 py-1.5 bg-brand-green/20 text-brand-green rounded-xl text-[9px] font-black uppercase tracking-widest border border-brand-green/20">Active</span>
                </div>
                <p className="text-xs font-bold text-[#235347]/60 dark:text-gray-400 leading-relaxed">Your next billing cycle starts on <span className="text-[#051F20] dark:text-white">May 12, 2026</span>. Enjoy exclusive institutional features.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="py-3.5 bg-[#051F20] dark:bg-white/10 text-white dark:text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Change Plan</button>
                  <button className="py-3.5 bg-red-500/10 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all">Cancel</button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact">
            <AccordionTrigger className="px-5 group py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] dark:bg-white/5 flex items-center justify-center text-[#235347] dark:text-gray-400 group-hover:bg-brand-green/20 group-hover:text-brand-green transition-all border border-black/5 dark:border-white/5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-black text-sm uppercase tracking-tight text-[#051F20] dark:text-white">Support & Contact</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[32px] flex flex-col items-center text-center group hover:bg-brand-green/10 hover:border-brand-green/20 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-brand-green" />
                  </div>
                  <p className="font-black text-sm uppercase tracking-tight text-[#051F20] dark:text-white">Email Support</p>
                  <p className="text-[9px] font-black text-[#235347]/40 uppercase tracking-widest mt-1">24 Hour Response</p>
                </button>
                <button className="p-5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[32px] flex flex-col items-center text-center group hover:bg-brand-green/10 hover:border-brand-green/20 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-5 h-5 text-brand-green" />
                  </div>
                  <p className="font-black text-sm uppercase tracking-tight text-[#051F20] dark:text-white">Live Chat</p>
                  <p className="text-[9px] font-black text-[#235347]/40 uppercase tracking-widest mt-1">Institutional Desk</p>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="policy">
            <AccordionTrigger className="px-5 group py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] dark:bg-white/5 flex items-center justify-center text-[#235347] dark:text-gray-400 group-hover:bg-brand-green/20 group-hover:text-brand-green transition-all border border-black/5 dark:border-white/5">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-black text-sm uppercase tracking-tight text-[#051F20] dark:text-white">Legal & Compliance</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
               <div className="space-y-4">
                <div className="p-5 bg-black/5 dark:bg-white/5 rounded-[24px] border border-black/5 dark:border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-black text-xs uppercase tracking-tight">Privacy Update</h5>
                    <ExternalLink className="w-4 h-4 text-brand-green" />
                  </div>
                  <p className="text-[11px] font-bold text-[#235347]/60 dark:text-gray-500 leading-relaxed">Our institutional frameworks were updated on March 1st to exceed global data standards.</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {[ 'Terms of Service', 'Cookie Policy', 'Data Rights' ].map((text) => (
                    <button key={text} className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all group">
                      <span className="text-[11px] font-black uppercase text-[#235347]/60 tracking-wider transition-colors group-hover:text-[#051F20] dark:group-hover:text-white">{text}</span>
                      <ChevronRight className="w-4 h-4 text-[#235347]/20 group-hover:text-brand-green transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  );
}
