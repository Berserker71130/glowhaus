import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-gold",
  {
    variants: {
      variant: {
        new: "bg-gold text-noir",
        bestseller: "bg-[#E29587] text-white",
        sale: "bg-[#663399] text-white",
        lowstock: "bg-amber-500 text-noir",
        soldout: "bg-taupe text-white opacity-70",
      },
    },
    defaultVariants: {
      variant: "new",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
