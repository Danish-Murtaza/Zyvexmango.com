import React from 'react';

interface NumberedValueProps {
  index: number;
  title: string;
  description: string;
}

export const NumberedValue: React.FC<NumberedValueProps> = ({ index, title, description }) => (
  <div className="flex gap-4">
    <div className="w-6 h-6 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-300 text-xs shrink-0 mt-0.5">
      {index}
    </div>
    <div>
      <h4 className="text-sm font-bold text-gold-200">{title}</h4>
      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{description}</p>
    </div>
  </div>
);
