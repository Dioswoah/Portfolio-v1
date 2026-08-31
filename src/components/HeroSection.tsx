"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/content";
import { TypingPrompt } from "./TypingPrompt";
import { EASE } from "@/lib/anim";
import { STATIC } from "@/lib/static";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const links = [
  { label: "github ↗", href: profile.socials.github, external: true },
  { label: "linkedin ↗", href: profile.socials.linkedin, external: true },
  { label: profile.email, href: `mailto:${profile.email}`, external: false },
];

const phrases = [
  "building autonomous agents",
  "leading a team of 5 engineers",
  "shipping full-stack apps",
  "wiring AI into real systems",
];

export function HeroSection() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_290px]">
          <motion.div
            variants={container}
            initial={STATIC ? false : "hidden"}
            animate="show"
            className="order-2 lg:order-1"
          >
            <motion.h1
              variants={item}
              className="font-mono text-[2.4rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 font-mono text-base text-muted-foreground sm:text-lg"
            >
              AI engineer <span className="text-accent">&amp;</span> IT lead
            </motion.p>

            <motion.div variants={item}>
              <TypingPrompt
                phrases={phrases}
                className="mt-2 block font-mono text-sm text-muted-foreground"
              />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-7 max-w-[60ch] text-[1.02rem] leading-relaxed text-foreground/85"
            >
              {profile.intro}
            </motion.p>

            <motion.div variants={item} className="mt-6">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/40 px-3 py-1 font-mono text-[0.78rem] text-muted-foreground">
                <span className="status-dot h-1.5 w-1.5" />
                available for work
              </span>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.85rem]"
            >
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="link"
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={STATIC ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="order-1 mx-auto w-40 sm:w-52 lg:order-2 lg:w-full lg:max-w-[290px]"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-muted/40 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_14px_44px_-14px_hsl(var(--accent)/0.4)]">
              <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.portrait}
                alt={`${profile.name} portrait`}
                width={474}
                height={533}
                draggable={false}
                className="relative w-full select-none transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>
        </div>

        <motion.dl
          initial={STATIC ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-lg font-medium tracking-tight text-foreground sm:text-xl">
                {s.value}
              </dt>
              <dd className="mt-1.5 font-mono text-[0.7rem] uppercase leading-snug tracking-[0.12em] text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
