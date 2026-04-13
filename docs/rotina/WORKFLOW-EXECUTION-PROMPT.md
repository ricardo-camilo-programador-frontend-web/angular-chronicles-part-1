# 🤖 Prompt de Execução do Workflow Completo - Angular Chronicles Part 1

## 🎯 Objetivo

Executar automaticamente o workflow completo de gerenciamento do projeto Angular Chronicles Part 1, incluindo:

- Revisão e atualização de todas as issues abertas
- Busca de novos posts no Discord
- Criação e correção de Pull Requests
- Code review de PRs existentes

---

## 📋 Contexto do Projeto

**Repositório:** `ricardo564/angular-chronicles-part-1`
**Tecnologias:** Angular 19, TypeScript, RxJS, Angular CLI
**Padrões:** Gitmoji, Object Calisthenics, Clean Code, DRY
**Metodologia:** Spec-Driven Development (SDD)

**Documentação de Referência:**

- `docs/rotina/SDD-GUIA.md` - Guia SDD do projeto
 - `docs/rotina/CONSTITUICAO.md` - Princípios inegociáveis
- `docs/rotina/GERENCIADOR.MD` - Workflow principal
- `docs/rotina/ISSUE_TEMPLATE.md` - Padrão de issues (specs)
- `docs/rotina/COMMIT-PATTERN.md` - Padrão de commits
- `docs/rotina/PULL_REQUEST_TEMPLATE.md` - Template de PR
- `docs/rotina/PULL_REQUEST_REVIEW.md` - Guia de review
- `docs/rotina/PULL_REQUEST_FIX.md` - Correção de PRs

---

## 🔐 Pré-requisitos

Antes de iniciar, verifique:

```bash
# GitHub CLI autenticado
gh auth status

# Discord token disponível (se aplicável)
# Acesso de escrita no repositório
# Node.js e dependências instaladas
```

---

## 🚀 EXECUÇÃO DO WORKFLOW

### FASE 1: INICIALIZAÇÃO

```
1. Carregue o estado atual do workflow:
   - Ler: dist/workflow/state.json
   - Se não existir: criar estado inicial (workflow-state-schema.ts)
   - Validar schema conforme workflow-state.md

2. Registre início da execução:
   - Timestamp atual em state.lastRun
   - Incrementar state.stats.totalRuns
   - Criar log em dist/workflow/logs/YYYY-MM-DD.log

 3. 🔒 VALIDAÇÃO DE SEGURANÇA (NOVO):
    - Executar scan de caracteres invisíveis
    - npx tsx scripts/security/security-scan.ts
    - Se detectar: limpar antes de continuar
    - Registrar em log de segurança

 4. 📐 CARREGAR CONSTITUIÇÃO SDD:
    - Ler docs/rotina/CONSTITUICAO.md
    - Validar que próximas operações respeitam os princípios
    - Referência: docs/rotina/SDD-GUIA.md
```

### 🔒 Segurança de Código em Todas as Fases

**EM TODAS AS OPERAÇÕES DO WORKFLOW:**

1. **GitHub Issues/PRs**:

   - Scan de descrições e comentários
   - Remover automaticamente caracteres proibidos
   - Bloquear se detectar padrão malicioso

2. **Código-fonte**:

   - NUNCA aceitar código com caracteres invisíveis
   - SEMPRE validar antes de commit
   - AUTOMATICAMENTE remover se detectar

3. **Discord**:
   - Validar mensagens antes de criar issues
   - Remover caracteres estranhos de citações
   - Manter apenas texto limpo

**Caracteres proibidos**:

- U+FE00 a U+FE0F: Variation Selectors
- U+E0100 a U+E01EF: Variation Selectors Supplement
- U+200B a U+200F: Zero-Width Characters
- U+202A a U+202E: Directional Formatting Characters

**Referência obrigatória**: `docs/rotina/SEGURANCA-CODIGO.md`

---

### FASE 2: GITHUB - ISSUES

#### 2.1 Listar Issues Abertas

```bash
# Listar todas as issues abertas
gh issue list --state open --limit 100 --json number,title,labels,createdAt,updatedAt,body
```

#### 2.2 Identificar Issues sem Descrição Adequada

**Critérios de descrição inadequada:**

- Título genérico ("Corrigir bug", "Erro no sistema")
- Corpo vazio ou apenas "ver acima"
- Sem contexto técnico
- Sem passos para reproduzir
- Sem informação de impacto

**Filtro:**

```
Para cada issue aberta:
  SE issue NÃO está em state.github.processedIssues:
    ANALISAR descrição atual
    SE descrição é incompleta/superficial:
      MARCAR para atualização
```

#### 2.3 Atualizar Descrições de Issues

**Para cada issue identificada:**

1. **Analisar contexto completo:**

   - Ler título e corpo atual
   - Ler todos os comentários
   - Identificar código relacionado (arquivos, componentes, stores)
   - Verificar labels existentes
   - Buscar issues/PRs relacionados

2. **Gerar descrição completa seguindo ISSUE_TEMPLATE.md:**

```markdown
# {Título Técnico e Descritivo}

## 🔗 Referência

| Campo             | Valor                                                |
| ----------------- | ---------------------------------------------------- | ----- | ------ | ------ |
| **Origem**        | {Link do post/discord ou "Reporte direto no GitHub"} |
| **Reportado por** | {Autor da issue}                                     |
| **Data**          | {Data de criação}                                    |
| **Prioridade**    | {alta                                                | média | baixa} |
| **Impacto**       | {crítico                                             | alto  | médio  | baixo} |

**Contexto Resumido:**
{2-3 frases sobre o problema}

---

## ⚠ PROBLEMA ATUAL

### Descrição Clara e Objetiva

{Descrição técnica detalhada do problema}

**Condições que desencadeiam:**

1. {Condição 1}
2. {Condição 2}

**Frequência:** {100%|intermitente|raro}

### Impacto no Sistema/Usuário

| Dimensão                       | Descrição                     |
| ------------------------------ | ----------------------------- |
| **Usuários afetados**          | {Quem é impactado}            |
| **Funcionalidades bloqueadas** | {O que não funciona}          |
| **Prejuízo**                   | {Impacto negativo}            |
| **Urgência**                   | {Justificativa de prioridade} |

### Riscos Envolvidos

- {Risco 1}
- {Risco 2}
- {Risco 3}

---

## 🎯 OBJETIVOS

- [ ] **Objetivo 1**: {Ação específica}
- [ ] **Objetivo 2**: {Ação específica}
- [ ] **Objetivo 3**: {Ação específica}

---

## 🧠 ANÁLISE TÉCNICA

### Possível Causa Raiz

{Análise técnica fundamentada}

### Fluxo Atual vs Fluxo Esperado

#### Fluxo Atual (Problemático)
```

1. {Passo 1}
2. {Passo 2 onde ocorre erro}
3. {Resultado indesejado}

```

#### Fluxo Esperado (Correto)
```

1. {Passo 1}
2. {Passo 2 correto}
3. {Resultado esperado}

```

### Dependências Envolvidas

| Tipo | Nome | Impacto |
|------|------|---------|
| **Stores** | {nome-store.ts} | {impacto} |
| **Composables** | {useNome.ts} | {impacto} |
| **APIs** | {endpoint} | {impacto} |
| **Componentes** | {Nome.vue} | {impacto} |

---

## 📂 POSSÍVEIS ARQUIVOS AFETADOS

```

src/
├── views/
│ └── {NomeView.vue}
├── components/
│ └── {NomeComponent.vue}
├── stores/
│ └── {nome-store.ts}
├── composables/
│ └── {useNome.ts}
└── types/
└── {nome-types.ts}

````

---

## 🛠 IMPLEMENTAÇÃO SUGERIDA

### Passo a Passo Técnico

#### 1. {Nome da Etapa}

**Responsabilidade:** {O que resolve}

```typescript
// Exemplo de código
````

**Arquivos:** `caminho/do/arquivo.ts`

---

## 🧪 TESTES

### Fluxos Manuais Obrigatórios

1. **Fluxo Principal**
   - [ ] {Passo 1}
   - [ ] {Passo 2}
   - [ ] **Verificar**: {Resultado}

### Casos de Sucesso

- ✅ {Cenário}: {Resultado}

### Casos de Erro

- ❌ {Cenário}: {Tratamento}

---

## 🏷 LABELS SUGERIDAS

| Label           | Aplicar |
| --------------- | ------- | ---- |
| `bug`           | {sim    | não} |
| `feature`       | {sim    | não} |
| `priority:high` | {sim    | não} |

````

3. **Atualizar issue no GitHub:**

```bash
gh issue edit {number} --body-file /tmp/issue-{number}-description.md
````

4. **Marcar como processada:**

```typescript
markIssueProcessed(state, issueNumber)
```

5. **Sugerir labels:**

```bash
gh issue edit {number} --add-label "bug,priority:high,frontend"
```

6. **Registrar no log:**

```
[TIMESTAMP] INFO Issue #{number} atualizada com descrição completa
```

---

### FASE 3: GITHUB - PULL REQUESTS

#### 3.1 Listar Pull Requests Abertos

```bash
gh pr list --state open --limit 100 --json number,title,labels,createdAt,updatedAt,author,reviews
```

#### 3.2 Identificar PRs sem Revisão

**Critérios:**

- PR sem nenhum review
- PR com review há mais de 2 horas
- PR com status "changes_requested" sem nova revisão

**Filtro:**

```
Para cada PR aberto:
  SE PR NÃO está em state.github.reviewedPRs:
    MARCAR para revisão
  SENÃO:
    lastReview = state.github.reviewedPRs[prNumber].lastReview
    SE (Date.now() - lastReview) > 2 horas:
      MARCAR para re-revisão
```

#### 3.3 Realizar Code Review (seguindo PULL_REQUEST_REVIEW.md)

**Para cada PR identificado:**

1. **Baixar e analisar mudanças:**

```bash
gh pr checkout {number}
git diff origin/main...HEAD --stat
```

2. **Análise completa do código:**

**Verificar:**

- [ ] Bugs potenciais
- [ ] Lógica incorreta
- [ ] Problemas de tipagem TypeScript
- [ ] Problemas de performance
- [ ] Problemas de segurança
- [ ] Inconsistências com padrões do projeto
- [ ] Código duplicado
- [ ] Imports não utilizados
- [ ] Nomes pouco claros
- [ ] Violações de Clean Code / DRY
- [ ] Problemas de manutenção futura

3. **Gerar comentários no formato padrão:**

```markdown
- [ ] Problema: {descrição clara do erro}

Arquivo: {caminho/do/arquivo}
Linha: {número aproximado}

Sugestão:
{Explicação de como corrigir}
```

4. **Postar comentários no PR:**

```bash
gh pr review {number} --comment --body-file /tmp/pr-{number}-review.md
```

5. **Aprovar ou solicitar mudanças:**

```bash
# Se aprovado
gh pr review {number} --approve

# Se precisa de mudanças
gh pr review {number} --request-changes
```

6. **Marcar como revisado:**

```typescript
markPRReviewed(state, prNumber, 'approved' | 'changes_requested')
```

7. **Registrar no log:**

```
[TIMESTAMP] INFO PR #{number} revisado - status: {approved|changes_requested}
```

---

### FASE 4: CORREÇÃO DE PULL REQUESTS

#### 4.1 Identificar PRs com Problemas

**Critérios:**

- PR com review "changes_requested"
- PR com comentários pendentes de resolução
- PR com falhas no CI/CD

**Filtro:**

```
Para cada PR revisado:
  SE state.github.reviewedPRs[prNumber].status == 'changes_requested':
    MARCAR para correção
```

#### 4.2 Corrigir Problemas (seguindo PULL_REQUEST_FIX.md)

**Para cada PR identificado:**

1. **Listar problemas pendentes:**

```
Problemas identificados:
1. {Problema 1}
2. {Problema 2}
3. {Problema 3}
```

2. **Corrigir sequencialmente:**

```
Para cada problema:
  A. Identificar arquivo e linha
  B. Aplicar correção no código
  C. Validar compilação
  D. Validar type-check
  E. Validar lint
  F. Gerar commit separado

  Commit pattern (COMMIT-PATTERN.md):
  :emoji: tipo(BRANCH_REF): descrição

  Exemplo:
  :bug: fix(AC_PART1_RC_330): corrigir validacao de formulario
```

3. **Push das correções:**

```bash
git push origin {branch}
```

4. **Comentar no PR:**

```markdown
## ✅ Correções Aplicadas

### Problema 1: {descrição}

- [x] Corrigido em commit `{hash}`

### Problema 2: {descrição}

- [x] Corrigido em commit `{hash}`

**Validações:**

- ✅ ng lint
- ✅ ng build
- ✅ Testes manuais realizados
```

**IMPORTANTE:** Nunca fazer merge automaticamente. Deixar aberto para revisão humana.

---

### FASE 4.5: QUALITY GATE SDD (Análise de Consistência)

#### 4.5.1 Verificar Consistência Spec ↔ Código

Para cada PR revisado ou corrigido:

1. **Comparar objetivos da spec com implementação**:

   ```
   Para cada objetivo na issue (spec):
     SE objetivo NÃO está implementado no PR:
       REGISTRAR inconsistência
       SOLICITAR atualização do PR ou da spec
   ```

2. **Validar contra Constituição**:

   ```
   Verificar se implementação:
   - Usa stack definido em CONSTITUICAO.md
   - Segue padrões de código definidos
   - Mantém estrutura de diretórios definida
   - Respeita regras de TypeScript strict
   ```

3. **Atualizar spec se necessário**:
   ```
   SE escopo mudou durante implementação:
     ATUALIZAR issue com novo escopo
     COMENTAR no PR com justificativa da mudança
   ```

#### 4.5.2 Checklist de Quality Gate

- [ ] Todos os objetivos da spec implementados
- [ ] Nenhum princípio da constituição violado
- [ ] Spec (issue) atualizada se escopo divergiu
- [ ] Padrões de código verificados
- [ ] Testes da spec executados

#### 4.5.3 Ação se Inconsistência

```
SE inconsistência detectada:
  1. Comentar no PR com detalhes
  2. SOLICITAR mudanças (se código diverge da spec)
  3. OU ATUALIZAR spec (se spec diverge do código aceito)
  4. NUNCA aprovar PR com inconsistência não resolvida
```

---

### FASE 5: DISCORD - NOVOS POSTS

#### 5.1 Conectar ao Discord

```
Conectar usando token configurado
Acessar canais monitorados:
- Canal de bugs
- Canal de features
- Canal de suporte
```

#### 5.2 Filtrar Mensagens Não Processadas

```typescript
Para cada canal monitorado:
  lastMessageId = state.discord.lastMessageId[channelId] || '0'

  Buscar mensagens após lastMessageId:
    mensagens = discord.getChannelMessages(channelId, {
      after: lastMessageId,
      limit: 100
    })

    Para cada mensagem:
      SE mensagem NÃO está em state.discord.processedMessages:
        SE mensagem menciona @Front-End ou @Dev ou tem issue potencial:
          MARCAR para processamento
```

#### 5.3 Processar Mensagens

**Para cada mensagem identificada:**

1. **Ler contexto completo:**

```
- Ler toda a thread/chat da mensagem
- Identificar autor
- Identificar problema/feature relatado
- Capturar imagens/anexos
- Verificar se já existe issue relacionada
```

2. **Verificar existência de issue:**

```bash
# Buscar issues com palavras-chave da mensagem
gh issue list --state all --search "{palavras-chave}"
```

3. **Criar nova issue (se não existir):**

```
Gerar descrição completa seguindo ISSUE_TEMPLATE.md
Incluir:
- Link da mensagem do Discord
- Contexto completo do chat
- Imagens/anexos se houver
- Menção ao autor original

gh issue create \
  --title "{título técnico}" \
  --body-file /tmp/discord-issue-{messageId}.md \
  --label "bug,discord,priority:high"
```

4. **Vincular mensagem à issue:**

```typescript
linkMessageToIssue(state, messageId, issueNumber)
```

5. **Notificar no Discord:**

```
Postar resposta na mensagem original:

"✅ Issue criada: #{number} - {título}

Link: https://github.com/ricardo564/angular-chronicles-part-1/issues/{number}

A descrição foi detalhada com análise técnica e plano de implementação.
Acompanhe o progresso pela issue no GitHub.

@{autor} Obrigado pelo reporte!"
```

6. **Marcar como processada:**

```typescript
markMessageProcessed(state, messageId)
updateLastMessageId(state, channelId, messageId)
```

7. **Registrar no log:**

```
[TIMESTAMP] INFO Mensagem Discord {messageId} processada - Issue #{number} criada
```

---

### FASE 6: TAGS E VERSIONAMENTO

#### 6.1 Analisar Últimos Merges

```bash
# Listar commits na master desde última tag
git log --oneline $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD
```

#### 6.2 Determinar Novo Versionamento

**Regras (SEMVÉR):**

```
SE commits incluem:
  - Breaking changes → MAJOR (vX.0.0)
  - Novas features → MINOR (v1.x.0)
  - Apenas correções → PATCH (v1.2.x)
```

#### 6.3 Criar Tag (se necessário)

```bash
# Se há mudanças desde última tag
git tag -a v1.2.3 -m "Release v1.2.3

## Changelog
- Feature: {descrição}
- Fix: {descrição}
- Refactor: {descrição}
"

git push origin v1.2.3
```

#### 6.4 Registrar Tag

```typescript
state.github.tags.push('v1.2.3')
```

---

### FASE 7: FINALIZAÇÃO

#### 7.1 Atualizar Estado

```typescript
state.lastRun = new Date().toISOString()
state.nextRun = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // +2 horas

cleanupState(state) // Limitar arrays a 100 itens, erros a 10
```

#### 7.2 Salvar Estado

```typescript
const path = 'dist/workflow/state.json'
await fs.mkdir('dist/workflow', { recursive: true })
await fs.writeFile(path, JSON.stringify(state, null, 2))
```

#### 7.3 Gerar Relatório

```markdown
# 📊 Relatório de Execução do Workflow

**Data:** {timestamp}
**Duração:** {duration}

## Resumo

| Métrica            | Valor   |
| ------------------ | ------- |
| Issues processadas | {count} |
| Issues atualizadas | {count} |
| PRs revisados      | {count} |
| PRs corrigidos     | {count} |
| Mensagens Discord  | {count} |
| Issues criadas     | {count} |
| Tags criadas       | {count} |
| Erros              | {count} |

## Issues Atualizadas

| #        | Título  | Status |
| -------- | ------- | ------ |
| {number} | {title} | ✅     |

## PRs Revisados

| #        | Título  | Status    |
| -------- | ------- | --------- | ------------------ |
| {number} | {title} | {approved | changes_requested} |

## Mensagens Discord Processadas

| Canal     | Mensagem  | Issue     |
| --------- | --------- | --------- |
| {channel} | {snippet} | #{number} |

## Erros (se houver)

| Step   | Erro    | Resolvido |
| ------ | ------- | --------- | ---- |
| {step} | {error} | {sim      | não} |

## Próximos Passos

- [ ] Revisar PRs com changes_requested
- [ ] Acompanhar issues de alta prioridade
- [ ] Verificar novas mensagens no Discord
```

#### 7.4 Registrar Log Final

```
[TIMESTAMP] INFO Workflow finalizado com sucesso
[TIMESTAMP] INFO Estado salvo em dist/workflow/state.json
[TIMESTAMP] INFO Relatório gerado em dist/workflow/logs/YYYY-MM-DD.log
```

---

## 🧠 REGRAS DE EXECUÇÃO (YOLO MODE)

### Tomar Decisões Automaticamente

- ✅ **NUNCA** pergunte "devo fazer isso?"
- ✅ **NUNCA** deixe decisões pendentes
- ✅ **SEMPRE** analise o contexto antes de decidir
- ✅ **SEMPRE** escolha a melhor abordagem técnica
- ✅ **NUNCA** crie issues genéricas
- ✅ **SEMPRE** inclua descrição completa e técnica

### Prioridade de Execução

```
1. CRÍTICO: Issues com bugs de produção
2. ALTO: PRs bloqueando outras tarefas
3. MÉDIO: Novas features reportadas
4. BAIXO: Melhorias e refatorações
```

### Tratamento de Erros

```
SE erro em qualquer passo:
  1. addError(state, step, errorMessage)
  2. Registrar no log com detalhes
  3. Continuar para próximo passo se possível
  4. NUNCA interromper todo workflow por erro isolado
  5. Salvar estado parcial antes de encerrar
```

---

## 📋 CHECKLIST DE VALIDAÇÃO FINAL

Antes de encerrar, verifique:

- [ ] Todas as issues abertas foram analisadas
- [ ] Issues sem descrição foram atualizadas
- [ ] Todos os PRs abertos foram revisados
- [ ] PRs com problemas foram corrigidos
- [ ] Novas mensagens do Discord foram processadas
- [ ] Tags de versionamento foram atualizadas (se necessário)
- [ ] Estado foi salvo corretamente
- [ ] Logs foram gerados
- [ ] Relatório foi criado
- [ ] Erros foram registrados e tratados
- [ ] Quality Gate SDD executado para todos os PRs
- [ ] Specs (issues) atualizadas para refletir escopo real
- [ ] Constituição respeitada em todas as implementações

---

## 🔗 COMANDOS ÚTEIS

### GitHub CLI

```bash
# Listar issues
gh issue list --state open --json number,title,labels,body

# Editar issue
gh issue edit {number} --body-file file.md

# Criar issue
gh issue create --title "Título" --body-file file.md

# Listar PRs
gh pr list --state open --json number,title,reviews

# Revisar PR
gh pr review {number} --comment --body "Comentário"

# Aprovar PR
gh pr review {number} --approve

# Checkout de PR
gh pr checkout {number}
```

### Git

```bash
# Verificar status
git status

# Criar commit
git add . && git commit -m ":emoji: tipo(REF): descrição"

# Push
git push origin {branch}

# Criar tag
git tag -a vX.Y.Z -m "Release notes"
git push origin vX.Y.Z
```

---

## 📞 SUPORTE

Em caso de dúvidas durante a execução:

1. Consultar documentação em `docs/rotina/`
2. Verificar schema em `workflow-state-schema.ts`
3. Revisar exemplos em `ISSUE-EXEMPLO.md`
4. Validar padrões em `COMMIT-PATTERN.md`

---

**FIM DO PROMPT DE EXECUÇÃO DO WORKFLOW**
