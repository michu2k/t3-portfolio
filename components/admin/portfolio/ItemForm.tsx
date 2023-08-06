import React, {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import type {DateRange} from "react-day-picker";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Button} from "~/components/Button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/Form";
import {Input} from "~/components/Input";
import {Textarea} from "~/components/Textarea";

const ItemForm = () => {
  const formMethods = useForm({});
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const {control} = formMethods;

  function displaySelectedDate() {
    if (!date?.from) {
      return <span>Pick a date</span>;
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
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="short-description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter item description here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Long description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter item description here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="my-8">Save changes</Button>
      </form>
    </FormProvider>
  );
};

export {ItemForm};