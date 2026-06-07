import React from 'react';

interface ToggleButtonProps {
  id?: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: 'pill' | 'tab';
  activeClassName?: string;
  inactiveClassName?: string;
}

const defaults = {
  pill: {
    active: 'bg-gold-500 text-forest-950 font-semibold shadow-inner',
    inactive: 'text-gray-300 hover:text-gold-400',
    base: 'px-3 py-1 text-[11px] rounded-full font-medium transition-all',
  },
  tab: {
    active: 'bg-gold-500 text-forest-950 shadow-inner font-black',
    inactive: 'bg-forest-900/60 text-gray-300 hover:text-gold-400 border border-gold-800/10',
    base: 'px-4 py-2 text-xs rounded uppercase font-bold tracking-wide transition-all',
  },
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  id,
  label,
  isActive,
  onClick,
  variant = 'pill',
  activeClassName,
  inactiveClassName,
}) => {
  const preset = defaults[variant];
  const active = activeClassName || preset.active;
  const inactive = inactiveClassName || preset.inactive;

  return (
    <button
      id={id}
      onClick={onClick}
      className={`${preset.base} ${isActive ? active : inactive}`}
    >
      {label}
    </button>
  );
};
