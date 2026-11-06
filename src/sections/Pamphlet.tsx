import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';

export function Pamphlet() {
  const base = import.meta.env.BASE_URL;
  const pages = [
    { src: `${base}panfleto/frente.png`, label: 'Frente' },
    { src: `${base}panfleto/verso.png`, label: 'Verso' },
  ];

  return (
    <Section id="panfleto" tone="dots" aria-labelledby="panfleto-title">
      <div className="pamphlet">
        <div>
          <SectionHead id="panfleto-title" eyebrow="O panfleto:" title="Recebeu o nosso panfleto?" underline>
            Este site é a versão completa dele. Aqui está a frente e o verso, para você ver de novo
            quando precisar. Toque em uma das imagens para ver maior.
          </SectionHead>
        </div>

        <div className="pamphlet__fan">
          {pages.map((page) => (
            <a
              key={page.label}
              href={page.src}
              target="_blank"
              rel="noopener"
              className="pamphlet__page"
              aria-label={`Ver o ${page.label.toLowerCase()} do panfleto em tamanho maior (abre em outra aba)`}
            >
              <img src={page.src} alt={`${page.label} do panfleto Código Seguro`} loading="lazy" width="1122" height="2382" />
              <span className="pamphlet__label">{page.label}</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
