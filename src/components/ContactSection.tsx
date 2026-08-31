import { profile } from "@/content";
import { Reveal } from "./Reveal";

const links = [
  { label: "linkedin ↗", href: profile.socials.linkedin },
  { label: "github ↗", href: profile.socials.github },
  { label: "resume ↗", href: profile.resume },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground">
            Get in touch
          </h2>
          <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-foreground/85">
            Open to AI, automation, and full-stack work, freelance or full-time.
            The fastest way to reach me is email.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="link mt-8 inline-block break-all font-mono text-xl font-medium tracking-tight sm:text-4xl"
          >
            {profile.email}
          </a>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="link text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <span className="font-mono text-sm text-muted-foreground">
              {profile.location}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
