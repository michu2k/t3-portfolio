"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {ContactMethod} from "@prisma/client";
import {ContactMethodType} from "@prisma/client";
import {useRouter} from "next/navigation";

import {Button} from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormLabelSkeleton,
  FormMessage
} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Skeleton} from "~/components/ui/skeleton";
import {useToast} from "~/hooks/use-toast";
import {api} from "~/trpc/react";
import {capitalize} from "~/utils/capitalize";
import {revalidatePath} from "~/utils/revalidate-path";
import type {ContactMethodFormValues} from "~/utils/validations/contact";
import {contactMethodSchema} from "~/utils/validations/contact";

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

type ContactItemFormProps = {
  contact: ContactMethod | null;
};

const ContactItemForm = ({contact}: ContactItemFormProps) => {
  const router = useRouter();
  const {toast} = useToast();
  const utils = api.useUtils();

  const createItemMutation = api.contact.createItem.useMutation();
  const updateItemMutation = api.contact.updateItem.useMutation();
  const itemId = contact?.id;

  const formMethods = useForm<ContactMethodFormValues>({
    defaultValues: {
      name: "",
      description: "",
      type: undefined
    },
    values: contact ?? undefined,
    resolver: zodResolver(contactMethodSchema)
  });

  const {control, handleSubmit, watch} = formMethods;
  const type = watch("type");

  const fieldPlaceholder = type ? fieldPlaceholdersDef[type] : null;

  async function handleFormSubmit(formValues: ContactMethodFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    const mutation = itemId ? updateItemMutation : createItemMutation;
    const mutationVariables = itemId ? {id: itemId, ...formValues} : formValues;

    await mutation.mutateAsync(mutationVariables, {
      async onSuccess() {
        toast({
          title: "Success",
          description: itemId ? "Your changes have been saved." : "A new item has been added.",
          variant: "success"
        });

        await utils.contact.getItem.invalidate();
      }
    });

    revalidatePath("/dashboard/contact");
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

const ContactItemFormSkeleton = () => {
  return (
    <>
      <div className="pb-12 pt-4">
        <FormLabelSkeleton>Type</FormLabelSkeleton>
        <Skeleton className="h-10 w-[14rem]" />
      </div>

      <div className="py-4">
        <FormLabelSkeleton>Name</FormLabelSkeleton>
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="py-4">
        <FormLabelSkeleton>Description</FormLabelSkeleton>
        <Skeleton className="h-10 w-full" />
      </div>
    </>
  );
};

export {ContactItemForm, ContactItemFormSkeleton};
