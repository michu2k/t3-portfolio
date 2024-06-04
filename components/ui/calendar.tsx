import * as React from "react";
import {DayPicker} from "react-day-picker";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

import {cn} from "~/utils/className";

const Calendar = ({classNames, ...props}: React.ComponentProps<typeof DayPicker>) => {
  return (
    <DayPicker
      showOutsideDays
      fixedWeeks
      className="p-3 font-poppins"
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "border bg-background hover:bg-muted/50 flex items-center justify-center rounded-md h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-muted/50 [&:has([aria-selected].day-outside)]:bg-muted/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: "rounded-md h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-muted/50",
        day_selected: "bg-secondary text-accent-foreground pointer-events-none",
        day_today: "bg-muted",
        day_outside: "text-muted-foreground opacity-25",
        day_disabled: "text-muted-foreground opacity-25",
        day_range_middle: "aria-selected:bg-muted/50 aria-selected:text-foreground",
        day_hidden: "invisible",
        ...classNames
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: () => <ChevronRightIcon className="h-4 w-4" />
      }}
      {...props}
    />
  );
};

Calendar.displayName = "Calendar";

export {Calendar};
