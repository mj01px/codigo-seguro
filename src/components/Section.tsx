import type { HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  tone?: 'dots' | 'mint';
  readable?: boolean;
  children: ReactNode;
}

export function Section({
  id,
  tone = 'dots',
  readable = true,
  className = '',
  children,
  ...rest
}: SectionProps) {
  const toneClass = tone === 'mint' ? 'section--mint' : 'section--dots';

  return (
    <section
      id={id}
      data-readable={readable ? 'true' : undefined}
      className={`section ${toneClass} ${className}`.trim()}
      {...rest}
    >
      <div className="container">{children}</div>
    </section>
  );
}
