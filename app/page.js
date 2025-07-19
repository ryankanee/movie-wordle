"use client";

import { useWordleGame } from "./hooks/useWordleGame";
import {
  Navbar,
  Home,
  About,
  InstructionModal,
} from "./components";

export default function HomePage() {
  const { 
    solution, 
    guesses, 
    gameStatus, 
    restartGame, 
    submitGuess, 
    isPlaying,
    showInstructions,
    closeInstructions,
    showInstructionsOnDemand,
    activeSection,
    showHome,
    showAbout,
  } = useWordleGame();

  return (
    <div className="app-container">
      <Navbar 
        onShowHelp={showInstructionsOnDemand}
        onShowHome={showHome}
        onShowAbout={showAbout}
        activeSection={activeSection}
      />
      
      <main className="main-content">
        {activeSection === 'home' && (
          <Home
            solution={solution}
            guesses={guesses}
            gameStatus={gameStatus}
            restartGame={restartGame}
            submitGuess={submitGuess}
            isPlaying={isPlaying}
          />
        )}
        
        {activeSection === 'about' && <About />}
      </main>

      <InstructionModal
        isVisible={showInstructions}
        onClose={closeInstructions}
      />
    </div>
  );
}
