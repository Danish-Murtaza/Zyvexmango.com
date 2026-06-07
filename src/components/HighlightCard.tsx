import React from 'react';

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ icon, title, description }) => (
  <div className="flex gap-4 items-start p-4 hover:bg-forest-900/10 rounded transition-all">
    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold-300 bg-gold-500/10 flex items-center justify-center text-gold-400">
      {icon}
    </div>
    <div>
      <dt className="text-white font-bold text-sm uppercase tracking-wide">{title}</dt>
      <dd className="text-gray-400 text-xs mt-1 leading-relaxed">{description}</dd>
    </div>
  </div>
);
