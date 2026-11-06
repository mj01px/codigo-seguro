/** Ícones de traço usados em mais de uma seção. Todos decorativos. */

export function LockIcon({ size = 20, color = '#1C2541' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2.5" stroke={color} strokeWidth="2.3" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={color} strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

export function AlertIcon({ size = 20, color = '#FFFFFF', fill = 'none' }: { size?: number; color?: string; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L2 20h20L12 3z" fill={fill} stroke={color} strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M12 10v4" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.3" fill={color} />
    </svg>
  );
}

export function SmsIcon({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
      <path d="M4 5h16v11H9l-5 4z" />
    </svg>
  );
}

export function CheckIcon({ color = '#FFD447' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
