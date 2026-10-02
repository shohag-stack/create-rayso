Add a section to the library from: $ARGUMENTS (a Figma link, or an image file)

1. Get the design: for a Figma link, fetch design context and a screenshot via
   the Figma MCP server; for an image, read it and estimate sizes (list every
   estimate in your summary).
2. Read `library/README.md` and the rules in `library/base/CLAUDE.MD`.
3. Check `library/sections/` for an existing section to extend with an option
   instead of adding a near-duplicate.
4. Pick `<category>/<id>` (kebab-case, e.g. `features/features-icon-grid`) and
   write all six files: component.tsx, schema.ts, query.ts, types.ts,
   meta.json, seed.json (demo content from the design).
5. Semantic tokens only; mobile-first with all breakpoints; content from props.
6. Run `npm run check:library`, then `npm run playground` and the checks under
   "Done means" in CLAUDE.md. Fix every failure.
7. Summarize: the section id, its fields, tokens with no exact match, estimated
   sizes, and any TODO(dev) left.
