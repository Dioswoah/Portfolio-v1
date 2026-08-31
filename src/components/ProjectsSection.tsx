import { work, profile } from "@/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ProjectRow } from "./ProjectRow";

export function ProjectsSection() {
  return (
    <section id="work" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Reveal>
          <SectionHeading
            index="01"
            right={
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="link font-mono text-xs text-muted-foreground"
              >
                all on github ↗
              </a>
            }
          >
            Selected work
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-4">
            {work.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
