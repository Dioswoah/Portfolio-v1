"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { profile, nav } from "@/content";

const isTyping = () => {
  const el = document.activeElement as HTMLElement | null;
  return (
    !!el &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable)
  );
};

const groupHead =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.66rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-muted-foreground";

function Item({
  children,
  onSelect,
  keywords,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  keywords?: string[];
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      keywords={keywords}
      className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-mono text-sm text-muted-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground"
    >
      {children}
    </Command.Item>
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "/" && !isTyping() && !open) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("open-command", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command", onOpen);
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const goTo = (href: string) => {
    close();
    setTimeout(() => {
      if (href === "#top") {
        if (window.__lenis) window.__lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.querySelector(href);
      if (!el) return;
      if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: -80 });
      else el.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  const openTab = (url: string) => {
    close();
    window.open(url, "_blank", "noreferrer");
  };

  const copyEmail = async () => {
    close();
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied to clipboard", { description: profile.email });
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const toggleTheme = () => {
    close();
    const el = document.documentElement;
    const dark = el.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={close}
      />
      <Command
        label="Command menu"
        loop
        className="absolute left-1/2 top-[15%] w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <span className="font-mono text-accent">&gt;</span>
          <Command.Input
            autoFocus
            placeholder="Type a command or jump to a section…"
            className="w-full bg-transparent py-3.5 font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[0.62rem] text-muted-foreground sm:block">
            esc
          </kbd>
        </div>
        <Command.List className="max-h-[320px] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center font-mono text-sm text-muted-foreground">
            No results.
          </Command.Empty>
          <Command.Group heading="Go to" className={groupHead}>
            {nav.map((item) => (
              <Item key={item.href} onSelect={() => goTo(item.href)}>
                {item.label}
              </Item>
            ))}
          </Command.Group>
          <Command.Group heading="Actions" className={groupHead}>
            <Item onSelect={copyEmail} keywords={["email", "contact", "mail"]}>
              Copy email
            </Item>
            <Item onSelect={() => openTab(profile.resume)} keywords={["cv", "download"]}>
              Open resume ↗
            </Item>
            <Item onSelect={() => openTab(profile.socials.github)} keywords={["code", "repos"]}>
              GitHub ↗
            </Item>
            <Item onSelect={() => openTab(profile.socials.linkedin)}>
              LinkedIn ↗
            </Item>
            <Item onSelect={toggleTheme} keywords={["dark", "light", "mode"]}>
              Toggle theme
            </Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
