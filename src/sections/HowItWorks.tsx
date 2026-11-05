import { Section } from '../components/Section';

const STEPS = [
  {
    number: '1',
    isDanger: false,
    title: 'Ligam fingindo ser alguém',
    description:
      'Dizem ser de loja, banco, entrega, pesquisa ou até do suporte do WhatsApp. Falam com educação e parecem confiáveis.',
  },
  {
    number: '2',
    isDanger: false,
    title: 'Pedem o código do SMS',
    description:
      'Eles tentam entrar no WhatsApp usando o seu número. O WhatsApp manda um código de 6 números para o seu celular. Se você passar esse código, eles entram.',
  },
  {
    number: '3',
    isDanger: true,
    title: 'Pedem Pix no seu nome',
    description:
      'Com o seu WhatsApp, mandam mensagem para os seus contatos pedindo dinheiro emprestado, com urgência.',
  },
];

const WARNING_SIGNS = [
  {
    title: 'Pedem um código que chegou por SMS.',
    description: 'Nenhum atendente de verdade pede isso.',
  },
  {
    title: 'Têm pressa.',
    description:
      '"O código vence em 2 minutos", "é só hoje". A pressa é para você não pensar.',
  },
  {
    title: 'Prometem prêmio ou vantagem.',
    description: 'Sorteio que você não fez, brinde, desconto grande demais.',
  },
  {
    title: 'Ligam de número desconhecido.',
    description: 'Dizem ser de uma empresa, mas o número não é o oficial dela.',
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" tone="dots" aria-labelledby="como-funciona-title">
      <div className="section-header">
        <h2 id="como-funciona-title" className="section-title">
          Como o golpe acontece
        </h2>
        <p className="section-subtitle">
          Do telefonema ao Pix, em poucos minutos.
        </p>
      </div>

      <ol className="steps-grid">
        {STEPS.map((step) => (
          <li key={step.number} className="step-item">
            <span
              className={`step-item__number ${
                step.isDanger ? 'step-item__number--danger' : ''
              }`}
              aria-hidden="true"
            >
              {step.number}
            </span>
            <div className="step-item__body">
              <h3 className="step-item__title">{step.title}</h3>
              <p className="step-item__text">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="golden-rule-banner" role="note">
        <p className="golden-rule-banner__text">
          <strong>Regra de ouro:</strong> nenhuma empresa precisa do{' '}
          <mark className="mark-yellow">código</mark> do seu WhatsApp. Quem pede
          é golpista.
        </p>
      </div>

      <div className="warnings-block">
        <h3 className="warnings-block__title">Desconfie quando...</h3>
        <ul className="warnings-grid">
          {WARNING_SIGNS.map((sign) => (
            <li key={sign.title} className="warning-item">
              <span className="warning-item__icon" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L2 20h20L12 3z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    fill="#FFD447"
                  />
                  <path
                    d="M12 10v4"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="17" r="1.3" fill="currentColor" />
                </svg>
              </span>
              <div className="warning-item__content">
                <strong className="warning-item__title">{sign.title}</strong>{' '}
                <span className="warning-item__text">{sign.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
