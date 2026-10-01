#!/bin/bash
set -e
TEMPLATE_NAME=$(node -p "require('./package.json').name")
OUTPUT_DIR="./dist"
ZIP_NAME="${TEMPLATE_NAME}-$(date +%Y%m%d).zip"

# Every buyer zip must carry a filled-in license
if [ ! -f LICENSE.txt ]; then
  echo "✖ LICENSE.txt is missing" && exit 1
fi
if grep -q '{{' LICENSE.txt; then
  echo "✖ LICENSE.txt still has {{placeholders}}" && exit 1
fi

rm -rf "$OUTPUT_DIR" && mkdir -p "$OUTPUT_DIR"
zip -r "$OUTPUT_DIR/$ZIP_NAME" . \
  --exclude "*/node_modules/*" --exclude "*/.next/*" --exclude "*/.sanity/*" \
  --exclude "*/dist/*" --exclude "*/.git/*" --exclude "*/.env.local" \
  --exclude "*/.env.*.local" --exclude "*/.DS_Store" --exclude "*.log" \
  --exclude "./zip.sh" --exclude "./MAINTAINER.md" \
  --exclude "./.claude/commands/zip-project.md"
echo "✅ $OUTPUT_DIR/$ZIP_NAME ($(du -sh "$OUTPUT_DIR/$ZIP_NAME" | cut -f1))"
