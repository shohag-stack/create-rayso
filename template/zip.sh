#!/bin/bash
set -e
TEMPLATE_NAME=$(node -p "require('./package.json').name")
OUTPUT_DIR="./dist"
ZIP_NAME="${TEMPLATE_NAME}-$(date +%Y%m%d).zip"
rm -rf "$OUTPUT_DIR" && mkdir -p "$OUTPUT_DIR"
zip -r "$OUTPUT_DIR/$ZIP_NAME" . \
  --exclude "*/node_modules/*" --exclude "*/.next/*" --exclude "*/.sanity/*" \
  --exclude "*/dist/*" --exclude "*/.git/*" --exclude "*/.env.local" \
  --exclude "*/.env.*.local" --exclude "*/.DS_Store" --exclude "*.log" \
  --exclude "*/zip.sh"
echo "✅ $OUTPUT_DIR/$ZIP_NAME ($(du -sh "$OUTPUT_DIR/$ZIP_NAME" | cut -f1))"
