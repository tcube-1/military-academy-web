import { cn } from '@/lib/utils';

type Props = {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
};

export default function InfoRow({ label, value, valueClassName }: Props) {
  return (
    <div className="grid min-h-10 grid-cols-[42%_58%] border-b border-slate-100 last:border-b-0">
      <div className="flex items-center border-r border-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
        {label}
      </div>

      <div
        className={cn(
          'flex min-w-0 items-center px-3 py-2 text-sm font-medium wrap-break-word text-slate-800',
          valueClassName,
        )}
      >
        {value}
      </div>
    </div>
  );
}
