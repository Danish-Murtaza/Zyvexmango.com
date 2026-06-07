import React from 'react';

interface CheckListItemProps {
  title: string;
  description: string;
}

export const CheckListItem: React.FC<CheckListItemProps> = ({ title, description }) => (
  <li className="flex gap-3 leading-relaxed">
    <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 text-gold-300">
      ✓
    </div>
    <div>
      <strong className="text-white block">{title}</strong>
      <span>{description}</span>
    </div>
  </li>
);
