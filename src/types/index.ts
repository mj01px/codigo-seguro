export type ButtonVariant = 'primary' | 'secondary' | 'navy';

export interface AccessibilityControlsProps {
  isLargeText: boolean;
  onToggleLargeText: () => void;
  isSpeechSupported: boolean;
  isSpeaking: boolean;
  onToggleReadAloud: () => void;
}

export type SimulatorOutcomeType = 'lost' | 'won';

export type SimulatorNextTarget = 2 | 3 | SimulatorOutcomeType;

export interface SimulatorOption {
  id: string;
  label: string;
  next: SimulatorNextTarget;
  tip?: string;
}

export interface SimulatorStep {
  stepNumber: 1 | 2 | 3;
  scammerMessage: string;
  showSmsNotification?: boolean;
  smsText?: string;
  options: SimulatorOption[];
}

export type ChatAuthor = 'scammer' | 'user' | 'system';

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  text: string;
}

export interface SimulatorOutcome {
  type: SimulatorOutcomeType;
  /** Última mensagem da conversa antes do resultado aparecer. */
  closingMessage: Omit<ChatMessage, 'id'>;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  retryLabel: string;
}

export type DevicePlatform = 'android' | 'iphone';
