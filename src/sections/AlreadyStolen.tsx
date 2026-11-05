import { useState } from 'react';
import { Button } from '../components/Button';
import { Section } from '../components/Section';

const EMAIL_SUBJECT = 'Perdido/Roubado: desative minha conta';

export function AlreadyStolen() {
  const [copied, setCopied] = useState(false);

  async function handleCopySubject() {
    try {
      await navigator.clipboard.writeText(EMAIL_SUBJECT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback caso clipboard não esteja disponível
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL_SUBJECT;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        window.setTimeout(() => setCopied(false), 3000);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  return (
    <Section id="ja-roubaram" tone="dots" aria-labelledby="ja-roubaram-title">
      <div className="section-header">
        <h2 id="ja-roubaram-title" className="section-title">
          Roubaram seu WhatsApp? Faça isto agora
        </h2>
        <p className="section-subtitle">
          Quanto mais rápido, menos gente cai no golpe.
        </p>
      </div>

      <ol className="recovery-list">
        <li className="recovery-item">
          <span className="recovery-item__num" aria-hidden="true">
            1
          </span>
          <div className="recovery-item__body">
            <h3 className="recovery-item__title">
              Avise a família e os amigos.
            </h3>
            <p className="recovery-item__text">
              Ligue ou use outro aplicativo: &quot;Roubaram meu WhatsApp. Não
              façam nenhum Pix.&quot;
            </p>
          </div>
        </li>

        <li className="recovery-item">
          <span className="recovery-item__num" aria-hidden="true">
            2
          </span>
          <div className="recovery-item__body">
            <h3 className="recovery-item__title">Entre de novo no WhatsApp.</h3>
            <p className="recovery-item__text">
              Abra o aplicativo, coloque o seu número e digite o código que
              chegar por SMS.
            </p>
          </div>
        </li>

        <li className="recovery-item">
          <span className="recovery-item__num" aria-hidden="true">
            3
          </span>
          <div className="recovery-item__body">
            <h3 className="recovery-item__title">
              Pediu um PIN que você não criou?
            </h3>
            <p className="recovery-item__text">
              Então o golpista ativou a confirmação em duas etapas. Sem esse
              PIN, o WhatsApp só libera a sua conta depois de 7 dias. Faça o
              passo 4 enquanto espera.
            </p>
          </div>
        </li>

        <li className="recovery-item recovery-item--highlight">
          <span className="recovery-item__num" aria-hidden="true">
            4
          </span>
          <div className="recovery-item__body">
            <h3 className="recovery-item__title">
              Peça ao WhatsApp para desativar a conta.
            </h3>
            <p className="recovery-item__text">
              Mande um e-mail para{' '}
              <a
                href="mailto:support@whatsapp.com?subject=Perdido%2FRoubado%3A%20desative%20minha%20conta"
                className="inline-link"
              >
                support@whatsapp.com
              </a>{' '}
              com o assunto &quot;Perdido/Roubado: desative minha conta&quot; e
              o seu número com +55 e DDD.
            </p>
            <div className="recovery-item__actions">
              <Button
                variant="primary"
                onClick={handleCopySubject}
                aria-live="polite"
              >
                {copied ? 'Copiado!' : 'Copiar assunto do e-mail'}
              </Button>
            </div>
          </div>
        </li>

        <li className="recovery-item">
          <span className="recovery-item__num" aria-hidden="true">
            5
          </span>
          <div className="recovery-item__body">
            <h3 className="recovery-item__title">Alguém fez Pix?</h3>
            <p className="recovery-item__text">
              Ligue para o banco de quem pagou, pelo número do cartão ou do
              aplicativo. Peça para registrar o golpe e acionar o{' '}
              <mark className="mark-yellow">MED</mark> (Mecanismo Especial de
              Devolução). Quanto antes, maior a chance de recuperar.
            </p>
          </div>
        </li>

        <li className="recovery-item">
          <span className="recovery-item__num" aria-hidden="true">
            6
          </span>
          <div className="recovery-item__body">
            <h3 className="recovery-item__title">
              Registre um boletim de ocorrência.
            </h3>
            <p className="recovery-item__text">
              Em muitos estados dá para fazer pela internet, na Delegacia
              Eletrônica.
            </p>
          </div>
        </li>
      </ol>
    </Section>
  );
}
