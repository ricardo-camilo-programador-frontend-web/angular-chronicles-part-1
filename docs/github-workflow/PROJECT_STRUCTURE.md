# Estrutura do Projeto - Food Hut Angular Chronicles

## Visao Geral

Projeto desenvolvido para explorar o ecossistema Angular.

## Diretorios

```
angular-chronicles-part-1/
├── src/
│   ├── app/                # Modulos Angular
│   │   ├── components/     # Componentes
│   │   ├── services/       # Servicos
│   │   └── models/         # Interfaces/Tipos
│   ├── assets/             # Assets estaticos
│   └── environments/       # Configuracoes de ambiente
├── docs/                   # Documentacao
│   └── github-workflow/    # Padroes GitHub
└── .github/                # Templates e CI/CD
```

## Convencoes

### Nomenclatura
- Componentes: PascalCase + sufixo Component (UserListComponent)
- Servicos: PascalCase + sufixo Service (UserService)
- Interfaces: PascalCase (User)

### Angular Patterns
- Standalone Components (Angular 19)
- Signals para estado reativo
- OnPush Change Detection
- Injecao com inject()

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Angular 19 |
| Estilos | TailwindCSS 3 |
| Linguagem | TypeScript |
| Build | Angular CLI |
