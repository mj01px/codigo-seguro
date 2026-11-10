import { ChapterLabel } from '../components/ChapterLabel';

const CODE = ['4', '8', '2', '7', '1', '9'];

const WHAT_HE_DOES = [
  { letter: 'a', tone: 'mint', text: <>Lê suas conversas e vê seus contatos.</> },
  {
    letter: 'b',
    tone: 'yellow',
    text: (
      <>
        <b>Pede dinheiro para a sua família em seu nome.</b> É o objetivo dele.
      </>
    ),
  },
  { letter: 'c', tone: 'pink', text: <>Cria uma senha para você não conseguir voltar.</> },
] as const;

const NOTES = [
  { title: 'Parece nada', text: '“É só um número.” O pedido parece pequeno e inofensivo.', tone: 'yellow' },
  { title: 'Tem pressa', text: '“O código vence em 2 minutos.” A pressa é para você não pensar.', tone: 'mint' },
  { title: 'Sabem de você', text: 'Seu nome, onde você comprou, o anúncio que você publicou.', tone: 'white' },
] as const;

export function Understand() {
  return (
    <section id="entenda" className="part part--entenda" aria-labelledby="entenda-title" data-readable>
      <div className="container">
        <ChapterLabel number={1} label="Entenda:" tone="navy" />

        <div className="understand">
          <div>
            <h2 id="entenda-title" className="h2">
              Esse código é a <span className="highlight">chave da sua conta.</span>
            </h2>
            <p className="lead">
              Quando alguém coloca um WhatsApp num celular novo, o WhatsApp manda um código de 6 números por SMS para o
              dono do número. É como ele pergunta: <b>“é você mesmo?”</b>
            </p>
            <p className="lead">
              Quem digita o código fica com a conta. Se você passa para o golpista,{' '}
              <b>ele coloca o seu WhatsApp no celular dele</b>.
            </p>
          </div>

          <div className="key" aria-hidden="true">
            <div className="key__canvas">
              <p className="key__note">quem tem a chave, entra ↓</p>
              <svg className="key__svg" width="600" height="190" viewBox="0 0 600 190" fill="none">
                <circle cx="78" cy="88" r="66" fill="#FFD447" stroke="#1C2541" strokeWidth="8" />
                <circle cx="78" cy="88" r="22" fill="#FBF8F1" stroke="#1C2541" strokeWidth="8" />
                <rect x="450" y="98" width="34" height="46" rx="5" fill="#FFD447" stroke="#1C2541" strokeWidth="8" />
                <rect x="520" y="98" width="34" height="64" rx="5" fill="#FFD447" stroke="#1C2541" strokeWidth="8" />
                <rect x="136" y="68" width="450" height="40" rx="10" fill="#FFD447" stroke="#1C2541" strokeWidth="8" />
              </svg>
              <div className="key__code">
                {CODE.map((digit, index) => (
                  <span key={index}>{digit}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="takeover">
          <p className="takeover__title">
            Com a sua conta, <span>o golpista:</span>
          </p>
          {WHAT_HE_DOES.map((item) => (
            <div key={item.letter} className="takeover__item">
              <span className={`takeover__letter takeover__letter--${item.tone}`} aria-hidden="true">
                {item.letter}
              </span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <h3 className="h3 h3--center notes-title">
          Por que <span className="marker-green">qualquer pessoa</span> pode cair
        </h3>
        <div className="notes">
          {NOTES.map((note) => (
            <div key={note.title} className={`note note--${note.tone}`}>
              <p className="note__title">{note.title}</p>
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
