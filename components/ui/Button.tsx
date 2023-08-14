import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "~/utils/className";

const buttonVariants = cva(
  `font-medium text-sm
  inline-flex items-center justify-center rounded-md ring-offset-white
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
  disabled:pointer-events-none disabled:opacity-50
  transition-colors`,
  {
    variants: {
      variant: {
        primary: "bg-slate-900 text-slate-50 hover:bg-slate-900/80",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/50",
        ghost: "hover:bg-slate-100",
        outline: "border border-input bg-background hover:bg-slate-100",
        destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90"
      },
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-4",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, variant, size, ...props}, ref) => {
  return <button
    ref={ref}
    className={cn(buttonVariants({variant, size}), className)}
    {...props} />;
});

Button.displayName = "Button";

export {Button};
