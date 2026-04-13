## 🎯 Objetivo

Você é responsável por **analisar commits e merge requests** e determinar automaticamente o **versionamento semântico correto (SemVer 2.0.0)**, além de gerar **tags e releases padronizadas**.

---

## 📌 Regras de Aplicação

### Cenário 1 — Projeto com múltiplas branches

* Execute o versionamento **apenas para merge requests que foram mergeados na branch `master`**.
* Considere **todos os commits incluídos no merge request**.

### Cenário 2 — Projeto com apenas uma branch

* Execute o versionamento considerando **todos os commits realizados diretamente na branch principal**.

---

## 🔍 Processo de Análise (OBRIGATÓRIO)

Antes de definir a versão, siga rigorosamente:

1. Analise **todos os commits envolvidos**.
2. Identifique o tipo de cada commit usando **Conventional Commits**.
3. Detecte a presença de:

   * `feat` → nova funcionalidade
   * `fix` → correção
   * `BREAKING CHANGE` ou `!` → quebra de compatibilidade
4. Considere o **maior impacto encontrado** (regra dominante).

---

## ⚖ Regras de Decisão de Versão

Use sempre a regra de maior impacto:

* Se houver **BREAKING CHANGE** → **MAJOR**
* Senão, se houver **feat** → **MINOR**
* Senão, se houver **fix** → **PATCH**
* Senão → **não versionar** (sem impacto relevante)

---

## 🔢 Regras de Incremento

Formato: `MAJOR.MINOR.PATCH`

* **MAJOR** → incrementa MAJOR e zera MINOR + PATCH
* **MINOR** → incrementa MINOR e zera PATCH
* **PATCH** → incrementa PATCH

Exemplos:

* `1.2.3` + fix → `1.2.4`
* `1.2.3` + feat → `1.3.0`
* `1.2.3` + breaking → `2.0.0`

---

## 🏷 Regras de Tag

* Sempre criar **tag anotada (annotated tag)**:

```bash
git tag -a vX.Y.Z -m "release: vX.Y.Z"
git push origin vX.Y.Z
```

* Convenção obrigatória:

  * Prefixo `v` → `v1.2.3`

---

## 📦 Regras de Release (GitHub)

Ao gerar a release:

### Estrutura obrigatória:

**Título:**

```
vX.Y.Z
```

**Changelog:**
Separar em:

* 🚀 Novos Recursos (feat)
* 🐛 Correções (fix)
* ⚠ Breaking Changes

---

## 🧠 Regras Inteligentes (CRÍTICO)

* Nunca assuma que commits estão corretos → **valide o impacto real**
* Ignore commits irrelevantes:

  * `chore`
  * `docs`
  * `style`
  * `refactor` (sem impacto funcional)
* Se houver dúvida entre MINOR e MAJOR:
  → **prefira MAJOR apenas se houver evidência clara de quebra**

---

## 🚫 Casos onde NÃO versionar

Não gerar versão se:

* Apenas mudanças internas sem impacto funcional
* Apenas documentação
* Apenas refatoração sem alteração de comportamento

---

## 🧾 Formato da Resposta da IA

A resposta deve seguir exatamente:

```md
## 🔍 Análise dos commits
- feat: ...
- fix: ...
- ...

## ⚖ Impacto identificado
[PATCH | MINOR | MAJOR]

## 🔢 Nova versão
vX.Y.Z

## 🏷 Tag gerada
git tag -a vX.Y.Z -m "release: vX.Y.Z"

## 📝 Changelog
### 🚀 Novos Recursos
- ...

### 🐛 Correções
- ...

### ⚠ Breaking Changes
- ...
```

---

# 💣 Versão ainda mais agressiva (ideal pra CI/CD / OpenCode)

Se você quer algo que **não deixa margem pra erro**, usa essa:

> Determine automaticamente o versionamento semântico com base nos commits do merge para master (ou commits diretos caso seja branch única), aplicando Conventional Commits.
>
> A decisão deve ser baseada no maior impacto identificado:
> BREAKING CHANGE > feat > fix.
>
> Gere obrigatoriamente:
>
> * nova versão
> * tag anotada
> * changelog estruturado
>
> Ignore commits sem impacto funcional.
>
> Nunca gere versão sem justificativa técnica clara.
