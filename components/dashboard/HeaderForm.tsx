import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Button} from "~/components/ui/Button";
import {Textarea} from "~/components/ui/Textarea";
import {Heading} from "~/components/ui/Heading";

const HeaderForm = () => {
  const formMethods = useForm({});
  const {control} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form>
        <Heading as="h3" size="md">
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter short header description here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Edit: Header image */}

        <Button type="submit" className="mt-6">
          Save changes
        </Button>
      </form>
    </FormProvider>
  );
};

export {HeaderForm};
