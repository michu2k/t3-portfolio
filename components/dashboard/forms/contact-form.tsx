"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "~/components/ui/button";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Heading} from "~/components/ui/heading";
import {Textarea} from "~/components/ui/textarea";
import {useSnippets} from "~/hooks/use-snippets";
import {useToast} from "~/hooks/use-toast";
import type {Snippets} from "~/server/api/routers/snippet";
import {extractSnippetValues} from "~/utils/extractSnippetValues";
import type {ContactSnippetsFormValues} from "~/utils/validations/contact";
import {contactSnippetsSchema} from "~/utils/validations/contact";

type ContactFormProps = {
  snippets: Snippets;
};

const ContactForm = ({snippets}: ContactFormProps) => {
  const {toast} = useToast();
  const updateSnippets = useSnippets<keyof ContactSnippetsFormValues>("CONTACT", snippets);
  const snippetValues = extractSnippetValues<keyof ContactSnippetsFormValues>(snippets);

  const formMethods = useForm<ContactSnippetsFormValues>({
    defaultValues: {
      description: ""
    },
    values: snippetValues,
    resolver: zodResolver(contactSnippetsSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit(snippets: ContactSnippetsFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();
    await updateSnippets(snippets);

    toast({
      title: "Success",
      description: "Your changes have been saved.",
      variant: "success"
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)}>
        <Heading as="h2" size="sm">
          General settings
        </Heading>

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

        <Button type="submit" className="mt-6">
          Save changes
        </Button>
      </form>
    </FormProvider>
  );
};

export {ContactForm};
