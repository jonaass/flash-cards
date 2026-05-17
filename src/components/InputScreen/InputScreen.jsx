// InputScreen.jsx
import { useState } from "react";
import { TopBar } from "../TopBar/TopBar";
import styles from "./InputScreen.module.css";

const MIN_CHARS = 50;

export default function InputScreen({
  error,
  startGeneration,
  theme,
  onToggleTheme,
  onTabChange,
}) {
  const [text, setText] = useState("");
  const [deckName, setDeckName] = useState("");

  const remaining = Math.max(0, MIN_CHARS - text.trim().length);
  const isReady = text.trim().length >= MIN_CHARS;

  return (
    <div className={styles.page}>
      <TopBar
        theme={theme}
        onToggleTheme={onToggleTheme}
        activeTab="estudar"
        onTabChange={onTabChange}
      />
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Nome do Tema</label>
            <input
              className={styles.deckInput}
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="Ex: Biologia — Célula"
              maxLength={60}
            />
            <span className={styles.deckHint}>
              Salvo automaticamente na Biblioteca ao terminar o estudo
            </span>
          </div>

          <div className={`${styles.field} ${styles.fieldGrow}`}>
            <label className={styles.fieldLabel}>Texto fonte</label>
            <textarea
              className={styles.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole aqui o conteúdo que deseja estudar..."
            />
          </div>

          {text.trim().length > 0 && !isReady && (
            <p className={styles.counter}>
              {remaining} caractere{remaining !== 1 ? "s" : ""} faltando
            </p>
          )}
          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.btnGenerate}
            disabled={!isReady}
            onClick={() =>
              isReady &&
              startGeneration(text.trim(), deckName.trim() || "Sem título")
            }
          >
            Gerar flashcards
          </button>
        </div>

        <div className={styles.right}>
          <div className={styles.cardPreview}>
            <span className={styles.previewLabel}>RESPOSTA</span>
            <p className={styles.previewText}>
              {isReady
                ? 'Pronto! Clique em "Gerar flashcards" para começar.'
                : "Seus flashcards aparecerão aqui após a geração."}
            </p>
            <span className={styles.previewHint}>
              Clique para ver a pergunta
            </span>
          </div>
          <div className={styles.previewButtons}>
            <button className={styles.btnKnow} disabled>
              ✕ &nbsp; Não Sei
            </button>
            <button className={styles.btnRemember} disabled>
              ✓ &nbsp; Lembrei
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
