import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: React.ReactNode;
}

export default function ConfirmDeleteModal({ isOpen, onConfirm, onCancel, title = "Confirm Action", message }: ConfirmDeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-[320px] bg-light-surface dark:bg-[#1c1c1e]/90 backdrop-blur-xl rounded-[30px] border border-light-border dark:border-white/5 overflow-hidden shadow-2xl relative"
          >
            {/* Subtle glow inside matching the requested reference context */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <div className="p-8 pb-6 text-center relative z-10">
              <h3 className="text-[17px] font-medium text-[#e5e5ea] leading-snug">
                {message || <>Are you sure you want to<br />delete this transaction?</>}
              </h3>
            </div>

            <div className="flex gap-3 p-4 pt-2 relative z-10">
              <button
                onClick={onConfirm}
                className="flex-1 bg-light-surface dark:bg-[#2c2c2e] hover:bg-red-500/20 text-[#ff453a] font-medium py-3 rounded-[12px] transition-colors shadow-inner"
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                className="flex-1 bg-light-surface dark:bg-[#2c2c2e] hover:bg-[#8EB69B] dark:bg-[#3a3a3c] text-light-text dark:text-white font-medium py-3 rounded-[12px] transition-colors shadow-inner"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
