export function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2.5">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>

      <span className="text-right text-sm font-medium">{value ?? '—'}</span>
    </div>
  );
}
