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
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/Tabs";

const Experience = () => {
  return (
    <Tabs defaultValue="general">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="items">Experience items</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralTab />
      </TabsContent>

      <TabsContent value="items">
        <ExperienceItemsTab />
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

        <Button type="submit" className="my-8">Save changes</Button>
      </form>
    </FormProvider>
  );
};

const ExperienceItemsTab = () => {
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

export {Experience};