import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/ui/Form";
import {Button} from "~/components/ui/Button";
import {Textarea} from "~/components/ui/Textarea";
import {Heading} from "~/components/ui/Heading";
import {api} from "~/utils/api";
import type {ContactFormValues} from "./Contact.utils";
import {contactFormSchema} from "~/utils/validations/contact";

const ContactForm = () => {
  // const {data: contactMethods = []} = api.contact.getAll.useQuery();

  const formMethods = useForm<ContactFormValues>({
    defaultValues: {
      description: ""
    },
    values: {
      description: ""
    },
    resolver: zodResolver(contactFormSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit({description}: ContactFormValues) {

  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Heading as="h3" size="md">General settings</Heading>

        <FormField
          control={control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter section description here" />
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

export {ContactForm};