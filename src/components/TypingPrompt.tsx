"use client";

import { useEffect, useState } from "react";
import { STATIC } from "@/lib/static";

// Terminal-style prompt that types and deletes short phrases. Ties to the
// "Marc: Prompt" identity; secondary so the static name stays readable.
export function TypingPrompt({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() => (STATIC ? phrases[0] : ""));
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(STATIC);

  useEffect(() => {
    const r =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).has("static");
    if (r) {
      setReduced(true);
      setText(phrases[0]);
    }
  }, [phrases]);

  useEffect(() => {
    if (reduced) return;
    const current = phrases[index % phrases.length];
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((v) => (v + 1) % phrases.length);
    } else {
      t = setTimeout(
        () =>
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          ),
        deleting ? 34 : 62
      );
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [text, deleting, index, phrases, reduced]);

  return (
    <span className={className} aria-label={phrases.join(", ")}>
      <span className="text-accent">&gt;</span> {text}
      <span
        aria-hidden
        className="ml-[1px] inline-block h-[1.05em] w-[0.55ch] translate-y-[0.15em] bg-foreground animate-[blink_1s_step-end_infinite]"
      />
    </span>
  );
}
