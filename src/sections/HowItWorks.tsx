import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';

const STEPS = [
  {
    title: 'Ligam fingindo ser alguém',
    description:
      'Dizem ser de loja, banco, entrega, pesquisa ou até do suporte do WhatsApp. Falam com educação e parecem confiáveis.',
    isDanger: false,
  },
  {
    title: 'Pedem o código do SMS',
    description:
      'O WhatsApp manda um código de 6 números para o seu celular. Se você passar esse código, eles entram na sua conta.',
    isDanger: false,
  },
  {
    title: 'Pedem Pix no seu nome',
    description:
      'Com o seu WhatsApp, mandam mensagem para os seus contatos pedindo dinheiro emprestado, com urgência.',
    isDanger: true,
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" tone="dots" className="section--bordered-top" aria-labelledby="como-funciona-title">
      <SectionHead id="como-funciona-title" eyebrow="Fique de olho:" title="Como o golpe acontece" underline>
        Do telefonema ao Pix, em poucos minutos.
      </SectionHead>

      <ol className="steps">
        {STEPS.map((step, index) => (
          <li key={step.title} className={`card step ${step.isDanger ? 'step--danger' : ''}`}>
            <span className="step__number" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="step__title">
              <span className="sr-only">Passo {index + 1}: </span>
              {step.title}
            </h3>
            <p className="step__text">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="golden-rule" role="note">
        <span className="golden-rule__label">Regra de ouro:</span>
        <p className="golden-rule__text">
          Nenhuma empresa precisa do código do seu WhatsApp. Quem pede é golpista.
        </p>
      </div>
    </Section>
  );
}
