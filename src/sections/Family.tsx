import { useState } from 'react';
import { DownloadIcon, FlipIcon } from '../components/Icons';
import { useShare } from '../hooks/useShare';

const MESSAGE =
  'Gente, nunca passem o código que chega por SMS para ninguém. Quem pede é golpista. Vejam o guia: codigoseguro.pages.dev';

const BASE = import.meta.env.BASE_URL;

export function Family() {
  const { copied, share } = useShare();
  const [showBack, setShowBack] = useState(false);

  function handleShare() {
    void share({ title: 'Código Seguro', text: MESSAGE });
  }

  return (
    <section id="familia" className="part part--familia" aria-labelledby="familia-title" data-readable>
      <div className="container">
        <div className="narrow">
          <p className="kicker">para a família:</p>
          <h2 id="familia-title" className="h2">
            Passe adiante para quem você ama
          </h2>
          <p className="lead">
            Os mais velhos são os alvos preferidos. Escolha o jeito mais fácil de avisar: pelo celular ou no papel.
          </p>
        </div>

        <div className="family">
          <div className="family-card family-card--message">
            <div className="family-card__head">
              <span className="family-card__num" aria-hidden="true">
                1
              </span>
              <h3>Pelo celular: mande a mensagem</h3>
            </div>
            <p className="family-card__bubble">“{MESSAGE}”</p>
            <div className="family-card__actions">
              <button type="button" className="btn btn--small btn--navy" onClick={handleShare}>
                {copied ? 'Mensagem copiada!' : 'Compartilhar'}
              </button>
            </div>
            <span className="sr-only" role="status">
              {copied ? 'Mensagem copiada.' : ''}
            </span>
          </div>

          <div className="family-card family-card--paper">
            <button
              type="button"
              className={`pamphlet${showBack ? ' is-flipped' : ''}`}
              onClick={() => setShowBack((prev) => !prev)}
              aria-label={showBack ? 'Ver a frente do panfleto' : 'Ver o verso do panfleto'}
            >
              <img
                className="pamphlet__page pamphlet__page--back"
                src={`${BASE}panfleto/verso.png`}
                alt={showBack ? 'Verso do panfleto Código Seguro' : ''}
              />
              <img
                className="pamphlet__page pamphlet__page--front"
                src={`${BASE}panfleto/frente.png`}
                alt={showBack ? '' : 'Frente do panfleto Código Seguro'}
              />
            </button>
            <div>
              <div className="family-card__head">
                <span className="family-card__num family-card__num--green" aria-hidden="true">
                  2
                </span>
                <h3>No papel: imprima o panfleto</h3>
              </div>
              <p className="family-card__text">
                É o mesmo panfleto que a gente entregou. Imprima e deixe com seus pais, na portaria, na igreja ou no
                posto de saúde.
              </p>
              <p className="family-card__hint">
                toque nele para virar <FlipIcon size={16} />
              </p>
              <a href={`${BASE}panfleto/panfleto.pdf`} download className="btn btn--small btn--solid">
                <DownloadIcon />
                Baixar para imprimir (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
