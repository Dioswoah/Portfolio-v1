"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Command as CommandIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { nav, profile } from "@/content";

const openCommand = () => window.dispatchEvent(new Event("open-command"));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          Marc<span className="text-accent">:</span> Prompt
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative font-mono text-[0.82rem] transition-colors",
                active === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {active === item.href && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
              )}
            </a>
          ))}
          <button
            onClick={openCommand}
            aria-label="Open command menu"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <CommandIcon size={12} /> K
          </button>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={openCommand}
            aria-label="Open command menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground"
          >
            <CommandIcon size={16} />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300",
          open ? "max-h-96" : "max-h-0 border-b-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="py-2 font-mono text-sm text-accent"
          >
            resume ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
