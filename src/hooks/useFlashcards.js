// src/hooks/useFlashcards.js — Custom Hook com toda a lógica da aplicação
import { useState, useCallback } from 'react'
import { generateFlashcards } from '../services/api'

const INITIAL_STATE = {
  phase: 'input', cards: [], currentIndex: 0,
  results: [], inputText: '', error: '',
}

export function useFlashcards() {
  const [state, setState] = useState(INITIAL_STATE)

  const update = useCallback((patch) => {
    setState(prev => ({ ...prev, ...patch }))
  }, [])

  const handleGenerate = useCallback(async (text) => {
    if (text.trim().length < 50) {
      update({ error: 'Digite um texto com pelo menos 50 caracteres.' })
      return
    }
    update({ error: '', phase: 'loading', inputText: text.trim() })
    try {
      const cards = await generateFlashcards(text.trim())
      setState(prev => ({ ...prev, cards, results: [], currentIndex: 0, phase: 'study' }))
    } catch (err) {
      console.error('[useFlashcards] Erro:', err)
      update({ phase: 'input', error: 'Não foi possível gerar os flashcards. Tente novamente.' })
    }
  }, [update])

  const handleAnswer = useCallback((isCorrect) => {
    setState(prev => {
      const card = prev.cards[prev.currentIndex]
      const newResults = [...prev.results, { topic: card.topic, question: card.question, correct: isCorrect }]
      const nextIndex = prev.currentIndex + 1
      const finished = nextIndex >= prev.cards.length
      return { ...prev, results: newResults, currentIndex: finished ? prev.currentIndex : nextIndex, phase: finished ? 'results' : 'study' }
    })
  }, [])

  const handleRestart = useCallback(() => setState(INITIAL_STATE), [])

  const correctCount = state.results.filter(r => r.correct).length
  const wrongCount   = state.results.filter(r => !r.correct).length
  const currentCard  = state.cards[state.currentIndex] || null

  return {
    phase: state.phase, cards: state.cards, currentIndex: state.currentIndex,
    results: state.results, inputText: state.inputText, error: state.error,
    currentCard, correctCount, wrongCount,
    handleGenerate, handleAnswer, handleRestart,
  }
}
