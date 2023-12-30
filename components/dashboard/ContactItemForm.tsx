"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import type {ContactMethod} from "@prisma/client";
import {ContactMethodType} from "@prisma/client";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "~/components/ui/Button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/Select";
import {api} from "~/trpc/react";
import {capitalize} from "~/utils/capitalize";
import type {ContactMethodFormValues} from "~/utils/validations/contact";
import {contactMethodSchema} from "~/utils/validations/contact";

type ContactItemFormProps = {
  data: ContactMethod | null;
};

const ContactItemForm = ({data}: ContactItemFormProps) => {
  const router = useRouter();
  const utils = api.useUtils();

  const createItemMutation = api.contact.createItem.useMutation();
  const updateItemMutation = api.contact.updateItem.useMutation();

  const formMethods = useForm<ContactMethodFormValues>({
    defaultValues: {
      name: "",
      description: "",
      type: undefined
    },
    values: data ?? undefined,
    resolver: zodResolver(contactMethodSchema)
  });

  const {control, handleSubmit, watch} = formMethods;
  const type = watch("type");

  console.log({data, type});

  const fieldPlaceholder = type ? fieldPlaceholdersDef[type] : null;

  async function handleFormSubmit(formValues: ContactMethodFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    const mutation = data?.id ? updateItemMutation : createItemMutation;
    const mutationVariables = data?.id ? {id: data.id, ...formValues} : formValues;

    await mutation.mutateAsync(mutationVariables, {
      async onSuccess() {
        await utils.contact.getItem.invalidate();
      }
    });

    router.push("/dashboard/contact");
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)}>
        <FormField
          control={control}
          name="type"
          render={({field: {name, value, onChange}}) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select name={name} value={value} onValueChange={(newVal) => (newVal ? onChange(newVal) : undefined)}>
                <FormControl withDescription>
                  <SelectTrigger className="w-[14rem]">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {Object.values(ContactMethodType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {capitalize(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription>Relevant icon will be displayed based on the type.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder={fieldPlaceholder?.name} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder={fieldPlaceholder?.description} />
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

type FieldPlaceholders = {
  [key in ContactMethodType]: {
    name: string;
    description: string;
  };
};

const fieldPlaceholdersDef: FieldPlaceholders = {
  ADDRESS: {
    name: "Country, city",
    description: "Street address"
  },
  EMAIL: {
    name: "Email address",
    description: "Short email description"
  },
  PHONE: {
    name: "Phone number",
    description: "Availability, possible contact hours"
  }
};

export {ContactItemForm};
