import { useCallback } from 'react';
import { useCopy } from './useCopy';

interface ShareData {
  title: string;
  text: string;
  /** Âncora da página a compartilhar, como "#video". Vazio compartilha o site. */
  hash?: string;
}

/** Abre o compartilhar do celular; sem ele, copia o link. */
export function useShare() {
  const { copied, copy } = useCopy();

  const share = useCallback(
    async ({ title, text, hash = '' }: ShareData) => {
      const url = window.location.href.split('#')[0] + hash;

      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title, text, url });
          return;
        } catch (err) {
          // Cancelar o compartilhamento não é erro. Outras falhas caem na cópia do link.
          if (err instanceof Error && err.name === 'AbortError') return;
        }
      }

      await copy(url);
    },
    [copy]
  );

  return { copied, share };
}
