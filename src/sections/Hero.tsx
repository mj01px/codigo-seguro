import { Button } from '../components/Button';
import { Section } from '../components/Section';

export function Hero() {
  return (
    <Section id="inicio" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__content">
          <p className="hero__university">Universidade de Mogi das Cruzes</p>

          <span className="hero__badge">ALERTA DE GOLPE</span>

          <h1 id="hero-title" className="hero__title">
            Nunca passe o{' '}
            <span className="hero__title-code">
              CÓDIGO
              <svg
                className="hero__title-underline"
                viewBox="0 0 220 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 9.5C58 3.2 142 2.8 217 8.5"
                  stroke="#FFD447"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M12 11.5C75 7.5 150 6.5 210 10.5"
                  stroke="#1C2541"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            do seu WhatsApp!
          </h1>

          <p className="hero__description">
            Golpistas ligam fingindo ser loja ou banco e pedem o{' '}
            <mark className="mark-yellow">código</mark> que chegou por SMS. Com
            ele, roubam seu WhatsApp e pedem dinheiro para a sua família.
          </p>

          <div className="hero__actions">
            <Button variant="primary" href="#simulador">
              Teste: você cairia nesse golpe?
            </Button>
            <Button variant="secondary" href="#proteger">
              Proteger meu WhatsApp agora
            </Button>
          </div>
        </div>

        <div
          className="hero-illustration"
          role="region"
          aria-label="Ilustração mostrando como o golpe acontece no celular"
        >
          <div className="caller-row">
            <div className="caller-badge">
              <div className="caller-badge__icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="caller-badge__label">Número desconhecido</span>
            </div>

            <div className="speech-bubble">
              “Oi! É da loja. Me fala o código que chegou?”
            </div>
          </div>

          <div className="phone-mockup">
            <div className="phone-mockup__speaker" aria-hidden="true" />
            <div className="phone-mockup__screen">
              <div className="sms-card">
                <div className="sms-card__header">
                  <span>Mensagem SMS</span>
                  <span>Agora</span>
                </div>
                <p className="sms-card__body">
                  Seu código do WhatsApp:{' '}
                  <span className="sms-card__code">482-719</span>. Não
                  compartilhe este código.
                </p>
              </div>
            </div>
          </div>

          <div className="stamp-alert" aria-label="Carimbo de alerta: NÃO PASSE!">
            NÃO PASSE!
          </div>
        </div>
      </div>
    </Section>
  );
}
