import React from 'react';

interface CertificationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({ icon, title, description }) => (
  <div className="p-6 rounded-xl border border-gold-800/10 bg-[#061609] space-y-3">
    <div className="flex gap-3 items-center text-gold-400">
      {icon}
      <h3 className="text-md font-serif font-bold text-white">{title}</h3>
    </div>
    <p className="text-xs text-gray-400 leading-relaxed pl-9">
      {description}
    </p>
  </div>
);
