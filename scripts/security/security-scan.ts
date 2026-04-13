#!/usr/bin/env node
/**
 * angular-chronicles-part-1 Security Scanner - Detector Unificado de Esteganografia e Código Malicioso
 *
 * Este script unificado detecta:
 * - Caracteres Unicode invisíveis (esteganografia)
 * - Padrões de código malicioso (eval, Function constructor, etc.)
 * - Ataques específicos (codePointAt + eval + Buffer.from)
 * - Gera relatórios detalhados em Markdown
 *
 * Uso:
 *   npx tsx scripts/security/security-scan.ts [diretorio] [opcoes]
 *
 * Exemplos:
 *   npx tsx scripts/security/security-scan.ts                     # Scan projeto atual
 *   npx tsx scripts/security/security-scan.ts . --quick           # Scan rápido
 *   npx tsx scripts/security/security-scan.ts . --output report   # Gera relatório
 *   npx tsx scripts/security/security-scan.ts ../BackEnd_Sindicu633 --steganography  # Foca em esteganografia
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

// ============================================================================
// CONFIGURAÇÕES GERAIS
// ============================================================================

interface CharRange {
  start: number
  end: number
  name: string
  risk: string
  desc: string
}

// Faixas de caracteres com classificação de risco
const CHAR_RANGES: Array<CharRange> = [
  // CRÍTICO - Possível ataque
  {
    start: 0x200b,
    end: 0x200f,
    name: 'Zero-Width Characters',
    risk: 'CRITICO',
    desc: 'Injecao de dados ocultos, ataques de homoglyph',
  },
  {
    start: 0x202a,
    end: 0x202e,
    name: 'Directional Formatting',
    risk: 'CRITICO',
    desc: 'Reordenacao visual de codigo',
  },
  {
    start: 0x0300,
    end: 0x036f,
    name: 'Combining Diacritical Marks',
    risk: 'CRITICO',
    desc: 'Ofuscacao de identificadores',
  },
  {
    start: 0xfe00,
    end: 0xfe0f,
    name: 'Variation Selectors',
    risk: 'CRITICO',
    desc: 'Usados em EMOJIS mas tambem em ESTEGANOGRAFIA',
  },
  {
    start: 0xe0100,
    end: 0xe01ef,
    name: 'Variation Selectors Supplement',
    risk: 'CRITICO',
    desc: 'Ofuscacao avancada, ESTEGANOGRAFIA',
  },

  // ALTO - Suspeito
  {
    start: 0xe000,
    end: 0xf8ff,
    name: 'Private Use Area',
    risk: 'ALTO',
    desc: 'Caracteres customizados suspeitos',
  },
  {
    start: 0xfff0,
    end: 0xffff,
    name: 'Specials',
    risk: 'ALTO',
    desc: 'Caracteres de controle especiais',
  },

  // MEDIO - Atenção
  {
    start: 0x0600,
    end: 0x06ff,
    name: 'Arabic',
    risk: 'MEDIO',
    desc: 'Possivel ataque de BIDI',
  },
  {
    start: 0x0750,
    end: 0x077f,
    name: 'Arabic Supplement',
    risk: 'MEDIO',
    desc: 'Possivel ataque de BIDI',
  },

  // BAIXO - Geralmente inofensivo
  {
    start: 0x1f600,
    end: 0x1f64f,
    name: 'Emoticons',
    risk: 'INOCENTE',
    desc: 'Emojis padrao',
  },
  {
    start: 0x1f300,
    end: 0x1f5ff,
    name: 'Misc Symbols',
    risk: 'INOCENTE',
    desc: 'Simbolos diversos',
  },
  {
    start: 0x1f1e0,
    end: 0x1f1ff,
    name: 'Regional Indicators',
    risk: 'INOCENTE',
    desc: 'Bandeiras emoji',
  },
]

// Extensões de arquivos por categoria
const CODE_EXTENSIONS = new Set([
  '.ts',
  '.js',
  '.tsx',
  '.jsx',
  '.vue',
  '.py',
  '.java',
  '.cs',
  '.cpp',
  '.c',
  '.h',
  '.hpp',
  '.rb',
  '.php',
  '.go',
  '.rs',
  '.swift',
  '.kt',
])
const DOC_EXTENSIONS = new Set(['.md', '.txt', '.rst', '.html'])
const CONFIG_EXTENSIONS = new Set(['.json', '.yaml', '.yml', '.xml', '.toml'])
const STYLE_EXTENSIONS = new Set(['.css', '.scss', '.sass', '.less', '.styl'])
const ALL_EXTENSIONS = new Set([
  ...CODE_EXTENSIONS,
  ...DOC_EXTENSIONS,
  ...CONFIG_EXTENSIONS,
  ...STYLE_EXTENSIONS,
])

// Pastas a ignorar
const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'vendor',
  'out',
  'coverage',
  '.nyc_output',
  'logs',
  'temp',
  'tmp',
  '__pycache__',
  '.venv',
  'venv',
  'env',
  '.idea',
  '.vscode',
  'bin',
  'obj',
])

interface MaliciousPattern {
  pattern: RegExp
  description: string
  risk: string
}

// Padrões de código malicioso
const MALICIOUS_PATTERNS: Array<MaliciousPattern> = [
  // Eval e execução dinâmica
  { pattern: /eval\s*\(/gi, description: 'eval() execution', risk: 'CRITICO' },
  {
    pattern: /Function\s*\(/gi,
    description: 'Function constructor',
    risk: 'ALTO',
  },
  {
    pattern: /setTimeout\s*\(\s*["']/gi,
    description: 'setTimeout with string',
    risk: 'ALTO',
  },
  {
    pattern: /setInterval\s*\(\s*["']/gi,
    description: 'setInterval with string',
    risk: 'ALTO',
  },
  {
    pattern: /new\s+Function\s*\(/gi,
    description: 'Dynamic Function creation',
    risk: 'ALTO',
  },

  // Decodificação e ofuscação
  {
    pattern: /decodeURIComponent\s*\(/gi,
    description: 'URI decoding',
    risk: 'MEDIO',
  },
  { pattern: /atob\s*\(/gi, description: 'Base64 decoding', risk: 'MEDIO' },
  {
    pattern: /\\x[0-9a-fA-F]{2}/g,
    description: 'Hex escape sequence',
    risk: 'MEDIO',
  },
  {
    pattern: /\\u[0-9a-fA-F]{4}/g,
    description: 'Unicode escape sequence',
    risk: 'MEDIO',
  },
  {
    pattern: /String\.fromCharCode/gi,
    description: 'CharCode manipulation',
    risk: 'ALTO',
  },

  // DOM manipulation suspeita
  { pattern: /document\.write/gi, description: 'Document write', risk: 'ALTO' },
  {
    pattern: /\.innerHTML\s*=/gi,
    description: 'InnerHTML assignment',
    risk: 'MEDIO',
  },

  // ESTEGANOGRAFIA COM UNICODE (CRÍTICO)
  {
    pattern: /codePointAt\s*\(/gi,
    description: 'Unicode code point extraction - POSSIVEL ESTEGANOGRAFIA',
    risk: 'CRITICO',
  },
  {
    pattern: /eval\s*\(\s*Buffer/gi,
    description: 'eval com Buffer - CRITICO ESTEGANOGRAFIA',
    risk: 'CRITICO',
  },
  {
    pattern: /Buffer\.from\s*\(.*\)\.toString/gi,
    description: 'Buffer decode - POSSIVEL OBFUSCATION',
    risk: 'ALTO',
  },
]

// Padrão ESPECÍFICO de ataque de esteganografia
const ATTACK_PATTERN =
  /codePointAt.*eval.*Buffer\.from|eval.*Buffer\.from.*codePointAt|Buffer\.from.*codePointAt.*eval/gis

// ============================================================================
// INTERFACES DE TIPO
// ============================================================================

interface CharFinding {
  type: string
  risk: string
  desc: string | null
  positions: Array<number>
  count: number
}

interface MaliciousFinding {
  pattern: string
  risk: string
  count: number
  positions: Array<number>
  description?: string
}

interface FileResult {
  path: string
  chars: Array<CharFinding>
  maliciousPatterns: Array<MaliciousFinding>
  riskLevel: string
  isCode: boolean
  hasAttackPattern: boolean
  error?: string
}

interface ScanSummary {
  rootDir: string
  totalFiles: number
  scannedFiles: number
  filesWithChars: number
  filesWithMalicious: number
  criticalFiles: number
  highRiskFiles: number
  totalChars: number
  attackPatternsFound: number
  files: Record<string, FileResult>
  riskAssessment: string
}

// ============================================================================
// FUNÇÕES DE CLASSIFICAÇÃO
// ============================================================================

function classifyChar(char: string): [string | null, string | null, string | null] {
  const code = char.charCodeAt(0)
  for (const range of CHAR_RANGES) {
    if (code >= range.start && code <= range.end) {
      return [range.risk, range.name, range.desc]
    }
  }
  return [null, null, null]
}

function getRiskPriority(risk: string): number {
  const priorities: Record<string, number> = {
    CRITICO: 0,
    ALTO: 1,
    MEDIO: 2,
    BAIXO: 3,
    INOCENTE: 4,
  }
  return priorities[risk] ?? 5
}

// ============================================================================
// FUNÇÕES DE ANÁLISE
// ============================================================================

function checkAttackPattern(content: string): boolean {
  return ATTACK_PATTERN.test(content)
}

function checkMaliciousPatterns(content: string): Array<MaliciousFinding> {
  const findings: Array<MaliciousFinding> = []

  for (const { pattern, description, risk } of MALICIOUS_PATTERNS) {
    const matches = [...content.matchAll(pattern)]
    if (matches.length > 0) {
      findings.push({
        pattern: description,
        risk,
        count: matches.length,
        positions: matches.slice(0, 5).map(m => m.index ?? 0),
      })
    }
  }

  // Verificação específica para esteganografia
  if (
    content.includes('codePointAt')
    && content.includes('eval')
    && content.includes('Buffer.from')
  ) {
    findings.push({
      pattern: '🚨 CRITICO: Padrao de ESTEGANOGRAFIA com Unicode detectado!',
      risk: 'CRITICO',
      count: 1,
      positions: [content.indexOf('codePointAt')],
      description:
        'Codigo usa codePointAt + eval + Buffer.from - POSSIVEL ATAQUE DE ESTEGANOGRAFIA',
    })
  }

  return findings
}

function scanFile(filepath: string, quickMode = false): FileResult {
  const ext = path.extname(filepath).toLowerCase()
  const result: FileResult = {
    path: filepath,
    chars: [],
    maliciousPatterns: [],
    riskLevel: 'SEGURO',
    isCode: CODE_EXTENSIONS.has(ext),
    hasAttackPattern: false,
  }

  try {
    const content = fs.readFileSync(filepath, 'utf-8')

    // Analisar caracteres Unicode
    const charFindings: Record<string, CharFinding> = {}
    for (let i = 0; i < content.length; i++) {
      const [risk, name, desc] = classifyChar(content[i])
      if (risk && name) {
        if (!charFindings[name]) {
          charFindings[name] = {
            type: name,
            risk,
            desc,
            positions: [],
            count: 0,
          }
        }
        charFindings[name].positions.push(i)
        charFindings[name].count++
      }
    }

    result.chars = Object.values(charFindings)

    // Analisar padrões maliciosos (apenas em código)
    if (result.isCode && !quickMode) {
      result.maliciousPatterns = checkMaliciousPatterns(content)
      result.hasAttackPattern = checkAttackPattern(content)
    }

    // Determinar nível de risco
    let maxRisk = 'SEGURO'
    for (const charData of result.chars) {
      if (getRiskPriority(charData.risk) < getRiskPriority(maxRisk)) {
        maxRisk = charData.risk
      }
    }

    for (const pattern of result.maliciousPatterns) {
      if (getRiskPriority(pattern.risk) < getRiskPriority(maxRisk)) {
        maxRisk = pattern.risk
      }
    }

    result.riskLevel = maxRisk
  } catch (e) {
    result.error = (e as Error).message
  }

  return result
}

function walkDirectory(rootDir: string): Array<string> {
  const files: Array<string> = []

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) {
          walk(fullPath)
        }
      } else if (entry.isFile()) {
        files.push(fullPath)
      }
    }
  }

  walk(rootDir)
  return files
}

function scanDirectory(rootDir: string, quickMode = false, steganographyOnly = false): ScanSummary {
  const summary: ScanSummary = {
    rootDir,
    totalFiles: 0,
    scannedFiles: 0,
    filesWithChars: 0,
    filesWithMalicious: 0,
    criticalFiles: 0,
    highRiskFiles: 0,
    totalChars: 0,
    attackPatternsFound: 0,
    files: {},
    riskAssessment: 'SEGURO',
  }

  const allFiles = walkDirectory(rootDir)

  for (const filepath of allFiles) {
    const ext = path.extname(filepath).toLowerCase()
    if (!ALL_EXTENSIONS.has(ext)) {
      continue
    }

    summary.totalFiles++
    const fileResult = scanFile(filepath, quickMode)

    // Filtrar por tipo de análise
    if (steganographyOnly) {
      const hasCritical = fileResult.chars.some(c => c.risk === 'CRITICO')
      if (!fileResult.hasAttackPattern && !hasCritical) {
        continue
      }
    }

    if (fileResult.chars.length > 0 || fileResult.maliciousPatterns.length > 0) {
      const relPath = path.relative(rootDir, filepath).replace(/\\/g, '/')
      summary.files[relPath] = fileResult
      summary.scannedFiles++

      if (fileResult.chars.length > 0) {
        summary.filesWithChars++
        summary.totalChars += fileResult.chars.reduce((sum, c) => sum + c.count, 0)
      }

      if (fileResult.maliciousPatterns.length > 0) {
        summary.filesWithMalicious++
      }

      if (fileResult.hasAttackPattern) {
        summary.attackPatternsFound++
      }

      if (fileResult.riskLevel === 'CRITICO') {
        summary.criticalFiles++
      } else if (fileResult.riskLevel === 'ALTO') {
        summary.highRiskFiles++
      }
    }
  }

  // Determinar risco geral
  if (summary.attackPatternsFound > 0 || summary.criticalFiles > 0) {
    summary.riskAssessment = 'CRITICO'
  } else if (summary.highRiskFiles > 0) {
    summary.riskAssessment = 'ALTO'
  } else if (summary.filesWithMalicious > 0) {
    summary.riskAssessment = 'MEDIO'
  } else if (summary.filesWithChars > 0) {
    summary.riskAssessment = 'BAIXO'
  }

  return summary
}

// ============================================================================
// GERAÇÃO DE RELATÓRIO
// ============================================================================

function generateReport(summary: ScanSummary, outputFile?: string): string {
  const lines: Array<string> = []

  lines.push('# 🔍 Relatório de Segurança - Esteganografia e Código Malicioso')
  lines.push('')
  lines.push(`**Data:** ${new Date().toLocaleString('pt-BR')}`)
  lines.push(`**Diretório:** \`${summary.rootDir}\``)
  lines.push('')
  lines.push('---')
  lines.push('')

  // Resumo Executivo
  lines.push('## 📊 Resumo Executivo')
  lines.push('')
  lines.push('| Métrica | Valor |')
  lines.push('|---------|-------|')
  lines.push(`| Total de Arquivos | ${summary.totalFiles} |`)
  lines.push(`| Arquivos Escaneados | ${summary.scannedFiles} |`)
  lines.push(`| Arquivos com Caracteres | ${summary.filesWithChars} |`)
  lines.push(`| Total de Caracteres | ${summary.totalChars} |`)
  lines.push(`| Arquivos Críticos | ${summary.criticalFiles} |`)
  lines.push(`| Arquivos Alto Risco | ${summary.highRiskFiles} |`)
  lines.push(`| Padrões de Ataque | ${summary.attackPatternsFound} |`)
  lines.push(`| Avaliação de Risco | **${summary.riskAssessment}** |`)
  lines.push('')

  // Veredito
  lines.push('---')
  lines.push('')
  lines.push('## ⚖ Veredito')
  lines.push('')

  if (summary.riskAssessment === 'CRITICO') {
    lines.push('### 🚨 ATENÇÃO - RISCOS CRÍTICOS IDENTIFICADOS')
    lines.push('')
    if (summary.attackPatternsFound > 0) {
      lines.push(
        `- **${summary.attackPatternsFound}** arquivos com **padrão de ataque de esteganografia**`,
      )
    }
    if (summary.criticalFiles > 0) {
      lines.push(`- **${summary.criticalFiles}** arquivos com caracteres **CRÍTICOS**`)
    }
    lines.push('')
    lines.push('⚠ **AÇÃO IMEDIATA RECOMENDADA**')
  } else if (summary.riskAssessment === 'ALTO') {
    lines.push('### 🟠 ATENÇÃO - RISCOS ALTOS IDENTIFICADOS')
    lines.push('')
    lines.push(`- **${summary.highRiskFiles}** arquivos com caracteres de **ALTO RISCO**`)
    lines.push('')
    lines.push('⚠ **INVESTIGAÇÃO RECOMENDADA**')
  } else if (summary.riskAssessment === 'BAIXO') {
    lines.push('### 🟢 BAIXO RISCO')
    lines.push('')
    lines.push('✅ Caracteres encontrados são provavelmente inofensivos (emojis, formatação)')
  } else {
    lines.push('### ✅ SEGURO - NENHUM RISCO IDENTIFICADO')
    lines.push('')
    lines.push('✅ Nenhum caractere suspeito ou padrão malicioso encontrado')
  }

  lines.push('')

  // Arquivos com problemas
  if (Object.keys(summary.files).length > 0) {
    lines.push('---')
    lines.push('')
    lines.push('## 🚨 Arquivos com Problemas')
    lines.push('')

    // Agrupar por risco
    const byRisk: Record<string, Record<string, FileResult>> = {}
    for (const [filepath, data] of Object.entries(summary.files)) {
      const risk = data.riskLevel
      if (!byRisk[risk]) {
        byRisk[risk] = {}
      }
      byRisk[risk][filepath] = data
    }

    const riskIcons: Record<string, string> = {
      CRITICO: '🔴',
      ALTO: '🟠',
      MEDIO: '🟡',
      BAIXO: '🟢',
    }
    for (const risk of ['CRITICO', 'ALTO', 'MEDIO', 'BAIXO']) {
      if (!byRisk[risk]) continue

      lines.push(`### ${riskIcons[risk]} ${risk}`)
      lines.push('')
      lines.push('| Arquivo | Tipos | Ocorrências |')
      lines.push('|---------|-------|-------------|')

      for (const [filepath, data] of Object.entries(byRisk[risk]).sort(([a], [b]) =>
        a.localeCompare(b),
      )) {
        const charTypes = data.chars
          .slice(0, 3)
          .map(c => `${c.type} (${c.count})`)
          .join(', ')
        const total = data.chars.reduce((sum, c) => sum + c.count, 0)

        const displayTypes = data.hasAttackPattern ? '🚨 ATAQUE ESTEGANOGRAFIA' : charTypes

        lines.push(`| \`${filepath}\` | ${displayTypes} | ${total} |`)
      }

      lines.push('')
    }
  }

  // Recomendações
  lines.push('---')
  lines.push('')
  lines.push('## 🔧 Recomendações')
  lines.push('')

  if (['CRITICO', 'ALTO'].includes(summary.riskAssessment)) {
    lines.push('### Ações Imediatas')
    lines.push('')
    lines.push('1. **Investigar manualmente** cada arquivo crítico')
    lines.push('2. **Executar limpeza** se forem acidentais')
    lines.push('3. **Validar** que a limpeza não quebrou funcionalidades')
    lines.push('')
    lines.push('### Comandos de Limpeza')
    lines.push('')
    lines.push('```bash')
    lines.push('# Limpar caracteres invisíveis')
    lines.push('npx tsx scripts/security/security-clean.ts .')
    lines.push('')
    lines.push('# Validar limpeza')
    lines.push('npx tsx scripts/security/security-scan.ts .')
    lines.push('```')
  } else {
    lines.push('### Manutenção Preventiva')
    lines.push('')
    lines.push('1. Executar scan mensalmente')
    lines.push('2. Manter git hook pré-commit ativo')
    lines.push('3. Revisar código copiado de fontes externas')
  }

  lines.push('')
  lines.push('---')
  lines.push(`**Relatório gerado em:** ${new Date().toLocaleString('pt-BR')}`)

  const report = lines.join('\n')

  if (outputFile) {
    fs.writeFileSync(outputFile, report, 'utf-8')
  }

  return report
}

// ============================================================================
// PARSE DE ARGUMENTOS
// ============================================================================

interface Args {
  directory: string
  quick: boolean
  steganography: boolean
  output?: string
  json: boolean
}

function parseArgs(): Args {
  const args = process.argv.slice(2)
  const result: Args = {
    directory: '.',
    quick: false,
    steganography: false,
    json: false,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--quick') {
      result.quick = true
    } else if (arg === '--steganography') {
      result.steganography = true
    } else if (arg === '--output' && args[i + 1]) {
      result.output = args[++i]
    } else if (arg === '--json') {
      result.json = true
    } else if (!arg.startsWith('--')) {
      result.directory = arg
    }
  }

  return result
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  const args = parseArgs()

  const rootDir = path.resolve(args.directory)

  // Header
  console.log('='.repeat(80))
  console.log('🔍 angular-chronicles-part-1 Security Scanner - Esteganografia e Código Malicioso')
  console.log('='.repeat(80))
  console.log()
  console.log(`📂 Diretório: ${rootDir}`)
  console.log(
    `🔍 Modo: ${args.quick ? 'Rápido' : 'Completo'}${args.steganography ? ' + Esteganografia' : ''}`,
  )
  console.log()
  console.log('⏳ Escaneando...')
  console.log()

  // Scan
  const summary = scanDirectory(rootDir, args.quick, args.steganography)

  // Output
  if (args.json) {
    console.log(JSON.stringify(summary, null, 2))
  } else {
    // Resumo
    console.log('📊 Resumo:')
    console.log(`   Total de arquivos: ${summary.totalFiles}`)
    console.log(`   Arquivos escaneados: ${summary.scannedFiles}`)
    console.log(`   Caracteres encontrados: ${summary.totalChars}`)
    console.log(`   Padrões de ataque: ${summary.attackPatternsFound}`)
    console.log(`   Arquivos críticos: ${summary.criticalFiles}`)
    console.log(`   Avaliação de risco: ${summary.riskAssessment}`)
    console.log()

    // Veredito
    if (summary.riskAssessment === 'CRITICO') {
      console.log('🚨 VEREDITO: RISCOS CRÍTICOS IDENTIFICADOS!')
      console.log('   Ação imediata recomendada')
    } else if (summary.riskAssessment === 'ALTO') {
      console.log('🟠 VEREDITO: RISCOS ALTOS IDENTIFICADOS!')
      console.log('   Investigação recomendada')
    } else if (summary.riskAssessment === 'BAIXO') {
      console.log('🟢 VEREDITO: BAIXO RISCO')
      console.log('   Caracteres provavelmente inofensivos')
    } else {
      console.log('✅ VEREDITO: SEGURO')
      console.log('   Nenhum risco identificado')
    }

    console.log()
    console.log('='.repeat(80))
  }

  // Gerar relatório
  if (args.output) {
    let outputFile = args.output
    if (!outputFile.endsWith('.md')) {
      outputFile += '.md'
    }

    generateReport(summary, outputFile)
    console.log()
    console.log(`✅ Relatório salvo em: ${outputFile}`)
    console.log()
  }

  // Exit code
  if (['CRITICO', 'ALTO'].includes(summary.riskAssessment)) {
    process.exit(1)
  }
  process.exit(0)
}

main()
