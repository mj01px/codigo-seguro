export type ButtonVariant = 'primary' | 'secondary' | 'control';

export interface AccessibilityControlsProps {
  isLargeText: boolean;
  onToggleLargeText: () => void;
  isSpeechSupported: boolean;
  isSpeaking: boolean;
  onToggleReadAloud: () => void;
}
