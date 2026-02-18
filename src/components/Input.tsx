import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-stone-700 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        className={`w-full px-4 py-3 border ${
          error ? 'border-red-500' : 'border-stone-300'
        } rounded-sm focus:outline-none focus:border-gold-500 transition-colors text-stone-900 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
