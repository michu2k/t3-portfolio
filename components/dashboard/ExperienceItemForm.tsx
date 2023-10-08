import React from "react";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {format} from "date-fns";
import {useRouter} from "next/router";
import {CalendarIcon, PlusIcon, Trash2Icon} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "~/components/ui/Button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/Popover";
import {Calendar} from "~/components/ui/Calendar";
import {api} from "~/utils/api";
import type {ExperienceItemFormValues} from "~/utils/validations/experience";
import {experienceItemSchema} from "~/utils/validations/experience";

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

    const mutation = data?.id ? updateItemMutation : createItemMutation;
    const mutationVariables = data?.id
      ? {id: data.id, ...formValues, responsibilities}
      : {...formValues, responsibilities};

    await mutation.mutateAsync(mutationVariables, {
      async onSuccess() {
        await utils.experience.getItem.invalidate();
      }
    });

    await push("/dashboard/experience");
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

        <div className="sm:flex sm:items-center sm:gap-4">
          <FormItem className="max-w-[14rem] flex-1">
            <FormLabel isOptional>From</FormLabel>

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

          <FormItem className="max-w-[14rem] flex-1">
            <FormLabel isOptional>To</FormLabel>

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
          <FormLabel isOptional>Responsibilities</FormLabel>
          <FormDescription className="mb-2">
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
