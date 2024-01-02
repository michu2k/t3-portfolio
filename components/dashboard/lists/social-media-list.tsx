"use client";

import React, {useState} from "react";
import type {SocialMediaLink} from "@prisma/client";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {api} from "~/trpc/react";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {Button, buttonVariants} from "~/components/ui/button";
import {EmptySection} from "~/components/ui/empty-section";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {Heading} from "~/components/ui/heading";
import {cn} from "~/utils/className";
import {getSocialMediaIcon} from "~/utils/get-social-media-icon";

const SocialMediaList = () => {
  const {data: socialMediaLinks = [], isLoading} = api.socialMedia.getItems.useQuery();
  const deleteItemMutation = api.socialMedia.deleteItem.useMutation();
  const [selectedSocialMediaLink, setSelectedSocialMediaLink] = useState<SocialMediaLink | null>(null);
  const utils = api.useUtils();

  const {icon} = selectedSocialMediaLink || {};

  async function handleDeleteItem() {
    if (selectedSocialMediaLink?.id) {
      await deleteItemMutation.mutateAsync(
        {id: selectedSocialMediaLink.id},
        {
          async onSuccess() {
            await utils.socialMedia.getItems.invalidate();
            setSelectedSocialMediaLink(null);
          }
        }
      );
    }
  }

  function displayItems() {
    return socialMediaLinks.map((item) => (
      <SocialMediaCard key={item.id} onDelete={() => setSelectedSocialMediaLink(item)} {...item} />
    ));
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Links
      </Heading>

      <div className="flex flex-col items-start">
        {isLoading ? null : socialMediaLinks.length ? displayItems() : <EmptySection heading="No links found" />}

        <Link href="/dashboard/social-media/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new link
        </Link>
      </div>

      <DeleteEntityDialog
        title="Delete link"
        entityName={`${icon || ""} url`}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type SocialMediaCardProps = SocialMediaLink & {
  onDelete: (e: React.MouseEvent) => void;
};

const SocialMediaCard = ({id, icon, url, onDelete}: SocialMediaCardProps) => {
  const Icon = getSocialMediaIcon(icon);

  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <Icon className="mr-2 h-4 w-4 flex-shrink-0 fill-slate-700" aria-hidden="true" />

      <div className="mr-4 flex-1">
        <p className="text-sm leading-6">{url}</p>
      </div>

      <Link href={`/dashboard/social-media/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
        <PencilIcon size={16} />
        <span className="sr-only">Edit</span>
      </Link>

      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <TrashIcon size={16} />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
    </article>
  );
};

export {SocialMediaList};
