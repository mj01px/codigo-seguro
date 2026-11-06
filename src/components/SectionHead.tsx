import type { ReactNode } from 'react';

interface SectionHeadProps {
  id: string;
  /** Rótulo escrito à mão acima do título, como o "Fique de olho:" do panfleto. */
  eyebrow: string;
  title: ReactNode;
  underline?: boolean;
  eyebrowTone?: 'green' | 'wine' | 'mint';
  children?: ReactNode;
}

export function SectionHead({
  id,
  eyebrow,
  title,
  underline = false,
  eyebrowTone = 'green',
  children,
}: SectionHeadProps) {
  return (
    <div className="section-head">
      <p className={`eyebrow eyebrow--${eyebrowTone}`}>{eyebrow}</p>
      <h2 id={id} className="section-title">
        {underline ? <span className="underline">{title}</span> : title}
      </h2>
      {children && <p className="lead">{children}</p>}
    </div>
  );
}
