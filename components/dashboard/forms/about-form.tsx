"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FileX2Icon} from "lucide-react";

import {Button} from "~/components/ui/button";
import {Dropzone} from "~/components/ui/dropzone";
import {FileThumbnailCard} from "~/components/ui/file-thumbnail";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Heading} from "~/components/ui/heading";
import {Textarea} from "~/components/ui/textarea";
import {useSnippets} from "~/hooks/use-snippets";
import {useToast} from "~/hooks/use-toast";
import type {Snippets} from "~/server/api/routers/snippet";
import {api} from "~/trpc/react";
import {extractSnippetValues} from "~/utils/extractSnippetValues";
import type {FileObj} from "~/utils/file";
import {acceptedImageTypes} from "~/utils/file";
import {revalidatePath} from "~/utils/revalidate-path";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/about-me";
import {aboutMeSnippetsSchema} from "~/utils/validations/about-me";

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 400;

type AboutFormProps = {
  snippets: Snippets;
  currentImage: FileObj | null;
};

const AboutForm = ({snippets, currentImage}: AboutFormProps) => {
  const {toast} = useToast();
  const updateSnippets = useSnippets<keyof AboutMeSnippetsFormValues>("ABOUT_ME", snippets);
  const {description = "", image: currentImageKey} = extractSnippetValues<keyof AboutMeSnippetsFormValues>(snippets);

  const createImage = api.image.createImage.useMutation();
  const deleteImage = api.image.deleteImage.useMutation();

  const formMethods = useForm<AboutMeSnippetsFormValues>({
    defaultValues: {
      description: "",
      image: undefined
    },
    values: {
      description,
      image: currentImage ?? undefined
    },
    resolver: zodResolver(aboutMeSnippetsSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit({description, image}: AboutMeSnippetsFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    let imageKey = currentImageKey;

    if (image?.name !== currentImage?.name) {
      // Delete old image
      if (currentImageKey) {
        await deleteImage.mutateAsync({key: currentImageKey});
        imageKey = "";
      }

      // Create new image
      if (image) {
        imageKey = await createImage.mutateAsync({image, width: IMAGE_WIDTH, height: IMAGE_HEIGHT});
      }
    }

    await updateSnippets({description, image: imageKey});

    revalidatePath("/dashboard/about");

    toast({
      title: "Success",
      description: "Your changes have been saved.",
      variant: "success"
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)}>
        <Heading as="h2" size="sm">
          General settings
        </Heading>

        <FormField
          control={control}
          name="image"
          render={({field: {name, value, onChange}}) => (
            <FormItem>
              <FormLabel isOptional>Image</FormLabel>
              {value ? (
                <FileThumbnailCard
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
                <Textarea {...field} placeholder="Enter section description here" />
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

export {AboutForm};
