import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "~/utils/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const Breadcrumb = ({
  ...props
}: React.ComponentProps<"nav"> & {
  separator?: React.ReactNode;
}) => <nav aria-label="breadcrumb" {...props} />;

export const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => (
  <ol
    className={cn(
      "text-muted-foreground flex flex-wrap items-center gap-1 text-sm wrap-break-word sm:gap-2.5",
      className
    )}
    {...props}
  />
);

export const BreadcrumbListItem = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li className={cn("inline-flex items-center gap-1", className)} {...props} />
);

export const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn(
        "hover:text-foreground focus-visible:ring-appearance rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
};

export const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("text-foreground text-sm", className)}
    {...props}
  />
);

export const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:h-4 [&>svg]:w-4", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);

export const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
