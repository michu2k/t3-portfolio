import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "~/utils/className";

const buttonVariants = cva(
  `font-poppins font-medium shrink-0
  inline-flex justify-center items-center rounded-md ring-offset-white
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
  disabled:pointer-events-none disabled:opacity-50
  transition-colors`,
  {
    variants: {
      variant: {
        primary: "bg-slate-900 text-accent-foreground hover:bg-slate-900/80",
        secondary: "bg-slate-100 text-foreground hover:bg-slate-100/50",
        ghost: "hover:bg-slate-100 text-muted-foreground",
        outline: "text-foreground border bg-background hover:bg-slate-100",
        destructive: "bg-red-500 text-accent-foreground hover:bg-red-600"
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-4 text-sm",
        icon: "h-10 w-10 text-sm"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, type = "button", ...props}, ref) => {
    return <button ref={ref} type={type} className={cn(buttonVariants({variant, size}), className)} {...props} />;
  }
);

Button.displayName = "Button";

export {Button, buttonVariants};
