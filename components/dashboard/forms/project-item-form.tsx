"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PencilIcon} from "lucide-react";
import {useRouter} from "next/navigation";

import {Button} from "~/components/ui/button";
import {Dropzone, DropzoneContent} from "~/components/ui/dropzone";
import {FileThumbnailCard} from "~/components/ui/file-thumbnail";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormLabelSkeleton,
  FormMessage
} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Skeleton} from "~/components/ui/skeleton";
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
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)}>
        <FormField
          control={control}
          name="coverImage"
          render={({field: {name, value, onChange}}) => (
            <FormItem>
              <FormLabel>Cover image</FormLabel>
              {value ? (
                <FileThumbnailCard
                  file={value}
                  actions={
                    <Dropzone
                      name={name}
                      onDrop={onChange}
                      accept={acceptedImageTypes}
                      className="size-10 cursor-pointer p-0">
                      <PencilIcon size={16} />
                      <span className="sr-only">Change image</span>
                    </Dropzone>
                  }
                />
              ) : (
                <Dropzone name={name} onDrop={onChange} accept={acceptedImageTypes}>
                  <DropzoneContent />
                </Dropzone>
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
                <FileThumbnailCard
                  file={value}
                  actions={
                    <Dropzone
                      name={name}
                      onDrop={onChange}
                      accept={acceptedImageTypes}
                      className="size-10 cursor-pointer p-0">
                      <PencilIcon size={16} />
                      <span className="sr-only">Change image</span>
                    </Dropzone>
                  }
                />
              ) : (
                <Dropzone name={name} onDrop={onChange} accept={acceptedImageTypes}>
                  <DropzoneContent />
                </Dropzone>
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

const ProjectItemFormSkeleton = () => {
  return (
    <>
      <div className="py-4">
        <FormLabelSkeleton>Cover image</FormLabelSkeleton>
        <div className="flex min-h-[5.5rem] gap-4">
          <Skeleton className="h-24 w-36" />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </div>

      <div className="py-4">
        <FormLabelSkeleton>Name</FormLabelSkeleton>
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="pb-12 pt-4">
        <FormLabelSkeleton isOptional>Short description</FormLabelSkeleton>
        <Skeleton className="h-28 w-full" />
      </div>

      <div className="py-4">
        <FormLabelSkeleton>Image</FormLabelSkeleton>
        <div className="flex min-h-[5.5rem] gap-4">
          <Skeleton className="h-24 w-36" />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </div>

      <div className="py-4">
        <FormLabelSkeleton>Description</FormLabelSkeleton>
        <Skeleton className="h-28 w-full" />
      </div>

      <div className="py-4">
        <FormLabelSkeleton isOptional>Website URL</FormLabelSkeleton>
        <Skeleton className="h-10 w-full" />
      </div>
    </>
  );
};

export {ProjectItemForm, ProjectItemFormSkeleton};
