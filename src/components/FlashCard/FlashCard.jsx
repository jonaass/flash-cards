// FlashCard.jsx — Card com flip estilo SimpleCards
import { useState } from 'react'
import styles from './FlashCard.module.css'

export function FlashCard({ card, onAnswer }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.flipScene} onClick={() => setFlipped(f => !f)}>
        <div className={`${styles.flipInner} ${flipped ? styles.flipped : ''}`}>
          <div className={styles.face}>
            <span className={styles.faceLabel}>PERGUNTA</span>
            <p className={styles.faceText}>{card.question}</p>
            <span className={styles.hint}>Clique para ver a resposta</span>
          </div>
          <div className={`${styles.face} ${styles.faceBack}`}>
            <span className={styles.faceLabel}>RESPOSTA</span>
            <p className={styles.faceText}>{card.answer}</p>
            <span className={styles.hint}>Clique para ver a pergunta</span>
          </div>
        </div>
      </div>

      <span className={styles.topic}>{card.topic}</span>

      <div className={`${styles.actions} ${flipped ? styles.actionsVisible : ''}`}>
        <button className={styles.btnKnow}     onClick={() => onAnswer(false)}>✕ &nbsp; Não Sei</button>
        <button className={styles.btnRemember} onClick={() => onAnswer(true)}>✓ &nbsp; Lembrei</button>
      </div>

      {!flipped && <p className={styles.flipHint}>Clique no card para revelar a resposta</p>}
    </div>
  )
}
