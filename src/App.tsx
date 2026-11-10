import { A11yDock } from './components/A11yDock';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Understand } from './sections/Understand';
import { Prevent } from './sections/Prevent';
import { Disguises } from './sections/Disguises';
import { Simulator } from './sections/Simulator';
import { Lock } from './sections/Lock';
import { AfterCode } from './sections/AfterCode';
import { Video } from './sections/Video';
import { Family } from './sections/Family';
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

      <Header />

      <main id="conteudo-principal">
        <Hero />
        <Understand />
        <Prevent />
        <Disguises />
        <Simulator />
        <Lock />
        <AfterCode />
        <Video />
        <Family />
      </main>

      <Footer />
      <A11yDock
        isLargeText={isLargeText}
        onToggleLargeText={toggleLargeText}
        isSpeechSupported={isSpeechSupported}
        isSpeaking={isSpeaking}
        onToggleReadAloud={toggleReadAloud}
      />
    </>
  );
}

export default App;
