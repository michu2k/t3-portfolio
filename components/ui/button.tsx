import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {Slot} from "@radix-ui/react-slot";
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
        primary: "bg-secondary text-accent-foreground hover:bg-secondary/80",
        secondary: "bg-muted/60 text-foreground hover:bg-muted/40",
        ghost: "hover:bg-muted/60 text-muted-foreground",
        outline: "text-foreground border border-muted bg-background hover:bg-muted/40",
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, type = "button", asChild, ...props}, ref) => {
    const Component = asChild ? Slot : "button";

    return <Component ref={ref} type={type} className={cn(buttonVariants({variant, size}), className)} {...props} />;
  }
);

Button.displayName = "Button";

export {Button};
