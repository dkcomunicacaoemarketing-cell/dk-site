import { useEffect, useState } from "react";

/** Opening animation: DK reveals from a mask, holds, then the page takes over. */
export function IntroDK() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 2200);
    const t2 = setTimeout(() => setPhase("done"), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${
        phase === "out" ? "intro-veil-out" : ""
      }`}
    >
      <div className="flex items-end gap-[0.02em] overflow-hidden">
        {["D", "K"].map((letter, i) => (
          <span key={letter} className="line-mask">
            <span
              className="intro-letter block font-display text-[30vw] font-black leading-[0.82] tracking-[-0.05em] sm:text-[22vw]"
              style={{ animationDelay: `${i * 140}ms` }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
      <span className="intro-rule absolute bottom-[22%] h-px bg-foreground/25" />
    </div>
  );
}
