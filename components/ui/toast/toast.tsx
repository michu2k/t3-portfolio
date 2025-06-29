"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangleIcon, CheckIcon, InfoIcon, X } from "lucide-react";

import { cn } from "~/utils/cn";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Viewport>) => (
  <ToastPrimitives.Viewport
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 md:top-auto md:right-0 md:bottom-0 md:max-w-[32rem] md:flex-col",
      className
    )}
    {...props}
  />
);

const toastVariants = cva(
  "group pointer-events-auto border border-l-4 bg-background text-foreground relative flex w-full items-center gap-3 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-appearance rounded-md border-muted p-2 md:p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-l-blue-500",
        success: "border-l-green-500",
        destructive: "border-l-red-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type ToastProps = React.ComponentProps<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants> & {
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
  };

const Toast = ({ className, variant, title, description, action, ...props }: ToastProps) => {
  return (
    <ToastPrimitives.Root className={cn(toastVariants({ variant }), className)} {...props}>
      <ToastIcon variant={variant} />

      <div className="flex flex-col gap-1">
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </div>
      {action}
      <ToastClose />
    </ToastPrimitives.Root>
  );
};

const ToastAction = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Action>) => (
  <ToastPrimitives.Action
    className={cn(
      "border-muted focus-visible:ring-appearance inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const ToastClose = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Close>) => (
  <ToastPrimitives.Close
    className={cn(
      "text-muted-foreground hover:text-foreground focus-visible:ring-appearance absolute top-2 right-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus-visible:ring-2 focus-visible:outline-none",
      className
    )}
    toast-close=""
    {...props}>
    <X className="size-4" />
  </ToastPrimitives.Close>
);

const ToastTitle = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Title>) => (
  <ToastPrimitives.Title className={cn("font-poppins text-sm font-semibold", className)} {...props} />
);

const toastIconVariants = cva("group", {
  variants: {
    variant: {
      default: "text-blue-500",
      success: "text-green-500",
      destructive: "text-red-500"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

type ToastIconProps = React.ComponentProps<"div"> & VariantProps<typeof toastIconVariants>;

const ToastIcon = ({ variant }: ToastIconProps) => {
  const toastIcon = {
    default: InfoIcon,
    success: CheckIcon,
    destructive: AlertTriangleIcon
  } as const;

  const Icon = toastIcon[variant ?? "default"];

  return (
    <div className={toastIconVariants({ variant })}>
      <Icon size={28} />
    </div>
  );
};

const ToastDescription = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Description>) => (
  <ToastPrimitives.Description className={cn("text-muted-foreground text-sm", className)} {...props} />
);

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export type { ToastProps };

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };
