import { useState } from 'react';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';

/**
 * Dados do vídeo. Para publicar:
 * 1. cole o id do YouTube (o trecho depois de "v=" ou de "youtu.be/");
 * 2. acerte o início de cada capítulo, em segundos;
 * 3. opcional: salve um frame da chamada em public/video/capa.jpg e preencha `poster` com "video/capa.jpg".
 */
const VIDEO = {
  youtubeId: '',
  poster: '',
  chapters: [
    { start: 0, title: 'A ligação do golpe' },
    { start: 56, title: 'Por que nunca passar o código' },
    { start: 209, title: 'Ativando a verificação em duas etapas' },
    { start: 302, title: 'Passe para a família' },
  ],
} as const;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function PlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}

export function Video() {
  // null = capa; número = o player carregado a partir desse segundo
  const [startAt, setStartAt] = useState<number | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const isReady = VIDEO.youtubeId.length > 0;

  function play(chapterIndex: number) {
    if (!isReady) return;
    setActiveChapter(chapterIndex);
    setStartAt(VIDEO.chapters[chapterIndex].start);
  }

  // youtube-nocookie e carga só no clique: até o play, nada do YouTube entra na página
  const embedSrc =
    startAt === null
      ? ''
      : `https://www.youtube-nocookie.com/embed/${VIDEO.youtubeId}?autoplay=1&rel=0&cc_load_policy=1&cc_lang_pref=pt&hl=pt-BR&start=${startAt}`;

  return (
    <Section id="video" tone="plain" className="section--after-highlights" aria-labelledby="video-title">
      <SectionHead id="video-title" eyebrow="Prefere assistir?" title="O golpe em 6 minutos" underline>
        O Pablo quase caiu no golpe. Veja como ele percebeu a tempo e como trancar o WhatsApp, passo a passo, na
        tela do celular.
      </SectionHead>

      <div className="video">
        <div className="video__main">
          <div className="video__frame">
            {startAt !== null ? (
              <iframe
                key={startAt}
                className="video__iframe"
                src={embedSrc}
                title="Vídeo: o golpe do código do WhatsApp em 6 minutos"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button
                type="button"
                className="video__cover"
                onClick={() => play(0)}
                disabled={!isReady}
                aria-label={isReady ? 'Assistir ao vídeo' : 'Vídeo em breve'}
              >
                {VIDEO.poster ? (
                  <img className="video__poster" src={`${import.meta.env.BASE_URL}${VIDEO.poster}`} alt="" />
                ) : (
                  <span className="video__call" aria-hidden="true">
                    <span className="video__tile video__tile--yellow">
                      <span className="video__avatar">M</span>
                      <span className="video__name">Mauro</span>
                    </span>
                    <span className="video__tile video__tile--mint">
                      <span className="video__avatar video__avatar--green">P</span>
                      <span className="video__name">Pablo</span>
                    </span>
                  </span>
                )}
                <span className="video__quote" aria-hidden="true">
                  “Mauro, aconteceu uma situação aqui. Me ajuda?”
                </span>
                {isReady ? (
                  <span className="video__play" aria-hidden="true">
                    <PlayIcon size={40} />
                  </span>
                ) : (
                  <span className="video__soon" aria-hidden="true">
                    Em breve
                  </span>
                )}
              </button>
            )}
          </div>
          <p className="video__cc">
            <span className="video__cc-tag" aria-hidden="true">
              CC
            </span>
            Com legendas em português
          </p>
        </div>

        <div className="video__side">
          <h3 className="video__side-title">O que você vai ver</h3>
          <ol className="video__chapters">
            {VIDEO.chapters.map((chapter, index) => (
              <li key={chapter.start}>
                <button
                  type="button"
                  className={`video__chapter${startAt !== null && index === activeChapter ? ' is-active' : ''}`}
                  onClick={() => play(index)}
                  disabled={!isReady}
                  aria-label={`${chapter.title}, a partir de ${formatTime(chapter.start)}`}
                >
                  <span className="video__time" aria-hidden="true">
                    {formatTime(chapter.start)}
                  </span>
                  <span className="video__chapter-title" aria-hidden="true">
                    {chapter.title}
                  </span>
                  <PlayIcon size={16} />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
