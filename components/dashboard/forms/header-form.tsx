"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "~/hooks/use-toast";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {Heading} from "~/components/ui/heading";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";
import {headerSnippetsSchema} from "~/utils/validations/header";
import {getSnippetValues, useSnippets} from "~/hooks/use-snippets";
import type {Snippet} from "@prisma/client";

type HeaderFormProps = {
  snippets: Array<Snippet>;
};

const HeaderForm = ({snippets}: HeaderFormProps) => {
  const {toast} = useToast();
  const updateSnippets = useSnippets<keyof HeaderSnippetsFormValues>("HEADER", snippets);
  const {heading = "", description = ""} = getSnippetValues<keyof HeaderSnippetsFormValues>(snippets);

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

    toast({
      title: "Success",
      description: "Your changes have been saved.",
      variant: "success"
    });
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
