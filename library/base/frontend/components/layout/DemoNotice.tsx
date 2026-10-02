// Shown while the site runs on the bundled demo content instead of a Sanity project
export function DemoNotice() {
  return (
    <p className="fixed bottom-4 left-4 z-50 rounded-full bg-surface-inverse px-4 py-2 text-xs text-fg-inverse shadow-lg">
      Demo content. Connect Sanity to edit it (README step 3).
    </p>
  );
}
