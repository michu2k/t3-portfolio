import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/Form";
import {Heading} from "~/components/Heading";
import {Input} from "~/components/Input";
import {Button} from "~/components/Button";

const General = () => {
  const formMethods = useForm({});
  const {control} = formMethods;

  return (
    <>
      <Heading as="h3" size="md">SEO</Heading>

      <FormProvider {...formMethods}>
        <form>
          <FormField
            control={control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Page title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Portfolio, personal website, etc." />
                </FormControl>
                <FormDescription>Defines the document&apos;s title that is shown in a browser&apos;s title bar or a page&apos;s tab</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Edit: social media icons */}

          <Button type="submit" className="mt-6">Save changes</Button>
        </form>
      </FormProvider>
    </>
  );
};

export {General};