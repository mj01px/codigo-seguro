import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'white' | 'mint';
  children: ReactNode;
}

export function Card({ tone = 'white', className = '', children, ...rest }: CardProps) {
  const toneClass = tone === 'mint' ? 'card--mint' : '';
  const classes = `card ${toneClass} ${className}`.trim();

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
