import { useActiveSection } from '../hooks/useActiveSection';
import { LockIcon } from './Icons';

const PARTS = [
  { id: 'entenda', number: 1, label: 'Entenda', tone: 'yellow' },
  { id: 'previna', number: 2, label: 'Previna', tone: 'green' },
  { id: 'agora', number: 3, label: 'Passei o código', tone: 'wine' },
  { id: 'video', number: 4, label: 'Vídeo', tone: 'navy' },
] as const;

const PART_IDS = PARTS.map((part) => part.id);

export function Header() {
  const active = useActiveSection(PART_IDS);

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a href="#inicio" className="brand">
          <span className="brand__mark">
            <LockIcon size={22} color="#FFD447" />
          </span>
          <span className="brand__text">
            <span className="brand__name">Código Seguro</span>
            <span className="brand__sub">Universidade de Mogi das Cruzes</span>
          </span>
        </a>

        <nav className="parts-nav" aria-label="Partes do guia">
          {PARTS.map((part) => (
            <a
              key={part.id}
              href={`#${part.id}`}
              className={`parts-nav__link${active === part.id ? ' is-active' : ''}`}
              aria-current={active === part.id ? 'location' : undefined}
            >
              <span className={`parts-nav__num parts-nav__num--${part.tone}`} aria-hidden="true">
                {part.number}
              </span>
              {part.label}
            </a>
          ))}
        </nav>

        <span className="topbar__tag">Projeto de extensão</span>
      </div>
    </header>
  );
}
