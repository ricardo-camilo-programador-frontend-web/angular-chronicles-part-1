Corrija sequencialmente todos os erros identificados na análise anterior.

Regras de execução
- Cada erro deve ser corrigido individualmente e em ordem.
- Para cada erro corrigido, deve ser criado um commit separado.
- Não agrupe múltiplas correções no mesmo commit.
- Caso uma correção dependa de outra, resolva primeiro a dependência antes de continuar.

## 🔒 Segurança de Código (OBRIGATÓRIO)

### Verificação de Caracteres Invisíveis

**ANTES de cada correção:**

1. **Scan de segurança**:
   ```bash
   npx tsx scripts/security/security-scan.ts
   ```

2. **Se detectar caracteres proibidos**:
   - 🧹 Executar limpeza: `npx tsx scripts/security/security-clean.ts`
   - ✅ Validar código limpo
   - 📝 Registrar no commit se for relevante

3. **Caracteres a remover**:
   - U+FE00 a U+FE0F: Variation Selectors
   - U+E0100 a U+E01EF: Variation Selectors Supplement
   - U+200B a U+200F: Zero-Width Characters
   - U+202A a U+202E: Directional Formatting Characters

**Referência**: `docs/rotina/SEGURANCA-CODIGO.md`

Após cada correção, valide se:
- o código continua compilando
- não foram introduzidos novos erros
- o comportamento esperado foi preservado
- **não há caracteres invisíveis no código**

Padrão de commit:

Cada commit deve seguir estritamente o padrão definido no arquivo: COMMIT-PATTERN.md.md

Antes de gerar o commit:
- leia e interprete as regras do arquivo
- utilize exatamente o formato especificado
- respeite prefixos, escopo e descrição definidos no padrão
- Estrutura esperada para cada correção

Para cada erro encontrado:
- Identifique o erro
- Aplique a correção no código
- Gere o commit correspondente

Formato:
Correção aplicada:
<explicação breve da correção>

Commit gerado:
<mensagem seguindo COMMIT-PATTERN.md.md>

Objetivos

Garantir que:
- cada erro seja corrigido de forma isolada
- o histórico de commits fique limpo, rastreável e semântico
- seja possível revisar facilmente cada alteração

Diretrizes de qualidade
- Durante as correções:
- mantenha Clean Code
- preserve tipagem TypeScript
- remova imports não utilizados
- evite duplicação de código
- priorize clareza e manutenção futura
- vise um código de facil manutenção
- dev friendly
- respeite os padroes do projeto
