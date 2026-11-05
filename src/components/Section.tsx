import type { HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  readable?: boolean;
  children: ReactNode;
}

export function Section({
  id,
  readable = true,
  className = '',
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      data-readable={readable ? 'true' : undefined}
      className={`section ${className}`.trim()}
      {...rest}
    >
      <div className="container">{children}</div>
    </section>
  );
}
