// lib/icon-variants.ts
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

// Define the 6 versions based on your custom palette
export const iconVariants = cva(
  'flex items-center justify-center rounded-full p-2.5 transition-all duration-200 shadow-sm',
  {
    variants: {
      variant: {
        // Version 1: Brand Standard (#003049)
        brand: 'bg-primary text-primary-foreground hover:bg-primary/90',

        // Version 2: Danger / Alert (#D62828)
        danger: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',

        // Version 3: Action / Notification (#F77F00)
        action: 'bg-tertiary text-tertiary-foreground hover:bg-tertiary/90',

        // Version 4: Highlight / Premium (#FCBF49)
        highlight: 'bg-accent text-accent-foreground hover:bg-accent/90',

        // Version 5: Soft Outline (Uses borders from the palette)
        soft: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',

        // Version 6: Muted / Disabled
        muted: 'bg-muted text-muted-foreground hover:bg-muted/80 shadow-none',
      },
      size: {
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12',
      },
    },
    defaultVariants: {
      variant: 'brand',
      size: 'md',
    },
  },
);

// Optional: A reusable wrapper component for your icons
export interface ThemeIconProps extends VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  className?: string;
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({
  icon: Icon,
  variant,
  size,
  className,
}) => {
  return (
    <div className={cn(iconVariants({ variant, size, className }))}>
      <Icon className="size-full" />
    </div>
  );
};
