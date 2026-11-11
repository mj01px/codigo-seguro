import type { CSSProperties } from 'react';

function toCamel(prop: string): string {
  if (prop.startsWith('--')) return prop;
  const name = prop.startsWith('-webkit-') ? `Webkit-${prop.slice('-webkit-'.length)}` : prop;
  return name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

/** Converte um estilo escrito como texto CSS ("color: red; gap: 4px") em objeto do React. */
export function css(text: string): CSSProperties {
  const style: Record<string, string> = {};
  let depth = 0;
  let current = '';
  const decls: string[] = [];

  for (const ch of text) {
    if (ch === '(') depth += 1;
    if (ch === ')') depth -= 1;
    if (ch === ';' && depth === 0) {
      decls.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  decls.push(current);

  for (const decl of decls) {
    const colon = decl.indexOf(':');
    if (colon === -1) continue;
    const prop = decl.slice(0, colon).trim();
    const value = decl.slice(colon + 1).trim();
    if (prop) style[toCamel(prop)] = value;
  }
  return style as CSSProperties;
}
