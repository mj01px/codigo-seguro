import { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import type { DevicePlatform } from '../types';

const STORAGE_KEY_ANDROID = 'codigo-seguro:checklist-android';
const STORAGE_KEY_IPHONE = 'codigo-seguro:checklist-iphone';

const ANDROID_STEPS = [
  'Abra o WhatsApp.',
  'Toque nos três pontinhos, no canto de cima à direita.',
  'Toque em "Configurações".',
  'Toque em "Conta".',
  'Toque em "Confirmação em duas etapas" e depois em "Ativar".',
  'Crie um PIN de 6 números e digite de novo para confirmar.',
  'Cadastre um e-mail. Ele serve para recuperar o PIN se você esquecer.',
];

const IPHONE_STEPS = [
  'Abra o WhatsApp.',
  'Toque em "Configurações", no canto de baixo à direita.',
  'Toque em "Conta".',
  'Toque em "Confirmação em duas etapas".',
  'Toque em "Ativar".',
  'Crie um PIN de 6 números e digite de novo para confirmar.',
  'Cadastre um e-mail. Ele serve para recuperar o PIN se você esquecer.',
];

function loadSavedChecks(key: string, length: number): boolean[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return Array(length).fill(false);
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === length) {
      return parsed.map(Boolean);
    }
  } catch {
    // ignora caso localStorage falhe
  }
  return Array(length).fill(false);
}

export function Protect() {
  const [platform, setPlatform] = useState<DevicePlatform>('android');
  const [androidChecks, setAndroidChecks] = useState<boolean[]>(() =>
    loadSavedChecks(STORAGE_KEY_ANDROID, ANDROID_STEPS.length)
  );
  const [iphoneChecks, setIphoneChecks] = useState<boolean[]>(() =>
    loadSavedChecks(STORAGE_KEY_IPHONE, IPHONE_STEPS.length)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_ANDROID, JSON.stringify(androidChecks));
    } catch {
      // ignora erro de localStorage
    }
  }, [androidChecks]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_IPHONE, JSON.stringify(iphoneChecks));
    } catch {
      // ignora erro de localStorage
    }
  }, [iphoneChecks]);

  const activeSteps = platform === 'android' ? ANDROID_STEPS : IPHONE_STEPS;
  const activeChecks = platform === 'android' ? androidChecks : iphoneChecks;
  const completedCount = activeChecks.filter(Boolean).length;
  const totalCount = activeSteps.length;
  const isAllDone = completedCount === totalCount;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  function toggleStep(index: number) {
    if (platform === 'android') {
      setAndroidChecks((prev) => prev.map((v, i) => (i === index ? !v : v)));
    } else {
      setIphoneChecks((prev) => prev.map((v, i) => (i === index ? !v : v)));
    }
  }

  return (
    <Section id="proteger" tone="mint" aria-labelledby="proteger-title">
      <div className="section-header">
        <h2 id="proteger-title" className="section-title">
          Tranque seu WhatsApp
        </h2>
        <p className="section-subtitle">
          Ative a confirmação em duas etapas. Com ela, mesmo que alguém consiga
          o código do SMS, não entra sem o seu{' '}
          <mark className="mark-yellow">PIN</mark>. Leva 2 minutos.
        </p>
      </div>

      <div className="protect-layout">
        <div className="protect-main">
          <div
            className="platform-tabs"
            role="tablist"
            aria-label="Escolha o tipo do seu celular"
          >
            <button
              type="button"
              role="tab"
              id="tab-android"
              aria-selected={platform === 'android'}
              aria-controls="panel-checklist"
              className={`btn platform-tab ${
                platform === 'android' ? 'platform-tab--active' : ''
              }`}
              onClick={() => setPlatform('android')}
            >
              Android
            </button>
            <button
              type="button"
              role="tab"
              id="tab-iphone"
              aria-selected={platform === 'iphone'}
              aria-controls="panel-checklist"
              className={`btn platform-tab ${
                platform === 'iphone' ? 'platform-tab--active' : ''
              }`}
              onClick={() => setPlatform('iphone')}
            >
              iPhone
            </button>
          </div>

          <div
            id="panel-checklist"
            role="tabpanel"
            aria-labelledby={platform === 'android' ? 'tab-android' : 'tab-iphone'}
            className="checklist-panel"
          >
            <div className="checklist-progress" aria-live="polite">
              <div className="checklist-progress__header">
                <span className="checklist-progress__count">
                  {completedCount} de {totalCount} passos feitos
                </span>
              </div>
              <div
                className="checklist-progress__bar"
                role="progressbar"
                aria-valuenow={completedCount}
                aria-valuemin={0}
                aria-valuemax={totalCount}
                aria-label="Progresso dos passos concluídos"
              >
                <div
                  className="checklist-progress__fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <ol className="checklist-items">
              {activeSteps.map((stepText, idx) => {
                const inputId = `step-${platform}-${idx + 1}`;
                const checked = activeChecks[idx];
                return (
                  <li
                    key={inputId}
                    className={`checklist-item ${
                      checked ? 'checklist-item--done' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={inputId}
                      className="checklist-item__checkbox"
                      checked={checked}
                      onChange={() => toggleStep(idx)}
                    />
                    <label htmlFor={inputId} className="checklist-item__label">
                      <span className="checklist-item__num">{idx + 1}.</span>{' '}
                      <span>{stepText}</span>
                    </label>
                  </li>
                );
              })}
            </ol>

            {isAllDone && (
              <div className="checklist-complete" role="status" aria-live="polite">
                Pronto! Seu WhatsApp está trancado.
              </div>
            )}

            <p className="checklist-note">
              Os nomes dos menus podem mudar um pouco conforme a versão do
              aplicativo.
            </p>
          </div>
        </div>

        <aside className="pin-tips-card" aria-labelledby="pin-tips-title">
          <h3 id="pin-tips-title" className="pin-tips-card__title">
            Dicas para o seu PIN
          </h3>
          <ul className="pin-tips-card__list">
            <li>Não use data de nascimento, 123456 ou 000000.</li>
            <li>
              Não conte o PIN para ninguém, nem para quem diz ser do WhatsApp.
            </li>
            <li>
              De vez em quando o WhatsApp pede o PIN. É só para você não
              esquecer.
            </li>
          </ul>
        </aside>
      </div>
    </Section>
  );
}
