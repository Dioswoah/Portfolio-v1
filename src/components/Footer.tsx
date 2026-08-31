"use client";

const openCommand = () => window.dispatchEvent(new Event("open-command"));

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-foreground">
            Marc<span className="text-accent">:</span> Prompt
          </span>{" "}
          · © {new Date().getFullYear()} Marc Joshua Ramos
        </p>
        <div className="flex items-center gap-5">
          <button onClick={openCommand} className="link">
            press ⌘K
          </button>
          <a href="#top" className="link">
            back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
