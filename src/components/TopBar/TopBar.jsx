// TopBar.jsx — Barra superior reutilizada em todas as telas
import styles from './TopBar.module.css'

export function TopBar({ activeTab = 'estudar', theme, onToggleTheme }) {
  return (
    <header className={styles.bar}>
      <span className={styles.logo}>FlashCard IA</span>
      <nav className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'estudar' ? styles.tabActive : ''}`}>
          Estudar
        </button>
        <button className={`${styles.tab} ${activeTab === 'biblioteca' ? styles.tabActive : ''}`}>
          Biblioteca
        </button>
      </nav>
      <button className={styles.themeToggle} onClick={onToggleTheme} title="Alternar tema">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
