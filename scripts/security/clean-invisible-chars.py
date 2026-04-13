#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Security: Remove invisible Unicode characters from project files.

This script scans the same set of files as scan-invisible-chars.py and removes
invisible code points from the files in-place. Use --dry-run to preview changes
without modifying files.
"""

import sys
import os
import argparse

# Invisible Unicode ranges to remove
INVISIBLE_RANGES = [
    (0xFE00, 0xFE0F),
    (0x200B, 0x200F),
    (0x202A, 0x202E),
    (0xE0100, 0xE01EF),
]

EXTENSIONS = {".ts", ".html", ".css", ".json", ".md"}
QUICK_EXT = {".ts"}

def is_invisible(cp: int) -> bool:
    for start, end in INVISIBLE_RANGES:
        if start <= cp <= end:
            return True
    return False

def remove_invisible(line: str) -> str:
    # Build a new line excluding invisible chars
    cleaned = []
    for ch in line:
        if not is_invisible(ord(ch)):
            cleaned.append(ch)
    return ''.join(cleaned)

def clean_file(filepath: str) -> tuple[bool, int]:
    cleaned_any = False
    changed_bytes = 0
    try:
        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
        new_lines = []
        for line in lines:
            new_line = remove_invisible(line)
            if new_line != line:
                cleaned_any = True
                changed_bytes += len(line) - len(new_line)
            new_lines.append(new_line)
        if cleaned_any:
            with open(filepath, "w", encoding="utf-8") as f:
                f.writelines(new_lines)
        return cleaned_any, changed_bytes
    except Exception as e:
        print(f"Error processing {filepath}: {e}", file=sys.stderr)
        return False, 0

def collect_and_clean(root: str, dry_run: bool) -> tuple[dict, int]:
    results = {}
    total_changed = 0
    for base in (os.path.join(root, "src"), os.path.join(root, "docs")):
        if not os.path.isdir(base):
            continue
        for dirpath, _, filenames in os.walk(base):
            for fname in filenames:
                ext = os.path.splitext(fname)[1].lower()
                if ext not in EXTENSIONS:
                    continue
                full = os.path.join(dirpath, fname)
                cleaned, delta = clean_file(full) if not dry_run else (False, 0)
                if delta > 0:
                    results[full] = delta
                    total_changed += delta
    return results, total_changed

def human_size(n: int) -> str:
    if n < 1024:
        return f"{n} bytes"
    for unit in ["KB", "MB", "GB"]:
        n /= 1024.0
        if n < 1024:
            return f"{n:.1f} {unit}"
    return f"{n:.1f} TB"

def main():
    parser = argparse.ArgumentParser(description="Remove invisible Unicode characters from project files")
    parser.add_argument("--dry-run", dest="dry_run", action="store_true", help="Preview changes without modifying files")
    args = parser.parse_args()

    project_root = os.path.abspath(os.getcwd())
    results, total = collect_and_clean(project_root, args.dry_run)

    if args.dry_run:
        if results:
            print(f"{len(results)} files would be changed (preview):")
            for path, delta in sorted(results.items()):
                print(f"- {path}: {delta} bytes would be removed")
        else:
            print("No changes would be made (dry-run).")
        sys.exit(0 if not results else 0)
    else:
        if results:
            print(f"{len(results)} files changed, total {human_size(total)} removed")
            sys.exit(1)
        else:
            print("All files clean. Nothing removed.")
            sys.exit(0)

if __name__ == "__main__":
    main()
