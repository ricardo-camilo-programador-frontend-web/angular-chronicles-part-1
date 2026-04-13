# Template de Spec (Issue) - Padrão Angular Chronicles Part 1

Este documento define o padrão obrigatório para descrições de issues no projeto Angular Chronicles Part 1.

## 🎯 Objetivo do Template

Gerar descrições de issues que funcionam como **especificações vivas (specs)** do comportamento esperado do software. No contexto de Spec-Driven Development (SDD), cada issue é uma spec que:

1. **Define O QUÊ** o software deve fazer (não como)
2. **Especifica POR QUE** é necessário (contexto e impacto)
3. **Detalha COMO** será implementado (plano técnico)
4. **Estabelece CRITÉRIOS** de aceite e validação

A spec é a fonte da verdade — o código deve implementar exatamente o que ela descreve.

Referência SDD: `SDD-GUIA.md` | Constituição: `CONSTITUICAO.md`

---

## ⚠ Regras Obrigatórias (CRÍTICO)

### O QUE FAZER

- ✅ **SEMPRE** gerar descrições detalhadas e específicas
- ✅ **SEMPRE** incluir contexto completo do problema
- ✅ **SEMPRE** analisar o projeto antes de sugerir alterações
- ✅ **SEMPRE** incluir link do post/origem
- ✅ **SEMPRE** incluir impacto do problema
- ✅ **SEMPRE** incluir possíveis arquivos afetados
- ✅ **SEMPRE** incluir fluxo técnico envolvido
- ✅ **SEMPRE** tomar decisões automaticamente (YOLO mode)
- ✅ **SEMPRE** validar ausência de caracteres invisíveis no código

### O QUE NÃO FAZER

- ❌ **NUNCA** gerar descrições superficiais como "Corrigir bug" ou "Melhorar performance"
- ❌ **NUNCA** fazer perguntas na descrição — tomar decisões automaticamente
- ❌ **NUNCA** omitir detalhes importantes
- ❌ **NUNCA** gerar tarefas genéricas como "Arrumar erro" ou "Verificar problema"
- ❌ **NUNCA** criar issues sem análise prévia do código
- ❌ **NUNCA** inserir caracteres Unicode invisíveis (U+FE00-U+FE0F, U+200B-U+200F, U+202A-U+202E)
- ❌ **NUNCA** usar Variation Selectors em código-fonte
- ❌ **NUNCA** permitir Zero-Width Characters em strings ou identificadores

### 🔒 Segurança de Código

**Validação obrigatória antes de criar/atualizar issues:**

1. **Scan de caracteres invisíveis**:
   - Verificar descrição em busca de Variation Selectors
   - Verificar comentários em busca de Zero-Width Characters
   - Verificar blocos de código em busca de caracteres proibidos

2. **Caracteres proibidos** (detecção automática):
   - U+FE00 a U+FE0F: Variation Selectors
   - U+E0100 a U+E01EF: Variation Selectors Supplement
   - U+200B a U+200F: Zero-Width Characters
   - U+202A a U+202E: Directional Formatting Characters

3. **Ação corretiva**:
   - Remover automaticamente caracteres proibidos
   - Manter apenas emojis legítimos em comentários (se necessário)
   - Validar código após limpeza

**Referência**: `docs/rotina/SEGURANCA-CODIGO.md`

---

## 📐 Classificação SDD da Spec

**Preencher no topo da issue ao criá-la:**

| Campo | Valor |
|-------|-------|
| **Tipo SDD** | `{Completa \| Lite \| Direto}` |
| **Justificativa** | `{Por que esta classificação}` |

**Guia rápido:**

| Tipo | Quando Usar | Template |
|------|-------------|----------|
| **SDD Completa** | Feature nova, refactor grande, 3+ arquivos, múltiplos módulos | ✅ Template completo (todas as seções) |
| **SDD Lite** | Bug non-trivial, feature pequena, 1-3 arquivos | ⚠ Problema + Análise + Implementação |
| **Direto** | Typo, CSS simples, hotfix urgente, arquivo único | ❌ Apenas descrição do problema + solução |

**Regra prática**: Se envolve mais de 3 arquivos ou toca em mais de 1 módulo → SDD Completa.

---

## 🧾 Template da Spec

Copie o bloco abaixo e preencha ao criar uma issue.

```markdown
<!--
  ESTA SPEC É A FONTE DA VERDADE.
  O código deve implementar exatamente o que está descrito aqui.
  Se o escopo mudar durante a implementação, ATUALIZE esta spec primeiro.
-->

# {Título Descritivo e Técnico}

## 🔗 Referência

| Campo | Valor |
|-------|-------|
| **Origem** | {Link do post/discord/bug report} |
| **Reportado por** | {Nome da pessoa/sistema} |
| **Data** | {YYYY-MM-DD} |
| **Prioridade** | {alta \| média \| baixa} |
| **Impacto** | {crítico \| alto \| médio \| baixo} |

**Contexto Resumido:**
{2-3 frases resumindo o cenário do problema}

---

## ⚠ PROBLEMA ATUAL

### Descrição Clara e Objetiva

{Descreva exatamente o que está acontecendo, incluindo:

- Comportamento atual observado
- Condições que desencadeiam o problema
- Frequência de ocorrência}

### Impacto no Sistema/Usuário

| Dimensão | Descrição |
|----------|-----------|
| **Usuários afetados** | {Quem está sendo impactado} |
| **Funcionalidades bloqueadas** | {O que não pode ser feito} |
| **Prejuízo** | {Qual o impacto negativo} |
| **Urgência** | {Por que precisa ser resolvido} |

### Riscos Envolvidos

- {Risco 1}
- {Risco 2}
- {Risco 3}

---

## 🎯 OBJETIVOS

- [ ] **Objetivo 1**: {Ação específica a ser tomada}
- [ ] **Objetivo 2**: {Ação específica a ser tomada}
- [ ] **Objetivo 3**: {Ação específica a ser tomada}

---

## 🧠 ANÁLISE TÉCNICA

### Possível Causa Raiz

{Análise técnica do que pode estar causando o problema:

- Hipóteses fundamentadas
- Pontos de falha identificados
- Padrões problemáticos observados}

### Fluxo Atual vs Fluxo Esperado

#### Fluxo Atual (Problemático)

```
1. {Passo 1}
2. {Passo 2 — onde ocorre o erro}
3. {Resultado: erro/comportamento indesejado}
```

#### Fluxo Esperado (Correto)

```
1. {Passo 1}
2. {Passo 2 — processamento correto}
3. {Resultado: sucesso/comportamento esperado}
```

### Dependências Envolvidas

| Tipo | Nome | Impacto |
|------|------|---------|
| **Stores** | `{nome-store.ts}` | `{Como afeta}` |
| **Composables** | `{useNome.ts}` | `{Como afeta}` |
| **APIs** | `{endpoint}` | `{Como afeta}` |
| **Componentes** | `{NomeComponent.vue}` | `{Como afeta}` |

---

## 📂 POSSÍVEIS ARQUIVOS AFETADOS

```
src/
├── {caminho/para/arquivo1.ts}    # {Motivo da alteração}
├── {caminho/para/arquivo2.ts}    # {Motivo da alteração}
└── {caminho/para/arquivo3.ts}    # {Motivo da alteração}
```

---

## 🛠 IMPLEMENTAÇÃO SUGERIDA

> **Nota SDD**: Esta seção é o **Plano Técnico** da spec. Deve conter decisões arquiteturais,
> escolhas de tecnologia e definições claras de como implementar. O plano deve ser
> suficiente para que qualquer desenvolvedor (ou agente de IA) execute sem ambiguidade.

### Passo a Passo Técnico

#### 1. {Nome da Etapa}

**Responsabilidade:** {O que esta etapa resolve}

```typescript
// Exemplo de código ou pseudocódigo
// Descreva a lógica esperada
```

**Arquivos:** `{caminho/do/arquivo.ts}`

#### 2. {Nome da Etapa}

**Responsabilidade:** {O que esta etapa resolve}

```typescript
// Exemplo de código ou pseudocódigo
```

**Arquivos:** `{caminho/do/arquivo.ts}`

### Separação por Responsabilidades

| Responsabilidade | Arquivo | Ação |
|------------------|---------|------|
| {ex: Validação} | `{arquivo}` | `{criar \| alterar \| remover}` |
| {ex: Regra de Negócio} | `{arquivo}` | `{criar \| alterar \| remover}` |
| {ex: UI} | `{arquivo}` | `{criar \| alterar \| remover}` |

### Indicação de Refactor (quando necessário)

{Se aplicável, descreva refatorações necessárias:

- Código duplicado a ser eliminado
- Padrões a serem seguidos
- Melhorias de arquitetura}

---

## 🖼 REFERÊNCIA VISUAL (OBRIGATÓRIO SE HOUVER UI)

{Anexar imagens do problema ou do comportamento esperado}

**Explicação:**
{Descrever o que deve ser seguido nas imagens}

---

## 📏 REGRAS DE IMPLEMENTAÇÃO

### Padrões de Código

- ✅ **TypeScript rigoroso**: Tipagem completa, sem `any`
- ✅ **DRY**: Não repetir lógica existente
- ✅ **Object Calisthenics**: Métodos curtos, classes coesas
- ✅ **Angular Components + Services**: Usar Angular padrão com TypeScript strict
- ✅ **VueUse**: Utilizar composables do VueUse quando aplicável
- ✅ **Clean Code**: Nomes descritivos, código legível

### O Que Não Fazer

- ❌ Não duplicar lógica existente em outros arquivos
- ❌ Não adicionar comentários desnecessários (código deve ser autoexplicativo)
- ❌ Não criar componentes genéricos sem necessidade real
- ❌ Não ignorar tratamentos de erro
- ❌ Não deixar `console.log` no código final

---

## 📤 ENTREGÁVEL EXATO

### Types

```typescript
// Definir tipos necessários
export interface {NomeInterface} {
  // campos
}
```

### Stores / Composables

```typescript
// Definir stores/composables necessários
export function useNome() {
  // lógica
}
```

### Componentes (se aplicável)

```vue
<!-- NomeComponent.vue -->
<script setup lang="ts">
// lógica
</script>

<template>
  <!-- template -->
</template>
```

### Integração

{Descrever como os novos elementos se integram ao existente}

---

## 🧪 TESTES

### Fluxos Manuais Obrigatórios

1. **Fluxo Principal**
   - [ ] Acessar {tela/rota}
   - [ ] Executar {ação}
   - [ ] Verificar {resultado esperado}

2. **Fluxo Alternativo**
   - [ ] Acessar {tela/rota}
   - [ ] Executar {ação alternativa}
   - [ ] Verificar {resultado esperado}

3. **Fluxo de Exceção**
   - [ ] Acessar {tela/rota}
   - [ ] Provocar {erro/condição}
   - [ ] Verificar {tratamento}

### Casos de Sucesso

- ✅ {Cenário 1}: {Resultado esperado}
- ✅ {Cenário 2}: {Resultado esperado}

### Casos de Erro

- ❌ {Cenário de erro 1}: {Tratamento esperado}
- ❌ {Cenário de erro 2}: {Tratamento esperado}

### Validações

- [ ] Dados corretos no backend
- [ ] UI atualizada conforme esperado
- [ ] Mensagens de erro/exibição adequadas
- [ ] Performance não degradada
- [ ] Acessibilidade preservada

---

## 📚 REFERÊNCIAS TÉCNICAS

### Documentação Relacionada

- {Link para documentação externa ou interna}

### Issues / PRs Relacionados

- #{número} - {descrição breve}

---

## 🏷 LABELS SUGERIDAS

| Label | Aplicar |
|-------|---------|
| `bug` | {sim \| não} |
| `feature` | {sim \| não} |
| `enhancement` | {sim \| não} |
| `refactor` | {sim \| não} |
| `priority:high` | {sim \| não} |
| `priority:medium` | {sim \| não} |
| `priority:low` | {sim \| não} |

---

## 💬 NOTAS ADICIONAIS

{Informações complementares importantes:

- Contexto histórico
- Decisões de design
- Restrições técnicas
- Considerações especiais}
```

---

## 🧠 Modo de Execução (YOLO MODE)

Ao criar issues utilizando este template:

### Tomar Decisões Automaticamente

- **NÃO** pergunte "qual a melhor abordagem?"
- **NÃO** deixe "a definir" ou "TBD"
- **NÃO** peça confirmação para decisões técnicas
- **SIM** analise o código e proponha a solução completa
- **SIM** tome decisões baseadas no contexto do projeto

### Priorizar Produtividade e Clareza

- Seja específico em vez de genérico
- Seja acionável em vez de descritivo
- Seja técnico em vez de superficial
- Seja completo em vez de resumido

### Base para Decisões

Utilize o contexto do projeto para decidir:

1. **Arquitetura**: Siga padrões existentes no projeto
2. **Nomenclatura**: Use convenções já estabelecidas
3. **Estrutura**: Mantenha organização consistente
4. **Implementação**: Prefira soluções já utilizadas

---

## 🔍 Quality Gate SDD

Antes de considerar a spec pronta para implementação, valide:

### Consistência com Constituição

- [ ] A spec respeita o stack tecnológico definido em `CONSTITUICAO.md`
- [ ] Os padrões de código sugeridos estão alinhados com `CONSTITUICAO.md`
- [ ] A estrutura de diretórios segue a organização definida

### Completude da Spec

- [ ] O QUÊ está claro (objetivos)
- [ ] O POR QUÊ está documentado (impacto e contexto)
- [ ] O COMO está definido (implementação sugerida)
- [ ] Os CRITÉRIOS de aceite estão explícitos (testes)
- [ ] Os ARQUIVOS afetados estão mapeados

### Rastreabilidade

- [ ] Cada objetivo tem um entregável correspondente
- [ ] Cada arquivo afetado tem uma ação clara (criar/alterar/remover)
- [ ] As dependências entre etapas estão identificadas

---

## 📋 CHECKLIST DE VALIDAÇÃO

Antes de finalizar uma issue, verifique:

- [ ] Classificação SDD definida (Completa / Lite / Direto)
- [ ] Título é descritivo e técnico
- [ ] Link de origem está presente
- [ ] Problema está claramente descrito
- [ ] Impacto está detalhado
- [ ] Objetivos são acionáveis
- [ ] Análise técnica está fundamentada
- [ ] Fluxo atual vs esperado está documentado
- [ ] Arquivos afetados estão listados
- [ ] Implementação sugerida é viável e com exemplos
- [ ] Referências visuais estão presentes (se aplicável)
- [ ] Regras de implementação estão claras
- [ ] Entregáveis estão especificados
- [ ] Testes estão descritos
- [ ] Labels sugeridas estão indicadas

---

## 🔗 ARQUIVOS RELACIONADOS

| Arquivo | Para que serve |
|---------|---------------|
| `SDD-GUIA.md` | Guia do ciclo SDD completo |
| `CONSTITUICAO.md` | Princípios inegociáveis do projeto |
| `ISSUE-EXEMPLO.md` | Exemplo de spec preenchida |
| `ISSUE_TO_PR_WORKFLOW.md` | Fluxo de implementação: issue até PR |
| `COMMIT-PATTERN.md` | Padrão de mensagens de commit (gitmoji) |
| `VERSIONAMENTO.md` | Regras de versionamento (SemVer) |
| `PULL_REQUEST_REVIEW.md` | Checklist de code review |
| `PULL_REQUEST_TEMPLATE.md` | Template para PRs |
| `SEGURANCA-CODIGO.md` | Política de segurança contra chars invisíveis |
| `GERENCIADOR.MD` | Workflow principal do projeto |
