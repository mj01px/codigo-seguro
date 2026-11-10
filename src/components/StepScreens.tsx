import type { ReactNode } from 'react';
import type { DevicePlatform } from '../types';

/** Telinhas do passo a passo da verificação em duas etapas. Todas decorativas. */

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
          <span key={item} className={`mini__row${item === active ? ' mini__row--active' : ''}`}>
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
        <span className="mini__lock">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E6B4B" strokeWidth="2.4" strokeLinecap="round">
            <rect x="5" y="11" width="14" height="10" rx="2.5" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </span>
        <span className="mini__form-title">Crie uma senha</span>
        <span className="mini__field">••••••••</span>
        <span className="mini__hint">8 ou mais, com letra e número</span>
        <span className="mini__button">Avançar</span>
      </span>
    </>
  );
}

export interface PhoneStep {
  screen: ReactNode;
  caption: ReactNode;
}

function accountStep(title: string): PhoneStep {
  return {
    screen: (
      <ListScreen title={title} items={['Conta', 'Privacidade', 'Conversas', 'Notificações']} active="Conta" profile />
    ),
    caption: (
      <>
        Toque em <b>Conta</b>.
      </>
    ),
  };
}

const LAST_STEPS: PhoneStep[] = [
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
        <b>Verificação em duas etapas</b> e depois <b>Ativar</b>.
      </>
    ),
  },
  {
    screen: <PasswordScreen />,
    caption: (
      <>
        Crie a sua <b>senha</b>. Pronto, conta trancada.
      </>
    ),
  },
];

export const PHONE_STEPS: Record<DevicePlatform, PhoneStep[]> = {
  android: [
    {
      screen: <AndroidMenuScreen />,
      caption: (
        <>
          Toque nos <b>três pontinhos</b> e em <b>Configurações</b>.
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
          Toque em <b>Você</b>, embaixo à direita (ou em <b>Configurações</b>).
        </>
      ),
    },
    accountStep('Você'),
    ...LAST_STEPS,
  ],
};
