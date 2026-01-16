import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'minimal';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-light-gray shadow-sm hover:shadow-md transition-shadow',
    minimal: 'bg-light-gray',
  };

  return (
    <div className={`rounded-lg p-8 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
