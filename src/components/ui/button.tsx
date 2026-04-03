import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#051F20] dark:bg-brand-green text-[#EAF2EC] dark:text-black shadow-sm shadow-black/5 hover:bg-[#051F20]/90 dark:bg-brand-green/90",
        destructive:
          "bg-red-500 text-light-text dark:text-white shadow-sm shadow-black/5 hover:bg-red-600",
        outline:
          "border border-light-border dark:border-white/10 bg-transparent shadow-sm shadow-black/5 hover:bg-[#8EB69B] dark:hover:bg-[#8EB69B]/30 dark:bg-white/5 hover:text-light-text dark:text-white",
        secondary:
          "bg-[#8EB69B] dark:bg-white/10 text-light-text dark:text-white shadow-sm shadow-black/5 hover:bg-white/20",
        ghost: "hover:bg-[#8EB69B] dark:hover:bg-[#8EB69B]/30 dark:bg-white/5 hover:text-light-text dark:text-white",
        link: "text-[#051F20] dark:text-brand-green underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
