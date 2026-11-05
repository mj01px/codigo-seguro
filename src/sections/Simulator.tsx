import { useState } from 'react';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { SIMULATOR_STEPS, SIMULATOR_OUTCOMES } from '../lib/simulator';
import type { SimulatorOption, SimulatorOutcomeType } from '../types';

interface HistoryEntry {
  stepNumber: 1 | 2 | 3;
  scammerMessage: string;
  userReply: string;
  tip?: string;
}

export function Simulator() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [outcome, setOutcome] = useState<SimulatorOutcomeType | null>(null);
  const [announcement, setAnnouncement] = useState<string>(
    'Simulador iniciado no Passo 1 de 3.'
  );

  const stepData = SIMULATOR_STEPS[currentStep];
  const outcomeData = outcome ? SIMULATOR_OUTCOMES[outcome] : null;

  function handleSelectOption(option: SimulatorOption) {
    const newEntry: HistoryEntry = {
      stepNumber: currentStep,
      scammerMessage: stepData.scammerMessage,
      userReply: option.label,
      tip: option.tip,
    };

    const nextHistory = [...history, newEntry];
    setHistory(nextHistory);

    if (option.next === 'lost' || option.next === 'won') {
      setOutcome(option.next);
      const resultObj = SIMULATOR_OUTCOMES[option.next];
      setAnnouncement(`Resultado da simulação: ${resultObj.title} ${resultObj.description}`);
    } else {
      const nextStepObj = SIMULATOR_STEPS[option.next];
      setCurrentStep(option.next);
      const tipText = option.tip ? `${option.tip} ` : '';
      setAnnouncement(
        `${tipText}Passo ${option.next} de 3. Mensagem recebida: ${nextStepObj.scammerMessage}`
      );
    }
  }

  function handleRestart() {
    setHistory([]);
    setOutcome(null);
    setCurrentStep(1);
    setAnnouncement('Simulação reiniciada. Passo 1 de 3.');
  }

  return (
    <Section id="simulador" tone="mint" aria-labelledby="simulador-title">
      <div className="section-header">
        <h2 id="simulador-title" className="section-title">
          Você cairia nesse golpe?
        </h2>
        <p className="section-subtitle">
          Veja uma conversa como as que os golpistas fazem e escolha o que
          responder. É só uma simulação: nada aqui é real e nada é enviado.
        </p>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className="simulator-shell">
        <div className="simulator-topbar">
          <div className="simulator-contact">
            <span className="simulator-contact__dot" aria-hidden="true" />
            <span className="simulator-contact__name">
              Número desconhecido · Loja Casa Bela
            </span>
          </div>

          <div className="simulator-meta">
            <span className="simulator-step-indicator">
              Passo {currentStep} de 3
            </span>
            <Button
              variant="control"
              onClick={handleRestart}
              aria-label="Recomeçar simulação do início"
            >
              Recomeçar
            </Button>
          </div>
        </div>

        {!outcome && stepData.showSmsNotification && stepData.smsText && (
          <div
            className="simulator-sms-banner"
            role="note"
            aria-label="Notificação de SMS recebida no celular"
          >
            <div className="simulator-sms-banner__badge">SMS recebido agora</div>
            <p className="simulator-sms-banner__text">{stepData.smsText}</p>
          </div>
        )}

        <div className="simulator-chat" role="log" aria-label="Mensagens da conversa simulada">
          {history.map((item) => (
            <div key={item.stepNumber} className="simulator-turn">
              <div className="chat-msg chat-msg--scammer">
                <span className="chat-msg__sender">Golpista</span>
                <p>{item.scammerMessage}</p>
              </div>

              <div className="chat-msg chat-msg--user">
                <span className="chat-msg__sender">Você</span>
                <p>{item.userReply}</p>
              </div>

              {item.tip && (
                <div className="simulator-tip" role="note">
                  <strong>Dica:</strong> {item.tip}
                </div>
              )}
            </div>
          ))}

          {!outcome && (
            <div className="simulator-turn">
              <div className="chat-msg chat-msg--scammer">
                <span className="chat-msg__sender">Golpista</span>
                <p>{stepData.scammerMessage}</p>
              </div>
            </div>
          )}
        </div>

        {!outcome ? (
          <div
            className="simulator-options"
            role="group"
            aria-label={`Opções de resposta para o passo ${currentStep}`}
          >
            <p className="simulator-options__prompt">Escolha a sua resposta:</p>
            <div className="simulator-options__list">
              {stepData.options.map((opt) => (
                <Button
                  key={opt.id}
                  variant="primary"
                  className="simulator-option-btn"
                  onClick={() => handleSelectOption(opt)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          outcomeData && (
            <div
              className={`simulator-outcome simulator-outcome--${outcomeData.type}`}
              role="region"
              aria-labelledby="simulator-outcome-title"
            >
              <h3 id="simulator-outcome-title" className="simulator-outcome__title">
                {outcomeData.title}
              </h3>
              <p className="simulator-outcome__text">{outcomeData.description}</p>
              <div className="simulator-outcome__actions">
                <Button variant="primary" href={outcomeData.ctaHref}>
                  {outcomeData.ctaLabel}
                </Button>
                <Button variant="secondary" onClick={handleRestart}>
                  {outcomeData.retryLabel}
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </Section>
  );
}
