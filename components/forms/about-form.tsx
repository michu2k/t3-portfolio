"use client";

import React from "react";
import {FileX2Icon} from "lucide-react";
import {FormProvider, useForm} from "react-hook-form";
import type {Snippet} from "@prisma/client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSnippets} from "~/hooks/useSnippets";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Button} from "~/components/ui/Button";
import {Textarea} from "~/components/ui/textarea";
import {Heading} from "~/components/ui/Heading";
import {ImageCard} from "~/components/ui/image-card";
import {Dropzone} from "~/components/ui/dropzone";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/aboutMe";
import {aboutMeSnippetsSchema} from "~/utils/validations/aboutMe";
import {api} from "~/trpc/react";
import {acceptedImageTypes} from "~/utils/file";

type AboutFormProps = {
  data: Array<Snippet>;
};

const AboutForm = ({data}: AboutFormProps) => {
  const {updateSnippets, snippetValues} = useSnippets<keyof AboutMeSnippetsFormValues>("ABOUT_ME", data);
  const {description = "", image: imageId} = snippetValues;

  const {data: imageObj} = api.image.getImage.useQuery({id: imageId}, {enabled: !!imageId});
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

    if (image?.name === imageObj?.name) return;

    // Delete old image
    if (imageId) {
      await deleteImage.mutateAsync({id: imageId});
    }

    // Create new image if it exists
    if (image) {
      const {id} = await createImage.mutateAsync({image});
      await updateSnippets({image: id});
    } else {
      await updateSnippets({image: ""});
    }
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
