import { Button } from '../components/Button';
import { AlertIcon } from '../components/Icons';
import { Section } from '../components/Section';
import { useCopy } from '../hooks/useCopy';

const EMAIL_SUBJECT = 'Perdido/Roubado: desative minha conta';

export function AlreadyStolen() {
  const { copied, copy } = useCopy();

  return (
    <Section id="ja-roubaram" aria-labelledby="ja-roubaram-title">
      <div className="card stolen">
        <div className="stolen__head">
          <AlertIcon size={32} />
          <h2 id="ja-roubaram-title" className="stolen__title">
            Já roubaram seu WhatsApp? Faça isto agora.
          </h2>
        </div>

        <ol className="stolen__list">
          <li className="stolen__item">
            <span className="stolen__num" aria-hidden="true">1</span>
            <div>
              <h3>Avise a família e os amigos</h3>
              <p>Ligue ou use outro aplicativo: &quot;Roubaram meu WhatsApp. Não façam nenhum Pix.&quot;</p>
            </div>
          </li>
          <li className="stolen__item">
            <span className="stolen__num" aria-hidden="true">2</span>
            <div>
              <h3>Entre de novo no WhatsApp</h3>
              <p>Abra o aplicativo, coloque o seu número e digite o código que chegar por SMS.</p>
            </div>
          </li>
          <li className="stolen__item">
            <span className="stolen__num" aria-hidden="true">3</span>
            <div>
              <h3>Pediu uma senha ou PIN que você não criou?</h3>
              <p>
                O golpista ativou a verificação em duas etapas. Sem essa senha, o WhatsApp só libera a
                conta depois de 7 dias. Faça o passo 4 enquanto espera.
              </p>
            </div>
          </li>
          <li className="stolen__item stolen__item--key">
            <span className="stolen__num" aria-hidden="true">4</span>
            <div>
              <h3>Peça ao WhatsApp para desativar a conta</h3>
              <p>
                E-mail para{' '}
                <a
                  href="mailto:support@whatsapp.com?subject=Perdido%2FRoubado%3A%20desative%20minha%20conta"
                  className="inline-link"
                >
                  support@whatsapp.com
                </a>{' '}
                com o assunto &quot;{EMAIL_SUBJECT}&quot; e o seu número com +55 e DDD.
              </p>
              <Button variant="navy" className="btn--small" onClick={() => void copy(EMAIL_SUBJECT)}>
                {copied ? 'Copiado!' : 'Copiar o assunto'}
              </Button>
              <span className="sr-only" role="status">
                {copied ? 'Assunto copiado.' : ''}
              </span>
            </div>
          </li>
          <li className="stolen__item">
            <span className="stolen__num" aria-hidden="true">5</span>
            <div>
              <h3>Alguém fez Pix?</h3>
              <p>
                Ligue já para o banco de quem pagou e peça o MED (Mecanismo Especial de Devolução).
                Quanto antes, melhor.
              </p>
            </div>
          </li>
          <li className="stolen__item">
            <span className="stolen__num" aria-hidden="true">6</span>
            <div>
              <h3>Registre um boletim de ocorrência</h3>
              <p>Em muitos estados dá para fazer pela internet, na Delegacia Eletrônica.</p>
            </div>
          </li>
        </ol>
      </div>
    </Section>
  );
}
