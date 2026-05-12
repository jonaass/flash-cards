// src/components/LoadingScreen/LoadingScreen.jsx
import './LoadingScreen.css'
export function LoadingScreen() {
  return (
    <div className="loading-wrapper">
      <div className="spinner" />
      <p className="loading-text">Analisando texto e criando flashcards…</p>
    </div>
  )
}
