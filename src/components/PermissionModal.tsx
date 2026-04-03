import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldAlert, X } from 'lucide-react';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToAdmin: () => void;
}

export default function PermissionModal({ isOpen, onClose, onSwitchToAdmin }: PermissionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-[340px] bg-light-surface dark:bg-[#1c1c1e]/90 backdrop-blur-xl rounded-[32px] border border-light-border dark:border-white/10 overflow-hidden shadow-2xl relative"
          >
            {/* Header / Icon */}
            <div className="pt-10 pb-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#051F20]/20 dark:bg-brand-green/20 flex items-center justify-center border border-[#235347]/30 dark:border-brand-green/30 text-[#051F20] dark:text-brand-green mb-4 shadow-lg shadow-brand-green/10">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-light-text dark:text-white tracking-tight">Admin Access Required</h3>
            </div>

            <div className="px-8 pb-8 text-center">
              <p className="text-[15px] text-light-text-subtle dark:text-gray-400 leading-relaxed">
                You need to be an administrator to perform this action. Would you like to switch to admin mode?
              </p>
            </div>

            <div className="p-4 pt-0 space-y-2">
              <button
                onClick={() => {
                  onSwitchToAdmin();
                  onClose();
                }}
                className="w-full bg-[#051F20] dark:bg-brand-green hover:bg-[#051F20]/90 dark:bg-brand-green/90 text-[#EAF2EC] dark:text-black font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-brand-green/10 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Switch to Admin
              </button>
              <button
                onClick={onClose}
                className="w-full bg-[#8EB69B]/30 dark:bg-white/5 hover:bg-[#235347] dark:hover:bg-[#8EB69B] dark:bg-white/10 text-light-text dark:text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>

            {/* Close button top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-light-text-subtle dark:text-gray-500 hover:text-light-text dark:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
