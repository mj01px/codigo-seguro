import { Button } from '../components/Button';
import { AlertIcon, SmsIcon } from '../components/Icons';
import { PhoneFrame } from '../components/PhoneFrame';
import { Section } from '../components/Section';

const HIGHLIGHTS = [
  { number: '6', tone: 'green', strong: 'números', text: 'no código do SMS. É ele que o golpista quer.' },
  { number: '0', tone: 'wine', strong: 'empresas', text: 'precisam desse código. Quem pede é golpista.' },
  { number: '2', tone: 'navy', strong: 'minutos', text: 'para trancar o seu WhatsApp com uma senha.' },
] as const;

export function Hero() {
  return (
    <>
      <Section id="inicio" tone="green" className="hero" aria-labelledby="hero-title">
        <div className="hero__grid">
          <div className="hero__content">
            <span className="alert-badge">
              <AlertIcon size={18} />
              ALERTA DE GOLPE
            </span>

            <h1 id="hero-title" className="hero__title">
              Nunca passe o <span className="hero__code">código</span>
              <br />
              do seu WhatsApp.
            </h1>

            <p className="hero__lead">
              Golpistas ligam dizendo ser de uma loja ou de um banco e pedem o código que chegou por SMS. Com
              ele, roubam o seu WhatsApp e pedem dinheiro para a sua família.
            </p>

            <div className="hero__actions">
              <Button variant="primary" href="#simulador">
                Você cairia? Faça o teste
              </Button>
              <Button variant="secondary" href="#proteger">
                Proteger meu WhatsApp
              </Button>
              <a className="hero__video-link" href="#video">
                <span className="hero__video-play" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4.5v15l13-7.5z" />
                  </svg>
                </span>
                Prefere assistir? Veja o vídeo
              </a>
            </div>
          </div>

          <div
            className="hero-art-wrap"
            role="img"
            aria-label="Ilustração: um número desconhecido liga dizendo ser da loja e pede o código. No celular chega o SMS com o código 482-719. Um carimbo diz: não passe!"
          >
            <div className="hero-art" aria-hidden="true">
              <span className="hero-art__blob" />

              <PhoneFrame width={208} height={391} rotate={5} fullScreen className="hero-art__phone">
                <span className="lockscreen">
                  <span className="lockscreen__padlock">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="11" width="14" height="10" rx="2.5" fill="currentColor" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                    </svg>
                  </span>

                  <span className="lockscreen__time">15:40</span>

                  <span className="lockscreen__notif">
                    <span className="lockscreen__app">
                      <SmsIcon size={13} />
                    </span>
                    <span className="lockscreen__body">
                      <span className="lockscreen__meta">
                        <span>Mensagens</span>
                        <span>agora</span>
                      </span>
                      <strong>WhatsApp</strong>
                      <span>
                        Seu código do WhatsApp: <mark>482-719</mark>. Não compartilhe este código.
                      </span>
                    </span>
                  </span>

                  <span className="lockscreen__actions">
                    <span className="lockscreen__action">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 2h6l-1 6h3l-7 14 1-9H8z" />
                      </svg>
                    </span>
                    <span className="lockscreen__action">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                        <circle cx="12" cy="13" r="3.5" />
                      </svg>
                    </span>
                  </span>
                </span>
              </PhoneFrame>

              <span className="hero-art__bubble">
                Oi! É da loja. Me fala o código que chegou?
                {/* Rabinho curvo descendo até o número desconhecido, igual ao panfleto */}
                <svg className="hero-art__tail" width="42" height="38" viewBox="0 -1.5 26 23.5" fill="none">
                  <path d="M2 -1.5 L2 0 C6 8, 5 15, 1 21 C10 18, 18 10, 22 0 L22 -1.5 Z" fill="#FFD447" />
                  <path d="M2 0 C6 8, 5 15, 1 21 C10 18, 18 10, 22 0" stroke="#1C2541" strokeWidth="1.9" strokeLinejoin="round" />
                </svg>
              </span>

              <span className="hero-art__caller">
                <span className="hero-art__caller-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </span>
                Número desconhecido
              </span>

              <span className="hero-art__stamp">NÃO PASSE!</span>
            </div>
          </div>
        </div>
      </Section>

      <div className="container highlights-wrap">
        <ul className="highlights" aria-label="O golpe em números">
          {HIGHLIGHTS.map((item) => (
            <li key={item.number} className="highlights__item">
              <span className={`highlights__number highlights__number--${item.tone}`} aria-hidden="true">
                {item.number}
              </span>
              <p>
                <span className="sr-only">{item.number} </span>
                <strong>{item.strong}</strong> {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
