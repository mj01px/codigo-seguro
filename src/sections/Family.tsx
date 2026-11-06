import { Button } from '../components/Button';
import { CheckIcon } from '../components/Icons';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { useCopy } from '../hooks/useCopy';

const FAMILY_ITEMS = [
  { title: 'Converse sem dar bronca.', text: 'Ninguém é bobo por cair em golpe.' },
  { title: 'Ativem juntos a senha do WhatsApp.', text: 'Sente do lado e façam o passo a passo.' },
  { title: 'Deixe claro: na dúvida, me liga.', text: 'Melhor uma ligação a mais do que um Pix a menos.' },
];

export function Family() {
  const { copied, copy } = useCopy();

  async function handleShare() {
    const url = window.location.href.split('#')[0];

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Código Seguro',
          text: 'Aprenda a proteger seu WhatsApp contra o golpe do código por SMS.',
          url,
        });
        return;
      } catch (err) {
        // Cancelar o compartilhamento não é erro. Outras falhas caem na cópia do link.
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }

    await copy(url);
  }

  return (
    <Section id="familia" tone="navy" aria-labelledby="familia-title">
      <div className="family">
        <div className="family__text">
          <SectionHead id="familia-title" eyebrow="Para a família:" eyebrowTone="mint" title="Proteja quem você ama">
            Os mais velhos são os alvos preferidos. Uma conversa de 5 minutos evita o golpe.
          </SectionHead>
          <ul className="family__list">
            {FAMILY_ITEMS.map((item) => (
              <li key={item.title}>
                <CheckIcon />
                <span>
                  <strong>{item.title}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="family-rule">
          <figcaption className="family-rule__label">A regra da família:</figcaption>
          <blockquote>
            <p className="family-rule__quote">Pediu dinheiro por mensagem? Antes de pagar, uma ligação.</p>
          </blockquote>
          <Button variant="navy" onClick={() => void handleShare()}>
            {copied ? 'Link copiado!' : 'Compartilhar este site'}
          </Button>
          <span className="sr-only" role="status">
            {copied ? 'Link copiado.' : ''}
          </span>
        </figure>
      </div>
    </Section>
  );
}
