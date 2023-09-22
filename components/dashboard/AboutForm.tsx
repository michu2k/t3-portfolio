import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Button} from "~/components/ui/Button";
import {Textarea} from "~/components/ui/Textarea";
import {Heading} from "~/components/ui/Heading";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/aboutMe";
import {aboutMeSnippetsSchema} from "~/utils/validations/aboutMe";
import {transformSnippetsDataIntoFormValues} from "~/utils/transformSnippetsDataIntoFormValues";
import {api} from "~/utils/api";

const AboutForm = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "ABOUT_ME", keys: ["description"]});
  const updateSnippet = api.snippet.updateSnippet.useMutation();
  const createSnippet = api.snippet.createSnippet.useMutation();
  const utils = api.useContext();

  const formMethods = useForm<AboutMeSnippetsFormValues>({
    defaultValues: {
      description: ""
    },
    values: transformSnippetsDataIntoFormValues(data),
    resolver: zodResolver(aboutMeSnippetsSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit(snippets: AboutMeSnippetsFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    const promises = Object.entries(snippets).map(async ([key, value]) => {
      const snippetId = data.find((snippet) => snippet.name === key)?.id;

      if (snippetId) {
        return await updateSnippet.mutateAsync({id: snippetId, value});
      }

      return await createSnippet.mutateAsync({type: "ABOUT_ME", name: key, value});
    });

    await Promise.all(promises).then(async () => {
      await utils.snippet.getSnippets.invalidate();
    });
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

export {AboutForm};
