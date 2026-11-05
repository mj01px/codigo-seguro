import type { AccessibilityControlsProps } from '../types';
import { Button } from './Button';

const NAV_LINKS = [
  { href: '#simulador', label: 'Simulador' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#proteger', label: 'Proteger' },
  { href: '#ja-roubaram', label: 'Já roubaram?' },
  { href: '#familia', label: 'Família' },
  { href: '#panfleto', label: 'Panfleto' },
];

export function Header({
  isLargeText,
  onToggleLargeText,
  isSpeechSupported,
  isSpeaking,
  onToggleReadAloud,
}: AccessibilityControlsProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div className="site-header__top">
          <a href="#inicio" className="site-header__brand">
            <svg
              className="site-header__lock-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="11"
                width="16"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="#FFD447"
              />
              <path
                d="M8 11V7a4 4 0 118 0v4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="1.5" fill="currentColor" />
            </svg>
            <span>Código Seguro</span>
          </a>

          <div
            className="site-header__controls"
            role="group"
            aria-label="Controles de acessibilidade"
          >
            <Button
              variant="control"
              onClick={onToggleLargeText}
              aria-pressed={isLargeText}
              aria-label={
                isLargeText
                  ? 'A+: desativar texto aumentado'
                  : 'A+: ativar texto aumentado'
              }
            >
              A+
            </Button>

            {isSpeechSupported && (
              <Button
                variant="control"
                onClick={onToggleReadAloud}
                aria-pressed={isSpeaking}
                aria-label={
                  isSpeaking
                    ? 'Parar leitura em voz alta'
                    : 'Ouvir a seção visível em voz alta'
                }
              >
                {isSpeaking ? 'Parar' : 'Ouvir'}
              </Button>
            )}
          </div>
        </div>

        <nav className="site-header__nav" aria-label="Seções da página">
          <ul className="site-header__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="site-header__nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
