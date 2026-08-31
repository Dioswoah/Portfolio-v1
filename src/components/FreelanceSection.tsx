import { freelance } from "@/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ProjectRow } from "./ProjectRow";

export function FreelanceSection() {
  return (
    <section id="freelance" className="scroll-mt-24 bg-muted/40">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Reveal>
          <SectionHeading index="03">Freelance &amp; projects</SectionHeading>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-5 max-w-[60ch] text-[0.95rem] leading-relaxed text-muted-foreground">
            Client apps and side builds I shipped end to end, from local
            businesses to a local government office.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-4">
            {freelance.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
