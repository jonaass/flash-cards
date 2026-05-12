<h1>⚡ FlashCard IA</h1>

Transforme qualquer texto em flashcards de estudo com Inteligência Artificial.

<h2>📖 Sobre o projeto</h2>
O FlashCard IA é uma aplicação web que usa Inteligência Artificial para gerar flashcards de estudo automaticamente a partir de qualquer texto. Cole um conteúdo — aula, artigo, resumo, capítulo de livro — e a IA analisa, identifica os tópicos principais e cria perguntas e respostas para fixar o aprendizado.
Ao final de cada sessão de estudo, o app exibe um relatório de desempenho mostrando seus acertos, erros e o tópico onde você teve mais dificuldade — para saber exatamente onde focar a revisão.

<h2>✨ Funcionalidades</h2>

📝 Geração automática de flashcards a partir de texto colado pelo usuário
🃏 Animação de flip nos cards (frente = pergunta / verso = resposta)
✅ Registro de acertos e erros em tempo real durante o estudo
📊 Relatório de desempenho ao final com aproveitamento por tópico
🎯 Identificação da principal dificuldade do usuário


## 🛠 Tecnologias

### 🖥 Frontend

| Tecnologia | Versão | Categoria | Finalidade | Site oficial |
|---|---|---|---|---|
| [React](https://react.dev/) | 18.2 | UI Library | Criação de componentes e gerenciamento de estado local | react.dev |
| [Vite](https://vitejs.dev/) | 5.1 | Build Tool | Servidor de desenvolvimento com hot reload e build otimizado | vitejs.dev |
| CSS Modules | — | Estilização | Escopo de CSS por componente, evitando conflitos de classe | — |
| JavaScript ES6+ | — | Linguagem | Lógica da aplicação (arrow functions, async/await, destructuring) | — |

### ⚙️ Backend

| Tecnologia | Versão | Categoria | Finalidade | Site oficial |
|---|---|---|---|---|
| [Node.js](https://nodejs.org/) | 18+ | Runtime | Servidor proxy que protege a API Key e repassa requisições | nodejs.org |
| http / https | nativo | Módulo Node | Criação do servidor HTTP e requisições HTTPS para a Groq | — |
| fs / path | nativo | Módulo Node | Leitura do arquivo `.env` e arquivos estáticos em produção | — |

### 🤖 Inteligência Artificial

| Tecnologia | Versão | Categoria | Finalidade | Site oficial |
|---|---|---|---|---|
| [Groq API](https://console.groq.com/) | — | API de IA | Plataforma de inferência gratuita e de alta velocidade | console.groq.com |
| [LLaMA 3.3 70B](https://groq.com/) | 3.3 | Modelo LLM | Análise do texto e geração dos flashcards em JSON | groq.com |



<p align="center">
  Feito com ☕ e muito estudo
</p>
