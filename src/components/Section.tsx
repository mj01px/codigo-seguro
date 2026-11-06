import type { HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  tone?: 'plain' | 'dots' | 'mint' | 'navy' | 'green';
  readable?: boolean;
  children: ReactNode;
}

export function Section({
  id,
  tone = 'plain',
  readable = true,
  className = '',
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      data-readable={readable ? 'true' : undefined}
      className={`section section--${tone} ${className}`.trim()}
      {...rest}
    >
      <div className="container">{children}</div>
    </section>
  );
}
