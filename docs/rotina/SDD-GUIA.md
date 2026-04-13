# SDD - Spec-Driven Development no angular-chronicles-part-1

## O que e SDD neste projeto

Spec-Driven Development significa que **especificacoes sao a fonte da verdade**, nao o codigo. O codigo e gerado a partir de specs, nunca o contrario.

No angular-chronicles-part-1, uma "spec" e uma issue do GitHub preenchida com o template `ISSUE_TEMPLATE.md`. A issue descreve o **que** deve ser feito, o **porque**, e o **como** (plano tecnico). O codigo implementa essa spec fielmente.

Se a spec esta incompleta ou confusa, a implementacao sera incompleta ou confusa. Por isso investir tempo na spec economiza tempo de implementacao.

---

## Fases do SDD no projeto

### 1. Constituicao

**Arquivo:** `CONSTITUICAO.md`

Principios inegociaveis do projeto. Toda spec deve respeitar a constituicao. Se uma spec contradiz a constituicao, a spec esta errada.

### 2. Especificacao (Spec)

**Arquivo:** `ISSUE_TEMPLATE.md`

Cada issue e uma spec viva. Contem:

- Contexto e motivacao
- Critérios de aceitacao claros
- Plano de implementacao sugerido
- Checklist de tarefas

A spec e escrita **antes** do codigo e atualizada se o escopo muda.

### 3. Plano Tecnico

Dentro da propria issue, na secao **IMPLEMENTACAO SUGERIDA**. Descreve:

- Quais arquivos serao criados/modificados
- Quais padroes serao usados
- Dependencias e riscos

### 4. Decomposicao em Tasks

Checklist dentro da issue ou em comentario. Cada item do checklist e uma unidade de trabalho atômica:

- [ ] Criar tipo `X` em `models/`
- [ ] Implementar composable `use-x`
- [ ] Criar componente `XComponent.vue`
- [ ] Adicionar rota
- [ ] Testes

### 5. Implementacao

**Arquivo:** `ISSUE_TO_PR_WORKFLOW.md`

Execucao do plano. Segue o fluxo:

1. Criar branch a partir da issue
2. Implementar seguindo o checklist
3. Commits seguindo `COMMIT-PATTERN.md`
4. Abrir PR com template `PULL_REQUEST_TEMPLATE.md`
5. Code review seguindo `PULL_REQUEST_REVIEW.md`

### 6. Analise (Quality Gate)

Verificacao final antes do merge:

- Spec descreve X, codigo implementa X?
- Todos os criterios de aceitacao foram atendidos?
- A constituicao foi respeitada?
- Nenhum padrao foi violado?

Se inconsistente, volta para ajuste.

---

## Quando usar SDD vs fluxo direto

### SDD completo (spec formal)

- Features novas
- Refactors grandes
- Mudancas arquiteturais
- Alteracoes que tocam mais de 1 modulo
- Qualquer coisa que precise de mais de 3 arquivos

**Regra pratica:** Se precisa de mais de 3 arquivos ou toca em mais de 1 modulo, use SDD.

### Fluxo direto (sem spec formal)

- Bugs triviais (correcao simples, causa ja conhecida)
- Typos e ajustes de texto
- Ajustes de CSS simples
- Hotfixes urgentes
- Alteracoes em arquivo unico

Mesmo no fluxo direto, a PR deve ter descricao clara do que foi feito e por que.

---

## Como specs vivem no projeto

1. **Spec nasce** como issue do GitHub usando `ISSUE_TEMPLATE.md`
2. **Spec e refinada** com comentarios e discussao antes da implementacao
3. **Spec e implementada** seguindo `ISSUE_TO_PR_WORKFLOW.md`
4. **Spec e consumida** quando a issue e fechada e o PR e merged
5. **Spec pode ser atualizada** se o escopo muda durante implementacao (editar a issue)

Uma spec nunca e "jogada fora". Se a feature e removida, a issue documenta o que existiu e por que foi removida.

---

## Referencias rapidas

| Arquivo                      | Para que serve                                |
| ---------------------------- | --------------------------------------------- |
| `CONSTITUICAO.md`            | Principios inegociaveis do projeto            |
| `ISSUE_TEMPLATE.md`          | Template para criar specs (issues)            |
| `ISSUE-EXEMPLO.md`           | Exemplo de spec preenchida                    |
| `ISSUE_TO_PR_WORKFLOW.md`    | Fluxo de implementacao: issue ate PR          |
| `COMMIT-PATTERN.md`          | Padrao de mensagens de commit (gitmoji)       |
| `VERSIONAMENTO.md`           | Regras de versionamento (SemVer)              |
| `PULL_REQUEST_REVIEW.md`     | Checklist de code review                      |
| `PULL_REQUEST_TEMPLATE.md`   | Template para PRs                             |
| `SEGURANCA-CODIGO.md`        | Politica de seguranca contra chars invisiveis |
| `IMPLEMENTACAO-SEGURANCA.md` | Implementacao da seguranca de codigo          |
| `GERENCIADOR.MD`             | Workflow principal do projeto                 |
| `AGENT-MAPPING-SDD.md`       | Mapeamento de fases SDD para agentes Paperclip|
| `SPEC-CODE-ALIGNMENT.md`     | Processo de auditoria spec/codigo             |
| `RETROSPECTIVA.md`           | Template de retrospectiva e feedback loop     |

---

## Resumo do ciclo

```
Constituicao (principios)
    |
    v
Spec (issue com template)
    |
    v
Plano tecnico (secao na issue)
    |
    v
Decomposicao (checklist)
    |
    v
Implementacao (branch + commits + PR)
    |
    v
Quality Gate (spec vs codigo)
    |
    v
Merge (spec consumida)
```

Spec primeiro, codigo depois. Sempre.
