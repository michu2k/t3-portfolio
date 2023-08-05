import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/Form";
import {Input} from "~/components/Input";
import {Button} from "~/components/Button";
import {Textarea} from "~/components/Textarea";
import {Heading} from "~/components/Heading";

const About = () => {
  const formMethods = useForm({});
  const {control} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form>
        <Heading as="h3" size="md">General</Heading>

        <FormField
          control={control}
          name="heading"
          render={({field}) => (
            <FormItem>
              <FormLabel>Heading</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Section heading" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="content"
          render={({field}) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter section content here..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Edit: My skills */}
        {/* Edit: section image */}

        <Button type="submit" className="my-8">Save changes</Button>
      </form>
    </FormProvider>
  );
};

export {About};