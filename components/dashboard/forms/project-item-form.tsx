"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FileX2Icon} from "lucide-react";
import {useRouter} from "next/navigation";

import {Button} from "~/components/ui/button";
import {Dropzone} from "~/components/ui/dropzone";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {ImageCard} from "~/components/ui/image-card";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";
import {useToast} from "~/hooks/use-toast";
import type {ProjectItem} from "~/server/api/routers/project";
import {api} from "~/trpc/react";
import {acceptedImageTypes} from "~/utils/file";
import {revalidatePath} from "~/utils/revalidate-path";
import type {ProjectItemFormValues} from "~/utils/validations/project";
import {projectItemSchema} from "~/utils/validations/project";

type ProjectItemFormProps = {
  project: ProjectItem | null;
};

const ProjectItemForm = ({project}: ProjectItemFormProps) => {
  const router = useRouter();
  const {toast} = useToast();
  const utils = api.useUtils();

  const createItemMutation = api.project.createItem.useMutation();
  const updateItemMutation = api.project.updateItem.useMutation();
  const itemId = project?.id;

  const formMethods = useForm<ProjectItemFormValues>({
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      websiteUrl: "",
      image: undefined,
      coverImage: undefined
    },
    values: project
      ? {
          ...project,
          shortDescription: project.shortDescription ?? "",
          websiteUrl: project.websiteUrl ?? ""
        }
      : undefined,
    resolver: zodResolver(projectItemSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit(formValues: ProjectItemFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    const mutation = itemId ? updateItemMutation : createItemMutation;
    const mutationVariables = itemId ? {id: itemId, ...formValues} : formValues;

    await mutation.mutateAsync(mutationVariables, {
      async onSuccess() {
        toast({
          title: "Success",
          description: itemId ? "Your changes have been saved." : "A new item has been added.",
          variant: "success"
        });

        await utils.project.getItem.invalidate();
      }
    });

    revalidatePath("/dashboard/projects");
    router.push("/dashboard/projects");
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
                    <Button variant="secondary" size="sm" onClick={() => onChange(undefined)}>
                      <FileX2Icon size={16} />
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
                    <Button variant="secondary" size="sm" onClick={() => onChange(undefined)}>
                      <FileX2Icon size={16} />
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

        <FormField
          control={control}
          name="websiteUrl"
          render={({field}) => (
            <FormItem>
              <FormLabel isOptional>Website URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter url to the website" />
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
