import { ChapterLabel } from '../components/ChapterLabel';

const SIGNS = [
  { title: 'Pedem um código', text: 'que chegou por SMS. Já basta.' },
  { title: 'Você não pediu nada.', text: 'O código chegou do nada.' },
  { title: 'Pressa.', text: '“Vence em 2 minutos.”' },
  { title: 'Dizem ser de uma empresa,', text: 'mas o número é desconhecido.' },
  { title: 'O SMS fala de WhatsApp,', text: 'mas a conversa era sobre outra coisa.' },
];

export function Prevent() {
  return (
    <section id="previna" className="part part--previna" aria-labelledby="previna-title" data-readable>
      <div className="container">
        <ChapterLabel number={2} label="Previna:" tone="green" />
        <h2 id="previna-title" className="h2 previna__title">
          A regra que resolve quase tudo
        </h2>
        <p className="rule">O código do SMS é só seu. Pediu, é golpe. Seja quem for.</p>

        <h3 className="h3 signs-title">Os 5 sinais do golpe do código</h3>
        <ol className="signs">
          {SIGNS.map((sign, index) => (
            <li key={sign.title} className="signs__item">
              <span className="num signs__num" aria-hidden="true">
                {index + 1}
              </span>
              <p>
                <b>{sign.title}</b> {sign.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
