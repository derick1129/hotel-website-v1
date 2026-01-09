import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-8 py-3 uppercase tracking-widest text-xs font-semibold transition-all duration-300 ease-out border";
  
  const variants = {
    primary: "bg-stone-900 text-white border-stone-900 hover:bg-gold-500 hover:border-gold-500 hover:text-white",
    outline: "bg-transparent text-stone-900 border-stone-900 hover:bg-stone-900 hover:text-white",
    text: "bg-transparent text-white border-white hover:bg-white hover:text-stone-900"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};