// src/components/FlashCard/FlashCard.jsx
//
// Card individual com animação de flip (frente/verso).
//
// Props:
//   card: { topic, question, answer } — dados do card atual
//   onAnswer(isCorrect: boolean)      — callback ao julgar resposta
//
// Estado interno:
//   flipped — controla se o card está virado (mostrando a resposta)
//
// Quando o card muda (prop `card` diferente), o estado de flip
// é resetado via key no componente pai (StudyScreen).

import { useState } from 'react'
import './FlashCard.css'

export function FlashCard({ card, onAnswer }) {
  const [flipped, setFlipped] = useState(false)

  function reveal() {
    setFlipped(true)
  }

  return (
    <div className="flashcard-wrapper">

      {/* Animação 3D de flip */}
      <div className={`flip-inner${flipped ? ' flipped' : ''}`}>

        {/* Frente: pergunta */}
        <div className="flip-face flip-front">
          <span className="face-label">PERGUNTA</span>
          <p className="card-text">{card.question}</p>
          <span className="card-topic">{card.topic}</span>
        </div>

        {/* Verso: resposta */}
        <div className="flip-face flip-back">
          <span className="face-label">RESPOSTA</span>
          <p className="card-text">{card.answer}</p>
        </div>

      </div>

      {/* Botões de ação */}
      {!flipped ? (
        <button className="btn-reveal" onClick={reveal}>
          Revelar resposta
        </button>
      ) : (
        <div className="action-row">
          <button className="btn-judge btn-wrong"  onClick={() => onAnswer(false)}>
            ✗ &nbsp; Errei
          </button>
          <button className="btn-judge btn-correct" onClick={() => onAnswer(true)}>
            ✓ &nbsp; Acertei
          </button>
        </div>
      )}

    </div>
  )
}
