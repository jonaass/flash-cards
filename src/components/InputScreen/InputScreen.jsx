/**
 * InputScreen.jsx — Tela inicial de entrada de texto
 *
 * Layout dividido em dois painéis:
 *   Esquerda: textarea + botão de geração
 *   Direita:  placeholder visual (empty state)
 *
 * Props recebidas do App.jsx (via hook useFlashcards):
 *   error          {string}   — mensagem de erro, se houver
 *   startGeneration{function} — dispara a geração via API
 */
import React, { useState } from 'react'
import styles from './InputScreen.module.css'

const MIN_CHARS = 50

export default function InputScreen({ error, startGeneration }) {
  const [text, setText] = useState('')

  const remaining = Math.max(0, MIN_CHARS - text.trim().length)
  const isReady   = text.trim().length >= MIN_CHARS

  function handleChange(e) {
    setText(e.target.value)
  }

  function handleGenerate() {
    if (isReady) startGeneration(text.trim())
  }

  return (
    <div className={styles.layout}>

      {/* ── Painel esquerdo: entrada ── */}
      <div className={styles.panelLeft}>
        <span className={styles.label}>Seu texto</span>

        <textarea
          className={styles.textarea}
          value={text}
          onChange={handleChange}
          placeholder="Cole ou digite aqui o conteúdo que deseja estudar..."
        />

        {/* Contador de caracteres */}
        {text.trim().length > 0 && !isReady && (
          <p className={styles.counter}>
            {remaining} caractere{remaining !== 1 ? 's' : ''} faltando
          </p>
        )}

        {/* Mensagem de erro da API */}
        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.btnGenerate}
          disabled={!isReady}
          onClick={handleGenerate}
        >
          Gerar flashcards →
        </button>
      </div>

      {/* ── Painel direito: empty state ── */}
      <div className={styles.panelRight}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>◈</div>
          <p className={styles.emptyTitle}>Os flashcards aparecerão aqui</p>
          <p className={styles.emptySub}>Cole seu texto e clique em gerar</p>
        </div>
      </div>

    </div>
  )
}
