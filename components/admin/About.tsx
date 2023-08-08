import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/Form";
import {Button} from "~/components/Button";
import {Textarea} from "~/components/Textarea";
import {Heading} from "~/components/Heading";

const About = () => {
  const formMethods = useForm({});
  const {control} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form>
        <Heading as="h3" size="md">General settings</Heading>

        <FormField
          control={control}
          name="content"
          render={({field}) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter section content here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Edit: My skills */}
        {/* Edit: section image */}

        <Button type="submit" className="mt-6">Save changes</Button>
      </form>
    </FormProvider>
  );
};

export {About};