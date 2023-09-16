import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {cn} from "~/utils/className";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500",
        className
      )}
      {...props}
    />
  );
});

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({className, ...props}, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...props}, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-6 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
});

TabsContent.displayName = TabsPrimitive.Content.displayName;

export {Tabs, TabsList, TabsTrigger, TabsContent};
