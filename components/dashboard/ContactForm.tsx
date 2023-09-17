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

const ContactForm = () => {
  const utils = api.useContext();

  const {data = []} = api.snippet.getSnippets.useQuery({type: "CONTACT"});
  const updateContactSnippet = api.snippet.updateSnippet.useMutation();
  const createContactSnippet = api.snippet.createSnippet.useMutation();

  const formMethods = useForm<ContactSnippetsFormValues>({
    defaultValues: {
      description: ""
    },
    values: transformSnippetsDataIntoFormValues(data, ["description"]),
    resolver: zodResolver(contactSnippetsSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit(snippets: ContactSnippetsFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    const promises = Object.entries(snippets).map(async ([key, value]) => {
      const snippetId = data.find((snippet) => snippet.name === key)?.id;

      if (snippetId) {
        return await updateContactSnippet.mutateAsync({id: snippetId, value});
      }

      return await createContactSnippet.mutateAsync({type: "CONTACT", name: key, value});
    });

    await Promise.all(promises).then(async () => {
      await utils.snippet.getSnippets.invalidate();
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
        <Heading as="h3" size="md">
          General settings
        </Heading>

        <FormField
          control={control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
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
