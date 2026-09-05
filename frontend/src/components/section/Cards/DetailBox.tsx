export function DetailBox({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3">
      <p className="text-muted-foreground text-xs font-medium">{label}</p>

      <p className="mt-1 text-sm font-semibold">{value ?? '—'}</p>
    </div>
  );
}
