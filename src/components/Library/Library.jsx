// src/components/Library/Library.jsx
import { TopBar } from "../TopBar/TopBar";
import styles from "./Library.module.css";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function barColor(pct) {
  if (pct >= 70) return "#3A6B10";
  if (pct >= 40) return "#854F0B";
  return "#A32D2D";
}

function groupByTopic(results = []) {
  const map = {};
  results.forEach((r) => {
    if (!map[r.topic]) map[r.topic] = { correct: 0, wrong: 0 };
    map[r.topic][r.correct ? "correct" : "wrong"]++;
  });
  return Object.entries(map)
    .map(([topic, s]) => {
      const total = s.correct + s.wrong;
      return { topic, ...s, total, pct: Math.round((s.correct / total) * 100) };
    })
    .sort((a, b) => a.pct - b.pct);
}

export function Library({
  decks,
  onStudy,
  onDelete,
  theme,
  onToggleTheme,
  onTabChange,
}) {
  return (
    <div className={styles.page}>
      <TopBar
        theme={theme}
        onToggleTheme={onToggleTheme}
        activeTab="biblioteca"
        onTabChange={onTabChange}
      />

      <div className={styles.body}>
        <div className={styles.header}>
          <h2 className={styles.title}>Biblioteca</h2>
          <p className={styles.sub}>
            Seus baralhos salvos — clique para estudar novamente
          </p>
        </div>

        {decks.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📚</span>
            <p className={styles.emptyTitle}>Nenhum baralho salvo ainda</p>
            <p className={styles.emptySub}>
              Complete uma sessão de estudo para salvar automaticamente
            </p>
            <button
              className={styles.btnStart}
              onClick={() => onTabChange("estudar")}
            >
              Criar primeiro baralho →
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {decks.map((deck) => {
              const topics = groupByTopic(deck.lastResults);
              return (
                <div key={deck.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardName}>{deck.name}</h3>
                    <span className={styles.cardCount}>{deck.total} cards</span>
                  </div>

                  <p className={styles.cardDate}>
                    Última sessão:{" "}
                    {formatDate(deck.lastStudied || deck.createdAt)}
                  </p>

                  {deck.lastResults && deck.lastResults.length > 0 && (
                    <div className={styles.performance}>
                      <div className={styles.perfHeader}>
                        <span className={styles.perfLabel}>
                          Último desempenho
                        </span>
                        <span
                          className={styles.perfPct}
                          style={{ color: barColor(deck.pct) }}
                        >
                          {deck.pct}%
                        </span>
                      </div>

                      <div className={styles.barTrack}>
                        <div
                          className={styles.barFill}
                          style={{
                            width: `${deck.pct}%`,
                            background: barColor(deck.pct),
                          }}
                        />
                      </div>

                      <div className={styles.perfStats}>
                        <span className={styles.statCorrect}>
                          ✓ {deck.correct} lembrei
                        </span>
                        <span className={styles.statWrong}>
                          ✕ {deck.wrong} não sei
                        </span>
                      </div>

                      {topics.length > 0 && (
                        <div className={styles.topics}>
                          <span className={styles.topicsLabel}>Por tópico</span>
                          {topics.map((t) => (
                            <div key={t.topic} className={styles.topicRow}>
                              <span className={styles.topicName}>
                                {t.topic}
                              </span>
                              <div className={styles.topicTrack}>
                                <div
                                  className={styles.topicFill}
                                  style={{
                                    width: `${t.pct}%`,
                                    background: barColor(t.pct),
                                  }}
                                />
                              </div>
                              <span className={styles.topicPct}>{t.pct}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.cardActions}>
                    <button
                      className={styles.btnStudy}
                      onClick={() => onStudy(deck)}
                    >
                      Estudar novamente
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={() => onDelete(deck.id)}
                      title="Excluir"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
