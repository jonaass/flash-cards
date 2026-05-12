// src/components/Results/Results.jsx
//
// Tela de resultados: métricas gerais + dificuldade principal + breakdown.
//
// Props:
//   results   — array de { topic, question, correct }
//   onRestart — callback para voltar ao início
//
// Toda a lógica de cálculo fica aqui em funções puras (calcStats),
// mantendo o hook useFlashcards mais enxuto.

import './Results.css'

// ── Funções puras de cálculo ──────────────────────────────

function calcStats(results) {
  const total   = results.length
  const correct = results.filter(r => r.correct).length
  const wrong   = total - correct
  const pct     = total > 0 ? Math.round((correct / total) * 100) : 0

  // Agrupa por tópico
  const topicMap = {}
  results.forEach(r => {
    if (!topicMap[r.topic]) topicMap[r.topic] = { correct: 0, wrong: 0 }
    topicMap[r.topic][r.correct ? 'correct' : 'wrong']++
  })

  // Ordena por taxa de erro (maior → menor)
  const topics = Object.entries(topicMap)
    .map(([name, s]) => {
      const t       = s.correct + s.wrong
      const errRate = t > 0 ? s.wrong / t : 0
      const pctOk   = Math.round((s.correct / t) * 100)
      return { name, ...s, total: t, errRate, pctOk }
    })
    .sort((a, b) => b.errRate - a.errRate)

  return { total, correct, wrong, pct, topics }
}

function barColor(pct) {
  if (pct >= 70) return 'var(--color-success-text)'
  if (pct >= 40) return 'var(--color-warn-text)'
  return 'var(--color-danger-text)'
}

// ── Componente ────────────────────────────────────────────

export function Results({ results, onRestart }) {
  const { correct, wrong, pct, topics } = calcStats(results)
  const hardest = topics[0]
  const showHardest = hardest && hardest.wrong > 0

  return (
    <div className="results-wrapper">
      <h2 className="results-title">Resultado final</h2>
      <p className="results-sub">Veja como você foi e onde focar nos estudos</p>

      {/* Métricas gerais */}
      <div className="metrics-grid">
        <div className="metric-card metric-success">
          <span className="metric-value">{correct}</span>
          <span className="metric-label">Acertos</span>
        </div>
        <div className="metric-card metric-danger">
          <span className="metric-value">{wrong}</span>
          <span className="metric-label">Erros</span>
        </div>
        <div className="metric-card metric-info">
          <span className="metric-value">{pct}%</span>
          <span className="metric-label">Aproveitamento</span>
        </div>
      </div>

      {/* Principal dificuldade */}
      {showHardest && (
        <div className="hardest-block">
          <span className="section-label">Principal dificuldade</span>
          <p className="hardest-topic">{hardest.name}</p>
          <p className="hardest-desc">
            {hardest.wrong} erro{hardest.wrong !== 1 ? 's' : ''} neste tópico — revise com atenção!
          </p>
        </div>
      )}

      {/* Breakdown por tópico */}
      <div className="breakdown">
        <span className="section-label">Desempenho por tópico</span>
        {topics.map(t => (
          <div key={t.name} className="topic-row">
            <div className="topic-header">
              <span className="topic-name">{t.name}</span>
              <span className="topic-stat">{t.correct}/{t.total} — {t.pctOk}%</span>
            </div>
            <div className="topic-track">
              <div
                className="topic-fill"
                style={{ width: `${t.pctOk}%`, background: barColor(t.pctOk) }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="btn-restart" onClick={onRestart}>
        Gerar novos flashcards
      </button>
    </div>
  )
}
