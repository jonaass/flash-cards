// hooks/useFlashcards.js
import { useState, useCallback } from 'react'
import { generateFlashcards } from '../services/api'

const INITIAL_STATE = {
  phase: 'input', cards: [], currentIndex: 0,
  results: [], inputText: '', error: '', deckName: '',
}

export function useFlashcards({ saveToLibrary } = {}) {
  const [state, setState] = useState(INITIAL_STATE)

  const update = useCallback((patch) => {
    setState(prev => ({ ...prev, ...patch }))
  }, [])

  // Gera cards a partir de texto novo
  const handleGenerate = useCallback(async (text, deckName) => {
    if (text.trim().length < 50) {
      update({ error: 'Digite um texto com pelo menos 50 caracteres.' })
      return
    }
    update({ error: '', phase: 'loading', inputText: text.trim(), deckName: deckName || 'Sem título' })
    try {
      const cards = await generateFlashcards(text.trim())
      setState(prev => ({ ...prev, cards, results: [], currentIndex: 0, phase: 'study' }))
    } catch (err) {
      console.error('[useFlashcards] Erro:', err)
      update({ phase: 'input', error: 'Não foi possível gerar os flashcards. Tente novamente.' })
    }
  }, [update])

  // Estuda um baralho já salvo na biblioteca
  const handleStudyDeck = useCallback((deck) => {
    setState(prev => ({
      ...prev,
      cards: deck.cards,
      inputText: deck.inputText || '',
      deckName: deck.name,
      results: [],
      currentIndex: 0,
      phase: 'study',
      error: '',
    }))
  }, [])

  const handleAnswer = useCallback((isCorrect) => {
    setState(prev => {
      const card = prev.cards[prev.currentIndex]
      const newResults = [...prev.results, { topic: card.topic, question: card.question, correct: isCorrect }]
      const nextIndex  = prev.currentIndex + 1
      const finished   = nextIndex >= prev.cards.length

      // Salva na biblioteca ao terminar
      if (finished && saveToLibrary) {
        saveToLibrary({
          id:        Date.now().toString(),
          name:      prev.deckName || 'Sem título',
          cards:     prev.cards,
          inputText: prev.inputText,
          total:     prev.cards.length,
          createdAt: new Date().toISOString(),
        })
      }

      return {
        ...prev,
        results:      newResults,
        currentIndex: finished ? prev.currentIndex : nextIndex,
        phase:        finished ? 'results' : 'study',
      }
    })
  }, [saveToLibrary])

  const handleRestart = useCallback(() => setState(INITIAL_STATE), [])

  const correctCount = state.results.filter(r => r.correct).length
  const wrongCount   = state.results.filter(r => !r.correct).length
  const currentCard  = state.cards[state.currentIndex] || null

  return {
    phase: state.phase, cards: state.cards, currentIndex: state.currentIndex,
    results: state.results, inputText: state.inputText, error: state.error,
    deckName: state.deckName, currentCard, correctCount, wrongCount,
    handleGenerate, handleAnswer, handleRestart, handleStudyDeck,
  }
}
