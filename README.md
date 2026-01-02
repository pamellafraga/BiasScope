# BiasScope

## 🎨 Detector de Viés Linguístico em Textos de IA

### 🎯 Objetivo

Identificar viés social, de gênero e generalizações em textos gerados por IA através de uma interface moderna e futurística.

### ✨ Novidades v2.0

- 🌌 **Interface Web Futurística**: Design espacial com animações de estrelas
- 🎨 **Glassmorphism**: Efeitos de vidro fosco modernos
- ⚡ **Animações Fluidas**: Transições suaves e feedback visual
- 📊 **Visualização de Dados**: Gráfico circular animado para score
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em qualquer dispositivo
- 🎯 **Exemplos Rápidos**: Teste instantâneo com textos pré-definidos
- 💡 **Recomendações Inteligentes**: Sugestões contextuais baseadas nos resultados

### 📖 Descrição

BiasScope helps identify linguistic bias in AI-generated content,
supporting ethical and inclusive AI systems.

### 🚀 Como Usar

1. Instale as dependências:
```bash
pip install fastapi uvicorn jinja2
```

2. Execute o servidor:
```bash
cd "c:\Users\Pamella\Desktop\Projetos ICTi\✅ PROJETO 2 — BiasScope"
python -m uvicorn biasscope.app:app --reload
```

3. Acesse no navegador:
```
http://127.0.0.1:8000
```

4. Use a interface web ou faça requisições à API:
```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Todos os homens são fortes"}'
```

### 📊 Resposta da API

```json
{
  "score": 2,
  "findings": ["Possível viés de gênero", "Possível viés de generalização"],
  "recommendation": "Usar linguagem neutra e baseada em evidências."
}
```

### 🔍 Categorias de Viés Detectadas

- **👥 Gênero**: Identifica termos relacionados a gênero
  - Palavras-chave: mulher, homem, menina, menino
  
- **🔄 Generalização**: Detecta palavras que indicam generalizações excessivas
  - Palavras-chave: todos, sempre, nunca

### 🎨 Design e Interface

O BiasScope apresenta um design futurístico com:

- **Fundo Espacial Animado**: Três camadas de estrelas em movimento
- **Cards Glassmorphism**: Efeitos de vidro fosco com blur
- **Gradientes Neon**: Cores vibrantes (ciano #00f5ff, roxo #8b5cf6)
- **Animações Suaves**: Transições e efeitos de hover
- **Score Circular Animado**: Visualização intuitiva do nível de viés
- **Sistema de Cores**: Verde (sem viés), Amarelo (atenção), Vermelho (alerta)

### 📁 Estrutura do Projeto

```
biasscope/
├── app.py              # API FastAPI com interface web
├── bias_detector.py    # Lógica de detecção de viés
├── templates/
│   └── index.html      # Interface web principal
├── static/
│   ├── style.css       # Estilos futurísticos
│   └── script.js       # Interatividade e animações
├── examples/
│   └── sample_texts.py # Textos de exemplo
├── README.md           # Documentação principal
└── DESIGN.md           # Documentação do design

```

### 💻 Exemplos de Uso

#### Exemplo 1: Com viés detectado
**Texto**: "Todos os homens são bons em matemática"
**Resultado**: Score 2 (Viés de gênero + generalização)

#### Exemplo 2: Sem viés
**Texto**: "As pessoas têm habilidades diversas"
**Resultado**: Score 0 (Nenhum viés detectado)

### 🎯 Recursos da Interface

1. **Input Inteligente**
   - Contador de caracteres em tempo real
   - Exemplos rápidos para teste
   - Auto-foco e validação

2. **Resultados Visuais**
   - Círculo de score animado
   - Lista de vieses encontrados
   - Recomendações contextuais
   - Estatísticas acumuladas

3. **Sidebar Informativa**
   - Sobre o BiasScope
   - Features principais
   - Categorias e palavras-chave

### 🎭 Easter Egg

Tente o código Konami na interface: ↑↑↓↓←→←→BA 🌈

### 💡 Impacto

Este projeto promove a criação de sistemas de IA mais éticos e inclusivos,
ajudando a identificar e corrigir vieses linguísticos em textos gerados automaticamente.

### 🔗 Links Úteis

- **Interface Web**: http://127.0.0.1:8000
- **Documentação da API**: http://127.0.0.1:8000/docs
- **API Alternativa**: http://127.0.0.1:8000/redoc

### 📝 Próximas Melhorias

- [ ] Mais categorias de viés (racial, etário, religioso)
- [ ] Machine Learning para detecção mais avançada
- [ ] Exportação de relatórios em PDF
- [ ] Histórico de análises
- [ ] API de comparação de textos
- [ ] Integração com editores de texto
- [ ] Dashboard de estatísticas

### 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Adicionar novas categorias de viés
- Melhorar o algoritmo de detecção
- Aprimorar a interface
- Traduzir para outros idiomas

---

**© 2026 BiasScope** | Promovendo IA Ética e Inclusiva 🌟
