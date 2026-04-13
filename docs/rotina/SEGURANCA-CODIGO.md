# 🔒 Segurança de Código - Proteção contra Caracteres Invisíveis

## 🎯 Objetivo

Estabelecer regras obrigatórias para prevenção, detecção e remoção de caracteres Unicode invisíveis ou maliciosos no código-fonte do projeto angular-chronicles-part-1.

---

## ⚠ Riscos de Segurança

### Caracteres Unicode Invisíveis

Caracteres invisíveis podem ser usados para:
- **Ofuscação de código**: Esconder lógica maliciosa
- **Bypass de linting**: Ignorar regras de validação
- **Steganografia**: Esconder dados em código
- **Homoglyph attacks**: Substituir caracteres por similares visuais
- **Injection attacks**: Inserir código executável oculto

### Variação Selectors (U+FE00-U+FE0F, U+E0100-U+E01EF)

- **U+FE00 a U+FE0F**: Variation Selectors-1 a 16
- **U+E0100 a U+E01EF**: Variation Selectors Supplement
- Usados legitimamente para emojis, mas podem esconder código
- **NÃO SÃO PERMITIDOS** em código-fonte (apenas em comentários/documentação se necessário)

### Zero-Width Characters (U+200B-U+200F)

- **U+200B**: Zero Width Space
- **U+200C**: Zero Width Non-Joiner
- **U+200D**: Zero Width Joiner
- **U+200E**: Left-to-Right Mark
- **U+200F**: Right-to-Left Mark
- **PROIBIDOS** em qualquer contexto no código

### Directional Formatting Characters (U+202A-U+202E)

- **U+202A**: Left-to-Right Embedding
- **U+202B**: Right-to-Left Embedding
- **U+202C**: Pop Directional Formatting
- **U+202D**: Left-to-Right Override
- **U+202E**: Right-to-Left Override
- **PROIBIDOS** - frequentemente usados em ataques de visualização

---

## 🚫 Regras Obrigatórias

### 1. NUNCA inserir caracteres invisíveis

**PROIBIDO:**
- ❌ Variation Selectors (U+FE00-U+FE0F, U+E0100-U+E01EF)
- ❌ Zero-Width Characters (U+200B-U+200F)
- ❌ Directional Formatting (U+202A-U+202E)
- ❌ Private Use Area (U+E000-U+F8FF)
- ❌ Specials (U+FFF0-U+FFFF)

**PERMITIDO (apenas em strings/comentários):**
- ✅ Emojis padrão (U+1F600-U+1F64F, etc.)
- ✅ Símbolos matemáticos
- ✅ Caracteres de acentuação de idiomas

### 2. SEMPRE validar código antes de commit

Antes de cada commit, execute:

```bash
# Verificar caracteres invisíveis
python scripts/scan-invisible-chars.py

# Ou usar grep
grep -P "[\x{FE00}-\x{FE0F}\x{E0100}-\x{E01EF}\x{200B}-\x{200F}\x{202A}-\x{202E}]" -r src/
```

### 3. REMOVER caracteres invisíveis imediatamente

Se detectar caracteres invisíveis:

1. **Identifique a origem**: Verifique se é intencional (emoji) ou malicioso
2. **Remova imediatamente**: Use scripts de limpeza
3. **Valide o código**: Garanta que a remoção não quebrou lógica
4. **Registre o incidente**: Documente em log de segurança

### 4. CONFIGURAR editors e IDEs

**VS Code:**
```json
{
  "editor.renderControlCharacters": true,
  "editor.renderWhitespace": "all"
}
```

**ESLint:**
```json
{
  "rules": {
    "no-control-regex": "error",
    "no-invalid-characters": "error"
  }
}
```

### 5. AUTOMATIZAR detecção em CI/CD

Adicione ao pipeline de CI:

```yaml
# .github/workflows/security-scan.yml
jobs:
  scan-invisible-chars:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Scan for invisible characters
        run: python scripts/scan-invisible-chars.py
        
      - name: Fail if invisible characters found
        run: test $(python scripts/scan-invisible-chars.py | wc -l) -eq 0
```

---

## 🛠 Scripts de Verificação

### Script Python de Scan

```python
#!/usr/bin/env python3
"""
Scan para detectar caracteres Unicode invisíveis ou suspeitos.
"""

import os
import re
import sys

# Faixas proibidas
PROHIBITED_RANGES = [
    (0xFE00, 0xFE0F),   # Variation Selectors
    (0xE0100, 0xE01EF), # Variation Selectors Supplement
    (0x200B, 0x200F),   # Zero-Width Characters
    (0x202A, 0x202E),   # Directional Formatting
    (0xE000, 0xF8FF),   # Private Use Area
    (0xFFF0, 0xFFFF),   # Specials
]

# Extensões a verificar
ALLOWED_EXTENSIONS = {'.js', '.ts', '.jsx', '.tsx', '.vue', '.json'}

# Pastas a ignorar
IGNORED_DIRS = {'.git', 'node_modules', 'dist', 'build', 'vendor'}

def is_prohibited(char):
    code = ord(char)
    for start, end in PROHIBITED_RANGES:
        if start <= code <= end:
            return True
    return False

def scan_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        found = []
        for i, char in enumerate(content):
            if is_prohibited(char):
                found.append((i, char, hex(ord(char))))
        
        return found
    except Exception as e:
        return []

def scan_directory(root_dir):
    alerts = []
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Ignorar pastas
        dirnames[:] = [d for d in dirnames if d not in IGNORED_DIRS]
        
        for filename in filenames:
            ext = os.path.splitext(filename)[1].lower()
            if ext not in ALLOWED_EXTENSIONS:
                continue
                
            filepath = os.path.join(dirpath, filename)
            found = scan_file(filepath)
            
            if found:
                alerts.append({
                    'file': filepath,
                    'characters': found
                })
    
    return alerts

if __name__ == '__main__':
    root = sys.argv[1] if len(sys.argv) > 1 else '.'
    alerts = scan_directory(root)
    
    if alerts:
        print(f"⚠  {len(alerts)} arquivo(s) com caracteres proibidos:\n")
        for alert in alerts:
            print(f"📁 {alert['file']}")
            for pos, char, code in alert['characters'][:5]:
                print(f"   Pos {pos}: {code}")
            if len(alert['characters']) > 5:
                print(f"   ... e mais {len(alert['characters']) - 5} caracteres")
            print()
        sys.exit(1)
    else:
        print("✅ Nenhum caractere proibido encontrado")
        sys.exit(0)
```

### Script de Limpeza

```python
#!/usr/bin/env python3
"""
Limpa caracteres Unicode invisíveis de arquivos.
"""

import os
import re
import sys

# Caracteres proibidos
PROHIBITED_PATTERN = re.compile(
    r'[\uFE00-\uFE0F\U000E0100-\U000E01EF\u200B-\u200F\u202A-\u202E\uE000-\uF8FF\uFFF0-\uFFFF]'
)

def clean_file(filepath, dry_run=False):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Contar ocorrências
        matches = PROHIBITED_PATTERN.findall(content)
        if not matches:
            return 0
        
        # Limpar
        cleaned = PROHIBITED_PATTERN.sub('', content)
        
        if not dry_run:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned)
        
        return len(matches)
    except Exception as e:
        print(f"Erro ao processar {filepath}: {e}")
        return 0

def clean_directory(root_dir, dry_run=False):
    total = 0
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in {'.git', 'node_modules', 'dist'}]
        
        for filename in filenames:
            ext = os.path.splitext(filename)[1].lower()
            if ext not in {'.js', '.ts', '.jsx', '.tsx', '.vue', '.json'}:
                continue
                
            filepath = os.path.join(dirpath, filename)
            count = clean_file(filepath, dry_run)
            
            if count > 0:
                status = "DRY RUN" if dry_run else "LIMPO"
                print(f"  {status}: {filepath} ({count} caracteres)")
                total += count
    
    return total

if __name__ == '__main__':
    dry_run = '--dry-run' in sys.argv
    root = sys.argv[-1] if sys.argv[-1] != '--dry-run' else '.'
    
    print(f"{'[DRY RUN] ' if dry_run else ''}Limpando caracteres invisíveis...")
    count = clean_directory(root, dry_run)
    print(f"\nTotal: {count} caracteres removidos")
```

---

## 📋 Checklist de Validação

### Pré-Commit

- [ ] Executar scan de caracteres invisíveis
- [ ] Validar que não há Warning de caracteres estranhos
- [ ] Verificar diffs com `git diff --check`
- [ ] Revisar visualmente mudanças suspeitas

### Code Review

- [ ] Verificar se não há caracteres invisíveis no diff
- [ ] Usar GitHub diff view com whitespace visível
- [ ] Validar encoding UTF-8 sem BOM
- [ ] Questionar qualquer caractere não ASCII suspeito

### CI/CD Pipeline

- [ ] Scan automático em cada PR
- [ ] Bloquear merge se detectar caracteres proibidos
- [ ] Gerar relatório de segurança
- [ ] Notificar equipe sobre detecções

---

## 🔍 Como Identificar

### Sinais de Alerta

1. **Comportamento estranho do código**:
   - Lógica que não faz sentido visualmente
   - Condições que sempre são verdadeiras/falsas
   - Variáveis que parecem iguais mas são diferentes

2. **Diffs suspeitos**:
   - Mudanças que parecem maiores que o esperado
   - Caracteres que não aparecem no diff
   - Whitespace que muda sem razão

3. **Erros de compilação estranhos**:
   - Erros de sintaxe em código válido
   - Problemas de encoding
   - Warnings de caracteres inválidos

### Ferramentas de Detecção

```bash
# VS Code: Mostrar caracteres de controle
# Config: "editor.renderControlCharacters": true

# Git: Mostrar problemas no diff
git diff --check

# Hex dump para inspeção
xxd arquivo.ts | grep -i "ef b8 8"

# Python one-liner
python -c "print([hex(ord(c)) for c in open('arquivo.ts').read() if ord(c) > 127])"
```

---

## 📚 Referências

### Unicode Security

- [Unicode Security Considerations](https://unicode.org/reports/tr36/)
- [CVE-2022-45430](https://nvd.nist.gov/vuln/detail/CVE-2022-45430) - Xcode backdoor via invisible chars
- [Homograph Attack](https://en.wikipedia.org/wiki/IDN_homograph_attack)

### Ferramentas

- [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security)
- [biome](https://biomejs.dev/) - Linter com detecção de segurança
- [git diff --check](https://git-scm.com/docs/git-diff)

### Casos Reais

- **2022**: Backdoor em projeto Xcode via Variation Selectors
- **2021**: Package npm comprometido com Zero-Width chars
- **2020**: Ataque de supply chain com homoglyphs

---

## 🚨 Procedimento de Incidente

Se detectar código malicioso:

1. **NÃO FAÇA COMMIT**
2. **Isole o arquivo**: Não delete (evidência)
3. **Notifique**: Líder técnico + equipe de segurança
4. **Investigue**: Origem, autoria, extensão
5. **Remova**: Com aprovação da equipe
6. **Documente**: Registre em log de segurança
7. **Previna**: Atualize regras e automações

---

## 📝 Exemplos

### ❌ Exemplo de Código com Caracteres Proibidos

```typescript
// U+200B (Zero Width Space) escondido na variável
const salariₒ = 1000  // O "o" tem U+200B após
const salario = 2000  // Este é normal

if (salariₒ === salario) {  // Nunca será igual!
  console.log('Iguais')
}
```

### ✅ Exemplo de Código Limpo

```typescript
// Todos os caracteres são visíveis e válidos
const salario = 1000
const bonus = 500

if (salario === 1000) {
  console.log('Salário correto')
}
```

---

## 🔄 Atualizações

Este documento deve ser revisado:
- **Trimestralmente**: Para novas ameaças
- **Após incidentes**: Para aprendizado
- **Quando novas faixas Unicode**: Forem identificadas como risco

**Última revisão**: 2026-04-02
**Próxima revisão**: 2026-07-02

---

## 📞 Contatos

Dúvidas sobre segurança de código:
- Líder Técnico: @tech-lead
- Security Team: @security
- Canal: #security-alerts
