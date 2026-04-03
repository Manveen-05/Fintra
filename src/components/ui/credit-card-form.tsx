"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { CreditCard, ShieldCheck, Zap, Info } from "lucide-react";

export type CardState = {
  number: string;
  holder: string;
  month: string;
  year: string;
  cvv: string;
};

export type CardValidity = {
  number: boolean;
  holder: boolean;
  month: boolean;
  year: boolean;
  cvv: boolean;
  allValid: boolean;
};

type Props = {
  defaultNumber?: string;
  defaultHolder?: string;
  defaultMonth?: string;
  defaultYear?: string;
  defaultCVV?: string;
  maskMiddle?: boolean;
  ring1?: string;
  ring2?: string;
  showSubmit?: boolean;
  onChange?: (state: CardState, validity: CardValidity) => void;
  onSubmit?: (state: CardState, validity: CardValidity) => void;
  className?: string;
};

function formatNumberSpaces(num: string): string {
  return num.replace(/\s+/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
}

function clampDigits(value: string, maxLen: number) {
  return value.replace(/\D/g, "").slice(0, maxLen);
}

const CreditCardForm = ({
  defaultNumber = "",
  defaultHolder = "",
  defaultMonth = "",
  defaultYear = "",
  defaultCVV = "",
  maskMiddle = true,
  ring1 = "#22C55E", // Using Brand Green
  ring2 = "#051F20", // Using Dark Accent
  showSubmit = true,
  onChange,
  onSubmit,
  className = "",
}: Props) => {
  const [number, setNumber] = useState(clampDigits(defaultNumber, 19));
  const [holder, setHolder] = useState(defaultHolder.toUpperCase());
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [cvv, setCVV] = useState(clampDigits(defaultCVV, 4));
  const [focusField, setFocusField] = useState<null | "number" | "holder" | "expire" | "cvv">(null);

  const flip = focusField === "cvv";
  const years = useMemo(() => {
    const start = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => String(start + i));
  }, []);

  const validity: CardValidity = useMemo(() => {
    const numberValid = number.length >= 13;
    const holderValid = holder.trim().length >= 2;
    const monthValid = !!month && +month >= 1 && +month <= 12;
    const yearValid = !!year && +year >= new Date().getFullYear();
    const cvvValid = /^\d{3,4}$/.test(cvv);
    return {
      number: numberValid,
      holder: holderValid,
      month: monthValid,
      year: yearValid,
      cvv: cvvValid,
      allValid: numberValid && holderValid && monthValid && yearValid && cvvValid,
    };
  }, [number, holder, month, year, cvv]);

  useEffect(() => {
    onChange?.({ number, holder, month, year, cvv }, validity);
  }, [number, holder, month, year, cvv, validity, onChange]);

  const displayDigits = useMemo(() => number.slice(0, 16).split(""), [number]);
  const displayedSlots = useMemo(() => {
    const arr: { content: string; filled: boolean }[] = [];
    for (let i = 0; i < 16; i++) {
       let content = "#";
       if (i < displayDigits.length) {
         const d = displayDigits[i];
         content = (maskMiddle && i >= 4 && i <= 11) ? "*" : d;
       }
       arr.push({ content, filled: i < displayDigits.length });
    }
    return arr;
  }, [displayDigits, maskMiddle]);

  const highlightStyles = useMemo(() => {
    switch (focusField) {
      case "number": return { width: "90%", height: "40px", top: "90px", left: "5%" };
      case "holder": return { width: "65%", height: "55px", top: "155px", left: "5%" };
      case "expire": return { width: "22%", height: "55px", top: "155px", left: "73%" };
      case "cvv": return { width: "0%", height: "0%", top: "0%", left: "0%", opacity: 0 };
      default: return { width: "0%", height: "0%", top: "0%", left: "0%", opacity: 0 };
    }
  }, [focusField]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validity.allValid) {
      onSubmit?.({ number, holder, month, year, cvv }, validity);
    }
  };

  return (
    <div className={cn("flex flex-col lg:flex-row gap-12 items-start justify-center p-6", className)}>
      {/* CARD PREVIEW CONTAINER */}
      <div className="w-full max-w-[420px] relative [perspective:1000px]">
        <motion.div
           animate={{ rotateY: flip ? 180 : 0 }}
           transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
           className="relative h-[240px] w-full [transform-style:preserve-3d]"
        >
          {/* FRONTSIDE */}
          <div className="absolute inset-0 bg-[#051F20] rounded-[24px] p-8 text-white [backface-visibility:hidden] overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
               <div className="absolute -top-[45px] -left-[17%] w-[300px] h-[300px] rounded-full border-[16px] border-[#22C55E] blur-[13px]" />
               <div className="absolute top-[55%] -left-[200px] w-[300px] h-[300px] rounded-full border-[16px] border-[#22C55E]/40 blur-[13px]" />
            </div>

            <motion.div
               animate={highlightStyles}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="absolute z-10 border border-white/50 rounded-xl bg-white/5 backdrop-blur-[2px]"
            />

            <div className="relative z-0 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="text-xs font-black tracking-widest opacity-80 uppercase italic">Institutional Premium</div>
                <div className="w-12 h-8 rounded-md bg-white/20 flex flex-col items-center justify-center -space-y-3">
                   <div className="w-6 h-6 rounded-full bg-[#eb001b]/80" />
                   <div className="w-6 h-6 rounded-full bg-[#f79e1b]/80" />
                </div>
              </div>

              <div className="flex gap-1.5 h-10 items-center overflow-hidden font-mono text-xl md:text-2xl tracking-[0.1em]">
                {displayedSlots.map((slot, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: slot.filled ? -34 : 0 }}
                    className="flex flex-col h-[68px] leading-[34px] transition-transform"
                    style={{ marginRight: (i + 1) % 4 === 0 ? '8px' : '0' }}
                  >
                    <span className="opacity-40">#</span>
                    <span className="font-bold">{slot.content}</span>
                  </motion.span>
                ))}
              </div>

              <div className="flex justify-between items-end">
                 <div className="space-y-0.5">
                    <p className="text-[9px] uppercase font-bold opacity-50">Card Holder</p>
                    <p className="font-mono text-sm tracking-wide uppercase">{holder || "NAME ON CARD"}</p>
                 </div>
                 <div className="space-y-0.5 text-right">
                    <p className="text-[9px] uppercase font-bold opacity-50">Expires</p>
                    <p className="font-mono text-sm tracking-wide">{month || "MM"}/{year ? year.slice(-2) : "YY"}</p>
                 </div>
              </div>
            </div>
          </div>

          {/* BACKSIDE */}
          <div className="absolute inset-0 bg-[#051F20] rounded-[24px] text-white [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
               <div className="absolute -top-[45px] -left-[17%] w-[300px] h-[300px] rounded-full border-[16px] border-[#22C55E] blur-[13px]" />
            </div>
            <div className="mt-8 h-12 w-full bg-black/80" />
            <div className="mt-6 px-8 flex flex-col items-end gap-2">
               <p className="text-[9px] uppercase font-bold opacity-50 mr-2">CVV Security Code</p>
               <div className="w-full h-10 bg-white/10 rounded-lg flex items-center justify-end px-4 border border-white/10 backdrop-blur-md">
                 <span className="font-mono tracking-[0.4em] italic">{cvv ? '*'.repeat(cvv.length) : '***'}</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FORM CONTAINER */}
      <form onSubmit={handleSubmit} className="w-full max-w-[500px] bg-white dark:bg-[#1C1C1E] rounded-[32px] p-8 border border-black/5 dark:border-white/5 shadow-xl space-y-6">
        <div className="space-y-4">
           <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-[#051F20]/60 dark:text-gray-400 ml-1">Card Number</label>
              <input
                type="text"
                value={formatNumberSpaces(number)}
                onChange={(e) => setNumber(clampDigits(e.target.value, 19))}
                onFocus={() => setFocusField("number")}
                onBlur={() => setFocusField(null)}
                placeholder="0000 0000 0000 0000"
                className="w-full bg-[#EAF2EC]/50 dark:bg-white/5 border border-[#235347]/10 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-brand-green/30 outline-none transition-all font-mono tracking-wider dark:text-white"
              />
           </div>

           <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-[#051F20]/60 dark:text-gray-400 ml-1">Card Holder</label>
              <input
                type="text"
                value={holder}
                onChange={(e) => setHolder(e.target.value.toUpperCase())}
                onFocus={() => setFocusField("holder")}
                onBlur={() => setFocusField(null)}
                placeholder="FULL NAME"
                className="w-full bg-[#EAF2EC]/50 dark:bg-white/5 border border-[#235347]/10 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-brand-green/30 outline-none transition-all font-bold tracking-wide dark:text-white"
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#051F20]/60 dark:text-gray-400 ml-1">Expiration</label>
                <div className="flex gap-2">
                   <select
                     value={month}
                     onChange={(e) => setMonth(e.target.value)}
                     onFocus={() => setFocusField("expire")}
                     onBlur={() => setFocusField(null)}
                     className="w-full bg-[#EAF2EC]/50 dark:bg-white/5 border border-[#235347]/10 dark:border-white/10 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-brand-green/30 outline-none transition-all font-bold dark:text-white appearance-none"
                   >
                     <option value="" disabled>MM</option>
                     {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                       <option key={m} value={m}>{m}</option>
                     ))}
                   </select>
                   <select
                     value={year}
                     onChange={(e) => setYear(e.target.value)}
                     onFocus={() => setFocusField("expire")}
                     onBlur={() => setFocusField(null)}
                     className="w-full bg-[#EAF2EC]/50 dark:bg-white/5 border border-[#235347]/10 dark:border-white/10 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-brand-green/30 outline-none transition-all font-bold dark:text-white appearance-none"
                   >
                     <option value="" disabled>YY</option>
                     {years.map((y) => (
                       <option key={y} value={y}>{y.slice(-2)}</option>
                     ))}
                   </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#051F20]/60 dark:text-gray-400 ml-1">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCVV(clampDigits(e.target.value, 4))}
                  onFocus={() => setFocusField("cvv")}
                  onBlur={() => setFocusField(null)}
                  placeholder="***"
                  className="w-full bg-[#EAF2EC]/50 dark:bg-white/5 border border-[#235347]/10 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-brand-green/30 outline-none transition-all font-mono tracking-widest dark:text-white"
                />
              </div>
           </div>
        </div>

        {showSubmit && (
          <button
            type="submit"
            disabled={!validity.allValid}
            className={cn(
              "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]",
              validity.allValid
                ? "bg-brand-green text-black hover:shadow-brand-green/20 scale-[1.01]"
                : "bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed opacity-50"
            )}
          >
            {validity.allValid ? "Confirm Request" : "Complete the Form"}
          </button>
        )}

        <div className="pt-2 flex items-start gap-3 p-4 rounded-2xl bg-brand-green/5 dark:bg-brand-green/10 border border-brand-green/10">
           <Zap className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
           <p className="text-[11px] text-[#051F20]/70 dark:text-gray-400 leading-relaxed font-medium">
             Virtual cards are issued instantly. Institutional physical cards are delivered within 3-5 business days.
           </p>
        </div>
      </form>
    </div>
  );
};

export { CreditCardForm };
