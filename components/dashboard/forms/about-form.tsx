"use client";

import React from "react";
import {FileX2Icon} from "lucide-react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {Snippet} from "@prisma/client";
import {api} from "~/trpc/react";
import {getSnippetValues, useSnippets} from "~/hooks/use-snippets";
import {useToast} from "~/hooks/use-toast";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {Heading} from "~/components/ui/heading";
import {ImageCard} from "~/components/ui/image-card";
import {Dropzone} from "~/components/ui/dropzone";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/about-me";
import {aboutMeSnippetsSchema} from "~/utils/validations/about-me";
import {acceptedImageTypes} from "~/utils/file";

type AboutFormProps = {
  snippets: Array<Snippet>;
};

const AboutForm = ({snippets}: AboutFormProps) => {
  const {toast} = useToast();
  const updateSnippets = useSnippets<keyof AboutMeSnippetsFormValues>("ABOUT_ME", snippets);
  const {description = "", image: imageKey} = getSnippetValues<keyof AboutMeSnippetsFormValues>(snippets);

  const {data: imageObj} = api.image.getImage.useQuery({key: imageKey});
  const createImage = api.image.createImage.useMutation();
  const deleteImage = api.image.deleteImage.useMutation();

  const formMethods = useForm<AboutMeSnippetsFormValues>({
    defaultValues: {
      description: "",
      image: undefined
    },
    values: {
      description,
      image: imageObj ?? undefined
    },
    resolver: zodResolver(aboutMeSnippetsSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit({description, image}: AboutMeSnippetsFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    await updateSnippets({description});

    if (image?.name !== imageObj?.name) {
      // Delete old image
      if (imageKey) {
        await deleteImage.mutateAsync({key: imageKey});
      }

      // Create new image if it exists
      if (image) {
        const imageKey = await createImage.mutateAsync({image});
        await updateSnippets({image: imageKey});
      } else {
        await updateSnippets({image: ""});
      }
    }

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
