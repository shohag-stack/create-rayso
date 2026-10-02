#!/bin/bash
# Builds the buyer zip: <name>-<version>.zip in the repo root.
# Usage: npm run zip              (exports fresh demo content first)
#        npm run zip -- --no-export  (reuse seed/demo-content.tar.gz, or ship the
#                                     generated seed/demo-content.ndjson)
set -e
cd "$(dirname "$0")"

NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")
ZIP="$PWD/${NAME}-${VERSION}.zip"
SEED="seed/demo-content.tar.gz"

fail() { echo "✖ $1" >&2; exit 1; }

env_value() { # env_value <file> <key>
  [ -f "$1" ] && grep -E "^$2=" "$1" | tail -1 | cut -d= -f2- | tr -d "\"' \r"
}
PROJECT_ID=$(env_value studio/.env.local SANITY_STUDIO_PROJECT_ID)
DATASET=$(env_value studio/.env.local SANITY_STUDIO_DATASET)
DATASET=${DATASET:-production}
[ "$PROJECT_ID" = "your_project_id" ] && PROJECT_ID=""

# Every buyer zip must carry a filled-in license
[ -f LICENSE.txt ] || fail "LICENSE.txt is missing"
! grep -q '{{' LICENSE.txt || fail "LICENSE.txt still has {{placeholders}}"

# 1. Demo content
if [ "$1" != "--no-export" ]; then
  [ -n "$PROJECT_ID" ] || fail "SANITY_STUDIO_PROJECT_ID missing in studio/.env.local"
  mkdir -p seed
  echo "Exporting $DATASET (documents, images, videos)..."
  (cd studio && npx sanity dataset export "$DATASET" "../$SEED" --overwrite)
fi
[ -f "$SEED" ] || [ -f seed/demo-content.ndjson ] || fail "$SEED not found (run without --no-export)"

# 2. Clean copy without seller-only and local files
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
rsync -a ./ "$STAGE/$NAME/" \
  --exclude node_modules --exclude .next --exclude .sanity --exclude dist \
  --exclude .git --exclude .turbo --exclude '.env.local' --exclude '.env.*.local' \
  --exclude .DS_Store --exclude '*.log' --exclude '*.tsbuildinfo' --exclude '*.zip' \
  --exclude /MAINTAINER.md --exclude /niche.json --exclude /zip.sh --exclude /.claude/commands/zip-project.md

# 3. Safety checks on what would ship
LEAKED=$(find "$STAGE" -name '.env*' ! -name '.env.example')
[ -z "$LEAKED" ] || fail "env file would ship: $LEAKED"
if [ -n "$PROJECT_ID" ] && grep -rlF "$PROJECT_ID" "$STAGE" --exclude='*.tar.gz' >/dev/null; then
  fail "demo project ID found in: $(grep -rlF "$PROJECT_ID" "$STAGE" --exclude='*.tar.gz' | sed "s|$STAGE/||")"
fi

# 4. Zip
rm -f "$ZIP"
(cd "$STAGE" && zip -qr "$ZIP" "$NAME")
echo "✅ $(basename "$ZIP") ($(du -sh "$ZIP" | cut -f1))"
