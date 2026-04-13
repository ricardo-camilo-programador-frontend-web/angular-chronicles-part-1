# Commit Message Pattern Guide

Este documento define o padrao de mensagens de commit utilizado no projeto angular-chronicles-part-1, baseado no [Gitmoji](https://gitmoji.dev/).

## Formato de Commit

O formato padrao para mensagens de commit e:

```
:emoji: tipo(BRANCH_REF): descricao do commit
```

### Componentes

- **:emoji:** - Emoji do Gitmoji (usar codigo textual, ex: `:fire:`)
- **tipo** - Tipo do commit (feat, fix, docs, etc.)
- **(BRANCH_REF)** - Referencia a branch (ex: `AC_PART1_ACTUALDATE(DD_MM_YYYY)`)
- **descricao** - Descricao clara e concisa do que foi alterado

### 🔒 Validação de Segurança (OBRIGATÓRIO)

**ANTES de cada commit:**

1. **Scan de caracteres invisíveis**:
   ```bash
   python scripts/scan-invisible-chars.py
   ```

2. **Verificar diff**:
   ```bash
   git diff --check
   ```

3. **Caracteres proibidos no código**:
   - ❌ U+FE00 a U+FE0F: Variation Selectors
   - ❌ U+E0100 a U+E01EF: Variation Selectors Supplement
   - ❌ U+200B a U+200F: Zero-Width Characters
   - ❌ U+202A a U+202E: Directional Formatting Characters

4. **Ação se detectar**:
   - 🧹 Limpar caracteres proibidos
   - ✅ Validar código limpo
   - 📝 Registrar se for incidente de segurança

**Referência**: `docs/rotina/SEGURANCA-CODIGO.md`

### Regras Importantes

1. **Agrupamento Logico**: Analise os arquivos modificados e agrupe-os logicamente, criando um commit para cada agrupamento
2. **Referencia da Branch**: Sempre inclua o trecho inicial do nome da branch entre parenteses
3. **Sem Acentuacao**: Nao use acentuacoes exclusivas do portugues brasileiro (ç, ã, etc.)
4. **Emoji no Inicio**: O emoji deve ser o primeiro elemento da mensagem

### Exemplos

```
:bug: fix(AC_PART1_RC_ACTUALDATE(DD_MM_YYYY)): corrigir validacao de formulario
:sparkles: feat(AC_PART1_ACTUALDATE(DD_MM_YYYY)): adicionar filtro de busca na lista
:rotating_light: fix(AC_PART1_ACTUALDATE(DD_MM_YYYY)): corrigir warnings do linter
:fire: refactor(AC_PART1_ACTUALDATE(DD_MM_YYYY)): remover codigo duplicado
```

## Emojis por Categoria

### Features & New Functionality

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| ✨ | `:sparkles:` | Introduce new features |
| 🎉 | `:tada:` | Begin a project |
| 👔 | `:necktie:` | Add or update business logic |
| 🚩 | `:triangular_flag_on_post:` | Add, update, or remove feature flags |

### Bug Fixes & Hotfixes

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 🐛 | `:bug:` | Fix a bug |
| 🚑 | `:ambulance:` | Critical hotfix |
| 🩹 | `:adhesive_bandage:` | Simple fix for a non-critical issue |
| 🥅 | `:goal_net:` | Catch errors |

### Code Quality & Refactoring

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 🎨 | `:art:` | Improve structure / format of the code |
| ♻ | `:recycle:` | Refactor code |
| ⚡ | `:zap:` | Improve performance |
| 🚨 | `:rotating_light:` | Fix compiler / linter warnings |
| 💩 | `:poop:` | Write bad code that needs to be improved |
| 🧐 | `:monocle_face:` | Data exploration/inspection |
| 🧑💻 | `:technologist:` | Improve developer experience |

### Documentation & Communication

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 📝 | `:memo:` | Add or update documentation |
| 💬 | `:speech_balloon:` | Add or update text and literals |
| ✏ | `:pencil2:` | Fix typos |
| 💡 | `:bulb:` | Add or update comments in source code |

### UI/UX & Design

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 💄 | `:lipstick:` | Add or update the UI and style files |
| ♿ | `:wheelchair:` | Improve accessibility |
| 🚸 | `:children_crossing:` | Improve user experience / usability |
| 📱 | `:iphone:` | Work on responsive design |
| 💫 | `:dizzy:` | Add or update animations and transitions |
| 🍱 | `:bento:` | Add or update assets |

### Dependencies & Configuration

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| ➕ | `:heavy_plus_sign:` | Add a dependency |
| ➖ | `:heavy_minus_sign:` | Remove a dependency |
| ⬆ | `:arrow_up:` | Upgrade dependencies |
| ⬇ | `:arrow_down:` | Downgrade dependencies |
| 📌 | `:pushpin:` | Pin dependencies to specific versions |
| 🔧 | `:wrench:` | Add or update configuration files |
| 🔨 | `:hammer:` | Add or update development scripts |

### Security & Privacy

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 🔒 | `:lock:` | Fix security or privacy issues |
| 🔐 | `:closed_lock_with_key:` | Add or update secrets |
| 🛂 | `:passport_control:` | Work on code related to authorization, roles and permissions |
| 🦺 | `:safety_vest:` | Add or update code related to validation |

### Testing & CI/CD

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| ✅ | `:white_check_mark:` | Add, update, or pass tests |
| 🧪 | `:test_tube:` | Add a failing test |
| 💚 | `:green_heart:` | Fix CI Build |
| 👷 | `:construction_worker:` | Add or update CI build system |

### Deployment & Infrastructure

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 🚀 | `:rocket:` | Deploy stuff |
| 🧱 | `:bricks:` | Infrastructure related changes |
| 🩺 | `:stethoscope:` | Add or update healthcheck |
| 🏗 | `:building_construction:` | Make architectural changes |

### Database & Data

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 🗃 | `:card_file_box:` | Perform database related changes |
| 🌱 | `:seedling:` | Add or update seed files |
| 📈 | `:chart_with_upwards_trend:` | Add or update analytics or track code |

### Removal & Cleanup

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 🔥 | `:fire:` | Remove code or files |
| ⚰ | `:coffin:` | Remove dead code |
| 🗑 | `:wastebasket:` | Deprecate code that needs to be cleaned up |
| 🔇 | `:mute:` | Remove logs |

### Other Operations

| Emoji | Codigo | Descricao |
|-------|--------|-----------|
| 🚚 | `:truck:` | Move or rename resources (e.g.: files, paths, routes) |
| 🔖 | `:bookmark:` | Release / Version tags |
| ⏪ | `:rewind:` | Revert changes |
| 🔀 | `:twisted_rightwards_arrows:` | Merge branches |
| 💥 | `:boom:` | Introduce breaking changes |
| 🚧 | `:construction:` | Work in progress |
| 👽 | `:alien:` | Update code due to external API changes |
| 📦 | `:package:` | Add or update compiled files or packages |
| 🌐 | `:globe_with_meridians:` | Internationalization and localization |
| 👥 | `:busts_in_silhouette:` | Add or update contributor(s) |
| 🤡 | `:clown_face:` | Mock things |
| 🥚 | `:egg:` | Add or update an easter egg |
| 🙈 | `:see_no_evil:` | Add or update a .gitignore file |
| 📸 | `:camera_flash:` | Add or update snapshots |
| ⚗ | `:alembic:` | Perform experiments |
| 🔍 | `:mag:` | Improve SEO |
| 🏷 | `:label:` | Add or update types |
| 🧵 | `:thread:` | Add or update code related to multithreading or concurrency |
| 💸 | `:money_with_wings:` | Add sponsorships or money related infrastructure |
| ✈ | `:airplane:` | Improve offline support |
| 🦖 | `:t-rex:` | Code that adds backwards compatibility |
| 📄 | `:page_facing_up:` | Add or update license |
| 🔊 | `:loud_sound:` | Add or update logs |
| 🍻 | `:beers:` | Write code drunkenly |

## Tabela de Referencia Rapida

| Emoji | Codigo | Descricao | Categoria |
|-------|--------|-----------|-----------|
| 🎨 | `:art:` | Improve structure / format of the code | Code Quality |
| ⚡ | `:zap:` | Improve performance | Code Quality |
| 🔥 | `:fire:` | Remove code or files | Removal |
| 🐛 | `:bug:` | Fix a bug | Bug Fixes |
| 🚑 | `:ambulance:` | Critical hotfix | Bug Fixes |
| ✨ | `:sparkles:` | Introduce new features | Features |
| 📝 | `:memo:` | Add or update documentation | Documentation |
| 🚀 | `:rocket:` | Deploy stuff | Deployment |
| 💄 | `:lipstick:` | Add or update the UI and style files | UI/UX |
| 🎉 | `:tada:` | Begin a project | Features |
| ✅ | `:white_check_mark:` | Add, update, or pass tests | Testing |
| 🔒 | `:lock:` | Fix security or privacy issues | Security |
| 🔐 | `:closed_lock_with_key:` | Add or update secrets | Security |
| 🔖 | `:bookmark:` | Release / Version tags | Other |
| 🚨 | `:rotating_light:` | Fix compiler / linter warnings | Code Quality |
| 🚧 | `:construction:` | Work in progress | Other |
| 💚 | `:green_heart:` | Fix CI Build | Testing |
| ⬇ | `:arrow_down:` | Downgrade dependencies | Dependencies |
| ⬆ | `:arrow_up:` | Upgrade dependencies | Dependencies |
| 📌 | `:pushpin:` | Pin dependencies to specific versions | Dependencies |
| 👷 | `:construction_worker:` | Add or update CI build system | Testing |
| 📈 | `:chart_with_upwards_trend:` | Add or update analytics or track code | Database |
| ♻ | `:recycle:` | Refactor code | Code Quality |
| ➕ | `:heavy_plus_sign:` | Add a dependency | Dependencies |
| ➖ | `:heavy_minus_sign:` | Remove a dependency | Dependencies |
| 🔧 | `:wrench:` | Add or update configuration files | Dependencies |
| 🔨 | `:hammer:` | Add or update development scripts | Dependencies |
| 🌐 | `:globe_with_meridians:` | Internationalization and localization | Other |
| ✏ | `:pencil2:` | Fix typos | Documentation |
| 💩 | `:poop:` | Write bad code that needs to be improved | Code Quality |
| ⏪ | `:rewind:` | Revert changes | Other |
| 🔀 | `:twisted_rightwards_arrows:` | Merge branches | Other |
| 📦 | `:package:` | Add or update compiled files or packages | Other |
| 👽 | `:alien:` | Update code due to external API changes | Other |
| 🚚 | `:truck:` | Move or rename resources | Other |
| 📄 | `:page_facing_up:` | Add or update license | Other |
| 💥 | `:boom:` | Introduce breaking changes | Other |
| 🍱 | `:bento:` | Add or update assets | UI/UX |
| ♿ | `:wheelchair:` | Improve accessibility | UI/UX |
| 💡 | `:bulb:` | Add or update comments in source code | Documentation |
| 🍻 | `:beers:` | Write code drunkenly | Other |
| 💬 | `:speech_balloon:` | Add or update text and literals | Documentation |
| 🗃 | `:card_file_box:` | Perform database related changes | Database |
| 🔊 | `:loud_sound:` | Add or update logs | Other |
| 🔇 | `:mute:` | Remove logs | Removal |
| 👥 | `:busts_in_silhouette:` | Add or update contributor(s) | Other |
| 🚸 | `:children_crossing:` | Improve user experience / usability | UI/UX |
| 🏗 | `:building_construction:` | Make architectural changes | Deployment |
| 📱 | `:iphone:` | Work on responsive design | UI/UX |
| 🤡 | `:clown_face:` | Mock things | Other |
| 🥚 | `:egg:` | Add or update an easter egg | Other |
| 🙈 | `:see_no_evil:` | Add or update a .gitignore file | Other |
| 📸 | `:camera_flash:` | Add or update snapshots | Other |
| ⚗ | `:alembic:` | Perform experiments | Other |
| 🔍 | `:mag:` | Improve SEO | Other |
| 🏷 | `:label:` | Add or update types | Other |
| 🌱 | `:seedling:` | Add or update seed files | Database |
| 🚩 | `:triangular_flag_on_post:` | Add, update, or remove feature flags | Features |
| 🥅 | `:goal_net:` | Catch errors | Bug Fixes |
| 💫 | `:dizzy:` | Add or update animations and transitions | UI/UX |
| 🗑 | `:wastebasket:` | Deprecate code that needs to be cleaned up | Removal |
| 🛂 | `:passport_control:` | Work on code related to authorization, roles and permissions | Security |
| 🩹 | `:adhesive_bandage:` | Simple fix for a non-critical issue | Bug Fixes |
| 🧐 | `:monocle_face:` | Data exploration/inspection | Code Quality |
| ⚰ | `:coffin:` | Remove dead code | Removal |
| 🧪 | `:test_tube:` | Add a failing test | Testing |
| 👔 | `:necktie:` | Add or update business logic | Features |
| 🩺 | `:stethoscope:` | Add or update healthcheck | Deployment |
| 🧱 | `:bricks:` | Infrastructure related changes | Deployment |
| 🧑💻 | `:technologist:` | Improve developer experience | Code Quality |
| 💸 | `:money_with_wings:` | Add sponsorships or money related infrastructure | Other |
| 🧵 | `:thread:` | Add or update code related to multithreading or concurrency | Other |
| 🦺 | `:safety_vest:` | Add or update code related to validation | Security |
| ✈ | `:airplane:` | Improve offline support | Other |
| 🦖 | `:t-rex:` | Code that adds backwards compatibility | Other |

## Exemplos Praticos

### Exemplo 1: Correcao de Bug

```
:bug: fix(AC_PART1_ACTUALDATE(DD_MM_YYYY)): corrigir validacao de email no formulario de cadastro
```

### Exemplo 2: Nova Funcionalidade

```
:sparkles: feat(AC_PART1_RC_230): adicionar filtro de busca na lista de funcionarios
```

### Exemplo 3: Correcao de Warnings

```
:rotating_light: fix(AC_PART1_ACTUALDATE(DD_MM_YYYY)): corrigir warnings do linter em componentes Vue
```

### Exemplo 4: Refatoracao

```
:recycle: refactor(AC_PART1_ACTUALDATE(DD_MM_YYYY)): extrair logica de validacao para composable
```

### Exemplo 5: Remocao de Codigo

```
:fire: refactor(AC_PART1_ACTUALDATE(DD_MM_YYYY)): remover codigo duplicado em utils
```

### Exemplo 6: Documentacao

```
:memo: docs(AC_PART1_ACTUALDATE(DD_MM_YYYY)): atualizar documentacao da API de autenticacao
```

### Exemplo 7: Melhoria de Performance

```
:zap: perf(AC_PART1_ACTUALDATE(DD_MM_YYYY)): otimizar renderizacao de listas grandes
```

### Exemplo 8: Seguranca

```
:lock: security(AC_PART1_ACTUALDATE(DD_MM_YYYY)): corrigir vulnerabilidade de XSS em inputs
```

### Exemplo 9: Acessibilidade

```
:wheelchair: feat(AC_PART1_ACTUALDATE(DD_MM_YYYY)): adicionar suporte a navegacao por teclado
```

### Exemplo 10: Dependencias

```
:arrow_up: chore(AC_PART1_ACTUALDATE(DD_MM_YYYY)): atualizar dependencias do projeto
```

## Referencias

- [Gitmoji](https://gitmoji.dev/) - Guia oficial de emojis para commits
- [Conventional Commits](https://www.conventionalcommits.org/) - Especificacao de commits convencionais
