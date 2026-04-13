Realize um **code review completo** deste Pull Request.

Analise cuidadosamente todas as alterações do PR, incluindo:
- código modificado
- novos arquivos
- arquivos removidos
- impacto nas funcionalidades existentes
- consistência com o restante do projeto

## Objetivo
Identificar **erros, problemas de arquitetura, inconsistências ou riscos técnicos**.
Considere especialmente:
- bugs potenciais
- lógica incorreta
- problemas de tipagem (TypeScript)
- problemas de performance
- problemas de segurança
- inconsistências com padrões do projeto
- código duplicado
- imports não utilizados
- nomes pouco claros
- violações de Clean Code / DRY
- problemas de manutenção futura
- **caracteres Unicode invisíveis ou maliciosos**

## 🔒 Segurança de Código (CRÍTICO)

### Verificação Obrigatória de Caracteres Invisíveis

**ANTES de aprovar o PR:**

1. **Scan automático**:
   ```bash
   python scripts/scan-invisible-chars.py
   ```

2. **Verificação manual no diff**:
   - Habilitar "whitespace changes" no GitHub
   - Procurar por caracteres estranhos
   - Validar encoding UTF-8

3. **Caracteres proibidos** (bloqueio imediato):
   - ❌ U+FE00 a U+FE0F: Variation Selectors
   - ❌ U+E0100 a U+E01EF: Variation Selectors Supplement
   - ❌ U+200B a U+200F: Zero-Width Characters
   - ❌ U+202A a U+202E: Directional Formatting Characters
   - ❌ U+E000 a U+F8FF: Private Use Area
   - ❌ U+FFF0 a U+FFFF: Specials

4. **Ação se detectar**:
   - 🚫 **SOLICITAR MUDANÇAS** imediatamente
   - 📝 Comentar no PR com o problema exato
   - 🧹 Exigir limpeza antes de re-aprovar
   - ⚠ Notificar equipe se for recorrente

### Formato do Comentário de Bloqueio

```md
- [ ] 🚫 **PROBLEMA DE SEGURANÇA: Caracteres invisíveis detectados**

Arquivo: `caminho/do/arquivo.ts`
Linha: múltiplas ocorrências

**Caracteres proibidos encontrados:**
- U+FE0F (Variation Selector-16) na linha X
- U+200B (Zero Width Space) na linha Y

**Ação requerida:**
1. Executar: `python scripts/clean-invisible-chars.py`
2. Validar código limpo
3. Re-executar scan para confirmar limpeza

**Referência:** `docs/rotina/SEGURANCA-CODIGO.md`

⚠ **Este PR não pode ser aprovado até que todos os caracteres invisíveis sejam removidos.**
```

**Referência**: `docs/rotina/SEGURANCA-CODIGO.md`

## Regras importantes
- Faça **apenas um comentário por problema encontrado**.
- **Não repita comentários para o mesmo problema.**
- Comentários devem ser **claros, objetivos e acionáveis**.
- Caso não haja problemas, informe que o PR está aprovado.

## Formato obrigatório dos comentários

Cada problema encontrado deve ser reportado no seguinte formato:

```md
- [ ] Problema: descrição clara do erro encontrado

Arquivo: caminho/do/arquivo
Linha: número aproximado da linha

Sugestão:
Explique como corrigir o problema ou proponha uma melhoria.
```

Exemplo:

```md
- [ ] Problema: variável declarada mas nunca utilizada

Arquivo: src/components/UserList.vue
Linha: 42

Sugestão:
Remover a variável `userCache`, pois ela não é utilizada no fluxo atual.
```

## Objetivo final
Gerar uma lista de comentários que possam ser usados diretamente na revisão do Pull Request, permitindo que cada item seja marcado com um checkbox após ser corrigido.
Crie um comentário para cada problema que você encontrou na seção de comentários do pull request.
