import { useState } from 'react';
import { Button } from '../components/Button';
import { Section } from '../components/Section';

const FAMILY_ITEMS = [
  {
    title: 'Converse sem dar bronca.',
    description:
      'Ninguém é bobo por cair em golpe. Os golpistas são profissionais.',
  },
  {
    title: 'Ativem juntos o PIN.',
    description: 'Sente do lado e façam o passo a passo deste site.',
  },
  {
    title: 'Combinem uma regra da família.',
    description:
      '"Pediu dinheiro por mensagem? Antes de pagar, uma ligação."',
  },
  {
    title: 'Deixe claro: na dúvida, me liga.',
    description: 'Melhor uma ligação a mais do que um Pix a menos.',
  },
];

export function Family() {
  const [copiedLink, setCopiedLink] = useState(false);

  async function handleShare() {
    const shareUrl = window.location.href;
    const shareData = {
      title: 'Código Seguro',
      text: 'Aprenda a proteger seu WhatsApp contra o golpe do código por SMS.',
      url: shareUrl,
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedLink(true);
        window.setTimeout(() => setCopiedLink(false), 3000);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  return (
    <Section id="familia" tone="mint" aria-labelledby="familia-title">
      <div className="section-header">
        <h2 id="familia-title" className="section-title">
          Proteja quem você ama
        </h2>
        <p className="section-subtitle">
          Os mais velhos são os alvos preferidos. Uma conversa de 5 minutos
          evita o golpe.
        </p>
      </div>

      <ul className="family-grid">
        {FAMILY_ITEMS.map((item) => (
          <li key={item.title} className="family-item">
            <h3 className="family-item__title">{item.title}</h3>
            <p className="family-item__text">{item.description}</p>
          </li>
        ))}
      </ul>

      <div className="family-cta">
        <Button variant="primary" onClick={handleShare} aria-live="polite">
          {copiedLink ? 'Link copiado!' : 'Compartilhar este site'}
        </Button>
      </div>
    </Section>
  );
}
