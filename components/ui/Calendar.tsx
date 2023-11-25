import * as React from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {DayPicker} from "react-day-picker";
import {poppins} from "~/pages/_app";

const Calendar = ({classNames, ...props}: React.ComponentProps<typeof DayPicker>) => {
  return (
    <DayPicker
      showOutsideDays
      fixedWeeks
      className={`${poppins.variable} p-3 font-poppins`}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "border bg-background hover:bg-slate-100 flex items-center justify-center rounded-md h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "rounded-md h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100",
        day_selected:
          "bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50",
        day_today: "bg-slate-100",
        day_outside: "text-slate-500 opacity-50",
        day_disabled: "text-slate-500 opacity-50",
        day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
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
