import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-stone-200 border-t-gold-500 rounded-full animate-spin`}
      />
    </div>
  );
};

export const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-50">
    <LoadingSpinner size="lg" />
  </div>
);

export default LoadingSpinner;
