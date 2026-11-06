import { AlertIcon } from '../components/Icons';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';

const WARNING_SIGNS = [
  { title: 'Pedem um código que chegou por SMS', text: 'Nenhum atendente de verdade pede isso.' },
  { title: 'Têm pressa', text: '"O código vence em 2 minutos." A pressa é para você não pensar.' },
  { title: 'Prometem prêmio', text: 'Sorteio que você não fez, brinde, desconto grande demais.' },
  { title: 'Ligam de número desconhecido', text: 'Dizem ser de uma empresa, mas o número não é o oficial dela.' },
];

export function Warnings() {
  return (
    <Section id="sinais" aria-labelledby="sinais-title">
      <div className="warnings">
        <SectionHead id="sinais-title" eyebrow="Sinais de alerta:" eyebrowTone="wine" title="Desconfie quando...">
          Se aparecer um destes sinais, desligue. Depois ligue você para o número oficial da empresa.
        </SectionHead>

        <ul className="warnings__grid">
          {WARNING_SIGNS.map((sign) => (
            <li key={sign.title} className="warning">
              <AlertIcon size={28} color="#1C2541" fill="#FFD447" />
              <h3 className="warning__title">{sign.title}</h3>
              <p className="warning__text">{sign.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
