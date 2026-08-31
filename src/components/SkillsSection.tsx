import { stack } from "@/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function SkillsSection() {
  return (
    <section id="stack" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Reveal>
          <SectionHeading index="04">Stack</SectionHeading>
        </Reveal>

        <div className="mt-2">
          {stack.map((row, i) => (
            <Reveal key={row.group} delay={i * 0.03}>
              <div className="grid gap-x-8 gap-y-3 border-t border-border py-6 first:border-t-0 md:grid-cols-[180px_1fr]">
                <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground md:pt-1.5">
                  {row.group}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {row.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border px-2.5 py-1 font-mono text-[0.75rem] text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
