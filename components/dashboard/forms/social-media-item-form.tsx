"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SocialMediaLink } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormLabelSkeleton, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { toast } from "~/components/ui/toaster";
import { api } from "~/trpc/react";
import { capitalize } from "~/utils/capitalize";
import { cn } from "~/utils/cn";
import { dashboardPaths } from "~/utils/dashboard.config";
import { DefaultSocialMediaIcon, isSocialMediaIconNameValid, socialMediaIconsDef } from "~/utils/get-social-media-icon";
import type { SocialMediaLinkFormValues } from "~/utils/validations/social-media";
import { socialMediaLinkSchema } from "~/utils/validations/social-media";

type SocialMediaItemFormProps = {
  socialMediaLink: SocialMediaLink | null;
};

export const SocialMediaItemForm = ({ socialMediaLink }: SocialMediaItemFormProps) => {
  const router = useRouter();

  const createItemMutation = api.socialMedia.createItem.useMutation();
  const updateItemMutation = api.socialMedia.updateItem.useMutation();
  const itemId = socialMediaLink?.id;

  const formMethods = useForm<SocialMediaLinkFormValues>({
    defaultValues: {
      icon: undefined,
      url: ""
    },
    values: socialMediaLink ?? undefined,
    resolver: zodResolver(socialMediaLinkSchema)
  });

  const { control, handleSubmit, watch } = formMethods;

  async function handleFormSubmit(formValues: SocialMediaLinkFormValues, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();

    const mutation = itemId ? updateItemMutation : createItemMutation;
    const mutationVariables = itemId ? { id: itemId, ...formValues } : formValues;

    await mutation.mutateAsync(mutationVariables, {
      async onSuccess() {
        toast({
          title: "Success",
          description: itemId ? "Your changes have been saved." : "A new item has been added.",
          variant: "success"
        });
      }
    });

    router.push(dashboardPaths.socialMedia);
  }

  function displaySelectedIcon() {
    const isInitialIconValid = isSocialMediaIconNameValid(socialMediaLink?.icon ?? "");

    if (!itemId || isInitialIconValid) {
      return null;
    }

    const currentIcon = watch("icon");
    const isNewIconValid = isSocialMediaIconNameValid(currentIcon);

    return (
      <div
        className={cn(
          "text-foreground border-muted inline-flex size-10 items-center justify-center rounded-md border text-sm",
          { "bg-muted": !isNewIconValid }
        )}>
        <DefaultSocialMediaIcon className="fill-foreground size-4" aria-hidden="true" />
      </div>
    );
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)}>
        <FormField
          control={control}
          name="icon"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <ul className="flex flex-wrap gap-2">
                {displaySelectedIcon()}

                {Object.entries(socialMediaIconsDef).map(([key, Icon]) => (
                  <li key={key} value={key}>
                    <Button
                      size="icon"
                      variant="outline"
                      className={cn({ "bg-muted": key === value })}
                      onClick={() => onChange(key)}>
                      <Icon className="fill-foreground size-4" aria-hidden="true" />
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
          render={({ field }) => (
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

export const SocialMediaItemFormSkeleton = () => {
  return (
    <>
      <div className="py-4">
        <FormLabelSkeleton>Icon</FormLabelSkeleton>
        <div className="flex flex-wrap gap-2">
          {Object.entries(socialMediaIconsDef).map(([key]) => (
            <Skeleton key={key} className="size-10" />
          ))}
        </div>
      </div>

      <div className="py-4">
        <FormLabelSkeleton>Url</FormLabelSkeleton>
        <Skeleton className="h-10 w-full" />
      </div>
    </>
  );
};
