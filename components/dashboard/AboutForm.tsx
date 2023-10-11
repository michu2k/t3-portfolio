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
import {useUpdateSnippets} from "~/hooks/useUpdateSnippets";

const AboutForm = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "ABOUT_ME", keys: ["description"]});
  const updateSnippets = useUpdateSnippets<AboutMeSnippetsFormValues>("ABOUT_ME", data);

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

export {AboutForm};
