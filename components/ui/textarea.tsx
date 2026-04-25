import * as React from "react";

import { cn } from "~/utils/cn";

export const Textarea = ({ className, ...props }: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      className={cn(
        "border-muted text-muted-foreground placeholder:text-placeholder focus-visible:ring-appearance flex min-h-32 w-full rounded-md border bg-transparent px-3 py-2 text-sm leading-6 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};
