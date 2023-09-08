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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/Select";
import {api} from "~/utils/api";
import {capitalize} from "~/utils/capitalize";
import {contactMethodSchema} from "~/utils/validations/contact";

const ContactItemForm = () => {
  const {query, push} = useRouter();
  const utils = api.useContext();
  const contactMethodId = query.id as string;

  const {data} = api.contact.getContactMethod.useQuery({id: contactMethodId}, {});
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

  const {control, handleSubmit, watch} = formMethods;
  const type = watch("type");

  const contactMutation = contactMethodId === "new" ? createContactMutation : updateContactMutation;
  const fieldPlaceholder = type ? fieldPlaceholdersDef[type] : null;

  async function handleFormSubmit(contactMethod: ContactMethod, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    await contactMutation.mutateAsync(contactMethod, {
      async onSuccess() {
        await utils.contact.getContactMethod.invalidate();
      }
    });

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
                    <SelectItem key={type} value={type}>{capitalize(type)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Relevant icon will be displayed based on the type.
              </FormDescription>
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