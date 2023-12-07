import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {FileX2Icon} from "lucide-react";
import {useRouter} from "next/router";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "~/components/ui/Button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Textarea} from "~/components/ui/Textarea";
import {Dropzone} from "~/components/ui/Dropzone";
import {ImageCard} from "~/components/ui/ImageCard";
import type {ProjectItemFormValues} from "~/utils/validations/project";
import {projectItemSchema} from "~/utils/validations/project";
import {acceptedImageTypes} from "~/utils/file";
import {api} from "~/utils/api";

const ProjectItemForm = () => {
  const {query, push} = useRouter();
  const utils = api.useContext();
  const itemId = query.id as string;

  const {data} = api.project.getItem.useQuery({id: itemId});
  const createItemMutation = api.project.createItem.useMutation();
  const updateItemMutation = api.project.updateItem.useMutation();

  const formMethods = useForm<ProjectItemFormValues>({
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      image: undefined,
      coverImage: undefined
    },
    values: data ?? undefined,
    resolver: zodResolver(projectItemSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit(formValues: ProjectItemFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    const mutation = data?.id ? updateItemMutation : createItemMutation;
    const mutationVariables = data?.id ? {id: data.id, ...formValues} : formValues;

    await mutation.mutateAsync(mutationVariables, {
      async onSuccess() {
        await utils.project.getItem.invalidate();
      }
    });

    await push("/dashboard/projects");
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)} encType="multipart/form-data">
        <FormField
          control={control}
          name="coverImage"
          render={({field: {name, value, onChange}}) => (
            <FormItem>
              <FormLabel>Cover image</FormLabel>
              {value ? (
                <ImageCard
                  file={value}
                  actions={
                    <Button variant="secondary" onClick={() => onChange(undefined)}>
                      <FileX2Icon size={16} className="mr-2" />
                      Delete image
                    </Button>
                  }
                />
              ) : (
                <Dropzone name={name} onDrop={onChange} accept={acceptedImageTypes} />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Project name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shortDescription"
          render={({field}) => (
            <FormItem>
              <FormLabel isOptional>Short description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ""} placeholder="Enter item description here" />
              </FormControl>
              <FormMessage />
              <FormDescription>If not provided, a description will be used instead.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="image"
          render={({field: {name, value, onChange}}) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              {value ? (
                <ImageCard
                  file={value}
                  actions={
                    <Button variant="secondary" onClick={() => onChange(undefined)}>
                      <FileX2Icon size={16} className="mr-2" />
                      Delete image
                    </Button>
                  }
                />
              ) : (
                <Dropzone name={name} onDrop={onChange} accept={acceptedImageTypes} />
              )}
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
                <Textarea {...field} placeholder="Enter item description here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6">
          Save changes
        </Button>
      </form>
    </FormProvider>
  );
};

export {ProjectItemForm};
