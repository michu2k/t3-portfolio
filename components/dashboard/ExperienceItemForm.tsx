import React from "react";
import {FormProvider, useFieldArray, useForm, useWatch} from "react-hook-form";
import type {DateRange} from "react-day-picker";
import {format} from "date-fns";
import {CalendarIcon, PlusIcon, Trash2Icon} from "lucide-react";
import {Button} from "~/components/ui/Button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/Popover";
import {Calendar} from "~/components/ui/Calendar";
import {useRouter} from "next/router";
import {api} from "~/utils/api";
import type {ExperienceItemFormValues} from "~/utils/validations/experience";
import {experienceItemSchema} from "~/utils/validations/experience";
import {zodResolver} from "@hookform/resolvers/zod";

const ExperienceItemForm = () => {
  const {query, push} = useRouter();
  const utils = api.useContext();
  const itemId = query.id as string;
  const newResponsibilityItem = {id: undefined, name: ""};

  const {data} = api.experience.getItem.useQuery({id: itemId});
  const createItemMutation = api.experience.createItem.useMutation();
  const updateItemMutation = api.experience.updateItem.useMutation();

  const formMethods = useForm<ExperienceItemFormValues>({
    defaultValues: {
      company: "",
      position: "",
      startDate: null,
      endDate: null,
      responsibilities: [newResponsibilityItem]
    },
    values: data ?? undefined,
    resolver: zodResolver(experienceItemSchema)
  });

  const {control, handleSubmit, setValue} = formMethods;
  const [startDate, endDate] = useWatch({control, name: ["startDate", "endDate"]});
  const calendarDate: DateRange = {from: startDate || undefined, to: endDate || undefined};

  const {fields, append, remove} = useFieldArray({
    control,
    name: "responsibilities"
  });

  async function handleFormSubmit(formValues: ExperienceItemFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    // Filter out empty responsibilities
    const responsibilities = formValues.responsibilities.filter(({name}) => !!name);

    console.log({responsibilities});

    if (data?.id) {
      await updateItemMutation.mutateAsync(
        {id: data.id, ...formValues, responsibilities},
        {
          async onSuccess() {
            await utils.experience.getItem.invalidate();
          }
        }
      );
    } else {
      await createItemMutation.mutateAsync(
        {...formValues, responsibilities},
        {
          async onSuccess() {
            await utils.experience.getItem.invalidate();
          }
        }
      );
    }

    await push("/dashboard/experience");
  }

  function handleSelectCalendarDate(range?: DateRange) {
    setValue("startDate", range?.from ?? null);
    setValue("endDate", range?.to ?? null);
  }

  function displaySelectedDate() {
    if (!startDate) {
      return "Pick a date";
    }

    return endDate
      ? `${format(startDate, "LLL dd, y")} - ${format(endDate, "LLL dd, y")}`
      : format(startDate, "LLL dd, y");
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
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
          name="company"
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
              <Button variant="outline" className="min-w-[12rem] font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span className="flex-1">{displaySelectedDate()}</span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start" side="bottom">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={calendarDate.from}
                selected={calendarDate}
                onSelect={handleSelectCalendarDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </FormItem>

        <FormItem>
          <FormLabel>Responsibilities</FormLabel>
          <FormDescription>Add the responsibilities you had while working at this position.</FormDescription>

          {fields.map(({id}, idx) => (
            <FormField
              key={id}
              control={control}
              name={`responsibilities.${idx}.name`}
              render={({field}) => (
                <FormItem className="py-2">
                  <div className="flex items-center">
                    <FormLabel className="sr-only">Responsibility</FormLabel>
                    <FormControl className="mr-2">
                      <Input {...field} />
                    </FormControl>

                    <Button variant="ghost" size="icon" onClick={() => remove(idx)}>
                      <Trash2Icon size={16} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button variant="secondary" className="mt-2" onClick={() => void append(newResponsibilityItem)}>
            <PlusIcon size={16} className="mr-1" />
            Add responsibility
          </Button>
        </FormItem>

        <Button type="submit" className="mt-6">
          Save changes
        </Button>
      </form>
    </FormProvider>
  );
};

export {ExperienceItemForm};
