import { ArrowUpRight } from "lucide-react";
import { type Project } from "@/content";

export function ProjectRow({ project }: { project: Project }) {
  const linked = Boolean(project.link);
  const titleInner = (
    <>
      {project.title}
      {linked && (
        <ArrowUpRight
          size={16}
          className="translate-y-[1px] text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      )}
    </>
  );

  return (
    <div className="group -mx-4 rounded-xl border-t border-border px-4 py-7 transition-colors duration-200 first:border-t-0 hover:bg-muted/40">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        {linked ? (
          <a
            href={project.link as string}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[1.05rem] font-medium tracking-tight transition-colors group-hover:text-accent"
          >
            {titleInner}
          </a>
        ) : (
          <div className="inline-flex items-center gap-1.5 font-mono text-[1.05rem] font-medium tracking-tight">
            {titleInner}
          </div>
        )}
        <span className="font-mono text-xs text-muted-foreground sm:shrink-0">
          {project.context}
        </span>
      </div>

      <p className="mt-2.5 max-w-[65ch] text-[0.95rem] leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="font-mono text-[0.72rem] text-muted-foreground/90">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
