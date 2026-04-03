import React from 'react';

const funnelData = [
  { step: 'Website', value: '5,000', width: '100%', cr: '15.0% CR', color: 'bg-[#407BFE]' },
  { step: 'Download', value: '750', width: '15%', cr: '60.0% CR', color: 'bg-[#6DA5FA]' },
  { step: 'Activated', value: '450', width: '60%', cr: '53.3% CR', color: 'bg-[#98C4FB]' },
  { step: 'Paywall', value: '240', width: '53.3%', cr: '10.4% CR', color: 'bg-[#CBE1FE]' },
  { step: 'Paid', value: '25', width: '10.4%', cr: null, color: 'bg-[#31D669]' },
];

export default function ConversionFunnelCard() {
  return (
    <div className="glass-card p-6 rounded-[var(--radius-skeuo)] relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Conversion Funnel</h3>
        <span className="text-xs text-light-text-subtle dark:text-gray-400 font-medium tracking-wider">Last 30 Days</span>
      </div>

      <div className="flex flex-col gap-6">
        {funnelData.map((item, index) => (
          <div key={item.step} className="relative group">
            <div className="flex justify-between items-end mb-1">
              <span className="font-bold text-gray-200 text-sm">{item.step}</span>
              <span className="font-bold text-light-text dark:text-white text-sm">{item.value}</span>
            </div>
            <div className="w-full h-8 bg-[#8EB69B] dark:bg-[#2A2E35] rounded-sm relative">
              <div
                className={`h-full ${item.color} rounded-sm`}
                style={{ width: item.width }}
              />
            </div>
            {item.cr && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-[#8EB69B] dark:bg-[#1D1E22] border border-light-border dark:border-white/5 px-2 py-0.5 rounded text-xs font-bold text-[#235347] dark:text-gray-300">
                  {item.cr}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-light-border dark:border-white/5 flex items-start gap-2 text-xs text-light-text-subtle dark:text-gray-400">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 flex-shrink-0" />
        <p>
          Weakest link: <span className="font-bold text-light-text dark:text-white">Download → Activation (60%)</span>. Consider improving onboarding friction.
        </p>
      </div>
    </div>
  );
}
