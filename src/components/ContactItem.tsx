import React from 'react';

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

export const ContactItem: React.FC<ContactItemProps> = ({ icon, label, children }) => (
  <li className="flex gap-2.5 items-start">
    {icon}
    <div>
      <strong className="text-white block">{label}</strong>
      {children}
    </div>
  </li>
);
