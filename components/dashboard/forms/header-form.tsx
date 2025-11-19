"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SnippetType } from "@prisma/client";

import { Button } from "~/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormLabelSkeleton, FormMessage } from "~/components/ui/form";
import { Heading } from "~/components/ui/heading";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/toaster";
import { useSnippets } from "~/hooks/use-snippets";
import type { Snippets } from "~/server/api/routers/snippet";
import type { HeaderSnippetsFormValues } from "~/utils/validations/header";
import { headerSnippetsSchema } from "~/utils/validations/header";

type HeaderFormProps = {
  snippets: Snippets;
};

export const HeaderForm = ({ snippets }: HeaderFormProps) => {
  const { updateSnippets, extractSnippetValues } = useSnippets(SnippetType.HEADER, snippets);
  const { heading = "", description = "" } = extractSnippetValues();

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

  const { control, handleSubmit } = formMethods;

  async function handleFormSubmit({ heading, description }: HeaderSnippetsFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    await updateSnippets({ heading, description });

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
          render={({ field }) => (
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
          render={({ field }) => (
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

export const HeaderFormSkeleton = () => {
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
