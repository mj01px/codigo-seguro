import { useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { CheckIcon, LockIcon } from '../components/Icons';
import { PhoneFrame } from '../components/PhoneFrame';
import { Section } from '../components/Section';
import type { DevicePlatform } from '../types';

const PLATFORMS: { id: DevicePlatform; label: string }[] = [
  { id: 'android', label: 'Android' },
  { id: 'iphone', label: 'iPhone' },
];

function Chevron() {
  return (
    <svg className="mini__chev" width="10" height="10" viewBox="0 0 24 24" fill="none">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackHeader({ title }: { title: string }) {
  return (
    <span className="mini__header">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {title}
    </span>
  );
}

/** Linhas cinzas que imitam a lista de conversas ao fundo. */
function ChatGhosts({ count }: { count: number }) {
  return (
    <span className="mini__ghosts">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="mini__ghost">
          <span className="mini__ghost-avatar" />
          <span className="mini__ghost-lines">
            <span />
            <span />
          </span>
        </span>
      ))}
    </span>
  );
}

function ListScreen({
  title,
  items,
  active,
  back = false,
  profile = false,
}: {
  title: string;
  items: string[];
  active: string;
  back?: boolean;
  profile?: boolean;
}) {
  return (
    <>
      {back ? <BackHeader title={title} /> : <span className="mini__header">{title}</span>}
      {profile && (
        <span className="mini__profile">
          <span className="mini__ghost-avatar mini__ghost-avatar--big" />
          <span className="mini__ghost-lines">
            <span />
            <span />
          </span>
        </span>
      )}
      <span className="mini__list">
        {items.map((item) => (
          <span key={item} className={`mini__row ${item === active ? 'mini__row--active' : ''}`}>
            <span>{item}</span>
            <Chevron />
          </span>
        ))}
      </span>
    </>
  );
}

function AndroidMenuScreen() {
  return (
    <>
      <span className="mini__header mini__header--app">
        WhatsApp
        <span className="mini__dots">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#1C2541">
            <circle cx="12" cy="5" r="2.2" />
            <circle cx="12" cy="12" r="2.2" />
            <circle cx="12" cy="19" r="2.2" />
          </svg>
        </span>
      </span>
      <ChatGhosts count={5} />
      <span className="mini__menu">
        <span className="mini__menu-item">Novo grupo</span>
        <span className="mini__menu-item">Mensagens favoritas</span>
        <span className="mini__menu-item mini__menu-item--active">Configurações</span>
      </span>
    </>
  );
}

function IphoneTabScreen() {
  return (
    <>
      <span className="mini__header mini__header--app">Conversas</span>
      <ChatGhosts count={4} />
      <span className="mini__tabbar">
        <span className="mini__tab">
          <span className="mini__tab-icon" />
          Ligações
        </span>
        <span className="mini__tab">
          <span className="mini__tab-icon" />
          Conversas
        </span>
        <span className="mini__tab mini__tab--active">
          <span className="mini__tab-icon mini__tab-icon--avatar" />
          Você
        </span>
      </span>
    </>
  );
}

function PasswordScreen() {
  return (
    <>
      <BackHeader title="Duas etapas" />
      <span className="mini__form">
        <span className="mini__form-title">Crie uma senha</span>
        <span className="mini__field">••••••••</span>
        <span className="mini__hint">8 ou mais, com letra e número</span>
        <span className="mini__button">Avançar</span>
      </span>
    </>
  );
}

function accountStep(title: string): { screen: ReactNode; caption: ReactNode } {
  return {
    screen: (
      <ListScreen
        title={title}
        items={['Conta', 'Privacidade', 'Conversas', 'Notificações']}
        active="Conta"
        profile
      />
    ),
    caption: (
      <>
        Toque em <strong>Conta</strong>.
      </>
    ),
  };
}

const LAST_STEPS: { screen: ReactNode; caption: ReactNode }[] = [
  {
    screen: (
      <ListScreen
        title="Conta"
        items={['Verificação em duas etapas', 'Alterar número', 'Solicitar dados', 'Apagar conta']}
        active="Verificação em duas etapas"
        back
      />
    ),
    caption: (
      <>
        Toque em <strong>Verificação em duas etapas</strong> e em <strong>Ativar</strong>. Em
        alguns celulares o nome é <strong>Confirmação em duas etapas</strong>.
      </>
    ),
  },
  {
    screen: <PasswordScreen />,
    caption: (
      <>
        Crie uma <strong>senha</strong> (ou um PIN de 6 números, se o celular pedir) e cadastre um
        e-mail.
      </>
    ),
  },
];

const STEPS: Record<DevicePlatform, { screen: ReactNode; caption: ReactNode }[]> = {
  android: [
    {
      screen: <AndroidMenuScreen />,
      caption: (
        <>
          Toque nos três pontinhos e em <strong>Configurações</strong>.
        </>
      ),
    },
    accountStep('Configurações'),
    ...LAST_STEPS,
  ],
  iphone: [
    {
      screen: <IphoneTabScreen />,
      caption: (
        <>
          Toque em <strong>Você</strong> (a sua foto), embaixo à direita. Em alguns celulares
          aparece <strong>Configurações</strong>.
        </>
      ),
    },
    accountStep('Você'),
    ...LAST_STEPS,
  ],
};

export function Protect() {
  const [platform, setPlatform] = useState<DevicePlatform>('android');
  const tabRefs = useRef<Record<DevicePlatform, HTMLButtonElement | null>>({
    android: null,
    iphone: null,
  });

  // Setas do teclado trocam de aba, como em qualquer lista de abas.
  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const next: DevicePlatform = platform === 'android' ? 'iphone' : 'android';
    setPlatform(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="proteger" tone="dots" className="section--bordered-top" aria-labelledby="proteger-title">
      <div className="card protect">
        <div className="protect__head">
          <span className="protect__icon">
            <LockIcon size={28} color="#FFD447" />
          </span>
          <h2 id="proteger-title" className="section-title">
            Tranque seu WhatsApp
          </h2>
        </div>
        <p className="lead lead--ink">
          Ative a verificação em duas etapas. Mesmo que alguém consiga o código do SMS, não entra
          sem a sua senha.
        </p>

        <div className="tabs" role="tablist" aria-label="Escolha o tipo do seu celular">
          {PLATFORMS.map((item) => (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={platform === item.id}
              aria-controls="painel-passos"
              tabIndex={platform === item.id ? 0 : -1}
              className="tabs__tab"
              onClick={() => setPlatform(item.id)}
              onKeyDown={handleTabKey}
            >
              {item.label}
            </button>
          ))}
        </div>

        <ol id="painel-passos" role="tabpanel" aria-labelledby={`tab-${platform}`} className="pin-steps">
          {STEPS[platform].map((step, index) => (
            <li key={`${platform}-${index}`} className="pin-steps__item">
              <div className="pin-steps__phone" aria-hidden="true">
                <PhoneFrame width={176} height={330} fullScreen>
                  <span className="mini">{step.screen}</span>
                </PhoneFrame>
              </div>
              <p className="pin-steps__caption">
                <strong>{index + 1}.</strong> {step.caption}
              </p>
            </li>
          ))}
        </ol>

        <div className="pin-tips">
          <h3 className="pin-tips__title">Dicas da senha</h3>
          <ul className="pin-tips__list">
            <li>
              <CheckIcon color="#0E6B4B" />
              Use 8 ou mais letras e números.
            </li>
            <li>
              <CheckIcon color="#0E6B4B" />
              Não use data de nascimento nem o seu nome.
            </li>
            <li>
              <CheckIcon color="#0E6B4B" />
              Não conte a senha para ninguém.
            </li>
          </ul>
          <p className="pin-tips__note">Os nomes dos menus podem mudar um pouco no seu celular.</p>
        </div>
      </div>
    </Section>
  );
}
