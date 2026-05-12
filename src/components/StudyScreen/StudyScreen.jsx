// src/components/StudyScreen/StudyScreen.jsx
//
// Tela de estudo: layout dividido com texto de referência e o card ativo.
//
// Props:
//   card          — card atual { topic, question, answer }
//   total         — total de cards
//   currentIndex  — índice atual (para barra de progresso e contador)
//   correctCount  — acertos até agora
//   wrongCount    — erros até agora
//   inputText     — texto original (exibido como referência)
//   onAnswer(bool)— callback ao responder
//   onRestart()   — volta para a tela de entrada
//
// O `key={currentIndex}` no <FlashCard> garante que o estado
// interno de flip seja resetado a cada novo card.

import { FlashCard } from '../FlashCard/FlashCard'
import './StudyScreen.css'

export function StudyScreen({
  card, total, currentIndex,
  correctCount, wrongCount,
  inputText, onAnswer, onRestart,
}) {
  const progressPct = Math.round((currentIndex / total) * 100)

  return (
    <div className="study-layout">

      {/* ── Painel esquerdo: texto de referência ── */}
      <div className="study-panel study-panel--left">
        <span className="study-label">Texto de referência</span>
        <div className="text-reference">{inputText}</div>
        <button className="btn-secondary" onClick={onRestart}>
          ← Novo texto
        </button>
      </div>

      {/* ── Painel direito: card ativo ── */}
      <div className="study-panel study-panel--right">

        <div className="study-header">
          <span className="study-label">{currentIndex + 1} / {total}</span>
          <span className="score-display">✓ {correctCount} &nbsp; ✗ {wrongCount}</span>
        </div>

        {/* Barra de progresso */}
        <div className="progress-bg">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Card com flip — key força re-mount a cada novo card */}
        <FlashCard
          key={currentIndex}
          card={card}
          onAnswer={onAnswer}
        />

      </div>
    </div>
  )
}
