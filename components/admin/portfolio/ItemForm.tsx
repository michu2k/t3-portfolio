import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "~/components/Button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/Form";
import {Input} from "~/components/Input";
import {Textarea} from "~/components/Textarea";

const ItemForm = () => {
  const formMethods = useForm({});
  const {control} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form>
        <FormField
          control={control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="short-description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter item description here" />
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
              <FormLabel>Long description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter item description here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="my-8">Save changes</Button>
      </form>
    </FormProvider>
  );
};

export {ItemForm};