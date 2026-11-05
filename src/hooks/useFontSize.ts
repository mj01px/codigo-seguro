import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'codigo-seguro:large-text';

export function useFontSize() {
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-large-text', String(isLargeText));
    try {
      window.localStorage.setItem(STORAGE_KEY, String(isLargeText));
    } catch {
      // ignora caso localStorage esteja bloqueado
    }
  }, [isLargeText]);

  const toggleLargeText = useCallback(() => {
    setIsLargeText((prev) => !prev);
  }, []);

  return { isLargeText, toggleLargeText };
}
