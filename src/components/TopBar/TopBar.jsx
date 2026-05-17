// TopBar.jsx
import styles from "./TopBar.module.css";

export function TopBar({
  activeTab = "estudar",
  theme,
  onToggleTheme,
  onTabChange,
}) {
  return (
    <header className={styles.bar}>
      <span className={styles.logo}>Flash-Card</span>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "estudar" ? styles.tabActive : ""}`}
          onClick={() => onTabChange?.("estudar")}
        >
          Estudar
        </button>
        <button
          className={`${styles.tab} ${activeTab === "biblioteca" ? styles.tabActive : ""}`}
          onClick={() => onTabChange?.("biblioteca")}
        >
          Biblioteca
        </button>
      </nav>

      <button
        className={styles.themeToggle}
        onClick={onToggleTheme}
        title="Alternar tema"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
