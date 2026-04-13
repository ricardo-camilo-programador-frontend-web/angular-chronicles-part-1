#!/usr/bin/env node

/**
 * Pre-commit hook para verificar caracteres Unicode invisíveis.
 *
 * Este script é executado automaticamente antes de cada commit e bloqueia
 * o commit se detectar caracteres proibidos nos arquivos staged.
 *
 * Instalação:
 *   cp scripts/security/pre-commit-security-hook.ts scripts/pre-commit-hook.ts
 *   npx tsx scripts/pre-commit-hook.ts (como pre-commit hook)
 *
 * Ou instalar como hook nativo:
 *   echo '#!/bin/sh\nnpx tsx scripts/security/pre-commit-security-hook.ts' > .git/hooks/pre-commit
 *   chmod +x .git/hooks/pre-commit
 */

import { execSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'

// Faixas de caracteres proibidos
const PROHIBITED_RANGES: Array<[number, number, string]> = [
  [0xfe00, 0xfe0f, 'Variation Selectors'],
  [0xe0100, 0xe01ef, 'Variation Selectors Supplement'],
  [0x200b, 0x200f, 'Zero-Width Characters'],
  [0x202a, 0x202e, 'Directional Formatting Characters'],
  [0xe000, 0xf8ff, 'Private Use Area'],
  [0xfff0, 0xffff, 'Specials'],
]

// Extensões a verificar
const ALLOWED_EXTENSIONS = new Set(['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'])

function isProhibited(char: string): boolean {
  const code = char.codePointAt(0) ?? 0
  for (const [start, end] of PROHIBITED_RANGES) {
    if (code >= start && code <= end) {
      return true
    }
  }
  return false
}

function getStagedFiles(): Array<string> {
  try {
    const result = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
    })
    return result
      .trim()
      .split('\n')
      .filter(f => f.length > 0)
  } catch {
    return []
  }
}

function scanFile(filepath: string): Array<[number, string, string]> {
  const found: Array<[number, string, string]> = []
  try {
    const content = fs.readFileSync(filepath, 'utf-8')

    for (let i = 0; i < content.length; i++) {
      if (isProhibited(content[i])) {
        const codePoint = content.codePointAt(i) ?? content.charCodeAt(i)
        found.push([i, content[i], `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`])

        // Skip surrogate pairs
        if (codePoint > 0xffff) {
          i++
        }
      }
    }

    return found
  } catch {
    return []
  }
}

function main() {
  console.log('='.repeat(80))
  console.log('🔒 Pre-commit Security Hook - Scan de Caracteres Invisíveis')
  console.log('='.repeat(80))

  // Obter arquivos staged
  const stagedFiles = getStagedFiles()

  if (stagedFiles.length === 0) {
    console.log('\n✅ Nenhum arquivo staged para verificar')
    process.exit(0)
  }

  console.log(`\n📋 Verificando ${stagedFiles.length} arquivo(s) staged...\n`)

  // Verificar cada arquivo
  const alerts: Record<string, Array<[number, string, string]>> = {}

  for (const filepath of stagedFiles) {
    // Pular se não for extensão alvo
    const ext = path.extname(filepath).toLowerCase()
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      continue
    }

    // Pular se arquivo não existir (pode ter sido deletado)
    if (!fs.existsSync(filepath)) {
      continue
    }

    const found = scanFile(filepath)
    if (found.length > 0) {
      alerts[filepath] = found
    }
  }

  // Resultado
  if (Object.keys(alerts).length > 0) {
    console.log('❌ BLOQUEADO: Caracteres proibidos detectados!\n')

    for (const [filepath, characters] of Object.entries(alerts)) {
      console.log(`📁 ${filepath}`)
      for (const [pos, , code] of characters.slice(0, 5)) {
        console.log(`   Posição ${pos}: ${code}`)
      }
      if (characters.length > 5) {
        console.log(`   ... e mais ${characters.length - 5} caracteres`)
      }
      console.log()
    }

    console.log('='.repeat(80))
    console.log('\n🔒 AÇÃO REQUERIDA:\n')
    console.log('1. Execute a limpeza:')
    console.log('   npx tsx scripts/security/security-clean.ts\n')
    console.log('2. Valide a limpeza:')
    console.log('   npx tsx scripts/security/security-scan.ts\n')
    console.log('3. Adicione os arquivos limpos:')
    console.log('   git add .\n')
    console.log('4. Tente o commit novamente\n')
    console.log('📚 Referência: docs/rotina/SEGURANCA-CODIGO.md')
    console.log('='.repeat(80))

    process.exit(1)
  } else {
    console.log('✅ Nenhum caractere proibido encontrado')
    console.log('\n🎉 Commit permitido!\n')
    process.exit(0)
  }
}

main()
