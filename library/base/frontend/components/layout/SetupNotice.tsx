// Shown until Sanity is connected, so a fresh install explains itself
export function SetupNotice({ reason = "no-project" }: { reason?: "no-project" | "no-home" }) {
  return (
    <main className="container-site flex min-h-screen flex-col justify-center gap-4">
      <p className="eyebrow">Almost there</p>
      <h1 className="text-4xl">
        {reason === "no-project" ? "Connect your Sanity project" : "Publish the home page"}
      </h1>
      <p className="max-w-xl">
        {reason === "no-project"
          ? "Add your project ID to frontend/.env.local, then run npm run seed to load the demo content (README steps 3 and 4)."
          : "Open the Studio, add sections to the Home page and publish it, or run npm run seed."}
      </p>
    </main>
  );
}
