import { useRef, useState, type ReactNode } from "react";

export type Section = { id: string; label: string; content: ReactNode };

/**
 * Fixed top menu (like a standard site header) with the sections inside it.
 * Switching a tab replaces the content in place (masked line transition)
 * while the page keeps its normal, native scroll.
 */
export function SectionTabs({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(0);
  const [pass, setPass] = useState(0);
  const anchorRef = useRef<HTMLDivElement>(null);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    setPass((p) => p + 1);
    const el = anchorRef.current;
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 8;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible sm:py-4 [&::-webkit-scrollbar]:hidden">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => select(i)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                i === active
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <div ref={anchorRef} className="scroll-mt-24 px-5 pb-24 pt-12 sm:px-6">
        <div key={pass} className="mx-auto max-w-5xl">
          <div className="line-in">{sections[active].content}</div>
        </div>
      </div>
    </>
  );
}
