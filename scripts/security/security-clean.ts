#!/usr/bin/env node
/**
 * angular-chronicles-part-1 Security Cleaner - Limpeza de Caracteres Unicode Invisíveis
 *
 * Este script remove automaticamente caracteres Unicode que podem ser usados
 * para ofuscação, esteganografia ou ataques de segurança.
 *
 * Caracteres removidos:
 * - U+FE00 a U+FE0F: Variation Selectors
 * - U+E0100 a U+E01EF: Variation Selectors Supplement
 * - U+200B a U+200F: Zero-Width Characters
 * - U+202A a U+202E: Directional Formatting Characters
 * - U+E000 a U+F8FF: Private Use Area
 * - U+FFF0 a U+FFFF: Specials
 *
 * Uso:
 *   npx tsx scripts/security/security-clean.ts [diretorio] [opcoes]
 *
 * Exemplos:
 *   npx tsx scripts/security/security-clean.ts .              # Limpeza real
 *   npx tsx scripts/security/security-clean.ts . --dry-run    # Apenas visualização
 *   npx tsx scripts/security/security-clean.ts src/           # Limpar src/
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

// Pattern para caracteres proibidos
const PROHIBITED_PATTERN =
  /[\uFE00-\uFE0F\u200B-\u200F\u202A-\u202E\uE000-\uF8FF\uFFF0-\uFFFF]|\u{E0100}-\u{E01EF}/gu

// Mapeamento de códigos para nomes
const CHAR_NAMES: Record<string, string> = {
  '\uFE00': 'Variation Selector-1',
  '\uFE01': 'Variation Selector-2',
  '\uFE02': 'Variation Selector-3',
  '\uFE03': 'Variation Selector-4',
  '\uFE04': 'Variation Selector-5',
  '\uFE05': 'Variation Selector-6',
  '\uFE06': 'Variation Selector-7',
  '\uFE07': 'Variation Selector-8',
  '\uFE08': 'Variation Selector-9',
  '\uFE09': 'Variation Selector-10',
  '\uFE0A': 'Variation Selector-11',
  '\uFE0B': 'Variation Selector-12',
  '\uFE0C': 'Variation Selector-13',
  '\uFE0D': 'Variation Selector-14',
  '\uFE0E': 'Variation Selector-15',
  '\uFE0F': 'Variation Selector-16',
  '\u200B': 'Zero Width Space',
  '\u200C': 'Zero Width Non-Joiner',
  '\u200D': 'Zero Width Joiner',
  '\u200E': 'Left-to-Right Mark',
  '\u200F': 'Right-to-Left Mark',
  '\u202A': 'Left-to-Right Embedding',
  '\u202B': 'Right-to-Left Embedding',
  '\u202C': 'Pop Directional Formatting',
  '\u202D': 'Left-to-Right Override',
  '\u202E': 'Right-to-Left Override',
}

// Extensões de arquivo a verificar
const ALLOWED_EXTENSIONS = new Set([
  '.js',
  '.ts',
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
  '.json',
  '.yaml',
  '.yml',
  '.xml',
  '.toml',
  '.md',
  '.txt',
  '.rst',
  '.html',
  '.css',
  '.scss',
  '.sass',
  '.less',
  '.styl',
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

// ============================================================================
// FUNÇÕES DE LIMPEZA
// ============================================================================

function countProhibited(content: string): [number, Record<string, number>] {
  const matches = content.match(PROHIBITED_PATTERN) || []
  const charCounts: Record<string, number> = {}

  for (const char of matches) {
    // Skip surrogate pairs that don't form valid characters
    if (char.length > 2) continue

    const charName =
      CHAR_NAMES[char]
      ?? `Unknown (U+${char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')})`
    if (!charCounts[charName]) {
      charCounts[charName] = 0
    }
    charCounts[charName]++
  }

  return [matches.length, charCounts]
}

function cleanContent(content: string): [string, number] {
  const cleaned = content.replace(PROHIBITED_PATTERN, '')
  const removed = content.length - cleaned.length
  return [cleaned, removed]
}

function cleanFile(filepath: string, dryRun = false): [number, Record<string, number>, boolean] {
  try {
    const content = fs.readFileSync(filepath, 'utf-8')

    const [total, charCounts] = countProhibited(content)

    if (total === 0) {
      return [0, {}, true]
    }

    if (dryRun) {
      return [total, charCounts, true]
    }

    // Limpar e salvar
    const [cleanedContent] = cleanContent(content)

    fs.writeFileSync(filepath, cleanedContent, 'utf-8')

    return [total, charCounts, true]
  } catch (e) {
    console.error(`[ERRO] ${filepath}: ${(e as Error).message}`)
    return [0, {}, false]
  }
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

function cleanDirectory(rootDir: string, dryRun = false): [number, number] {
  let filesAffected = 0
  let totalRemoved = 0

  const allFiles = walkDirectory(rootDir)

  for (const filepath of allFiles) {
    const ext = path.extname(filepath).toLowerCase()
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      continue
    }

    const [removed, charCounts, success] = cleanFile(filepath, dryRun)

    if (removed > 0 && success) {
      filesAffected++
      totalRemoved += removed

      const status = dryRun ? '[DRY RUN]' : '[LIMPO]'
      console.log(`${status} ${filepath}`)
      console.log(`         ${removed} caractere(s) removido(s):`)

      for (const [charName, count] of Object.entries(charCounts).sort(([a], [b]) =>
        a.localeCompare(b),
      )) {
        console.log(`           - ${charName}: ${count}`)
      }
      console.log()
    }
  }

  return [filesAffected, totalRemoved]
}

// ============================================================================
// PARSE DE ARGUMENTOS
// ============================================================================

interface Args {
  directory: string
  dryRun: boolean
}

function parseArgs(): Args {
  const args = process.argv.slice(2)
  const result: Args = {
    directory: '.',
    dryRun: false,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--dry-run') {
      result.dryRun = true
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
  console.log('🧹 angular-chronicles-part-1 Security Cleaner - Limpeza de Caracteres Unicode')
  console.log('='.repeat(80))

  if (args.dryRun) {
    console.log('\n🔍 MODO: Dry Run (apenas visualização, nenhuma alteração)')
  } else {
    console.log('\n⚠  MODO: Limpeza Real (arquivos serão modificados)')
  }

  console.log(`\n📂 Diretório: ${rootDir}`)
  console.log('\n⏳ Processando...\n')

  // Limpeza
  const [filesAffected, totalRemoved] = cleanDirectory(rootDir, args.dryRun)

  // Resumo
  console.log('='.repeat(80))
  console.log('\n📊 Resumo:')
  console.log(`   Arquivos afetados: ${filesAffected}`)
  console.log(`   Caracteres removidos: ${totalRemoved}`)

  if (args.dryRun) {
    console.log(`\n💡 Para executar a limpeza real:`)
    console.log(`   npx tsx scripts/security/security-clean.ts ${rootDir}`)
  } else {
    console.log('\n✅ Limpeza concluída com sucesso!')
    console.log('\n📚 Valide com:')
    console.log(`   npx tsx scripts/security/security-scan.ts ${rootDir}`)
  }

  console.log()
}

main()
