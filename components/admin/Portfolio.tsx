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
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/Tabs";

const Portfolio = () => {
  return (
    <Tabs defaultValue="general">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="items">Portfolio items</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralTab />
      </TabsContent>

      <TabsContent value="items">
        <PortfolioItemsTab />
      </TabsContent>
    </Tabs>
  );
};

const GeneralTab = () => {
  const formMethods = useForm({});
  const {control} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form>
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

        <Button type="submit" className="my-8">Save changes</Button>
      </form>
    </FormProvider>
  );
};

const PortfolioItemsTab = () => {
  const formMethods = useForm({});
  // const {control} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form>

        {/* Edit: Project items */}

        <Button type="submit" className="my-8">Save changes</Button>
      </form>
    </FormProvider>
  );
};

export {Portfolio};