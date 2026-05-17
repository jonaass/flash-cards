// Library/Library.jsx — Tela de biblioteca de baralhos salvos
import { TopBar } from '../TopBar/TopBar'
import styles from './Library.module.css'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function Library({ decks, onStudy, onDelete, theme, onToggleTheme, onTabChange }) {
  return (
    <div className={styles.page}>
      <TopBar theme={theme} onToggleTheme={onToggleTheme} activeTab="biblioteca" onTabChange={onTabChange} />

      <div className={styles.body}>
        <div className={styles.header}>
          <h2 className={styles.title}>Biblioteca</h2>
          <p className={styles.sub}>Seus baralhos salvos — clique para estudar novamente</p>
        </div>

        {decks.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📚</span>
            <p className={styles.emptyTitle}>Nenhum baralho salvo ainda</p>
            <p className={styles.emptySub}>Complete uma sessão de estudo para salvar automaticamente</p>
            <button className={styles.btnStart} onClick={() => onTabChange('estudar')}>
              Criar primeiro baralho →
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {decks.map(deck => (
              <div key={deck.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardName}>{deck.name}</h3>
                  <span className={styles.cardCount}>{deck.total} cards</span>
                </div>
                <p className={styles.cardDate}>Criado em {formatDate(deck.createdAt)}</p>
                <div className={styles.cardActions}>
                  <button className={styles.btnStudy} onClick={() => onStudy(deck)}>
                    Estudar novamente
                  </button>
                  <button className={styles.btnDelete} onClick={() => onDelete(deck.id)} title="Excluir baralho">
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
