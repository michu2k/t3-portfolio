"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import {cva, type VariantProps} from "class-variance-authority";
import {AlertTriangleIcon, CheckIcon, InfoIcon, X} from "lucide-react";

import {cn} from "~/utils/className";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({className, ...props}, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 md:bottom-0 md:right-0 md:top-auto md:max-w-[32rem] md:flex-col",
      className
    )}
    {...props}
  />
));

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto border border-l-4 bg-background text-foreground relative flex w-full items-center gap-3 overflow-hidden rounded-md border-muted p-2 md:p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
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

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants> & {
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
  };

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastProps>(
  ({className, variant, title, description, action, ...props}, ref) => {
    return (
      <ToastPrimitives.Root ref={ref} className={cn(toastVariants({variant}), className)} {...props}>
        <ToastIcon variant={variant} />

        <div className="flex flex-col gap-1">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
        {action}
        <ToastClose />
      </ToastPrimitives.Root>
    );
  }
);

Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({className, ...props}, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-muted bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-accent-foreground group-[.destructive]:focus:ring-red-500",
      className
    )}
    {...props}
  />
));

ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({className, ...props}, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));

ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({className, ...props}, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("font-poppins text-sm font-semibold", className)} {...props} />
));

ToastTitle.displayName = ToastPrimitives.Title.displayName;

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

const ToastIcon = React.forwardRef<HTMLDivElement, VariantProps<typeof toastIconVariants>>(({variant}, ref) => {
  const toastIcon = {
    default: InfoIcon,
    success: CheckIcon,
    destructive: AlertTriangleIcon
  } as const;

  const Icon = toastIcon[variant ?? "default"];

  return (
    <div ref={ref} className={toastIconVariants({variant})}>
      <Icon size={28} />
    </div>
  );
});

ToastIcon.displayName = "ToastIcon";

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({className, ...props}, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));

ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export type {ToastProps};

export {ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction};
