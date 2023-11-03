import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FileX2Icon} from "lucide-react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {Button} from "~/components/ui/Button";
import {Textarea} from "~/components/ui/Textarea";
import {Heading} from "~/components/ui/Heading";
import {ImageCard} from "~/components/ui/ImageCard";
import {Dropzone} from "~/components/ui/Dropzone";
import {api} from "~/utils/api";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";
import {headerSnippetsSchema} from "~/utils/validations/header";
import {acceptedImageTypes} from "~/utils/file";
import {useSnippets} from "~/hooks/useSnippets";

const HeaderForm = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "HEADER", keys: ["heading", "description", "image"]});

  const {updateSnippets, snippetValues} = useSnippets<keyof HeaderSnippetsFormValues>("HEADER", data);
  const {heading = "", description = "", image: imageId} = snippetValues;

  const {data: imageObj} = api.image.getImage.useQuery({id: imageId}, {enabled: !!imageId});
  const createImage = api.image.createImage.useMutation();
  const deleteImage = api.image.deleteImage.useMutation();

  const formMethods = useForm<HeaderSnippetsFormValues>({
    defaultValues: {
      heading: "",
      description: "",
      image: undefined
    },
    values: {
      heading,
      description,
      image: imageObj ?? undefined
    },
    resolver: zodResolver(headerSnippetsSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit(
    {heading, description, image}: HeaderSnippetsFormValues,
    e?: React.BaseSyntheticEvent
  ) {
    e?.preventDefault();

    await updateSnippets({heading, description});

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
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)} encType="multipart/form-data">
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
          name="heading"
          render={({field}) => (
            <FormItem>
              <FormLabel>Heading</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Main page heading" />
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
              <FormLabel isOptional>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter short header description here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Edit: Header image */}

        <Button type="submit" className="mt-6">
          Save changes
        </Button>
      </form>
    </FormProvider>
  );
};

export {HeaderForm};
