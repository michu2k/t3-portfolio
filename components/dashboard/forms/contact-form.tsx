"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {api} from "~/trpc/react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {Heading} from "~/components/ui/heading";
import type {ContactSnippetsFormValues} from "~/utils/validations/contact";
import {contactSnippetsSchema} from "~/utils/validations/contact";
import {getSnippetValues, useSnippets} from "~/hooks/use-snippets";

const ContactForm = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "CONTACT", keys: ["description"]});
  const updateSnippets = useSnippets<keyof ContactSnippetsFormValues>("CONTACT", data);
  const snippetValues = getSnippetValues<keyof ContactSnippetsFormValues>(data);

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
