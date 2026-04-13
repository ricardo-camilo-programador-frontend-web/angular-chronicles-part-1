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
| **Tipo SDD** | `{Completa | Lite | Direto}` |
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
| **Prioridade** | {alta | média | baixa} |
| **Impacto** | {crítico | alto | médio | baixo} |

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
├── constants/
│   └── cadastro/
│       └── clientes/
│           └── pedido/
│               └── pedidos-table-columns.ts    # Atualizar colunas da tabela
├── services/
│   └── cart.service.ts            # Corrigir endpoint e métodos (Angular service)
├── components/
│   └── cart/
│       └── cart.component.ts        # Angular component
├── models/
│   └── order.model.ts              # Modelo de dados de pedidos
└── models/
    └── order-detail.model.ts
```

---

## 🛠 IMPLEMENTAÇÃO SUGERIDA

> **Nota SDD**: Esta seção é o **Plano Técnico** da spec. Deve conter decisões arquiteturais, 
> escolhas de tecnologia e definições claras de como implementar. O plano deve ser
> suficiente para que qualquer desenvolvedor (ou agente de IA) execute sem ambiguidade.

### Passo a Passo Técnico

#### 1. Correção do Endpoint no CartService

**Responsabilidade:** Garantir que o Angular service utilize o endpoint correto para operações CRUD

```ts
// src/app/services/cart.service.ts
// ANTES
this.http.put('/carrinho/itens', payload)

// DEPOIS
this.http.put(`/carrinho/${orderId}/itens`, payload)
```

**Arquivos:** `src/app/services/cart.service.ts`

#### 2. Correção do Método de Update

**Responsabilidade:** Injetar o `orderId` no payload da requisição e manter consistência com API

```ts
// Exemplo de método de update no CartService
updateCartItem(item: CartItem, orderId: string) {
  const { sequence, orderId: _, ...payload } = item
  // incluir orderId na payload se necessário pela API
  return this.http.put(`/carrinho/${orderId}/itens/${sequence}`, payload)
}
```

**Arquivos:** `src/app/services/cart.service.ts`

#### 3. Override do Método refreshAfterCRUD

**Responsabilidade:** Implementar refresh automático específico para itens do carrinho

```ts
// src/app/services/cart.service.ts
export class CartService {
  async refreshAfterCRUD(ids?: Array<string | number>) {
    const orderId = ids?.[1]
    if (!orderId) {
      return this.refreshItems()
    }
    if (ids && ids.length > 0) {
      return this.fetchItems({ endpoint: `carrinho/${orderId}/itens` })
    }
    return this.refreshItems()
  }
}
```

**Arquivos:** `src/app/services/cart.service.ts`

#### 4. Atualização das Colunas da Tabela

**Responsabilidade:** Alinhar colunas exibidas com estrutura real do banco de dados

```ts
// src/app/constants/orders-table-columns.ts
export const ordersTableColumns: TableColumn[] = [
  { key: 'orderId', label: 'Pedido ID', type: 'number' },
  { key: 'customerName', label: 'Cliente', type: 'text' },
  { key: 'items', label: 'Itens', type: 'text' },
  { key: 'total', label: 'Total', type: 'currency' },
  { key: 'status', label: 'Status', type: 'text' },
  { key: 'createdAt', label: 'Data', type: 'date' },
  { key: 'delivery', label: 'Entrega', type: 'text' }
]
```

**Arquivos:** `src/app/constants/orders-table-columns.ts`

### Separação por Responsabilidades

| Responsabilidade | Arquivo | Ação |
|------------------|---------|------|
| Endpoint de configuração | `cart.service.ts` | Corrigir |
| Lógica de update | `cart.service.ts` | Corrigir |
| Lógica de refresh | `cart.service.ts` | Adicionar override |
| Configuração de colunas | `orders-table-columns.ts` | Alterar completamente |
| Validação de tipos | `cart.service.ts` | Adicionar |

### Indicação de Refactor

**Oportunidades identificadas:**

1. Padronizar endpoints RESTful em todos os serviços de pedidos
2. Unificar checagens de payload com validação de tipos
3. Centralizar validações de input em um utilitário

```ts
// Exemplo de utilitário de validação futuro
export function assertRequired(value: any, name: string) {
  if (value == null) throw new Error(`${name} é obrigatório`)
}
```

---

## 🖼 REFERÊNCIA VISUAL (OBRIGATÓRIO SE HOUVER UI)

### Capturas de Tela - Erro 500 / Colunas Desatualizadas

**Antes (Erro):**
```
GET /carrinho/itens 500
Response: Cannot update without orderId
```

**Depois (Correção):**
```
PUT /carrinho/6/itens/1
Status: 200 OK
```

### Explicação

A diferença crítica está no endpoint:
- **Errado**: `/carrinho/itens` - genérico, não identifica o pedido
- **Certo**: `/carrinho/6/itens` - específico, identifica claramente o pedido

---

## 📏 REGRAS DE IMPLEMENTAÇÃO

### Padrões de Código

- ✅ **TypeScript rigoroso**: Tipagem completa em todos os métodos, sem `any`
- ✅ **DRY**: Reaproveitar lógica de validação se existir em outros lugares
- ✅ **Object Calisthenics**: Métodos com no máximo 5-8 linhas
- ✅ **Angular Services and Components**: Seguir padrões de DI e componentização
- ✅ **RxJS**: Utilizar operadores de forma segura e previsível
- ✅ **Clean Code**: Nomes descritivos como `codigoAssociado` em vez de `id`

### O Que Não Fazer

- ❌ Não duplicar lógica de validação que já exista em utilitários
- ❌ Não adicionar comentários óbvios como "atualiza item"
- ❌ Não criar tipos novos sem necessidade - usar existentes do projeto
- ❌ Não ignorar tratamento de erro - sempre validar `orderId` ou `codigoAssociado`
- ❌ Não deixar logs de debug (`console.log`) no código final

### Validações Obrigatórias

```ts
// Sempre validar dados de entrada
export function assertOrderId(id: string) {
  if (!id) throw new Error('orderId é obrigatório')
}
```

---

## 📦 ESTRUTURA FINAL

Onde cada arquivo deve ser criado/alterado:

```
src/
├── services/
│   └── cart.service.ts
├── constants/
│   └── orders-table-columns.ts
├── models/
│   └── order.model.ts
└── components/
    └── cart/
        └── cart.component.ts
```

---

## 📤 ENTREGÁVEL EXATO

### Types

```ts
// Exemplo existente no projeto
export interface Order {
  orderId: string
  customerName: string
  total: number
  status: string
  createdAt: string
}
```

### Composables

Nenhum composable novo necessário. Se necessário validar:

```ts
// Verificar se existe utilitário de validação
```

### Componentes

Nenhum componente novo necessário. Apenas validar integração no cart view existente:

```ts
<!-- app/components/cart/cart.component.ts -->
<!-- Verificar se está usando o service corretamente -->
<script lang="ts">
  // Exemplo de injeção de CartService
  constructor(private cartService: CartService) {}
</script>
```

### Integração

A integração já existe via componente de carrinho. Garantir que:

1. Service está exportando ações corretas
2. Componente está chamando ações do service
3. View está reagindo a mudanças de estado

### Exemplos de Uso

```ts
// Uso correto do cartService após correção
this.cartService.updateCartItem(item, orderId)
```

### Testes

- [ ] Teste unitário do método `updateCartItem`
- [ ] Teste de integração do fluxo completo de update no carrinho
- [ ] Testes de regressão de UI (tabela de pedidos)

---

## 🧪 TESTES

### Fluxos Manuais Obrigatórios

1. **Fluxo Principal - Atualização de Item do Carrinho**
   - [ ] Navegar para a página de pedidos
   - [ ] Atualizar itens do carrinho de um pedido
   - [ ] Verificar atualização sem erro 500

2. **Fluxo Alternativo - Atualizar com Dados Inválidos**
   - [ ] Tentar salvar com campos inválidos
   - [ ] Verificar validação de front-end

3. **Fluxo de Regressão - Listagem de Pedidos**
   - [ ] Atualizar a listagem para refletir alterações
   - [ ] Verificar 12 colunas conforme especificação

### Casos de Sucesso

- ✅ Pedido atualizado com sucesso e lista atualizada
- ✅ Filtros da listagem funcionam

### Casos de Erro

- ❌ Erro genérico ao chamar API
- ❌ Falha de validação de payload

### Validações

- [ ] Dados corretos no backend
- [ ] UI atualizada conforme esperado
- [ ] Mensagens de erro exibidas apropriadamente
- [ ] Performance não degradada
- [ ] Acessibilidade preservada

---

## 📚 REFERÊNCIAS TÉCNICAS

### Documentação Relacionada

- [Angular Official Docs](https://angular.io/)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Issues / PRs Relacionados

- #330 - Erro 500 ao atualizar itens do carrinho (esta issue)
- #331 - Colunas desatualizadas na listagem de pedidos (esta issue)

### PRs Relacionados

- PR #45 - Correção de endpoints de serviços de carrinho

### Arquivos de Referência do Projeto

- `docs/rotina/COMMIT-PATTERN.md` - Padrão de commits
- `docs/rotina/PULL_REQUEST_TEMPLATE.md` - Template de PRs
- `src/app/models/order.model.ts` - Modelo de dados de pedido
- `src/app/types/table-types.ts` - Tipos de tabela

---

## 🏷 LABELS SUGERIDAS

| Label | Aplicar | Justificativa |
|-------|---------|---------------|
| `bug` | ✅ Sim | Erro 500 é um bug crítico |
| `feature` | ❌ Não | Não é nova funcionalidade |
| `enhancement` | ✅ Sim | Atualização de colunas é melhoria |
| `refactor` | ❌ Não | Não é apenas refatoração |
| `priority:high` | ✅ Sim | Funcionalidade bloqueada em produção |
| `frontend` | ✅ Sim | Alterações na camada de apresentação |
| `store` | ❌ Não | Recurso não usa store Vue, usa service Angular |
| `typescript` | ✅ Sim | Código TypeScript tipado |

---

## 💬 NOTAS ADICIONAIS

### Contexto Histórico

Este exemplo demonstra como adaptar spec para um cenário de Angular, mantendo a estrutura e o rigor do SDD. A meta é refletir mudanças no backend e na UI do Food Hut sem quebrar padrões de spec.

### Decisões de Design

- Mantido o fluxo de atualização de itens do carrinho com endpoint específico
- Endpoints RESTful para recursos de pedidos
- Reuso de componentes existentes com injeção de CartService

### Restrições Técnicas

- Compatibilidade com a base de código Angular do Food Hut
- Manter tipagem forte e evitar `any`

### Considerações Especiais

- Testar com pedidos com vários itens
- Validar comportamento com filtros de pedidos
- Verificar responsividade da tela de pedidos

### Próximos Passos (Futuro)

- Automatizar testes de integração entre Carrinho e Listagem de Pedidos
- Unificar padrões de validação de payload entre serviços
- Documentar APIs utilizadas pelo Food Hut

(End of file - total 1)

---
