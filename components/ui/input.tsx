import * as React from "react";

import { cn } from "~/utils/cn";

export const Input = ({ className, type, ref, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "border-muted bg-background text-muted-foreground placeholder:text-placeholder focus-visible:ring-appearance flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};
