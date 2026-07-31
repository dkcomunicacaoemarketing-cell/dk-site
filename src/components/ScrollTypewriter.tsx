import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven typewriter: the text is revealed character by character as the
 * user scrolls through the (tall) wrapper. The text itself stays pinned.
 */
export function ScrollTypewriter({
  text,
  heightVh = 220,
  className = "",
  imageSrc,
  imageAlt = "",
}: {
  text: string;
  heightVh?: number;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? (-rect.top) / total : 0;
      const eased = Math.min(Math.max(progress / 0.95, 0), 1);
      // Always keep a few words visible so the section is never blank.
      setCount(Math.max(12, Math.round(eased * text.length)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [text]);

  const done = count >= text.length;

  return (
    <div ref={wrapperRef} style={{ height: `${heightVh}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6 pt-16">
        {imageSrc ? (
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:gap-14">
            <p className={`text-balance md:flex-1 ${className}`}>
              <span>{text.slice(0, count)}</span>
              <span aria-hidden className={`caret ${done ? "opacity-0" : ""}`} />
            </p>
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-44 shrink-0 rounded-2xl object-cover shadow-xl sm:w-56 md:w-64"
            />
          </div>
        ) : (
          <p className={`mx-auto max-w-4xl text-balance ${className}`}>
            <span>{text.slice(0, count)}</span>
            <span
              aria-hidden
              className={`caret ${done ? "opacity-0" : ""}`}
            />
          </p>
        )}
      </div>
    </div>
  );
}

/** Typewriter that plays once when the element enters the viewport. */
export function TypeOnView({
  text,
  className = "",
  speed = 26,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  speed?: number;
  as?: "p" | "h2" | "h3" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(Math.min(i, text.length));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [started, text, speed]);


  return (
    <div ref={ref}>
      <Tag className={className}>
        {text.slice(0, count)}
        <span aria-hidden className={`caret ${count >= text.length ? "opacity-0" : ""}`} />
      </Tag>
    </div>
  );
}
