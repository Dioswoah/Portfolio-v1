export function SectionHeading({
  index,
  children,
  right,
}: {
  index?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-border pb-4">
      <h2 className="flex items-baseline gap-2.5 font-mono text-xl font-semibold tracking-tight">
        {index && (
          <span className="text-[0.82rem] font-medium">
            <span className="text-accent">{index}</span>
            <span className="ml-2 text-muted-foreground/40">/</span>
          </span>
        )}
        {children}
      </h2>
      {right}
    </div>
  );
}
