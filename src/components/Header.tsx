import type { AccessibilityControlsProps } from '../types';
import { Button } from './Button';

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
        <a href="#inicio" className="site-header__brand">
          <span className="site-header__brand-badge">Código Seguro</span>
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
    </header>
  );
}
