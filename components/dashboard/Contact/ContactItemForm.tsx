import React from "react";
import {useRouter} from "next/router";
import {zodResolver} from "@hookform/resolvers/zod";
import type {ContactMethod} from "@prisma/client";
import {ContactMethodType} from "@prisma/client";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "~/components/ui/Button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/Select";
import {api} from "~/utils/api";
import {capitalize} from "~/utils/capitalize";
import {contactMethodSchema} from "~/utils/validations/contact";

const ContactItemForm = () => {
  const {query} = useRouter();
  const contactMethodId = query.id as string;

  const {data} = api.contact.getContactMethod.useQuery({id: contactMethodId});
  const createContactMutation = api.contact.createContactMethod.useMutation();
  const updateContactMutation = api.contact.updateContactMethod.useMutation();

  const formMethods = useForm<ContactMethod>({
    defaultValues: {
      name: "",
      description: "",
      type: undefined
    },
    values: data ?? undefined,
    resolver: zodResolver(contactMethodSchema)
  });

  const {register, control, handleSubmit, setValue, getValues, reset} = formMethods;
  const {type} = getValues();
  const fieldPlaceholder = type ? fieldPlaceholdersDef[type] : null;

  function handleTypeChange(value: ContactMethodType) {
    setValue("type", value, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
  }

  async function handleFormSubmit(contactMethod: ContactMethod, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    console.log({e, contactMethod});

    const contactMutation = contactMethodId === "new" ? createContactMutation : updateContactMutation;

    await contactMutation.mutateAsync(contactMethod).then(() => {
      reset();
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => {
        void handleSubmit(handleFormSubmit)(e);
      }}>
        <FormItem>
          <FormLabel>Type</FormLabel>

          <Select value={type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[12rem]">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ContactMethodType).map((type) => (
                <SelectItem key={type} value={type}>{capitalize(type)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>Specifies the contact method type. Relevant icon will be displayed based on the type.</FormDescription>
        </FormItem>

        <FormField
          control={control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} {...register("name")} placeholder={fieldPlaceholder?.name} />
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
                <Input {...field} {...register("description")} placeholder={fieldPlaceholder?.description} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6">Save changes</Button>
      </form>
    </FormProvider>
  );
};

type FieldPlaceholder = {
  name: string;
  description: string;
}

const fieldPlaceholdersDef: {[key in ContactMethodType]: FieldPlaceholder} = {
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