"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "~/components/ui/button";
import {FormControl, FormField, FormItem, FormLabel, FormLabelSkeleton, FormMessage} from "~/components/ui/form";
import {Heading} from "~/components/ui/heading";
import {Input} from "~/components/ui/input";
import {Skeleton} from "~/components/ui/skeleton";
import {Textarea} from "~/components/ui/textarea";
import {useSnippets} from "~/hooks/use-snippets";
import {useToast} from "~/hooks/use-toast";
import type {Snippets} from "~/server/api/routers/snippet";
import {extractSnippetValues} from "~/utils/extractSnippetValues";
import {revalidatePath} from "~/utils/revalidate-path";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";
import {headerSnippetsSchema} from "~/utils/validations/header";

type HeaderFormProps = {
  snippets: Snippets;
};

const HeaderForm = ({snippets}: HeaderFormProps) => {
  const {toast} = useToast();
  const updateSnippets = useSnippets<keyof HeaderSnippetsFormValues>("HEADER", snippets);
  const {heading = "", description = ""} = extractSnippetValues<keyof HeaderSnippetsFormValues>(snippets);

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

    revalidatePath("/dashboard/header");

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

const HeaderFormSkeleton = () => {
  return (
    <>
      <Heading as="h2" size="sm">
        General settings
      </Heading>

      <div className="py-4">
        <FormLabelSkeleton>Heading</FormLabelSkeleton>
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="py-4">
        <FormLabelSkeleton isOptional>Description</FormLabelSkeleton>
        <Skeleton className="h-28 w-full" />
      </div>
    </>
  );
};

export {HeaderForm, HeaderFormSkeleton};
