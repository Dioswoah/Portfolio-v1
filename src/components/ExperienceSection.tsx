import { experience } from "@/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ExperienceSection() {
  const last = experience.length - 1;
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Reveal>
          <SectionHeading index="02">Experience</SectionHeading>
        </Reveal>

        <div className="mt-8">
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={i * 0.05}>
              <div className={"relative flex gap-5 " + (i === last ? "" : "pb-10")}>
                {i !== last && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[7px] top-6 w-px bg-border"
                  />
                )}
                <div className="relative z-10 mt-1.5 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-mono text-[1.05rem] font-medium tracking-tight">
                      {role.role}
                    </h3>
                    <span className="font-mono text-sm text-accent">
                      {role.company}
                    </span>
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted-foreground">
                    <span>{role.period}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span>{role.meta}</span>
                  </p>
                  <p className="mt-3 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                    {role.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                    {role.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-mono text-[0.72rem] text-muted-foreground/90"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
