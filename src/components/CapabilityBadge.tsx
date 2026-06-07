import React from 'react';

interface CapabilityBadgeProps {
  id?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const CapabilityBadge: React.FC<CapabilityBadgeProps> = ({ id, icon, title, subtitle }) => (
  <div className="flex items-center gap-2 p-2 rounded border border-gold-800/10 bg-forest-900/30">
    <div id={id} className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300">
      {icon}
    </div>
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-wide text-white">{title}</h4>
      <p className="text-[9px] text-gray-400 font-sans">{subtitle}</p>
    </div>
  </div>
);
