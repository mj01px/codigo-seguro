import { PhoneFrame } from '../components/PhoneFrame';
import { AlertIcon, PhoneCallIcon } from '../components/Icons';

function Lockscreen() {
  return (
    <div className="lockscreen">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="11" width="14" height="10" rx="2.5" fill="#1C2541" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#1C2541" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <p className="lockscreen__time">15:40</p>
      <div className="lockscreen__notif">
        <span className="lockscreen__app">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1z" />
          </svg>
        </span>
        <div className="lockscreen__body">
          <div className="lockscreen__meta">
            <span>Mensagens</span>
            <span>agora</span>
          </div>
          <strong>WhatsApp</strong>
          <span>
            Seu código do WhatsApp: <mark>482-719</mark>. Não compartilhe este código.
          </span>
        </div>
      </div>
      <div className="lockscreen__actions">
        <span className="lockscreen__action" />
        <span className="lockscreen__action" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <section id="inicio" className="hero" aria-labelledby="hero-title" data-readable>
        <div className="hero__inner">
          <div className="hero__text">
            <span className="hero__badge">
              <AlertIcon size={16} />
              ALERTA DE GOLPE
            </span>
            <h1 id="hero-title" className="hero__title">
              <span className="hero__title-a">Antes de</span>
              <span className="hero__title-b">
                RESPONDER,
                <svg aria-hidden="true" viewBox="0 0 420 22" preserveAspectRatio="none" fill="none">
                  <path d="M4 14 C100 4, 260 4, 416 12" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
                </svg>
              </span>
              <span className="hero__title-c">pare e confirme.</span>
            </h1>
            <p className="hero__lead">
              Golpistas ligam dizendo ser de uma loja e pedem o código que chegou por SMS. Com ele,{' '}
              <b>roubam seu WhatsApp</b> e pedem dinheiro para a sua família.
            </p>
            <div className="hero__actions">
              <a href="#entenda" className="btn btn--yellow">
                Começar o guia
              </a>
              <a href="#agora" className="btn btn--ghost-light">
                Passei o código. E agora?
              </a>
            </div>
          </div>

          <div className="hero-scene" aria-hidden="true">
            <div className="hero-scene__canvas">
              <span className="hero-scene__blob" />
              <div className="hero-scene__phone">
                <PhoneFrame width={240} height={451} rotate={5} fullScreen>
                  <Lockscreen />
                </PhoneFrame>
              </div>
              <div className="hero-scene__bubble">
                Oi! É da loja. Me fala o código que chegou?
                <svg width="42" height="38" viewBox="0 -1.5 26 23.5" fill="none">
                  <path d="M2 -1.5 L2 0 C6 8, 5 15, 1 21 C10 18, 18 10, 22 0 L22 -1.5 Z" fill="#FFD447" />
                  <path d="M2 0 C6 8, 5 15, 1 21 C10 18, 18 10, 22 0" stroke="#1C2541" strokeWidth="1.9" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="hero-scene__caller">
                <span>
                  <PhoneCallIcon size={28} />
                </span>
                Número desconhecido
              </div>
              <span className="hero-scene__stamp">NÃO PASSE!</span>
            </div>
          </div>
        </div>
      </section>

      <div className="tape" aria-hidden="true">
        <div className="tape__track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              O CÓDIGO DO SMS É SÓ SEU <i>✕</i> PEDIU O CÓDIGO? É GOLPE <i>✕</i> ANTES DE RESPONDER, PARE E CONFIRME <i>✕</i>{' '}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
