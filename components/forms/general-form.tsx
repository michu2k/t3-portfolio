"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Heading} from "~/components/ui/Heading";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/Button";

const GeneralForm = () => {
  const formMethods = useForm({});
  const {control} = formMethods;

  return (
    <>
      <Heading as="h2" size="sm">
        SEO
      </Heading>

      <FormProvider {...formMethods}>
        <form>
          <FormField
            control={control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Page title</FormLabel>
                <FormControl withDescription>
                  <Input {...field} placeholder="Portfolio, personal website, etc." />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Defines the document&apos;s title that is shown in a browser&apos;s title bar or a page&apos;s tab.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Edit: social media icons */}

          <Button type="submit" className="mt-6">
            Save changes
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export {GeneralForm};
