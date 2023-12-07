import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Button} from "~/components/ui/Button";
import {Textarea} from "~/components/ui/Textarea";
import {Heading} from "~/components/ui/Heading";
import {api} from "~/utils/api";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";
import {headerSnippetsSchema} from "~/utils/validations/header";
import {useSnippets} from "~/hooks/useSnippets";

const HeaderForm = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "HEADER", keys: ["heading", "description", "image"]});

  const {updateSnippets, snippetValues} = useSnippets<keyof HeaderSnippetsFormValues>("HEADER", data);
  const {heading = "", description = ""} = snippetValues;

  const formMethods = useForm<HeaderSnippetsFormValues>({
    defaultValues: {
      heading: "",
      description: ""
    },
    values: {
      heading,
      description
    },
    resolver: zodResolver(headerSnippetsSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit({heading, description}: HeaderSnippetsFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();
    await updateSnippets({heading, description});
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)} encType="multipart/form-data">
        <Heading as="h2" size="sm">
          General settings
        </Heading>

        <FormField
          control={control}
          name="heading"
          render={({field}) => (
            <FormItem>
              <FormLabel>Heading</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Main page heading" />
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
              <FormLabel isOptional>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter short header description here" />
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

export {HeaderForm};
