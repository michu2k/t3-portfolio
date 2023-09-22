import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Button} from "~/components/ui/Button";
import {Textarea} from "~/components/ui/Textarea";
import {Heading} from "~/components/ui/Heading";

const AboutForm = () => {
  const formMethods = useForm({});
  const {control} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form>
        <Heading as="h2" size="md">
          General settings
        </Heading>

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

        <Button type="submit" className="mt-6">
          Save changes
        </Button>
      </form>
    </FormProvider>
  );
};

export {AboutForm};
