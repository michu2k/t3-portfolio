import React from "react";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {format} from "date-fns";
import {CalendarIcon, PlusIcon, Trash2Icon} from "lucide-react";
import {Button} from "~/components/ui/Button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/Popover";
import {Calendar} from "~/components/ui/Calendar";
import {Heading} from "~/components/ui/Heading";
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
      startDate: undefined,
      endDate: undefined,
      responsibilities: [newResponsibilityItem]
    },
    values: data
      ? {...data, responsibilities: data.responsibilities.length ? data.responsibilities : [newResponsibilityItem]}
      : undefined,
    resolver: zodResolver(experienceItemSchema)
  });

  const {control, handleSubmit, setValue, watch} = formMethods;
  const [startDate, endDate] = watch(["startDate", "endDate"]);

  const {fields, append, remove} = useFieldArray({
    control,
    name: "responsibilities"
  });

  async function handleFormSubmit(
    {responsibilities: formResponsibilities, ...formValues}: ExperienceItemFormValues,
    e?: React.BaseSyntheticEvent
  ) {
    e?.preventDefault();

    // Filter out empty responsibilities
    const responsibilities = formResponsibilities.filter(({name}) => !!name);

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

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
        <Heading as="h2" size="md">
          General
        </Heading>

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

        <div className="sm:flex sm:items-center sm:gap-4">
          <FormItem className="max-w-[16rem] flex-1">
            <FormLabel>From</FormLabel>

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant="outline" className="w-full font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="flex-1">{startDate ? format(startDate, "LLL dd, y") : "Pick start date"}</span>
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start" side="bottom">
                <Calendar
                  initialFocus
                  captionLayout="dropdown"
                  mode="single"
                  defaultMonth={startDate || undefined}
                  selected={startDate || undefined}
                  onSelect={(date) => setValue("startDate", date)}
                />
              </PopoverContent>
            </Popover>
          </FormItem>

          <FormItem className="max-w-[16rem] flex-1">
            <FormLabel>To</FormLabel>

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant="outline" className="w-full font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="flex-1">{endDate ? format(endDate, "LLL dd, y") : "Pick end date"}</span>
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start" side="bottom">
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={endDate || undefined}
                  selected={endDate || undefined}
                  onSelect={(date) => setValue("endDate", date)}
                  disabled={{after: new Date()}}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        </div>

        <FormItem>
          <Heading as="h2" size="md">
            Responsibilities
          </Heading>
          <FormDescription> Add the responsibilities you had while working at this position.</FormDescription>

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
