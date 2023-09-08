import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {XIcon} from "lucide-react";

import {cn} from "~/utils/className";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({
  className,
  ...props
}: DialogPrimitive.DialogPortalProps) => {
  return (
    <DialogPrimitive.Portal className={cn(className)} {...props} />
  );
};

DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
React.ElementRef<typeof DialogPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({className, ...props}, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        `fixed inset-0 z-50 bg-white/80 backdrop-blur-sm
        data-[state=open]:animate-in data-[state=open]:fade-in-0
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0`,
        className
      )}
      {...props}
    />
  );
});

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
React.ElementRef<typeof DialogPrimitive.Content>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({className, children, ...props}, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          `fixed z-50
          left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
          w-full max-w-md p-4
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
          data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]`,
          className
        )}
        {...props}>
        <div
          className={cn(
            "relative rounded-lg border border-slate-200 bg-white flex flex-col p-8 min-h-[10rem]",
            className
          )}>
          <DialogClose className="absolute right-4 top-4 w-6 h-6 rounded-sm ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none">
            <XIcon size={22} />
            <span className="sr-only">Close</span>
          </DialogClose>

          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center text-center space-y-4 mb-6",
        className
      )}
      {...props}
    />
  );
};

DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 mt-6",
        className
      )}
      {...props}
    />
  );
};

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
React.ElementRef<typeof DialogPrimitive.Title>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({className, ...props}, ref) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold text-slate-900 tracking-tight",
        className
      )}
      {...props}
    />
  );
});

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
React.ElementRef<typeof DialogPrimitive.Description>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({className, ...props}, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-center leading-6", className)}
      {...props}
    />
  );
});

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
  DialogDescription
};
