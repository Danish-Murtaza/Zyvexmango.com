import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  maxWidth?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  maxWidth = 'max-w-3xl',
}) => (
  <div className={`text-center ${maxWidth} mx-auto space-y-4`}>
    {badge && (
      <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
      {title}
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
    {subtitle && (
      <p className="text-gold-300 font-sans italic text-sm md:text-base">
        {subtitle}
      </p>
    )}
  </div>
);
