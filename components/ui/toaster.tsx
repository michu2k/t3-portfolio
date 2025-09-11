"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangleIcon, BellIcon, CheckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { toast as sonnerToast } from "sonner";

import { cn } from "~/utils/cn";

const TOAST_DURATION = 5000;

/** toast function rendering the custom Toast component */
function toast(props: ToastProps) {
  return sonnerToast.custom(() => <Toast {...props} />);
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      duration={TOAST_DURATION}
      expand
      toastOptions={{
        classNames: {
          toast: "w-full"
        }
      }}
      style={
        {
          "--width": "384px",
          "fontFamily": "var(--font-inter)"
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

const toastVariants = cva("group", {
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

type ToastProps = VariantProps<typeof toastVariants> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

const Toast = ({ className, variant, title, description, ...props }: ToastProps) => {
  const toastIcon = {
    default: BellIcon,
    success: CheckIcon,
    destructive: AlertTriangleIcon
  } as const;

  const Icon = toastIcon[variant ?? "default"];

  return (
    <div
      className={cn(
        "bg-background flex w-full items-center gap-4 rounded-lg p-4 shadow-lg ring-1 ring-black/5",
        className
      )}
      {...props}>
      <Icon size={28} className={toastVariants({ variant })} />

      <div className="flex flex-col gap-1">
        {title && <p className="font-poppins text-sm font-semibold">{title}</p>}
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
    </div>
  );
};

export { Toaster, Toast, toast };
