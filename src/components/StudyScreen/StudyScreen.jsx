// StudyScreen.jsx — Tela de estudo estilo SimpleCards
import { FlashCard } from '../FlashCard/FlashCard'
import { TopBar }    from '../TopBar/TopBar'
import styles from './StudyScreen.module.css'

export function StudyScreen({ card, total, currentIndex, correctCount, wrongCount, inputText, onAnswer, onRestart, theme, onToggleTheme }) {
  const pct = Math.round((currentIndex / total) * 100)
  return (
    <div className={styles.page}>
      <TopBar theme={theme} onToggleTheme={onToggleTheme} activeTab="estudar" />
      <div className={styles.body}>
        <div className={styles.left}>
          <p className={styles.leftLabel}>Texto fonte</p>
          <div className={styles.sourceText}>{inputText}</div>
          <button className={styles.btnNew} onClick={onRestart}>← Novo texto</button>
        </div>
        <div className={styles.right}>
          <div className={styles.progressRow}>
            <span className={styles.progressLabel}>{currentIndex + 1} de {total}</span>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.scoreLabel}>✓ {correctCount} &nbsp; ✕ {wrongCount}</span>
          </div>
          <FlashCard key={currentIndex} card={card} onAnswer={onAnswer} />
        </div>
      </div>
    </div>
  )
}
