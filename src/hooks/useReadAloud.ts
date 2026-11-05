import { useState, useEffect, useCallback } from 'react';
import { getVisibleSectionText } from '../lib/speech';

export function useReadAloud() {
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const supported =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof window.SpeechSynthesisUtterance !== 'undefined';

    setIsSpeechSupported(supported);

    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleReadAloud = useCallback(() => {
    if (!isSpeechSupported) return;

    const synth = window.speechSynthesis;

    if (synth.speaking || isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = getVisibleSectionText();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;

    const voices = synth.getVoices();
    const ptVoice = voices.find((v) => v.lang.toLowerCase().startsWith('pt-br')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    synth.speak(utterance);
  }, [isSpeechSupported, isSpeaking]);

  return {
    isSpeechSupported,
    isSpeaking,
    toggleReadAloud,
  };
}
