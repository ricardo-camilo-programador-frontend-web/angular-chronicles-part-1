#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Security: Scan for invisible Unicode characters in project files.

This script scans .ts, .html, .css, .json, and .md files under src/ and docs/
for invisible Unicode characters. It reports per-file line numbers where any such
characters appear and exits with code 0 if clean or 1 if issues were found.

Usage:
  python3 scan-invisible-chars.py [--quick] [--output <file>]

Options:
  --quick          Only scan TypeScript (.ts) files for speed.
  --output <file>  Write a report to the specified file instead of stdout.
"""

import sys
import os
import argparse

# Invisible Unicode ranges to detect
INVISIBLE_RANGES = [
    (0xFE00, 0xFE0F),   # variation selectors
    (0x200B, 0x200F),   # zero-width spaces and related
    (0x202A, 0x202E),   # LRE, RLE, LRO, RLE, PDF, etc.
    (0xE0100, 0xE01EF), # supplementary private use area (emoji modifiers, etc.)
]

EXTENSIONS = {".ts", ".html", ".css", ".json", ".md"}
QUICK_EXT = {".ts"}

def is_invisible(cp: int) -> bool:
    for start, end in INVISIBLE_RANGES:
        if start <= cp <= end:
            return True
    return False

def scan_file(filepath: str) -> list:
    issues = []
    try:
        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            for ln, line in enumerate(f, start=1):
                for idx, ch in enumerate(line):
                    if is_invisible(ord(ch)):
                        issues.append((ln, ord(ch), ch))
                        break  # one issue per line is enough to report
    except Exception as e:
        print_error(f"Error reading {filepath}: {e}")
    return issues

def print_error(msg: str):
    # Red color
    print(f"\033[31m{msg}\033[0m", file=sys.stderr)

def print_ok(msg: str):
    # Green color
    print(f"\033[32m{msg}\033[0m")

def collect_issues(root: str, quick: bool) -> tuple[dict, int]:
    results = {}
    file_count = 0
    for base in (os.path.join(root, "src"), os.path.join(root, "docs")):
        if not os.path.isdir(base):
            continue
        for dirpath, _, filenames in os.walk(base):
            for fname in filenames:
                ext = os.path.splitext(fname)[1].lower()
                if quick and ext != ".ts":
                    continue
                if ext not in EXTENSIONS:
                    continue
                file_count += 1
                full = os.path.join(dirpath, fname)
                issues = scan_file(full)
                if issues:
                    results[full] = issues
    # exit code 1 if any issues
    exit_code = 1 if results else 0
    return results, exit_code

def format_report(issues: dict) -> str:
    lines = []
    for path, rows in sorted(issues.items()):
        lines.append(f"File: {path}")
        for ln, cp, ch in rows:
            lines.append(f"  Line {ln}: U+{cp:04X} '{ch}'")
        lines.append("")
    return "\n".join(lines).rstrip()

def main():
    parser = argparse.ArgumentParser(description="Scan for invisible Unicode characters in project files")
    parser.add_argument("--quick", action="store_true", help="Only scan TypeScript files (.ts)")
    parser.add_argument("--output", dest="output", default=None, help="Output report file path")
    args = parser.parse_args()

    project_root = os.path.abspath(os.getcwd())
    results, code = collect_issues(project_root, args.quick)

    report = format_report(results)

    if results:
        print_ok("Invisible Unicode characters FOUND:")
        print(report)
    else:
        print_ok("No invisible Unicode characters detected.")

    if args.output:
        try:
            with open(args.output, "w", encoding="utf-8") as out:
                out.write(report + ("\n" if report else ""))
            print_ok(f"Report written to {args.output}")
        except Exception as e:
            print_error(f"Failed to write report: {e}")

    sys.exit(0 if code == 0 else 1)

if __name__ == "__main__":
    main()
