"use client";

export function ShiningText({ text, children, variant = "green", className = "" }) {
  const content = text ?? children;
  const gradient =
    variant === "red"
      ? "linear-gradient(110deg, rgba(239,68,68,0.5) 35%, #fca5a5 50%, rgba(239,68,68,0.5) 75%, rgba(239,68,68,0.5))"
      : "linear-gradient(110deg, rgba(74,222,128,0.5) 35%, #fff 50%, rgba(74,222,128,0.5) 75%, rgba(74,222,128,0.5))";
  return (
    <span
      className={`shining-text shining-text-${variant} ${className}`}
      style={{
        background: gradient,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      {content}
    </span>
  );
}
