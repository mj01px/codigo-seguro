import type { AccessibilityControlsProps } from '../types';
import { LockIcon } from './Icons';

const NAV_LINKS = [
  { href: '#simulador', label: 'Simulador' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#proteger', label: 'Proteger' },
  { href: '#ja-roubaram', label: 'Já roubaram?' },
  { href: '#familia', label: 'Família' },
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
        <a href="#inicio" className="brand">
          <span className="brand__mark">
            <LockIcon />
          </span>
          <span className="brand__text">
            <strong>Código Seguro</strong>
            <span>Universidade de Mogi das Cruzes</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Seções da página">
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="site-nav__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__controls" role="group" aria-label="Controles de acessibilidade">
          <button
            type="button"
            className="pill"
            onClick={onToggleLargeText}
            aria-pressed={isLargeText}
            aria-label={isLargeText ? 'A+: desativar texto aumentado' : 'A+: aumentar o texto'}
          >
            A+
          </button>
          {isSpeechSupported && (
            <button
              type="button"
              className="pill"
              onClick={onToggleReadAloud}
              aria-pressed={isSpeaking}
              aria-label={isSpeaking ? 'Parar a leitura em voz alta' : 'Ouvir esta parte em voz alta'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" />
                <path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {isSpeaking ? 'Parar' : 'Ouvir'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
