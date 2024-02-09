"use client";

import React, {useState} from "react";
import type {SocialMediaLink} from "@prisma/client";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {api} from "~/trpc/react";
import {useToast} from "~/hooks/use-toast";
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
  const {toast} = useToast();
  const utils = api.useUtils();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const selectedItem = socialMediaLinks.find((item) => item.id === selectedItemId);

  async function handleDeleteItem() {
    if (!selectedItemId) return;

    await deleteItemMutation.mutateAsync(
      {id: selectedItemId},
      {
        async onSuccess() {
          toast({
            title: "Success",
            description: "Social media link deleted successfully",
            variant: "success"
          });

          await utils.socialMedia.getItems.invalidate();
        }
      }
    );
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open) {
      setSelectedItemId(null);
    }
  }

  function displayItems() {
    return socialMediaLinks.map((item) => (
      <SocialMediaCard key={item.id} onClickDeleteBtn={() => setSelectedItemId(item.id)} {...item} />
    ));
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
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
        entityName={`${selectedItem?.icon || ""} url`}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type SocialMediaCardProps = SocialMediaLink & {
  onClickDeleteBtn: (e: React.MouseEvent) => void;
};

const SocialMediaCard = ({id, icon, url, onClickDeleteBtn}: SocialMediaCardProps) => {
  const Icon = getSocialMediaIcon(icon);

  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-3 last-of-type:border-0">
      <Icon className="fill-foreground mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />

      <div className="mr-4 flex-1">
        <p className="text-muted-foreground text-sm leading-6">{url}</p>
      </div>

      <Link href={`/dashboard/social-media/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
        <PencilIcon size={16} />
        <span className="sr-only">Edit</span>
      </Link>

      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onClickDeleteBtn}>
          <TrashIcon size={16} />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
    </article>
  );
};

export {SocialMediaList};
