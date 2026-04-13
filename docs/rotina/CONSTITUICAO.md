# CONSTITUICAO - Principios Inegociaveis do angular-chronicles-part-1

Este documento e a "lei" do projeto. Nenhuma spec, issue ou PR pode violar os principios definidos aqui. Se algo aqui descrito precisa mudar, a propria constituicao deve ser atualizada primeiro, com aprovacao e conscientizacao da equipe.

---

## 1. Stack Tecnologica (Imutavel)

| Camada      | Tecnologia                | Detalhe                                             |
| ----------- | ------------------------- | --------------------------------------------------- |
| Framework   | Angular 19                | Angular Components + Services                          |
| Linguagem   | TypeScript                | Strict mode, zero any                               |
| Estado      | RxJS (Services/Signals)   | Reactive state via services/observables               |
| Roteamento  | Angular Router            | Route guards for auth and permissions                 |
| Formularios | Angular Reactive Forms    | Primary forms handling via Reactive Forms              |
| UI/CSS      | TailwindCSS + DaisyUI     | Mobile-first, utility classes                         |
| Build       | Angular CLI               | Porta 4200                                           |
| Backend     | REST API (Externo, via HttpClient) | Externo, via HttpClient                        |
| PWA         | Angular Service Worker (@angular/service-worker) | App Shell caching                               |
| Testes      | Karma + Jasmine           | Local unit/integration tests                            |
| Linting     | Angular CLI linting + ESLint | Linting via Angular CLI with ESLint                   |
| Deploy      | Netlify                   | Producao                                            |

Nenhuma dessas tecnologias pode ser substituída ou adicionada sem atualizar esta secao.

---

## 2. Padroes de Codigo (Nao Negociaveis)

### TypeScript

- Zero `any`. Se o tipo e desconhecido, use `unknown` e faca type narrowing.
- Zero `@ts-ignore`. Zero `@ts-expect-error`.
- Prefira interfaces a classes e enums.
- `import type` para importacoes exclusivas de tipo.
- Tipos explicitos em retornos de funcoes publicas.

### Angular

- Componentes Angular com @Input() para bindings de entrada.
- @Output() com EventEmitter para eventos de saida.
- Componentes e Services em vez de Composables. Exportação de classes para serviços e componentes.

### Nomenclatura

| Elemento         | Padrao          | Exemplo                         |
| ---------------- | --------------- | ------------------------------- |
| Arquivos         | kebab-case      | `use-autenticacao.ts`           |
| Componentes      | PascalCase (Component) | `AssociadoComponent.ts`          |
| Services         | PascalCase (Service)   | `auth.service.ts`                |
| Dispos           | (Nomenclatura de serviços)/Diretorios |                                 |
| Tipos/Interfaces | PascalCase      | `Associado`, `BaseEntityConfig` |
| Funcoes          | camelCase       | `buscarAssociado`               |

### Principios

- Early returns. Sem arrow code profundo.
- Funcoes puras quando possivel.
- DRY (Don't Repeat Yourself).
- Clean Code + Object Calisthenics.
- RxJS patterns when applicable (nao reinventar roda).
- Angular CLI linting + ESLint para linting (ambos devem passar).

---

## 3. Arquitetura (Estrutura Fixa)

```
src/
├── app/                 # Aplicacao Angular principal
│   ├── components/      # Componentes reutilizaveis
│   ├── pages/           # Pages (rotas)
│   ├── services/        # Services para logica de negocio
│   ├── configs/         # Configs de aplicativo
│   ├── assets/          # Assets estaticos
│   ├── styles/          # Styles globais
│   ├── types/           # Tipos globais
│   ├── utils/           # Funcoes utilitarias
│   └── app-routing.module.ts  # Roteamento principal
├── assets/              # Recursos de projeto
├── environments/        # Configuracoes de ambiente
├── constants/           # Global constants
├── styles.css           # Styles globais
└── index.html
```

### Regras de estrutura
- `adapters/` para integrações externas (ex: API CNPJ com fallback).
- `components/` para componentes reutilizaveis entre views.
- `services/` para logica reutilizavel (via Angular Services).
- `pages/` para paginas. Uma página por rota.
- `configs/` para configuracoes globais.
- `assets/` para assets estaticos.
- `styles/` para estilos globais (CSS/Tailwind).
- `types/` para tipos TypeScript globais.
- `utils/` para funcoes utilitarias.
- Novos diretórios nao sao criados sem justificativa e atualizacao desta secao.

### Regras de estrutura

- `src/app/` para a estrutura Angular (componentes, paginas, services, configs).
- `src/app/components/` para componentes reutilizaveis entre views.
- `src/app/pages/` para rotas/paginas.
- `src/app/services/` para logica de negocio (serviços).
- `src/app/configs/` para configurações da aplicação.
- `src/assets/` para assets estáticos.
- `src/styles/` para estilos globais (Tailwind/CSS).
- `src/types/` para tipos globais de infraestrutura.
- `src/utils/` para utilidades.
- `src/constants/` para constantes globais.

Novos diretórios nao sao criados sem justificativa e atualizacao desta secao.

---

## 4. Seguranca de Codigo

- Caracteres Unicode invisiveis sao **PROIBIDOS** no codigo-fonte.
- Scan obrigatorio antes de commits: `python scripts/scan-invisible-chars.py`
- Limpeza disponivel: `python scripts/clean-invisible-chars.py`
- Detalhes completos: `SEGURANCA-CODIGO.md`

---

## 5. Convencoes de Commit

Formato obrigatorio:

```
:emoji: tipo(BRANCH_REF): descricao
```

- Emojis seguem Gitmoji (`:sparkles:`, `:bug:`, `:fire:`, etc.)
- Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`, `perf`
- BRANCH_REF e opcional
- Descricao sem acentuacao exclusiva do portugues

Detalhes completos: `COMMIT-PATTERN.md`

---

## 6. Versionamento

- SemVer 2.0.0 obrigatorio (`MAJOR.MINOR.PATCH`)
- Tags anotadas (`git tag -a v1.2.3 -m "descricao"`)
- BREAKING CHANGE = major
- Nova feature = minor
- Bug fix = patch

Detalhes completos: `VERSIONAMENTO.md`

---

## 7. Principios SDD

### Spec primeiro, codigo depois

Para features, refactors e qualquer trabalho nao trivial, a spec (issue) vem antes do codigo. Nao abrir PR sem issue correspondente.

### Issues sao specs vivas

Manter a issue atualizada durante toda a implementacao. Se o escopo muda, a spec muda junto. Nunca implementar algo que diverge da spec sem atualiza-la.

### Constituicao e a lei

Nenhuma spec pode violar esta constituicao. Se uma spec pede algo que contradiz os principios aqui definidos, a spec precisa ser reformulada.

### Quality gate antes de merge

Antes de merge, verificar:

1. Spec descreve X e codigo implementa X (consistencia)
2. Criterios de aceitacao todos atendidos
3. Constituicao respeitada
4. Padroes de codigo seguidos (lint, type-check, testes)
5. Seguranca de codigo verificada (scan de chars invisiveis)

---

_Esta constituicao entra em vigor a partir da data de criacao e so pode ser alterada com acordo da equipe._
