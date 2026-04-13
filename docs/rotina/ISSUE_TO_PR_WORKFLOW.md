# Issue to PR Workflow

> Este fluxo segue **Spec-Driven Development (SDD)**: a issue (spec) é a fonte da verdade.
> Consulte `SDD-GUIA.md` para contexto completo.

Guia operacional para tratar issues sem pull request aberta, com fluxo completo de correcao, abertura de PR para `main`, descricao padronizada e code review.

## 1) Quando usar

Use este fluxo quando:

- a issue existe e ainda nao possui PR aberta vinculada;
- o problema esta descrito e possui contexto minimo para implementacao;
- a correcao deve seguir os padroes do repositório.

## 2) Pre-checagens obrigatorias

Antes de codar:

- confirme se nao existe PR aberta para a issue;
- valide se a base local esta sincronizada com `main`;
- delimite escopo tecnico da issue (o que entra e o que fica fora);
- identifique risco de regressao e area afetada.

Checklist:

- [ ] Issue sem PR aberta
- [ ] Base `main` atualizada
- [ ] Escopo definido
- [ ] Plano de validacao definido

## 3) Fase de Plano (SDD)

Antes de criar a branch, valide o plano tecnico:

### 3.1 Validar Spec

- a spec (issue) esta completa e atualizada
- o escopo esta claro e delimitado
- os objetivos sao acionaveis e testaveis

### 3.2 Decompor em Tasks

Para features non-trivial (SDD Completa), decomponha o plano em tasks atomicas:

- cada task = um agrupamento logico de alteracoes
- cada task = um commit potencial
- ordene por dependencia (o que precisa ser feito primeiro)
- identifique tasks de teste ANTES da implementacao

Modelo de decomposicao:

```
Task 1: [Tipo] Descricao breve
  Arquivos: caminho/arquivo1.ts, caminho/arquivo2.vue
  Acao: criar|alterar|remover
  Depende de: nenhuma

Task 2: [Tipo] Descricao breve
  Arquivos: caminho/arquivo3.ts
  Acao: alterar
  Depende de: Task 1
```

### 3.3 Checklist

- [ ] Spec validada como completa
- [ ] Tasks decompostas e ordenadas
- [ ] Dependencias mapeadas
- [ ] Criterios de aceite claros para cada task

## 4) Padrao de branch

Formato obrigatorio:

`type_numeroDaIssue_AC_PART1_descricao`

Regras:

- `type`: `fix`, `feat`, `chore`, `refactor`, `docs`, `perf`, `test`;
- `numeroDaIssue`: apenas numeros, sem `#`;
- `descricao`: curta, objetiva, em `lowercase`, sem acento, separada por `_`;
- sem espacos, sem caracteres especiais, sem sufixos aleatorios.

Exemplos validos:

- `fix_330_AC_PART1_corrigir_modal_criacao_pedido`
- `feat_1424_AC_PART1_adicionar_filtro_pedidos`

Exemplos invalidos:

- `fix/#330/AC PART1/modal` (caracteres invalidos)
- `Fix_330_AC_PART1_CorrigirModal` (capitalizacao fora do padrao)

## 5) Fluxo de execucao

### 5.1 Criar branch

```bash
git checkout main
git pull origin main
git checkout -b fix_<numeroIssue>_AC_PART1_<descricao>
```

### 5.2 Implementar a correcao da issue

Diretrizes:

- corrija a causa raiz, nao apenas o sintoma;
- mantenha escopo minimo necessario;
- preserve comportamento esperado fora do escopo;
- siga Clean Code, DRY e tipagem TypeScript;
- implemente task por task, seguindo a decomposicao do plano;
- apos cada task: valide localmente (lint, type-check);
- se o escopo divergir da spec: ATUALIZE a spec (issue) primeiro.

### 5.3 Validar localmente

Execute o que se aplica ao escopo:

```bash
ng lint
ng build
ng test
```

Checklist:

- [ ] Lint sem erro novo
- [ ] Type-check sem erro
- [ ] Testes relevantes executados
- [ ] Sem regressao funcional observavel

### 5.4 Commits

Siga estritamente `docs/rotina/COMMIT-PATTERN.md`.

Regras praticas:

- um commit por agrupamento logico;
- mensagem no formato definido com emoji e referencia da branch;
- sem commits genericos (`update`, `fixes`, `ajustes`).

## 6) Abrir PR para `main`

### 6.1 Push da branch

```bash
git push -u origin <nome-da-branch>
```

### 6.2 Criar PR

Regras obrigatorias:

- base da PR: `main`;
- referenciar issue com `Fixes #<numeroIssue>`;
- titulo claro e objetivo alinhado ao problema;
- descricao completa com contexto, causa raiz, correcao, testes e riscos.

Opcao via GitHub CLI:

```bash
gh pr create --base main --head <nome-da-branch> --title "<titulo-pr>" --body-file .github/PULL_REQUEST_FIX.md
```

## 7) Template minimo de descricao da PR

Use como base o padrao de `.github/PULL_REQUEST_FIX.md`.

Estrutura recomendada:

- Resumo do problema
- Causa raiz
- O que foi alterado
- Impacto esperado
- Como testar (passo a passo)
- Riscos e pontos de atencao
- Rollback plan
- Vinculo da issue (`Fixes #<numeroIssue>`)

Modelo enxuto:

```md
## Contexto

<problema e impacto>

## Causa raiz

<causa tecnica>

## Correcao aplicada

- <item 1>
- <item 2>

## Como testar

1. <passo>
2. <passo>
3. <resultado esperado>

## Riscos

- <risco principal e mitigacao>

## Rollback

<como reverter com seguranca>

Fixes #<numeroIssue>
```

## 8) Checklist de code review

Baseado em `docs/rotina/PULL_REQUEST_REVIEW.md`:

- [ ] A correcao resolve a causa raiz da issue
- [ ] Nao introduz regressao funcional
- [ ] Tipagem TypeScript consistente
- [ ] Sem duplicacao desnecessaria
- [ ] Sem imports nao utilizados
- [ ] Sem risco de seguranca obvio (input, auth, dados sensiveis)
- [ ] Complexidade cognitiva aceitavel
- [ ] Testes e validacoes suficientes para o escopo

Formato de comentario por problema:

```md
- [ ] Problema: <descricao objetiva>

Arquivo: <caminho/arquivo>
Linha: <linha aproximada>

Sugestao:
<acao concreta para corrigir>
```

## 9) Criterio de pronto

Considere o fluxo concluido quando:

- branch criada no padrao oficial;
- correcao aplicada e validada localmente;
- PR aberta para `main` com issue vinculada;
- descricao da PR completa;
- code review inicial executado com comentarios acionaveis;
- spec (issue) atualizada se escopo divergiu durante implementacao;
- quality gate SDD executado: spec ↔ codigo consistente.

## 10) Erros comuns

- abrir PR para branch diferente de `main`;
- branch fora do padrao `type_numeroDaIssue_AC_PART1_descricao`;
- PR sem `Fixes #<numeroIssue>`;
- descricao incompleta ou sem plano de teste;
- review superficial sem acao clara por problema.

(End of file - total 258)
