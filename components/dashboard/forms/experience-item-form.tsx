"use client";

import React, {useEffect} from "react";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon, PlusIcon, Trash2Icon} from "lucide-react";
import {useRouter} from "next/navigation";

import {Button} from "~/components/ui/button";
import {Calendar} from "~/components/ui/calendar";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {useToast} from "~/hooks/use-toast";
import type {ExperienceItemWithResponsibilities} from "~/server/api/routers/experience";
import {api} from "~/trpc/react";
import {revalidatePath} from "~/utils/revalidate-path";
import type {ExperienceItemFormValues} from "~/utils/validations/experience";
import {experienceItemSchema} from "~/utils/validations/experience";

type ExperienceItemFormProps = {
  experienceItem: ExperienceItemWithResponsibilities | null;
};

const ExperienceItemForm = ({experienceItem}: ExperienceItemFormProps) => {
  const router = useRouter();
  const {toast} = useToast();
  const utils = api.useUtils();
  const newResponsibilityItem = {id: undefined, name: ""};

  const createItemMutation = api.experience.createItem.useMutation();
  const updateItemMutation = api.experience.updateItem.useMutation();
  const {responsibilities = []} = experienceItem || {};
  const itemId = experienceItem?.id;

  const formMethods = useForm<ExperienceItemFormValues>({
    defaultValues: {
      company: "",
      position: "",
      startDate: undefined,
      endDate: undefined,
      responsibilities: [newResponsibilityItem]
    },
    values: experienceItem ? experienceItem : undefined,
    resolver: zodResolver(experienceItemSchema)
  });

  const {control, handleSubmit, watch} = formMethods;
  const startDate = watch("startDate");

  const {fields, append, remove, replace} = useFieldArray({
    control,
    name: "responsibilities"
  });

  // Pass initial values to form
  useEffect(() => {
    if (responsibilities.length) {
      replace(responsibilities);
    }
  }, [responsibilities, replace]);

  async function handleFormSubmit(
    {responsibilities: formResponsibilities, ...formValues}: ExperienceItemFormValues,
    e?: React.BaseSyntheticEvent
  ) {
    e?.preventDefault();

    // Filter out empty responsibilities
    const responsibilities = formResponsibilities.filter(({name}) => !!name);

    const mutation = itemId ? updateItemMutation : createItemMutation;
    const mutationVariables = itemId
      ? {id: itemId, ...formValues, responsibilities}
      : {...formValues, responsibilities};

    await mutation.mutateAsync(mutationVariables, {
      async onSuccess() {
        toast({
          title: "Success",
          description: itemId ? "Your changes have been saved." : "A new item has been added.",
          variant: "success"
        });

        await utils.experience.getItem.invalidate();
      }
    });

    revalidatePath("/dashboard/experience");
    router.push("/dashboard/experience");
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)}>
        <FormField
          control={control}
          name="position"
          render={({field}) => (
            <FormItem>
              <FormLabel>Position name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Position name you worked at" />
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
                <Input {...field} placeholder="Company name you worked for" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:flex sm:gap-4">
          <FormField
            control={control}
            name="startDate"
            render={({field: {value, onChange}}) => (
              <FormItem className="max-w-[14rem] flex-1">
                <FormLabel>From</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span className="flex-1">{value ? format(value, "LLL dd, y") : "Pick start date"}</span>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <FormMessage />
                  <PopoverContent className="w-auto p-0" align="start" side="bottom">
                    <Calendar
                      initialFocus
                      captionLayout="dropdown"
                      mode="single"
                      defaultMonth={value || undefined}
                      selected={value || undefined}
                      onSelect={(date) => onChange(date)}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="endDate"
            render={({field: {value, onChange}}) => (
              <FormItem className="max-w-[14rem] flex-1">
                <FormLabel isOptional>To</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span className="flex-1">{value ? format(value, "LLL dd, y") : "Pick end date"}</span>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <FormMessage />
                  <PopoverContent className="w-auto p-0" align="start" side="bottom">
                    <Calendar
                      initialFocus
                      captionLayout="dropdown"
                      mode="single"
                      defaultMonth={value || undefined}
                      selected={value || undefined}
                      onSelect={(date) => onChange(date)}
                      disabled={{before: startDate ? new Date(startDate) : new Date()}}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel isOptional>Responsibilities</FormLabel>
          <FormDescription className="pb-3 pt-0">
            Add the responsibilities you had while working at this position.
          </FormDescription>

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
                      <Input {...field} placeholder="Enter the specific task or responsibility here" />
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

          <Button variant="secondary" className="mt-2" onClick={() => append(newResponsibilityItem)}>
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
