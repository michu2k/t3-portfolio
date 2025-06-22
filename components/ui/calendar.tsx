import * as React from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "~/utils/cn";

import { Button, buttonVariants } from "./button";

const Calendar = ({ classNames, components, ...props }: React.ComponentProps<typeof DayPicker>) => {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      autoFocus
      showOutsideDays
      fixedWeeks
      classNames={{
        root: "w-fit p-3",
        months: cn("flex flex-col sm:flex-row gap-4 relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn("flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "aria-disabled:opacity-50 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "aria-disabled:opacity-50 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn("flex items-center justify-center h-10 w-full px-10", defaultClassNames.month_caption),
        caption_label: cn(
          "font-poppins text-foreground font-semibold select-none",
          "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        day: cn(
          "relative w-full h-full [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn("rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md", defaultClassNames.range_end),
        today: cn("bg-accent rounded-md", defaultClassNames.today),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      }}
      components={{
        Chevron: ({ orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className="size-4" {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className="size-4" {...props} />;
          }

          return <ChevronDownIcon className="size-4" {...props} />;
        },
        DayButton: CalendarDayButton,
        ...components
      }}
      {...props}
    />
  );
};

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-middle={modifiers.range_middle}
      data-range-end={modifiers.range_end}
      className={cn(
        "data-[selected-single=true]:bg-secondary data-[selected-single=true]:text-accent-foreground",
        "data-[range-start=true]:bg-secondary data-[range-start=true]:text-accent-foreground data-[range-start=true]:data-[range-end=false]:rounded-r-none",
        "data-[range-middle=true]:bg-accent data-[range-middle=true]:text-muted-foreground data-[range-middle=true]:rounded-none",
        "data-[range-end=true]:bg-secondary data-[range-end=true]:text-accent-foreground data-[range-end=true]:data-[range-start=false]:rounded-l-none",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10",
        "group-data-[outside=true]/day:text-muted-foreground/25",
        className
      )}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
