import { about, aboutFacts, profile } from "@/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-muted/40">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Reveal>
          <SectionHeading index="05">About</SectionHeading>
        </Reveal>

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_280px]">
          <Reveal>
            <div className="max-w-[62ch] space-y-5 text-[1.02rem] leading-relaxed text-foreground/85">
              {about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="link font-mono text-sm text-accent"
                >
                  download resume ↗
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <dl className="divide-y divide-border rounded-lg border border-border">
              {aboutFacts.map((f) => (
                <div key={f.k} className="px-4 py-3.5">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {f.k}
                  </dt>
                  <dd className="mt-1 font-mono text-[0.82rem] text-foreground">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
