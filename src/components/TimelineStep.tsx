import React from 'react';

interface TimelineStepProps {
  title: string;
  description: string;
  dotColor?: string;
  animate?: boolean;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  title,
  description,
  dotColor = 'gold',
  animate = false,
}) => {
  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    gold: { border: 'border-gold-400', bg: 'bg-gold-400', text: 'text-gold-300' },
    emerald: { border: 'border-emerald-400', bg: 'bg-emerald-400', text: 'text-emerald-400' },
    indigo: { border: 'border-indigo-400', bg: 'bg-indigo-400', text: 'text-indigo-300' },
  };
  const colors = colorMap[dotColor] || colorMap.gold;

  return (
    <div className="relative flex gap-4 pl-8">
      <div className={`absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full ${colors.border} border bg-forest-950 flex items-center justify-center`}>
        <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} ${animate ? 'animate-pulse' : ''}`} />
      </div>
      <div>
        <h4 className={`text-xs font-bold uppercase ${colors.text} tracking-wider`}>{title}</h4>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
