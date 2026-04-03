import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { 
  Plus, 
  Search, 
  Wallet, 
  ArrowRight,
  TrendingUp,
  Coins,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from './ui/toast';
import { motion, AnimatePresence } from 'motion/react';

const POPULAR_ASSETS = [
  { name: 'Bitcoin', symbol: 'BTC', price: 68420.50, change: '+5.2%', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
  { name: 'Ethereum', symbol: 'ETH', price: 3250.25, change: '-1.4%', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { name: 'Nvidia Corp', symbol: 'NVDA', price: 890.45, change: '+8.7%', icon: 'https://logo.clearbit.com/nvidia.com' },
  { name: 'Apple Inc', symbol: 'AAPL', price: 175.20, change: '+0.5%', icon: 'https://logo.clearbit.com/apple.com' },
  { name: 'Solana', symbol: 'SOL', price: 145.80, change: '+12.4%', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
];

interface BuyAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyAssetModal({ isOpen, onClose }: BuyAssetModalProps) {
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState(POPULAR_ASSETS[0]);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = POPULAR_ASSETS.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const estimatedTotal = amount ? (parseFloat(amount) * selectedAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00';

  const handlePurchase = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast('Please enter a valid amount', 'error');
      return;
    }

    setIsProcessing(true);
    toast(`Executing order for ${amount} ${selectedAsset.symbol}...`, 'info');

    setTimeout(() => {
      setIsProcessing(false);
      toast(`Successfully purchased ${amount} ${selectedAsset.symbol}!`, 'success');
      onClose();
      setAmount('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white dark:bg-[#1C1C1E] rounded-[32px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden p-0">
        <DialogHeader className="bg-[#EAF2EC] dark:bg-white/5 p-6 border-b border-black/5 dark:border-white/5">
          <DialogTitle className="flex items-center gap-3 text-xl font-black text-[#051F20] dark:text-white uppercase tracking-tight">
            <div className="w-10 h-10 rounded-2xl bg-[#051F20] dark:bg-brand-green flex items-center justify-center text-white dark:text-black shadow-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            Acquire Institutional Asset
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="p-8 space-y-8">
          {/* ASSET SELECTION */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#051F20]/40 dark:text-gray-500">Market Selection</label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#235347]/50" />
                <input 
                  type="text" 
                  placeholder="Filter markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-full bg-[#EAF2EC] dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] outline-none focus:ring-2 focus:ring-brand-green/20 w-40 transition-all font-bold"
                />
              </div>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
              {filteredAssets.map((asset) => (
                <button
                  key={asset.symbol}
                  onClick={() => setSelectedAsset(asset)}
                  className={cn(
                    "flex-shrink-0 flex flex-col items-center gap-3 p-5 rounded-[28px] border transition-all duration-500 min-w-[120px] relative group",
                    selectedAsset.symbol === asset.symbol
                      ? "bg-[#051F20] dark:bg-brand-green border-[#051F20] dark:border-brand-green text-white dark:text-black shadow-xl scale-[1.05]"
                      : "bg-white dark:bg-white/5 border-black/5 dark:border-white/5 text-[#051F20] dark:text-white hover:border-brand-green/30 hover:scale-[1.02]"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl p-2.5 flex items-center justify-center overflow-hidden transition-colors",
                    selectedAsset.symbol === asset.symbol ? "bg-white/10" : "bg-[#051F20]/5 dark:bg-white/10"
                  )}>
                    <img src={asset.icon} alt={asset.name} className="w-full h-full object-contain filter grayscale-0" />
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-black uppercase tracking-tight">{asset.symbol}</p>
                    <p className={cn(
                      "text-[10px] font-bold",
                      selectedAsset.symbol === asset.symbol ? "text-white/60 dark:text-black/60" : "text-brand-green"
                    )}>{asset.change}</p>
                  </div>
                  {selectedAsset.symbol === asset.symbol && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-black flex items-center justify-center">
                       <Plus className="w-2.5 h-2.5 text-black" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AMOUNT INPUT */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#051F20]/40 dark:text-gray-500">Order Quantity</label>
              <div className="relative group">
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-16 pl-14 pr-20 text-2xl font-black rounded-[24px] border-black/10 dark:border-white/10 bg-[#EAF2EC]/30 dark:bg-white/5 focus:ring-brand-green/30 transition-all text-[#051F20] dark:text-white"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-[#051F20]/20 dark:text-white/20 text-lg uppercase">
                  {selectedAsset.symbol.substring(0, 3)}
                </div>
                <button 
                  onClick={() => setAmount('1.00')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase bg-[#051F20] dark:bg-brand-green text-white dark:text-black px-3 py-1.5 rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  Max Order
                </button>
              </div>
              <p className="text-[10px] font-bold text-light-text-subtle dark:text-gray-500 tracking-wide">Market Price: <span className="text-[#051F20] dark:text-white font-black">${selectedAsset.price.toLocaleString()}</span></p>
            </div>

            {/* PREVIEW */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#051F20]/40 dark:text-gray-500">Execution Estimate</label>
              <div className="p-6 rounded-[24px] bg-[#EAF2EC] dark:bg-white/5 border border-dashed border-[#235347]/30 dark:border-white/20 flex flex-col justify-center gap-1 h-16 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-light-text-subtle dark:text-gray-500 uppercase tracking-widest">Total Cost:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold opacity-30">$</span>
                    <span className="text-2xl font-black text-[#051F20] dark:text-brand-green">{estimatedTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="p-6 rounded-[28px] bg-[#051F20] dark:bg-brand-green/10 border border-white/10 dark:border-brand-green/10 flex items-center justify-between shadow-xl">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white dark:text-brand-green">
                   <Wallet className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-xs font-black uppercase tracking-widest text-white/50 dark:text-brand-green/50">Primary Funding</p>
                   <p className="text-sm font-black text-white dark:text-white">Cash Portfolio <span className="text-brand-green opacity-40 ml-1">($15,420.00)</span></p>
                </div>
             </div>
             <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
                <ChevronRight className="w-5 h-5" />
             </button>
          </div>
        </DialogBody>

        <DialogFooter className="bg-[#EAF2EC] dark:bg-white/5 p-8 border-t border-black/5 dark:border-white/5 flex gap-4">
           <Button 
             variant="ghost" 
             onClick={onClose}
             className="px-6 rounded-2xl font-black uppercase tracking-widest text-[10px] text-[#051F20]/50 dark:text-white/40 hover:text-[#051F20] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
           >
             Cancel
           </Button>
           <Button 
             onClick={handlePurchase}
             disabled={isProcessing || !amount}
             className="flex-1 bg-[#051F20] dark:bg-brand-green text-[#EAF2EC] dark:text-black font-black uppercase tracking-widest text-xs h-14 rounded-2xl skeuo-button green-glow shadow-2xl shadow-brand-green/20 disabled:opacity-50 group"
           >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                  Processing Order...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Execute Acquisition
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
