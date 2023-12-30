"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import type {SocialMediaLink} from "@prisma/client";
import {useRouter} from "next/navigation";
import {Button} from "~/components/ui/Button";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/Form";
import {Input} from "~/components/ui/Input";
import {api} from "~/trpc/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "~/utils/className";
import {capitalize} from "~/utils/capitalize";
import {socialMediaIconsDef} from "~/utils/getSocialMediaIcon";
import type {SocialMediaLinkFormValues} from "~/utils/validations/socialMedia";
import {socialMediaLinkSchema} from "~/utils/validations/socialMedia";

type SocialMediaItemFormProps = {
  data: SocialMediaLink | null;
};

const SocialMediaItemForm = ({data}: SocialMediaItemFormProps) => {
  const router = useRouter();
  const utils = api.useUtils();

  const createItemMutation = api.socialMedia.createItem.useMutation();
  const updateItemMutation = api.socialMedia.updateItem.useMutation();

  const formMethods = useForm<SocialMediaLinkFormValues>({
    defaultValues: {
      icon: undefined,
      url: ""
    },
    values: data ?? undefined,
    resolver: zodResolver(socialMediaLinkSchema)
  });

  const {control, handleSubmit} = formMethods;

  async function handleFormSubmit(formValues: SocialMediaLinkFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    const mutation = data?.id ? updateItemMutation : createItemMutation;
    const mutationVariables = data?.id ? {id: data.id, ...formValues} : formValues;

    await mutation.mutateAsync(mutationVariables, {
      async onSuccess() {
        await utils.socialMedia.getItem.invalidate();
      }
    });

    router.push("/dashboard/social-media");
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)}>
        <FormField
          control={control}
          name="icon"
          render={({field: {value, onChange}}) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <ul className="flex flex-wrap gap-2">
                {Object.entries(socialMediaIconsDef).map(([key, Icon]) => (
                  <li key={key} value={key}>
                    <Button
                      size="icon"
                      variant="outline"
                      className={cn({["border-slate-100 bg-slate-100"]: key === value})}
                      onClick={() => onChange(key)}>
                      <Icon className="h-4 w-4 fill-slate-700" aria-hidden="true" />
                      <span className="sr-only">{capitalize(key)}</span>
                    </Button>
                  </li>
                ))}
              </ul>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="url"
          render={({field}) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter social media url" />
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

export {socialMediaIconsDef, SocialMediaItemForm};
