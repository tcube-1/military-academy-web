export function TechnicalValue({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="border-border bg-muted/30 min-w-0 rounded-lg border px-4 py-3">
      <p className="text-muted-foreground text-xs font-medium">{label}</p>

      <p className="mt-1 text-sm font-medium break-all">{value ?? '—'}</p>
    </div>
  );
}
