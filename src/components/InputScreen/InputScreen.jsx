// InputScreen.jsx — Tela inicial estilo SimpleCards
import { useState } from 'react'
import { TopBar }   from '../TopBar/TopBar'
import styles from './InputScreen.module.css'

const MIN_CHARS = 50

export default function InputScreen({ error, startGeneration, theme, onToggleTheme }) {
  const [text,     setText]     = useState('')
  const [deckName, setDeckName] = useState('')

  const remaining = Math.max(0, MIN_CHARS - text.trim().length)
  const isReady   = text.trim().length >= MIN_CHARS

  return (
    <div className={styles.page}>
      <TopBar theme={theme} onToggleTheme={onToggleTheme} activeTab="estudar" />
      <div className={styles.body}>

        {/* Painel esquerdo */}
        <div className={styles.left}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Nome do baralho</label>
            <input
              className={styles.deckInput} type="text" value={deckName}
              onChange={e => setDeckName(e.target.value)}
              placeholder="Ex: Biologia — Célula"
            />
          </div>
          <div className={`${styles.field} ${styles.fieldGrow}`}>
            <label className={styles.fieldLabel}>Texto fonte</label>
            <textarea
              className={styles.textarea} value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Cole aqui o conteúdo que deseja estudar..."
            />
          </div>
          {text.trim().length > 0 && !isReady && (
            <p className={styles.counter}>{remaining} caractere{remaining !== 1 ? 's' : ''} faltando</p>
          )}
          {error && <p className={styles.error}>{error}</p>}
          <button
            className={styles.btnGenerate} disabled={!isReady}
            onClick={() => isReady && startGeneration(text.trim())}
          >
            Gerar flashcards
          </button>
        </div>

        {/* Painel direito: preview */}
        <div className={styles.right}>
          <div className={styles.cardPreview}>
            <span className={styles.previewLabel}>RESPOSTA</span>
            <p className={styles.previewText}>
              {isReady ? 'Pronto! Clique em "Gerar flashcards" para começar.' : 'Seus flashcards aparecerão aqui após a geração.'}
            </p>
            <span className={styles.previewHint}>Clique para ver a pergunta</span>
          </div>
          <div className={styles.previewButtons}>
            <button className={styles.btnKnow} disabled>✕ &nbsp; Não Sei</button>
            <button className={styles.btnRemember} disabled>✓ &nbsp; Lembrei</button>
          </div>
        </div>

      </div>
    </div>
  )
}
