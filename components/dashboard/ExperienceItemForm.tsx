import React, {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import type {DateRange} from "react-day-picker";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Button} from "~/components/ui/Button";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/Popover";
import {Calendar} from "~/components/ui/Calendar";

const ExperienceItemForm = () => {
  const formMethods = useForm({});
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const {control} = formMethods;

  function displaySelectedDate() {
    if (!date?.from) {
      return "Pick a date";
    }

    return date.to
      ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
      : format(date.from, "LLL dd, y");
  }

  return (
    <FormProvider {...formMethods}>
      <form>
        <FormField
          control={control}
          name="position"
          render={({field}) => (
            <FormItem>
              <FormLabel>Position name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="companyName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>From - To</FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="min-w-[12rem] font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span className="flex-1">{displaySelectedDate()}</span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start" side="bottom">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </FormItem>

        <FormField
          control={control}
          name="responsibilities"
          render={({field}) => (
            <FormItem>
              <FormLabel>Responsibilities</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter short description." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6">
          Save changes
        </Button>
      </form>
    </FormProvider>
  );
};

export {ExperienceItemForm};
