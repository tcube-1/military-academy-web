import type { ElementType, ReactNode } from 'react';

type Props = {
  title: string;
  icon: ElementType;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function SectionCard({
  title,
  icon: Icon,
  children,
  className = '',
  contentClassName = '',
}: Props) {
  return (
    <section
      className={`overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
        <Icon size={19} strokeWidth={2.2} className="text-[#102a4c]" />
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#26364d]">
          {title}
        </h2>
      </div>

      <div className={`p-3 ${contentClassName}`}>{children}</div>
    </section>
  );
}
