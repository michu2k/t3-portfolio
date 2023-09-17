import React from "react";
import {useRouter} from "next/router";
import {zodResolver} from "@hookform/resolvers/zod";
import {ContactMethodType} from "@prisma/client";
import {FormProvider, useForm, useWatch} from "react-hook-form";
import {Button} from "~/components/ui/Button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/Select";
import {api} from "~/utils/api";
import {capitalize} from "~/utils/capitalize";
import type {ContactMethodFormValues} from "~/utils/validations/contact";
import {contactMethodSchema} from "~/utils/validations/contact";

const ContactItemForm = () => {
  const {query, push} = useRouter();
  const utils = api.useContext();
  const itemId = query.id as string;

  const {data} = api.contact.getContactMethod.useQuery({id: itemId});
  const createContactMutation = api.contact.createContactMethod.useMutation();
  const updateContactMutation = api.contact.updateContactMethod.useMutation();

  const formMethods = useForm<ContactMethodFormValues>({
    defaultValues: {
      name: "",
      description: "",
      type: undefined
    },
    values: data ?? undefined,
    resolver: zodResolver(contactMethodSchema)
  });

  const {control, handleSubmit} = formMethods;
  const type = useWatch({control, name: "type"});

  const fieldPlaceholder = type ? fieldPlaceholdersDef[type] : null;

  async function handleFormSubmit(formValues: ContactMethodFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    if (data?.id) {
      await updateContactMutation.mutateAsync(
        {id: data.id, ...formValues},
        {
          async onSuccess() {
            await utils.contact.getContactMethod.invalidate();
          }
        }
      );
    } else {
      await createContactMutation.mutateAsync(formValues, {
        async onSuccess() {
          await utils.contact.getContactMethod.invalidate();
        }
      });
    }

    await push("/dashboard/contact");
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
        <FormField
          control={control}
          name="type"
          render={({field: {name, value, onChange}}) => (
            <FormItem className="mt-1">
              <FormLabel>Type</FormLabel>
              <Select name={name} value={value} onValueChange={onChange}>
                <SelectTrigger className="w-[12rem]">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>

                <SelectContent>
                  {Object.values(ContactMethodType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {capitalize(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Relevant icon will be displayed based on the type.</FormDescription>
              <FormMessage />
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

        <Button type="submit">Save changes</Button>
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
