// src/App.jsx — Componente raiz: orquestra telas via useFlashcards()
import { useFlashcards }  from './hooks/useFlashcards'
import { InputPanel }     from './components/InputPanel/InputPanel'
import { LoadingScreen }  from './components/LoadingScreen/LoadingScreen'
import { StudyScreen }    from './components/StudyScreen/StudyScreen'
import { Results }        from './components/Results/Results'

export default function App() {
  const {
    phase, cards, currentIndex, results,
    inputText, error, currentCard,
    correctCount, wrongCount,
    handleGenerate, handleAnswer, handleRestart,
  } = useFlashcards()

  return (
    <>
      {phase === 'input'   && <InputPanel onGenerate={handleGenerate} error={error} />}
      {phase === 'loading' && <LoadingScreen />}
      {phase === 'study'   && currentCard && (
        <StudyScreen
          card={currentCard} total={cards.length} currentIndex={currentIndex}
          correctCount={correctCount} wrongCount={wrongCount}
          inputText={inputText} onAnswer={handleAnswer} onRestart={handleRestart}
        />
      )}
      {phase === 'results' && <Results results={results} onRestart={handleRestart} />}
    </>
  )
}
