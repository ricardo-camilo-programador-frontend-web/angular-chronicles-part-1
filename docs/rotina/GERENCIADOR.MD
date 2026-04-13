# Workflow de Gerenciamento - Angular Chronicles Part 1

> Este workflow segue os princípios de **Spec-Driven Development (SDD)**.
> Consulte `SDD-GUIA.md` para entender como SDD se aplica ao projeto
> e `CONSTITUICAO.md` para os princípios inegociáveis.

Execute sequencialmente a rotina a seguir ate completar todos os passos.

## Inicializacao

Antes de iniciar, carregue o estado do workflow:

1. Leia o arquivo `dist/workflow/state.json`
2. Se nao existir, crie um estado inicial seguindo o schema em `workflow-state-schema.ts`
3. Consulte `workflow-state.md` para detalhes do formato

### 0.2 Carregar Constituicao

- Leia `CONSTITUICAO.md` para os principios do projeto
- Valide que as operacoes seguintes respeitam a constituicao

## Passo 1: GitHub

Analise o projeto no GitHub e utilizando o GitHub CLI procure, atualize ou corrija:

### 1.1 Issues sem descricao ou descricao incompleta

- Filtre apenas issues NAO processadas (nao estao em `state.github.processedIssues`)
- Analise o contexto da issue (titulo, labels, comentarios, codigo relacionado)
- **Atualize a descricao seguindo o padrao em `ISSUE_TEMPLATE.md`**:
  - Inclua link de origem/contexto
  - Descreva o problema de forma clara e tecnica
  - Detalhe o impacto no sistema/usuario
  - Liste objetivos acionaveis
  - Inclua analise tecnica com possiveis causas
  - Mapeie arquivos afetados
  - Sugira implementacao passo a passo
  - Defina criterios de teste
  - Sugira labels apropriadas
- **Validar como spec SDD**: Verificar se a issue segue o padrao de spec viva
  - Spec deve conter: problema, objetivos, analise tecnica, implementacao sugerida
  - Se incompleta como spec, completar seguindo `ISSUE_TEMPLATE.md`
  - Referencia: `SDD-GUIA.md` para criterios de spec completa
- **Regras obrigatorias**:
  - NUNCA gere descricoes superficiais
  - SEMPRE inclua contexto completo
  - SEMPRE analise o projeto antes de sugerir
  - NUNCA faca perguntas - tome decisoes (YOLO mode)
- Marque a issue como processada: `markIssueProcessed(state, issueNumber)`

### 1.2 Issues sem labels

- Filtre apenas issues NAO processadas
- Atualize as labels de acordo com o esperado
- Marque a issue como processada

### 1.3 Issues sem Pull Request vinculado

- Filtre apenas issues NAO processadas
- Faca a correcao seguindo o padrao em: `PULL_REQUEST_FIX.md`
- **IMPORTANTE**: Nunca faca o merge, deixe aberto para revisao humana
- Marque a issue como processada

### 1.4 Pull Requests sem revisao ou revisados ha mais de 2 horas

- Verifique se o PR precisa de revisao usando `needsReReview(state, prNumber, 2)`
- Se precisar, realize a revisao seguindo: `PULL_REQUEST_REVIEW.md`
- Apos revisar, marque: `markPRReviewed(state, prNumber, status)`

### 1.5 Tags e Versionamento

- Analise os ultimos merges para master
- Atualize tags e versionamento do projeto seguindo o padrao
- Registre novas tags em `state.github.tags`

## Passo 1.6: Quality Gate SDD (Analise de Consistencia)

Para cada issue com PR vinculado, verifique:

### 1.6.1 Consistencia Spec ↔ Codigo

- A implementacao no PR resolve TODOS os objetivos da spec (issue)?
- A implementacao respeita a constituicao do projeto (`CONSTITUICAO.md`)?
- A spec (issue) precisa ser atualizada para refletir mudancas no escopo?

### 1.6.2 Auditoria Spec ↔ Codigo

Execute a auditoria completa seguindo `SPEC-CODE-ALIGNMENT.md`:
- Extrair requisitos da spec (issue)
- Mapear requisitos para arquivos modificados no diff
- Verificar cobertura: cada requisito tem codigo correspondente?
- Verificar escopo inverso: codigo que nao corresponde a nenhum requisito?
- Calcular score de alinhamento e classificar: ALINHADO, DIVERGENTE_PARCIAL ou DIVERGENTE_CRITICO

### 1.6.3 Checklist de Validacao

- [ ] Auditoria Spec ↔ Codigo executada (`SPEC-CODE-ALIGNMENT.md`)
- [ ] Todos os objetivos da spec foram implementados
- [ ] Nenhum principio da constituicao foi violado
- [ ] Padroes de codigo seguem CONSTITUICAO.md
- [ ] Spec (issue) esta atualizada com o escopo real
- [ ] Testes descritos na spec foram executados

### 1.6.4 Acao se Inconsistencia

SE spec e codigo divergem:
  1. ATUALIZAR a spec (issue) para refletir a implementacao real
  2. OU SOLICITAR mudancas no PR para alinhar com a spec
  3. NUNCA ignorar a divergencia

## Passo 2: Discord

Analise os apontamentos no Discord e verifique se ha issues criadas.

### 2.1 Filtrar mensagens

- Consulte apenas mensagens NAO processadas (nao estao em `state.discord.processedMessages`)
- Use `state.discord.lastMessageId[channelId]` para paginar

### 2.2 Criar issues

- Para cada mensagem sem issue vinculada:
  - Leia todo o chat da publicacao para obter contexto completo
  - Crie a issue seguindo o padrao do projeto
  - Vincule: `linkMessageToIssue(state, messageId, issueNumber)`

### 2.3 Notificar no Discord

- Para cada issue criada:
  - Adicione um comentario na publicacao do Discord com o link da issue
  - Marque `@Front-End` se aplicavel

### 2.4 Marcar processadas

- Marque cada mensagem processada: `markMessageProcessed(state, messageId)`
- Atualize o ultimo ID: `updateLastMessageId(state, channelId, messageId)`

## Finalizacao

Ao terminar, salve o estado:

1. Atualize `state.lastRun` com timestamp atual
2. Incremente `state.stats.totalRuns`
3. Execute `cleanupState(state)` para limitar tamanho
4. Salve em `dist/workflow/state.json`
5. Registre logs em `dist/workflow/logs/YYYY-MM-DD.log`

## Tratamento de Erros

Se ocorrer erro em qualquer passo:

1. Registre com `addError(state, step, errorMessage)`
2. Continue para o proximo passo se possivel
3. Salve o estado parcial antes de encerrar
4. Nao interrompa todo o workflow por um erro isolado

## 🔒 Segurança de Código (CRÍTICO)

### Validação de Caracteres Invisíveis

**ANTES de qualquer operação**, verifique:

1. **Issues/PRs do GitHub**:
   - Scan de caracteres invisíveis em descrições e comentários
   - Remover automaticamente Variation Selectors (U+FE00-U+FE0F)
   - Remover Zero-Width Characters (U+200B-U+200F)
   - Remover Directional Formatting (U+202A-U+202E)

2. **Código-fonte**:
   - NUNCA aceitar código com caracteres invisíveis
   - SEMPRE executar scan antes de commit
   - AUTOMATICAMENTE remover se detectar

3. **Documentação**:
   - Permitido apenas emojis legítimos em comentários
   - Proibido em strings, identificadores, lógica

**Referência**: `SEGURANCA-CODIGO.md` (obrigatório)

### Scripts de Validação

```bash
# Scan de segurança
python scripts/scan-invisible-chars.py

# Limpeza automática
python scripts/clean-invisible-chars.py
```

### Regra de Bloqueio

**SE detectar caracteres invisíveis:**
- ❌ BLOQUEAR operação
- ⚠ ALERTAR equipe
- 🧹 LIMPAR imediatamente
- 📝 REGISTRAR incidente

## Arquivos de Referencia

- **Template de Issues**: `ISSUE_TEMPLATE.md` (PADRÃO OBRIGATÓRIO para descrições)
- Schema do Estado: `workflow-state-schema.ts`
- Documentacao do Estado: `workflow-state.md`
- Template de PR: `PULL_REQUEST_TEMPLATE.md`
- Revisao de PR: `PULL_REQUEST_REVIEW.md`
- Correcao de PR: `PULL_REQUEST_FIX.md`
- Padrao de Commit: `COMMIT-PATTERN.md`
- **Guia SDD**: `SDD-GUIA.md` (workflow Spec-Driven Development)
- **Constituicao**: `CONSTITUICAO.md` (principios inegociaveis do projeto)
- **Auditoria Spec ↔ Codigo**: `SPEC-CODE-ALIGNMENT.md` (processo de alinhamento spec/codigo)
- **Mapeamento de Agentes**: `AGENT-MAPPING-SDD.md` (fases SDD x agentes Paperclip)
- **Retrospectiva**: `RETROSPECTIVA.md` (feedback loop e melhoria continua)
