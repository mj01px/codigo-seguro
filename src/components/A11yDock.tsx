import type { AccessibilityControlsProps } from '../types';

/** A+ e Ouvir sempre à mão, numa pílula fixa no canto da tela. */
export function A11yDock({
  isLargeText,
  onToggleLargeText,
  isSpeechSupported,
  isSpeaking,
  onToggleReadAloud,
}: AccessibilityControlsProps) {
  return (
    <aside className="a11y-dock" aria-label="Letra e leitura em voz alta">
      <button
        type="button"
        className="a11y-dock__btn"
        onClick={onToggleLargeText}
        aria-pressed={isLargeText}
        aria-label={isLargeText ? 'Voltar a letra ao normal' : 'Aumentar a letra'}
      >
        A+
      </button>
      {isSpeechSupported && (
        <button
          type="button"
          className="a11y-dock__btn a11y-dock__btn--listen"
          onClick={onToggleReadAloud}
          aria-pressed={isSpeaking}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" />
            <path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {isSpeaking ? 'Parar' : 'Ouvir'}
        </button>
      )}
    </aside>
  );
}
