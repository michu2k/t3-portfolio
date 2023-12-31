"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {FileX2Icon} from "lucide-react";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "~/components/ui/button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";
import {Dropzone} from "~/components/ui/dropzone";
import {ImageCard} from "~/components/ui/image-card";
import type {ProjectItemFormValues} from "~/utils/validations/project";
import type {ProjectItem} from "~/server/api/routers/project";
import {projectItemSchema} from "~/utils/validations/project";
import {acceptedImageTypes} from "~/utils/file";
import {api} from "~/trpc/react";

type ProjectItemFormProps = {
  data: ProjectItem | null;
};

const ProjectItemForm = ({data}: ProjectItemFormProps) => {
  const router = useRouter();
  const utils = api.useUtils();

  const createItemMutation = api.project.createItem.useMutation();
  const updateItemMutation = api.project.updateItem.useMutation();

  const formMethods = useForm<ProjectItemFormValues>({
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      websiteUrl: "",
      repositoryUrl: "",
      image: undefined,
      coverImage: undefined
    },
    values: data
      ? {
          ...data,
          shortDescription: data.shortDescription ?? "",
          websiteUrl: data.websiteUrl ?? "",
          repositoryUrl: data.repositoryUrl ?? ""
        }
      : undefined,
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

        <FormField
          control={control}
          name="repositoryUrl"
          render={({field}) => (
            <FormItem>
              <FormLabel isOptional>Repository URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter url to the repository" />
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
