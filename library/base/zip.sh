#!/bin/bash
# Builds the buyer zip: <name>-<version>.zip in the repo root.
# Usage: npm run zip
#
# The live preview (the Sanity project in studio/.env.local) may use the
# design's own images, which we can't redistribute. The zip never ships that
# dataset: buyers get the generated seed/demo-content.ndjson, whose images are
# Unsplash URLs that `npm run seed` downloads from Unsplash.
set -e
cd "$(dirname "$0")"

NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")
ZIP="$PWD/${NAME}-${VERSION}.zip"
SEED="seed/demo-content.ndjson"
DEMO="frontend/(core)/demo/content.json"
# Hosts the shipped demo content may take images and files from
ALLOWED_MEDIA_HOSTS="images.unsplash.com"

fail() { echo "✖ $1" >&2; exit 1; }

env_value() { # env_value <file> <key>
  [ -f "$1" ] && grep -E "^$2=" "$1" | tail -1 | cut -d= -f2- | tr -d "\"' \r"
}
PROJECT_ID=$(env_value studio/.env.local SANITY_STUDIO_PROJECT_ID)
[ "$PROJECT_ID" = "your_project_id" ] && PROJECT_ID=""

# Every buyer zip must carry a filled-in license
[ -f LICENSE.txt ] || fail "LICENSE.txt is missing"
! grep -q '{{' LICENSE.txt || fail "LICENSE.txt still has {{placeholders}}"

# 1. Demo content: only the generated seed, with images from allowed hosts
[ -f "$SEED" ] || fail "$SEED not found (rebuild the template with create-rayso)"
HOSTS=$(cat "$SEED" "$DEMO" 2>/dev/null | grep -oE '(image|file)@https?://[^/"]+|"url": *"https?://[^/"]+/[^"]*\.(jpe?g|png|webp|avif|gif|svg|mp4|webm|mov)' \
  | sed -E 's#^[^/]*//([^/"]+).*#\1#' | sort -u)
for host in $HOSTS; do
  [[ " $ALLOWED_MEDIA_HOSTS " == *" $host "* ]] || fail "demo content uses media from $host (allowed: $ALLOWED_MEDIA_HOSTS)"
done

# 2. Clean copy without seller-only, local and preview-only files
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
rsync -a ./ "$STAGE/$NAME/" \
  --exclude node_modules --exclude .next --exclude .sanity --exclude dist \
  --exclude .git --exclude .turbo --exclude '.env.local' --exclude '.env.*.local' \
  --exclude .DS_Store --exclude '*.log' --exclude '*.tsbuildinfo' --exclude '*.zip' \
  --exclude '/seed/*.tar.gz' \
  --exclude /MAINTAINER.md --exclude /niche.json --exclude /zip.sh --exclude /.claude/commands/zip-project.md

# 3. Safety checks on what would ship
LEAKED=$(find "$STAGE" -name '.env*' ! -name '.env.example')
[ -z "$LEAKED" ] || fail "env file would ship: $LEAKED"
if [ -n "$PROJECT_ID" ] && grep -rlF "$PROJECT_ID" "$STAGE" >/dev/null; then
  fail "demo project ID found in: $(grep -rlF "$PROJECT_ID" "$STAGE" | sed "s|$STAGE/||")"
fi
# Preview assets live in the demo Sanity project; none may ship
if grep -rlE 'cdn\.sanity\.io/(images|files)/' "$STAGE" >/dev/null; then
  fail "preview asset URL (cdn.sanity.io) found in: $(grep -rlE 'cdn\.sanity\.io/(images|files)/' "$STAGE" | sed "s|$STAGE/||")"
fi
# No bundled media besides app icons (demo images come from Unsplash at seed time)
MEDIA=$(find "$STAGE" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \
  -o -iname '*.avif' -o -iname '*.gif' -o -iname '*.mp4' -o -iname '*.webm' -o -iname '*.mov' -o -iname '*.tar.gz' \) \
  ! -name 'favicon.*' ! -name 'icon.*' ! -name 'apple-icon.*' | sed "s|$STAGE/||")
[ -z "$MEDIA" ] || fail "media file would ship (check its license, then add it to the exceptions in zip.sh): $MEDIA"

# 4. Zip
rm -f "$ZIP"
(cd "$STAGE" && zip -qr "$ZIP" "$NAME")
echo "✅ $(basename "$ZIP") ($(du -sh "$ZIP" | cut -f1))"
