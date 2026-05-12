// src/services/api.js
//
// Camada de serviço: toda comunicação com o backend fica aqui.
// Os componentes e hooks nunca chamam fetch diretamente —
// sempre passam por este módulo.
//
// Vantagens:
//   - Troca de URL ou modelo em um único lugar
//   - Fácil de mockar em testes
//   - Lógica de sanitização isolada
//
// Exporta:
//   generateFlashcards(text) → Promise<FlashCard[]>
//
// Tipo FlashCard: { topic: string, question: string, answer: string }

const API_CONFIG = {
  // /api/flashcards é redirecionado para o server.js via proxy do Vite
  // (em produção, o server.js já serve na mesma origem)
  endpoint:  '/api/flashcards',
  model:     'claude-sonnet-4-20250514',
  maxTokens: 1500,
}

/**
 * Monta o prompt que instrui o modelo a gerar flashcards em JSON.
 * Separado para facilitar ajustes no estilo das perguntas.
 */
function buildPrompt(text) {
  return `Analise o texto abaixo e crie entre 6 e 12 flashcards de estudo em português.

Retorne APENAS um JSON válido (sem markdown, sem backticks, sem texto extra), no formato:
[{"topic":"nome do tópico","question":"pergunta objetiva","answer":"resposta clara e concisa"}]

Regras:
- Perguntas devem testar compreensão real, não memorização trivial
- Agrupe por tópicos relacionados (use o mesmo "topic" para assuntos similares)
- Respostas devem ter entre 1 e 3 frases
- Use linguagem clara e direta

Texto:
${text}`
}

/**
 * Remove possíveis marcações de código que o modelo pode inserir
 * mesmo quando instruído a não fazê-lo.
 */
function sanitizeJson(raw) {
  return raw.replace(/```json/gi, '').replace(/```/g, '').trim()
}

/**
 * Chama o backend e retorna os flashcards gerados.
 *
 * @param   {string} text - Texto fornecido pelo usuário
 * @returns {Promise<Array<{topic: string, question: string, answer: string}>>}
 * @throws  {Error} se a requisição falhar ou o JSON for inválido
 */
export async function generateFlashcards(text) {
  const response = await fetch(API_CONFIG.endpoint, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model:      API_CONFIG.model,
      max_tokens: API_CONFIG.maxTokens,
      messages: [{ role: 'user', content: buildPrompt(text) }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()

  const rawText = (data.content || [])
    .map(block => block.text || '')
    .join('')

  const cards = JSON.parse(sanitizeJson(rawText))

  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error('Nenhum flashcard gerado. Tente com outro texto.')
  }

  return cards
}
