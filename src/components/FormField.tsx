import React from 'react';

interface FormFieldProps {
  id?: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  as?: 'input' | 'textarea' | 'select';
  rows?: number;
  children?: React.ReactNode;
}

const fieldClassName =
  'w-full p-3 bg-forest-950 border border-gold-800/40 rounded text-white focus:border-gold-400 focus:outline-none transition-colors';

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  as = 'input',
  rows,
  children,
}) => (
  <div className="space-y-1.5">
    <label id={id} className="text-gray-300 font-semibold uppercase">
      {label}
    </label>
    {as === 'textarea' ? (
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={fieldClassName}
      />
    ) : as === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={fieldClassName}
      >
        {children}
      </select>
    ) : (
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={fieldClassName}
      />
    )}
  </div>
);
