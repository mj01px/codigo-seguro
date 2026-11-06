import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Simulator } from './sections/Simulator';
import { HowItWorks } from './sections/HowItWorks';
import { Warnings } from './sections/Warnings';
import { Protect } from './sections/Protect';
import { AlreadyStolen } from './sections/AlreadyStolen';
import { Family } from './sections/Family';
import { Pamphlet } from './sections/Pamphlet';
import { useFontSize } from './hooks/useFontSize';
import { useReadAloud } from './hooks/useReadAloud';

export function App() {
  const { isLargeText, toggleLargeText } = useFontSize();
  const { isSpeechSupported, isSpeaking, toggleReadAloud } = useReadAloud();

  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <Header
        isLargeText={isLargeText}
        onToggleLargeText={toggleLargeText}
        isSpeechSupported={isSpeechSupported}
        isSpeaking={isSpeaking}
        onToggleReadAloud={toggleReadAloud}
      />

      <main id="conteudo-principal">
        <Hero />
        <HowItWorks />
        <Simulator />
        <Warnings />
        <Protect />
        <AlreadyStolen />
        <Family />
        <Pamphlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
