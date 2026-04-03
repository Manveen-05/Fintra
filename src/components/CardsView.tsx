import React from 'react';
import { motion } from 'motion/react';
import { FlippableCreditCard } from './ui/credit-debit-card';
import { CreditCardForm } from './ui/credit-card-form';
import { Plus, CreditCard, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from './ui/dialog';

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

export default function CardsView() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const cards = [
    {
      id: 1,
      name: "MANVEEN SINGH",
      number: "•••• •••• •••• 8824",
      expiry: "09/28",
      cvv: "342",
      brand: 'mastercard' as const
    },
    {
      id: 2,
      name: "EMMA WATSON",
      number: "•••• •••• •••• 4410",
      expiry: "12/27",
      cvv: "918",
      brand: 'visa' as const
    },
    {
      id: 3,
      name: "JOHN DOE",
      number: "•••• •••• •••• 1102",
      expiry: "03/29",
      cvv: "455",
      brand: 'amex' as const
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#051F20] dark:text-white uppercase">Your Cards</h1>
            <p className="text-sm text-[#235347]/60 dark:text-gray-400 mt-1 font-bold">Manage your virtual and physical payment methods.</p>
          </div>
          <DialogTrigger asChild>
            <button className="flex items-center justify-center gap-2 bg-[#051F20] dark:bg-brand-green text-white dark:text-black px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all active:scale-0.95 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add New Card
            </button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-4xl p-0 bg-[#EAF2EC] dark:bg-[#0B0D10] border-none shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]">
           <DialogHeader className="p-8 pb-0 bg-transparent border-none">
              <DialogTitle className="text-2xl font-black tracking-tight text-[#051F20] dark:text-white uppercase">Request New Card</DialogTitle>
              <DialogDescription className="text-sm font-bold opacity-60 mt-2">
                Design your custom institutional card. Issued instantly upon confirmation.
              </DialogDescription>
           </DialogHeader>
           <div className="p-4 sm:p-6 pb-12">
             <CreditCardForm
               className="bg-transparent p-0"
               onSubmit={(state) => {
                 console.log("Card Requested:", state);
                 setIsModalOpen(false);
               }}
             />
           </div>
        </DialogContent>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center sm:justify-items-start">
          {cards.map((card) => (
            <motion.div key={card.id} variants={itemVariants} className="w-full flex justify-center sm:justify-start">
              <FlippableCreditCard
                cardholderName={card.name}
                cardNumber={card.number}
                expiryDate={card.expiry}
                cvv={card.cvv}
                brand={card.brand}
                className="w-full max-w-[340px] h-[210px] shadow-2xl"
              />
            </motion.div>
          ))}

          <DialogTrigger asChild>
            <motion.div
              variants={itemVariants}
              className="w-full max-w-[340px] min-h-[210px] rounded-[32px] border-2 border-dashed border-[#235347]/20 dark:border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer group hover:border-brand-green/40 hover:bg-white dark:hover:bg-white/5 transition-all bg-black/5 dark:bg-white/5 shadow-inner"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-brand-green/20">
                <Plus className="w-6 h-6 text-brand-green" />
              </div>
              <p className="text-[10px] font-black uppercase text-[#235347]/40 dark:text-gray-500 tracking-[0.2em] group-hover:text-brand-green">Request New Card</p>
            </motion.div>
          </DialogTrigger>
        </div>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-4">
        {[
          { icon: ShieldCheck, title: "Secure Storage", desc: "Enterprise-grade encryption." },
          { icon: Zap, title: "Instant Access", desc: "Digital cards ready in seconds." },
          { icon: CreditCard, title: "Global Reach", desc: "Universal acceptance network." }
        ].map((feat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="p-6 rounded-[32px] bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-4 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green border border-brand-green/20 group-hover:scale-110 transition-transform">
               <feat.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-[#051F20] dark:text-white uppercase tracking-tight">{feat.title}</h3>
              <p className="text-[11px] font-bold text-[#235347]/60 dark:text-gray-400 leading-relaxed mt-1">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
