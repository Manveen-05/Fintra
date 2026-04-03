import * as React from "react";
import { cn } from "../../lib/utils";

// --- PROPS INTERFACE ---
interface FlippableCreditCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  brand?: 'visa' | 'mastercard' | 'amex';
}

const FlippableCreditCard = React.forwardRef<HTMLDivElement, FlippableCreditCardProps>(
  ({ className, cardholderName, cardNumber, expiryDate, cvv, brand = 'mastercard', ...props }, ref) => {
    
    // Brand-specific colors and logos
    const styles = {
      mastercard: {
        bg: "bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e]",
        logoColor: "#eb001b"
      },
      visa: {
        bg: "bg-gradient-to-br from-[#0e4595] to-[#0b3a7a]",
        logoColor: "#f79e1b"
      },
      amex: {
        bg: "bg-gradient-to-br from-[#2b71b8] to-[#1e4e7e]",
        logoColor: "#c0c0c0"
      }
    }[brand];

    return (
      <div
        className={cn("group h-40 w-64 [perspective:1000px]", className)}
        ref={ref}
        {...props}
      >
        <div className="relative h-full w-full rounded-2xl shadow-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          
          {/* --- CARD FRONT --- */}
          <div className={cn("absolute h-full w-full rounded-2xl text-white [backface-visibility:hidden] overflow-hidden", styles.bg)}>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,1),rgba(255,255,255,0))]" />
            <div className="relative flex h-full flex-col justify-between p-5">
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-8 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                   <div className="w-7 h-5 rounded-sm bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-80" />
                </div>
                <div className="text-right">
                   <p className="font-black italic text-sm tracking-tighter uppercase opacity-90">
                     {brand === 'mastercard' ? 'MASTERCARD' : brand === 'visa' ? 'VISA' : 'AMEX'}
                   </p>
                </div>
              </div>
              
              {/* Card Number */}
              <div className="font-mono text-lg tracking-[0.2em] drop-shadow-md">
                {cardNumber}
              </div>

              {/* Card Footer */}
              <div className="flex items-end justify-between">
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase opacity-60 mb-0.5">Card Holder</p>
                  <p className="font-mono text-xs font-medium tracking-wider uppercase">{cardholderName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold uppercase opacity-60 mb-0.5">Expires</p>
                  <p className="font-mono text-xs font-medium">{expiryDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* --- CARD BACK --- */}
          <div className={cn("absolute h-full w-full rounded-2xl text-white [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden", styles.bg)}>
            <div className="flex h-full flex-col pt-6">
              {/* Magnetic Strip */}
              <div className="h-10 w-full bg-black/80" />
              
              {/* CVV Section */}
              <div className="px-5 mt-4">
                 <p className="text-[8px] font-bold uppercase opacity-60 mb-1 text-right pr-1">CVV</p>
                 <div className="h-8 w-full bg-white/10 backdrop-blur-md rounded-md flex items-center justify-end px-3">
                   <p className="font-mono text-sm text-white italic tracking-widest">{cvv}</p>
                 </div>
              </div>

              {/* Hologram Effect */}
              <div className="mt-auto p-5 flex justify-between items-center bg-black/10">
                <div className="w-10 h-6 rounded-sm bg-white/10 backdrop-blur-xs border border-white/10" />
                <div className="flex items-center -space-x-2">
                   {brand === 'mastercard' ? (
                     <>
                       <div className="w-6 h-6 rounded-full bg-[#eb001b] opacity-80" />
                       <div className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-80" />
                     </>
                   ) : brand === 'visa' ? (
                      <div className="font-black italic text-lg tracking-tighter text-white opacity-80">VISA</div>
                   ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center font-bold text-[10px]">AMEX</div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
FlippableCreditCard.displayName = "FlippableCreditCard";

export { FlippableCreditCard };
