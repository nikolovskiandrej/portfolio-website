import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-sans uppercase tracking-luxe text-[9px] font-medium leading-none",
  {
    variants: {
      variant: {
        new: "text-oxblood",
        limited: "text-gold-dark",
        muted: "text-ink-muted",
        solid: "bg-ink text-cream px-2.5 py-1.5",
        gold: "bg-gold text-espresso px-2.5 py-1.5",
      },
    },
    defaultVariants: { variant: "muted" },
  },
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  /** show a small leading rule */
  rule?: boolean;
}

export function Badge({ children, className, variant, rule }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {rule && <span className="mr-2.5 h-px w-5 bg-current opacity-50" />}
      {children}
    </span>
  );
}
