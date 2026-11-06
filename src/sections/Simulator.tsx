import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { PhoneFrame } from '../components/PhoneFrame';
import { SIMULATOR_STEPS, SIMULATOR_OUTCOMES } from '../lib/simulator';
import type {
  ChatMessage,
  SimulatorOption,
  SimulatorOutcomeType,
} from '../types';

type StepNumber = 1 | 2 | 3;

const OPTION_LETTERS = ['A', 'B', 'C'] as const;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function firstMessages(): ChatMessage[] {
  return [{ id: 'step-1', author: 'scammer', text: SIMULATOR_STEPS[1].scammerMessage }];
}

export function Simulator() {
  const [step, setStep] = useState<StepNumber>(1);
  const [messages, setMessages] = useState<ChatMessage[]>(firstMessages);
  const [outcome, setOutcome] = useState<SimulatorOutcomeType | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [tip, setTip] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const panelHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasInteracted = useRef(false);

  const stepData = SIMULATOR_STEPS[step];
  const outcomeData = outcome ? SIMULATOR_OUTCOMES[outcome] : null;
  const showSms = !outcome && step >= 2 && Boolean(SIMULATOR_STEPS[2].smsText);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  // Rola só a área da conversa, sem mexer na rolagem da página.
  useEffect(() => {
    const chat = chatRef.current;
    if (chat) chat.scrollTop = chat.scrollHeight;
  }, [messages, isTyping]);

  // Depois de cada resposta, o foco volta para o painel de escolhas.
  useEffect(() => {
    if (hasInteracted.current && !isTyping) panelHeadingRef.current?.focus();
  }, [step, outcome, isTyping]);

  function reply(afterDelay: () => void) {
    setIsTyping(true);
    const delay = prefersReducedMotion() ? 150 : 1100;
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setIsTyping(false);
      afterDelay();
    }, delay);
  }

  function handleSelect(option: SimulatorOption) {
    if (isTyping) return;
    hasInteracted.current = true;

    setMessages((prev) => [
      ...prev,
      { id: `reply-${option.id}`, author: 'user', text: option.label },
    ]);
    setTip(option.tip ?? null);

    const next = option.next;
    if (next === 'lost' || next === 'won') {
      const result = SIMULATOR_OUTCOMES[next];
      reply(() => {
        setMessages((prev) => [
          ...prev,
          { id: `closing-${next}`, ...result.closingMessage },
        ]);
        setOutcome(next);
      });
      return;
    }

    reply(() => {
      setMessages((prev) => [
        ...prev,
        { id: `step-${next}`, author: 'scammer', text: SIMULATOR_STEPS[next].scammerMessage },
      ]);
      setStep(next);
    });
  }

  function handleRestart() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    hasInteracted.current = true;
    setIsTyping(false);
    setStep(1);
    setOutcome(null);
    setTip(null);
    setMessages(firstMessages());
  }

  const panel = (
    <div className="sim-panel">
      <div className="sim-progress" aria-hidden="true">
        {([1, 2, 3] as const).map((n) => (
          <span
            key={n}
            className={`sim-progress__dot ${
              n < step || (n === step && outcome) ? 'is-done' : ''
            } ${n === step && !outcome ? 'is-current' : ''}`}
          />
        ))}
        <span className="sim-progress__label">
          {outcome ? 'Fim da simulação' : `Passo ${step} de 3`}
        </span>
      </div>

      {tip && !outcome && (
        <p className="sim-tip" role="status">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {tip}
        </p>
      )}

      {!outcomeData ? (
        <div>
          <h3 ref={panelHeadingRef} tabIndex={-1} className="sim-panel__title">
            {isTyping ? 'Esperando a resposta...' : 'O que você responde?'}
          </h3>
          <div className="sim-options">
            {stepData.options.map((option, index) => (
              <button
                key={option.id}
                type="button"
                className="sim-option"
                onClick={() => handleSelect(option)}
                disabled={isTyping}
              >
                <span className="sim-option__letter" aria-hidden="true">
                  {OPTION_LETTERS[index]}
                </span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={`card sim-outcome sim-outcome--${outcomeData.type}`}>
          <span className="sim-outcome__badge">
            {outcomeData.type === 'won' ? 'Você venceu o golpe' : 'Você caiu no golpe'}
          </span>
          <h3 ref={panelHeadingRef} tabIndex={-1} className="sim-outcome__title">
            {outcomeData.title}
          </h3>
          <p>{outcomeData.description}</p>
          <div className="sim-outcome__actions">
            <Button variant="primary" href={outcomeData.ctaHref}>
              {outcomeData.ctaLabel}
            </Button>
            <Button variant="secondary" onClick={handleRestart}>
              {outcomeData.retryLabel}
            </Button>
          </div>
        </div>
      )}

      {!outcome && (
        <button type="button" className="sim-restart" onClick={handleRestart}>
          Recomeçar a simulação
        </button>
      )}
    </div>
  );

  return (
    <Section id="simulador" tone="mint" className="section--bordered" aria-labelledby="simulador-title">
      <div className="sim">
        <div className="sim__text">
          <SectionHead id="simulador-title" eyebrow="Teste rápido:" title="Você cairia nesse golpe?">
            Veja uma conversa como as que os golpistas fazem e escolha o que responder. É só uma
            simulação: nada aqui é real e nada é enviado.
          </SectionHead>
          {panel}
        </div>

        <div className="sim__phone">
          <PhoneFrame width={310} height={600} rotate={-2} fullScreen>
            <div className="sim-screen">
              <div className="sim-screen__topbar">
                <span className="sim-screen__avatar" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8.5" r="4" stroke="#1C2541" strokeWidth="2.2" />
                    <path d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5" stroke="#1C2541" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="sim-screen__contact">
                  <strong>Loja Casa Bela</strong>
                  <span>número desconhecido</span>
                </span>
              </div>

              {showSms && (
                <div className="sim-sms" role="note" aria-label="Notificação de SMS recebida">
                  <span className="sim-sms__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1z" />
                    </svg>
                  </span>
                  <span className="sim-sms__body">
                    <span className="sim-sms__meta">
                      <span>Mensagens</span>
                      <span>agora</span>
                    </span>
                    <strong className="sim-sms__sender">WhatsApp</strong>
                    <span className="sim-sms__text">
                      Seu código do WhatsApp: <span className="sim-sms__code">482-719</span>. Não compartilhe este código.
                    </span>
                  </span>
                </div>
              )}

              <div ref={chatRef} className="sim-chat" role="log" aria-live="polite" aria-label="Conversa simulada">
                {messages.map((message) => (
                  <p key={message.id} className={`sim-msg sim-msg--${message.author}`}>
                    <span className="sr-only">
                      {message.author === 'scammer'
                        ? 'Golpista: '
                        : message.author === 'user'
                          ? 'Você: '
                          : ''}
                    </span>
                    {message.text}
                  </p>
                ))}
                {isTyping && (
                  <p className="sim-typing" aria-label="digitando">
                    <span />
                    <span />
                    <span />
                  </p>
                )}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </Section>
  );
}
