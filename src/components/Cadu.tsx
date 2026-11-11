export type CaduMood = 'alerta' | 'assustado' | 'trancado';

interface CaduProps {
  mood?: CaduMood;
  size?: number;
}

const INK = '#1C2541';

/** O Cadu: o cadeado que guarda o seu código. Sempre decorativo. */
export function Cadu({ mood = 'alerta', size = 200 }: CaduProps) {
  const scared = mood === 'assustado';
  const happy = mood === 'trancado';
  const dx = scared ? 0 : 3;
  const dy = scared ? -3 : 1;
  const pupilY = 80 + dy;
  const pupilR = scared ? 3.5 : 4.8;
  const brow1 = scared ? 'M33 62 Q42 55 52 61' : 'M33 63 L52 66';
  const brow2 = scared ? 'M68 61 Q78 55 87 62' : 'M68 64 L87 58';

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
      {scared ? (
        <g transform="rotate(-20 38 60) translate(0 -10)">
          <path d="M38 60V40a22 22 0 0 1 44 0v6" style={{ fill: 'none', stroke: INK, strokeWidth: 12, strokeLinecap: 'round' }} />
          <path d="M38 60V40a22 22 0 0 1 44 0v6" style={{ fill: 'none', stroke: '#DDE3EE', strokeWidth: 5, strokeLinecap: 'round' }} />
        </g>
      ) : (
        <g>
          <path d="M38 60V40a22 22 0 0 1 44 0v20" style={{ fill: 'none', stroke: INK, strokeWidth: 12, strokeLinecap: 'round' }} />
          <path d="M38 60V40a22 22 0 0 1 44 0v20" style={{ fill: 'none', stroke: '#DDE3EE', strokeWidth: 5, strokeLinecap: 'round' }} />
        </g>
      )}
      <rect x="16" y="52" width="88" height="62" rx="24" style={{ fill: '#FFD447', stroke: INK, strokeWidth: 3.5 }} />
      {happy ? (
        <g>
          <path d="M34 82 Q44 71 54 82" style={{ fill: 'none', stroke: INK, strokeWidth: 4.5, strokeLinecap: 'round' }} />
          <path d="M66 82 Q76 71 86 82" style={{ fill: 'none', stroke: INK, strokeWidth: 4.5, strokeLinecap: 'round' }} />
          <ellipse cx="29" cy="94" rx="7" ry="4.5" style={{ fill: '#F6A5B3' }} />
          <ellipse cx="91" cy="94" rx="7" ry="4.5" style={{ fill: '#F6A5B3' }} />
        </g>
      ) : (
        <g>
          <circle cx="44" cy="80" r="12" style={{ fill: '#FFFFFF', stroke: INK, strokeWidth: 3.5 }} />
          <circle cx="76" cy="80" r="12" style={{ fill: '#FFFFFF', stroke: INK, strokeWidth: 3.5 }} />
          <circle cx={44 + dx} cy={pupilY} r={pupilR} style={{ fill: INK }} />
          <circle cx={76 + dx} cy={pupilY} r={pupilR} style={{ fill: INK }} />
          <path d={brow1} style={{ fill: 'none', stroke: INK, strokeWidth: 4, strokeLinecap: 'round' }} />
          <path d={brow2} style={{ fill: 'none', stroke: INK, strokeWidth: 4, strokeLinecap: 'round' }} />
        </g>
      )}
      <circle cx="60" cy="97" r="5" style={{ fill: INK }} />
      <path d="M57.4 99.5 L55.8 108.5 H64.2 L62.6 99.5 Z" style={{ fill: INK }} />
      {scared && (
        <g>
          <path d="M104 30 q7 10 0 14 q-7 -4 0 -14z" style={{ fill: '#FFFFFF', stroke: INK, strokeWidth: 2.5, strokeLinejoin: 'round' }} />
          <path d="M10 66 l-7 -3 M9 78 h-8 M10 90 l-7 3" style={{ fill: 'none', stroke: INK, strokeWidth: 3, strokeLinecap: 'round' }} />
        </g>
      )}
      {happy && (
        <g>
          <circle cx="100" cy="106" r="13" style={{ fill: '#0E6B4B', stroke: INK, strokeWidth: 3 }} />
          <path d="M94 106 l4 4 l8 -9" style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
        </g>
      )}
    </svg>
  );
}
