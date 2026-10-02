Package the template for sale. $ARGUMENTS

Follow "Releasing" in MAINTAINER.md step by step:

1. If $ARGUMENTS names a version (e.g. `1.1.0`) or says patch/minor/major, bump
   `version` in the root package.json. Otherwise ask whether to bump it when
   buyer-facing files changed since the last zip.
2. Run the checks listed in MAINTAINER.md (lint + typecheck, `npm run build`).
   Fix failures before going on.
3. Check the shipped docs are buyer-safe and README still matches the code.
4. Run `npm run zip` (it exports fresh demo content first; pass `-- --no-export`
   only if I say the content hasn't changed).
5. Verify the zip contents as listed in MAINTAINER.md.
6. Report the zip name and size, the checks that ran, and anything from
   "Before selling" in MAINTAINER.md that's still open.
