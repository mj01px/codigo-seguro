import { useCallback } from 'react';
import { useCopy } from './useCopy';

interface ShareData {
  title: string;
  /** A mensagem inteira, já com o endereço do site dentro. */
  text: string;
}

/** Abre o compartilhar do celular com a mensagem; sem ele, copia a mensagem. */
export function useShare() {
  const { copied, copy } = useCopy();

  const share = useCallback(
    async ({ title, text }: ShareData) => {
      if (typeof navigator.share === 'function') {
        try {
          // Sem `url` separado: alguns apps trocam o texto pelo link, e o link já vai na mensagem.
          await navigator.share({ title, text });
          return;
        } catch (err) {
          // Cancelar o compartilhamento não é erro. Outras falhas caem na cópia da mensagem.
          if (err instanceof Error && err.name === 'AbortError') return;
        }
      }

      await copy(text);
    },
    [copy]
  );

  return { copied, share };
}
