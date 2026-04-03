import React from 'react';
import { ExternalLink, Clock, Newspaper } from 'lucide-react';
import { useToast } from './ui/toast';

interface NewsCardProps {
  news: { id: string; title: string; time: string; source: string }[];
}

export default function NewsCard({ news }: NewsCardProps) {
  const { toast } = useToast();

  const handleNewsClick = (title: string) => {
    toast(`Opening external report: ${title.substring(0, 30)}...`, 'info');
  };

  return (
    <div className="glass-card p-4 rounded-[var(--radius-skeuo)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#051F20] dark:text-brand-green" />
          <h3 className="text-lg font-bold">Market News</h3>
        </div>
        <button 
          onClick={() => toast('Loading institutional news feed...', 'info')}
          className="text-[10px] text-[#051F20] dark:text-brand-green hover:underline font-semibold uppercase tracking-wider"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="group cursor-pointer" onClick={() => handleNewsClick(item.title)}>
            <div className="flex justify-between items-start gap-4 mb-1">
              <h4 className="text-xs font-semibold leading-relaxed group-hover:text-[#051F20] dark:text-brand-green transition-colors">
                {item.title}
              </h4>
              <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-[#051F20] dark:text-brand-green shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-2 text-[9px] text-light-text-subtle dark:text-gray-500 uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {item.time}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span>{item.source}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-3 rounded-xl bg-[#051F20]/5 dark:bg-brand-green/5 border border-[#235347]/10 dark:border-brand-green/10">
        <p className="text-[10px] text-[#051F20] dark:text-brand-green font-bold mb-1 uppercase tracking-wider">Pro Tip</p>
        <p className="text-[11px] text-light-text-subtle dark:text-gray-400 leading-relaxed">
          Diversifying your portfolio across different asset classes can help mitigate risk during market volatility.
        </p>
      </div>
    </div>
  );
}
