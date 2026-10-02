// Giant brand text sized to fill its container's width; "faded" fades it out towards the bottom,
// "bleed" lets the letters run off the bottom edge of the footer
export function Wordmark({
  text,
  style = "solid",
  split = false,
  bleed = false,
  className = "",
}: {
  text?: string;
  style?: "solid" | "faded";
  split?: boolean;
  bleed?: boolean;
  className?: string;
}) {
  if (!text) return null;
  const words = text.trim().split(/\s+/);
  const spread = split && words.length > 1;
  // About 0.52 em per character in most display fonts, so the text roughly fills the width
  const characters = Math.max(spread ? words.join("").length + words.length : text.length, 3);

  return (
    <div className={`@container ${className}`}>
      <p
        aria-hidden
        className={`font-heading leading-[0.85] tracking-tight whitespace-nowrap select-none ${style === "faded" ? "opacity-25" : ""} ${bleed ? "-mb-[0.14em]" : ""} ${
          spread ? "flex justify-between" : ""
        }`}
        style={{
          fontSize: `${(100 / (characters * 0.52)).toFixed(2)}cqw`,
          ...(style === "faded" ? { maskImage: "linear-gradient(to bottom, black 20%, transparent)" } : {}),
        }}
      >
        {spread ? words.map((word, i) => <span key={i}>{word}</span>) : text}
      </p>
    </div>
  );
}
