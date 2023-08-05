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
import {Input} from "~/components/Input";
import {Button} from "~/components/Button";
import {Textarea} from "~/components/Textarea";
import {Heading} from "~/components/Heading";
import {Separator} from "../Separator";

const Contact = () => {
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
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter section description here..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator isFullWidth className="my-10" />
        <Heading as="h3" size="md">Contact methods</Heading>

        <FormDescription>
          Enter contact methods that will be displayed on the website.
          Leave fields empty if you don&apos;t want to display some of the methods.
        </FormDescription>

        <FormField
          control={control}
          name="address"
          render={({field}) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address-description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Address description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({field}) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone-description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Phone description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email-description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email description</FormLabel>
              <FormControl>
                <Input {...field} />
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

export {Contact};