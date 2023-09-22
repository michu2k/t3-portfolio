import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Button} from "~/components/ui/Button";
import {Textarea} from "~/components/ui/Textarea";
import {Heading} from "~/components/ui/Heading";
import {api} from "~/utils/api";
import type {ContactSnippetsFormValues} from "~/utils/validations/contact";
import {contactSnippetsSchema} from "~/utils/validations/contact";
import {transformSnippetsDataIntoFormValues} from "~/utils/transformSnippetsDataIntoFormValues";
import {useUpdateSnippets} from "~/hooks/useUpdateSnippets";

const ContactForm = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "CONTACT", keys: ["description"]});
  const updateSnippets = useUpdateSnippets<ContactSnippetsFormValues>("CONTACT", data);

  const formMethods = useForm<ContactSnippetsFormValues>({
    defaultValues: {
      description: ""
    },
    values: transformSnippetsDataIntoFormValues(data),
    resolver: zodResolver(contactSnippetsSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit(snippets: ContactSnippetsFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();
    await updateSnippets(snippets);
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
        <Heading as="h2" size="md">
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
