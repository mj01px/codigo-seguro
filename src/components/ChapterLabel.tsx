interface ChapterLabelProps {
  number: 1 | 2 | 3 | 4;
  label: string;
  /** Cor do círculo do número, conforme o fundo da seção. */
  tone: 'navy' | 'green' | 'white' | 'yellow';
}

/** Abertura de cada parte: o número num círculo e uma frase escrita à mão. */
export function ChapterLabel({ number, label, tone }: ChapterLabelProps) {
  return (
    <p className={`chapter-label chapter-label--${tone}`}>
      <span className="chapter-label__num" aria-hidden="true">
        {number}
      </span>
      <span className="chapter-label__text">{label}</span>
    </p>
  );
}
