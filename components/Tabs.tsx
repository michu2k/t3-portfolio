import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {cn} from "~/utils/className";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
React.ElementRef<typeof TabsPrimitive.List>,
React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => {

  const listClassName = cn(
    "inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500",
    className
  );

  return (
    <TabsPrimitive.List ref={ref} className={listClassName} {...props} />
  );
});

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
React.ElementRef<typeof TabsPrimitive.Trigger>,
React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({className, ...props}, ref) => {

  const triggerClassName = cn(
    `inline-flex items-center justify-center
    whitespace-nowrap rounded-sm
    px-3 py-1.5
    text-sm font-medium
    ring-offset-white
    transition-all
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm`,
    className
  );

  return (
    <TabsPrimitive.Trigger ref={ref} className={triggerClassName} {...props} />
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
React.ElementRef<typeof TabsPrimitive.Content>,
React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...props}, ref) => {

  const contentClassName = cn(
    "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
    className
  );

  return (
    <TabsPrimitive.Content ref={ref} className={contentClassName} {...props} />
  );
});

TabsContent.displayName = TabsPrimitive.Content.displayName;

export {Tabs, TabsList, TabsTrigger, TabsContent};
