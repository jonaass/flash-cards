// App.jsx — Gerencia tema (light/dark) e orquestra as telas
import { useState, useEffect } from 'react'
import { useFlashcards }  from './hooks/useFlashcards'
import InputScreen         from './components/InputScreen/InputScreen'
import { LoadingScreen }   from './components/LoadingScreen/LoadingScreen'
import { StudyScreen }     from './components/StudyScreen/StudyScreen'
import { Results }         from './components/Results/Results'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  const {
    phase, cards, currentIndex, results,
    inputText, error, currentCard,
    correctCount, wrongCount,
    handleGenerate, handleAnswer, handleRestart,
  } = useFlashcards()

  return (
    <>
      {phase === 'input' && (
        <InputScreen error={error} startGeneration={handleGenerate} theme={theme} onToggleTheme={toggleTheme} />
      )}
      {phase === 'loading' && (
        <LoadingScreen theme={theme} onToggleTheme={toggleTheme} />
      )}
      {phase === 'study' && currentCard && (
        <StudyScreen
          card={currentCard} total={cards.length} currentIndex={currentIndex}
          correctCount={correctCount} wrongCount={wrongCount}
          inputText={inputText} onAnswer={handleAnswer} onRestart={handleRestart}
          theme={theme} onToggleTheme={toggleTheme}
        />
      )}
      {phase === 'results' && (
        <Results results={results} onRestart={handleRestart} theme={theme} onToggleTheme={toggleTheme} />
      )}
    </>
  )
}
