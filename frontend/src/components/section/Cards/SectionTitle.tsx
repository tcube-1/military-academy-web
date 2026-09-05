export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-2 rounded-full bg-blue-950" />

      <h3 className="text-sm font-bold tracking-wide text-blue-950 dark:text-white">
        {title}
      </h3>

      <div className="bg-border h-px flex-1" />
    </div>
  );
}
