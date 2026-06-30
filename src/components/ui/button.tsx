import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans uppercase tracking-luxe font-medium transition-colors duration-500 ease-luxe select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-cream hover:bg-oxblood",
        gold: "bg-gold text-espresso hover:bg-gold-dark hover:text-cream",
        outline:
          "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
        ghost: "text-ink hover:text-oxblood",
        onDark:
          "border border-cream/30 text-cream hover:bg-cream hover:text-ink",
        onDarkGold: "bg-gold text-espresso hover:bg-cream hover:text-ink",
        link: "text-ink p-0 h-auto hover:text-oxblood",
      },
      size: {
        sm: "h-9 px-5 text-[10px]",
        md: "h-12 px-8 text-[11px]",
        lg: "h-14 px-10 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
