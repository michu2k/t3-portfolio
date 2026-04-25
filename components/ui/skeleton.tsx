import * as React from "react";

import { cn } from "~/utils/cn";

export const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("bg-muted animate-pulse rounded-md", className)} {...props} />;
};
