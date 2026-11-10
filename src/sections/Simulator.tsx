import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { SIMULATOR_CONTACT, SIMULATOR_OUTCOMES, SIMULATOR_STEPS } from '../lib/simulator';
import type { ChatMessage, SimulatorOption, SimulatorOutcomeType } from '../types';

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

  const timerRef = useRef<number | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const panelHeadingRef = useRef<HTMLParagraphElement>(null);
  const outcomeHeadingRef = useRef<HTMLParagraphElement>(null);
  const hasInteracted = useRef(false);

  const stepData = SIMULATOR_STEPS[step];
  const outcomeData = outcome ? SIMULATOR_OUTCOMES[outcome] : null;
  const showSms = !outcome && step >= 2;

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

  // Depois de cada resposta, o foco vai para a próxima pergunta ou para o resultado.
  useEffect(() => {
    if (!hasInteracted.current || isTyping) return;
    (outcome ? outcomeHeadingRef : panelHeadingRef).current?.focus();
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

    setMessages((prev) => [...prev, { id: `reply-${option.id}`, author: 'user', text: option.label }]);

    const next = option.next;
    if (next === 'lost' || next === 'won') {
      const result = SIMULATOR_OUTCOMES[next];
      reply(() => {
        setMessages((prev) => [...prev, { id: `closing-${next}`, ...result.closingMessage }]);
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
    setMessages(firstMessages());
  }

  return (
    <section id="treine" className="part part--treine" aria-labelledby="treine-title" data-readable>
      <div className="container">
        <p className="kicker kicker--center">agora é com você:</p>
        <h2 id="treine-title" className="h2 h2--center">
          Você cairia nesse golpe?
        </h2>
        <p className="lead lead--center">
          Escolha o que responder. É só uma simulação: nada aqui é real e nada é enviado.
        </p>

        <div className="sim">
          <div className="sim__options">
            <p ref={panelHeadingRef} tabIndex={-1} className="sim__question">
              {outcome ? 'Fim da conversa.' : isTyping ? 'Esperando a resposta...' : 'O que você faria?'}
            </p>
            {!outcome &&
              stepData.options.map((option, index) => (
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
            <p className="sim__progress">{outcome ? 'Simulação concluída' : `Passo ${step} de 3`}</p>
          </div>

          <div className="sim__phone">
            <PhoneFrame width={310} height={600} rotate={-2} fullScreen>
              <div className="sim-screen">
                <div className="sim-screen__topbar">
                  <span className="sim-screen__avatar" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8.5" r="4" stroke="#1C2541" strokeWidth="2.2" />
                      <path
                        d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5"
                        stroke="#1C2541"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="sim-screen__contact">
                    <strong>{SIMULATOR_CONTACT}</strong>
                    <span>número desconhecido</span>
                  </span>
                </div>

                {showSms && (
                  <div className="sim-sms" role="note" aria-label="Notificação de SMS recebida">
                    <span className="sim-sms__icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF">
                        <path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1z" />
                      </svg>
                    </span>
                    <span className="sim-sms__body">
                      <span className="sim-sms__meta">
                        <span>Mensagens</span>
                        <span>agora</span>
                      </span>
                      <strong>WhatsApp</strong>
                      <span>
                        Seu código do WhatsApp: <span className="sim-sms__code">482-719</span>. Não compartilhe este
                        código.
                      </span>
                    </span>
                  </div>
                )}

                <div
                  ref={chatRef}
                  className={`sim-chat${showSms ? ' sim-chat--under-sms' : ''}`}
                  role="log"
                  aria-live="polite"
                  aria-label="Conversa simulada"
                >
                  {messages.map((message) => (
                    <p key={message.id} className={`sim-msg sim-msg--${message.author}`}>
                      <span className="sr-only">
                        {message.author === 'scammer' ? 'Golpista: ' : message.author === 'user' ? 'Você: ' : ''}
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

          {/* O resultado só aparece no fim; durante a conversa a coluna fica vazia */}
          {outcomeData ? (
            <div className={`sim-result sim-result--${outcomeData.type}`}>
              <span className="sim-result__stamp" aria-hidden="true">
                {outcomeData.stamp}
              </span>
              <p ref={outcomeHeadingRef} tabIndex={-1} className="sim-result__title">
                {outcomeData.title}
              </p>
              <p>{outcomeData.description}</p>
              {outcomeData.notes.map((note) => (
                <p key={note.label}>
                  <b>{note.label}</b> {note.text}
                </p>
              ))}
              <div className="sim-result__actions">
                <a href={outcomeData.ctaHref} className="btn btn--small btn--solid">
                  {outcomeData.ctaLabel}
                </a>
                <button type="button" className="btn btn--small btn--outline" onClick={handleRestart}>
                  {outcomeData.retryLabel}
                </button>
              </div>
            </div>
          ) : (
            <div className="sim__spacer" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
