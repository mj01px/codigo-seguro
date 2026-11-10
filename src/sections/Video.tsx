import { useState } from 'react';
import { ChapterLabel } from '../components/ChapterLabel';
import { PlayIcon } from '../components/Icons';

/**
 * Dados do vídeo. Para publicar:
 * 1. cole o id do YouTube (o trecho depois de "v=" ou de "youtu.be/");
 * 2. acerte o início de cada capítulo, em segundos.
 * Sem id, a capa aparece com "Em breve" e os capítulos ficam desligados.
 */
const VIDEO = {
  youtubeId: '',
  poster: 'video/capa.png',
  chapters: [
    { start: 0, title: 'A ligação do golpe', text: 'O Pablo recebe a ligação da “loja”.' },
    { start: 56, title: 'Por que nunca passar o código', text: 'O que o golpista faz com ele.' },
    { start: 209, title: 'Ativando a verificação em duas etapas', text: 'Passo a passo, na tela do celular.' },
    { start: 302, title: 'Passe para a família', text: 'Quem mais precisa saber disso.' },
  ],
} as const;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
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
    <section id="video" className="part part--video" aria-labelledby="video-title" data-readable>
      <div className="container">
        <ChapterLabel number={4} label="Prefere assistir?" tone="yellow" />
        <div className="video-head">
          <div className="narrow">
            <h2 id="video-title" className="h2">
              O golpe em <span className="highlight">6 minutos</span>
            </h2>
            <p className="lead">
              O Pablo quase caiu no golpe. Veja como ele percebeu a tempo e como trancar o WhatsApp, passo a passo, na
              tela do celular.
            </p>
          </div>
          <p className="cc-badge">
            <span aria-hidden="true">CC</span>
            Com legendas em português
          </p>
        </div>

        <div className="video">
          <div className="video__frame">
            {startAt !== null ? (
              <iframe
                key={startAt}
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
                <img src={`${import.meta.env.BASE_URL}${VIDEO.poster}`} alt="" />
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

          <div>
            <p className="video__side-title">O que você vai ver</p>
            <ol className="chapters">
              {VIDEO.chapters.map((chapter, index) => (
                <li key={chapter.start}>
                  <button
                    type="button"
                    className={`chapter${startAt !== null && index === activeChapter ? ' is-active' : ''}`}
                    onClick={() => play(index)}
                    disabled={!isReady}
                  >
                    <span className="chapter__time">{formatTime(chapter.start)}</span>
                    <span className="chapter__text">
                      <span className="chapter__title">{chapter.title}</span>
                      <span className="chapter__desc">{chapter.text}</span>
                    </span>
                    <PlayIcon size={18} />
                  </button>
                </li>
              ))}
            </ol>
            <p className="video__hint">
              {isReady ? 'toque num capítulo para pular direto' : 'o vídeo volta em breve'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
