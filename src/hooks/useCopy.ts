import { useCallback, useEffect, useRef, useState } from 'react';

function legacyCopy(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

/** Copia um texto e deixa `copied` verdadeiro por alguns segundos. */
export function useCopy(resetMs = 3000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      let ok: boolean;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        // Sem permissão para a área de transferência: usa o método antigo.
        ok = legacyCopy(text);
      }
      if (ok) {
        setCopied(true);
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
          timerRef.current = null;
          setCopied(false);
        }, resetMs);
      }
      return ok;
    },
    [resetMs]
  );

  return { copied, copy };
}
