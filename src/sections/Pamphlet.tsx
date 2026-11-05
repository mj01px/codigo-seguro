import { Button } from '../components/Button';
import { Section } from '../components/Section';

export function Pamphlet() {
  const frenteSrc = `${import.meta.env.BASE_URL}panfleto/frente.png`;
  const versoSrc = `${import.meta.env.BASE_URL}panfleto/verso.png`;
  const pdfHref = `${import.meta.env.BASE_URL}panfleto/codigo-seguro-panfleto.pdf`;

  return (
    <Section id="panfleto" tone="dots" aria-labelledby="panfleto-title">
      <div className="section-header">
        <h2 id="panfleto-title" className="section-title">
          Leve o panfleto
        </h2>
        <p className="section-subtitle">
          Imprima, cole na geladeira ou mande para o grupo da família.
        </p>
      </div>

      <div className="pamphlet-grid">
        <figure className="pamphlet-figure">
          <div className="pamphlet-figure__frame">
            <img
              src={frenteSrc}
              alt="Frente do panfleto Código Seguro"
              className="pamphlet-figure__img"
              loading="lazy"
            />
          </div>
          <figcaption className="pamphlet-figure__caption">Frente</figcaption>
        </figure>

        <figure className="pamphlet-figure">
          <div className="pamphlet-figure__frame">
            <img
              src={versoSrc}
              alt="Verso do panfleto Código Seguro"
              className="pamphlet-figure__img"
              loading="lazy"
            />
          </div>
          <figcaption className="pamphlet-figure__caption">Verso</figcaption>
        </figure>
      </div>

      <div className="pamphlet-actions">
        <Button variant="primary" href={pdfHref} download>
          Baixar o panfleto em PDF
        </Button>
      </div>
    </Section>
  );
}
