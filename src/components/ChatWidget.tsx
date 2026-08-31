"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, CornerDownLeft } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/content";

type Role = "user" | "sys" | "bot";
type Msg = { id: number; role: Role; text: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function device(): string {
  const ua = navigator.userAgent;
  const browser = /edg/i.test(ua)
    ? "Edge"
    : /chrome/i.test(ua)
    ? "Chrome"
    : /firefox/i.test(ua)
    ? "Firefox"
    : /safari/i.test(ua)
    ? "Safari"
    : "your browser";
  const os = /windows/i.test(ua)
    ? "a Windows PC"
    : /mac/i.test(ua)
    ? "a Mac"
    : /android/i.test(ua)
    ? "an Android phone"
    : /iphone|ipad|ipod/i.test(ua)
    ? "an iPhone"
    : /linux/i.test(ua)
    ? "Linux"
    : "your device";
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `you are on ${browser}, using ${os}, and it is ${time} where you are.`;
}

// Dynamic per visitor, worldwide, no permission prompt. Uses IP geolocation
// (keyless, CORS-friendly), trying a backup provider if the first is rate-limited.
async function geo(): Promise<string> {
  try {
    const res = await fetch("https://ipwho.is/", { cache: "no-store" });
    const d = await res.json();
    if (d && d.success && d.city) return `you are in ${d.city}, ${d.country} right now.`;
  } catch {
    /* try the backup */
  }
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    const d = await res.json();
    if (d && d.city) return `you are in ${d.city}, ${d.country_name} right now.`;
  } catch {
    /* both blocked or offline */
  }
  return "your location is being shy today. mysterious. i respect it.";
}

// Funny for everyone, techie or not. No mention of how it works.
const rules: { test: RegExp; replies: string[] }[] = [
  {
    test: /(available|hire|hiring|work with|freelance|open to|job|recruit)/i,
    replies: [
      "is Marc free for work? for the right project, yes. quick warning, he is the type who builds your AI and then fixes the office wifi on the way out. his email is at the very bottom of the page. use it before your competitor does.",
      "hiring? good taste. he builds the thing and keeps it running long after. scroll to the bottom for his email, or tap copy email below. blink and someone else grabs him.",
    ],
  },
  {
    test: /(who|what are you|your name|are you real|are you ai|assistant)/i,
    replies: [
      "me? i am the one who decides if you are worth Marc's time. the bar is not high, and you are doing okay so far.",
      "i am the assistant. i keep the small talk short and the answers shorter. ask me something real.",
    ],
  },
  {
    test: /(build|do|make|skill|stack|tech|work on|project|service|offer)/i,
    replies: [
      "Marc builds the smart stuff. AI assistants, chatbots, voice bots, and automations, plus the apps, websites, phone lines, and networks behind them. if it is supposed to run on its own, he made it run. it is all above, scroll up.",
      "he makes things that work without a human watching them. AI agents, automations, full apps, even office phone systems. proof is right there on the page.",
    ],
  },
  {
    test: /(resume|cv|portfolio pdf)/i,
    replies: [
      "resume? one page, clean, no fluff. tap open resume below. i would read it to you, but you have eyes.",
    ],
  },
  {
    test: /(experience|years|senior|how long|background|track|good enough)/i,
    replies: [
      "real, paying clients since 2023, leads a team of 5, and once moved a mountain of company data between two systems without losing a single file. that is not nothing.",
      "solid track record. clients since 2023, runs a small team, ships things that do not fall over. i almost clapped.",
    ],
  },
  {
    test: /(contact|email|reach|message|talk|call|connect)/i,
    replies: [
      "there is a big email at the very bottom of the page. click it. or just tap copy email below. i will act like i introduced you two.",
    ],
  },
  {
    test: /(love|date|single|girlfriend|boyfriend|marry|crush)/i,
    replies: [
      "ooh, forward. i do not do romance, i do redirects. Marc's love language is deadlines anyway.",
    ],
  },
  {
    test: /(chatgpt|claude|gpt|openai|gemini|other ai|smarter)/i,
    replies: [
      "other assistants would hand you a paragraph of nothing. i give you the point and send you on your way. you are welcome.",
    ],
  },
  {
    test: /(meaning of life|42|purpose|why are we here)/i,
    replies: ["42. next. ask me something i can actually help with."],
  },
  {
    test: /(school|study|degree|education|grade|magna|cum laude)/i,
    replies: [
      "he did great in school, sure. but he would rather you look at what he has built. so scroll up, it is the interesting part.",
    ],
  },
  {
    test: /(hi|hello|hey|yo|sup|kumusta|good (morning|afternoon|evening)|hola)/i,
    replies: [
      "hi. you came all this way to greet a chat box. honestly, respect. now, what do you actually need?",
      "hello. pleasantries handled. what are you really here to ask?",
    ],
  },
  {
    test: /(dumb|stupid|useless|trash|bad|hate|suck|boring)/i,
    replies: [
      "ouch. i am trying my best here and you swing like that. be nice, it is a good look on you.",
    ],
  },
  {
    test: /(joke|funny|laugh|make me)/i,
    replies: [
      "why did the website go to therapy? too many unresolved issues. that is the only one i have, do not push it.",
    ],
  },
];

const fallbacks = [
  "good question. i am going to let Marc field that one, he is the expert, i am just the doorman. his email is at the bottom of the page.",
  "that is a Marc question, not a me question. tap a button below, or scroll the page, it is probably answered there.",
  "i could guess, but you deserve a real answer. ask Marc directly, the email is at the bottom.",
  "above my role, honestly. try a suggestion below, or just keep scrolling.",
];

const suggestions = ["is marc available?", "what does marc build?", "who are you?", "how do I hire him?"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const first = useRef(true);
  const fb = useRef(0);
  const rIdx = useRef<Record<number, number>>({});
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const add = (role: Role, text: string) =>
    setMessages((m) => [...m, { id: idRef.current++, role, text }]);

  // Closing resets the conversation so the next open starts fresh.
  const close = () => {
    setOpen(false);
    setMessages([]);
    setTyping(null);
    setInput("");
    setBusy(false);
    first.current = true;
    rIdx.current = {};
    fb.current = 0;
  };

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("ask")) setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      window.__lenis?.stop?.();
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      window.__lenis?.start?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const proc = async (label: string) => {
    add("sys", label);
    await sleep(700);
  };

  const say = (text: string) =>
    new Promise<void>((resolve) => {
      let i = 0;
      setTyping("");
      const tick = () => {
        i += 1;
        setTyping(text.slice(0, i));
        if (i < text.length) {
          setTimeout(tick, text[i - 1] === " " ? 58 : 34);
        } else {
          setTyping(null);
          add("bot", text);
          setTimeout(resolve, 550);
        }
      };
      setTimeout(tick, 220);
    });

  const respond = (q: string) => {
    const idx = rules.findIndex((r) => r.test.test(q));
    if (idx !== -1) {
      const arr = rules[idx].replies;
      const n = rIdx.current[idx] ?? 0;
      rIdx.current[idx] = n + 1;
      return arr[n % arr.length];
    }
    const f = fallbacks[fb.current % fallbacks.length];
    fb.current += 1;
    return f;
  };

  const ask = async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    add("user", q);
    if (first.current) {
      first.current = false;
      await proc("establishing connection...");
      await proc("checking you are a real person...");
      await proc("looking up where you are connecting from...");
      const where = await geo();
      await proc("pinpointing your location...");
      await say("hold on. before i answer, i like to know who i am talking to.");
      await say(where);
      await say(device());
      await say("relax, that is just your own public info. i am nosy, not a hacker.");
    } else {
      await proc("thinking...");
    }
    await say(respond(q));
    setBusy(false);
  };

  const openResume = () => window.open(profile.resume, "_blank", "noreferrer");
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied", { description: profile.email });
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const empty = messages.length === 0 && !typing;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask"
        className="fixed bottom-5 right-5 z-[80] inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2.5 font-mono text-[0.78rem] text-foreground shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:border-accent/50"
      >
        <Sparkles size={14} className="text-accent" />
        <span className="hidden sm:inline">ask</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background/60 backdrop-blur-2xl">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            esc <X size={14} />
          </button>

          <div
            ref={scrollRef}
            className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-end gap-6 overflow-y-auto px-8 pb-6 pt-24"
          >
            {empty && (
              <div className="flex flex-1 flex-col justify-center">
                <h2 className="font-mono text-4xl font-bold tracking-tight sm:text-6xl">
                  prompt me<span className="text-accent">.</span>
                </h2>
                <p className="mt-5 max-w-md font-mono text-sm text-muted-foreground">
                  ask me anything about Marc. fair warning, i already know more
                  about you than you would expect.
                </p>
              </div>
            )}

            {messages.map((m) => {
              if (m.role === "user")
                return (
                  <p key={m.id} className="font-mono text-sm text-muted-foreground">
                    <span className="text-accent">&gt;</span> {m.text}
                  </p>
                );
              if (m.role === "sys")
                return (
                  <p key={m.id} className="font-mono text-xs text-muted-foreground/60">
                    ↳ {m.text}
                  </p>
                );
              return (
                <p
                  key={m.id}
                  className="max-w-[28ch] font-mono text-2xl font-medium leading-snug tracking-tight sm:text-4xl sm:leading-tight"
                >
                  {m.text}
                </p>
              );
            })}

            {typing !== null && (
              <p className="max-w-[28ch] font-mono text-2xl font-medium leading-snug tracking-tight sm:text-4xl sm:leading-tight">
                {typing}
                <span className="ml-0.5 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.1em] bg-foreground animate-[blink_1s_step-end_infinite]" />
              </p>
            )}
          </div>

          <div className="mx-auto w-full max-w-3xl px-8 pb-10">
            <div className="flex items-center gap-3 border-b border-border/70 pb-3">
              <span className="font-mono text-xl text-accent sm:text-2xl">&gt;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask(input)}
                disabled={busy}
                placeholder={busy ? "hang on, working on it..." : "type anything and hit enter"}
                className="w-full bg-transparent font-mono text-xl outline-none placeholder:text-muted-foreground/50 disabled:opacity-60 sm:text-2xl"
              />
              <button
                onClick={() => ask(input)}
                aria-label="Send"
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                <CornerDownLeft size={18} />
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {empty &&
                suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              <button
                onClick={openResume}
                className="rounded-full border border-border px-3 py-1 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                open resume
              </button>
              <button
                onClick={copyEmail}
                className="rounded-full border border-border px-3 py-1 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                copy email
              </button>
              <button
                onClick={close}
                className="rounded-full border border-border px-3 py-1 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                back to site
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
