"use client";

import React, {useState} from "react";
import type {SocialMediaLink} from "@prisma/client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {api} from "~/trpc/react";
import {useToast} from "~/hooks/use-toast";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";
import {EmptySection} from "~/components/ui/empty-section";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {Heading} from "~/components/ui/heading";
import {getSocialMediaIcon} from "~/utils/get-social-media-icon";
import {revalidatePath} from "~/utils/revalidate-path";

type SocialMediaListProps = {
  socialMediaLinks?: Array<SocialMediaLink>;
};

const SocialMediaList = ({socialMediaLinks = []}: SocialMediaListProps) => {
  const deleteItemMutation = api.socialMedia.deleteItem.useMutation();
  const pathname = usePathname();
  const {toast} = useToast();

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
        }
      }
    );

    revalidatePath(pathname);
  }

  function displayItems() {
    return socialMediaLinks.map((item) => (
      <SocialMediaCard key={item.id} onClickDeleteBtn={() => setSelectedItemId(item.id)} {...item} />
    ));
  }

  return (
    <Dialog onOpenChange={(open) => (open ? undefined : setSelectedItemId(null))}>
      <Heading as="h2" size="sm">
        Links
      </Heading>

      <div className="flex flex-col items-start">
        {socialMediaLinks.length ? displayItems() : <EmptySection heading="No links found" />}

        <Button className="mt-6" asChild>
          <Link href="/dashboard/social-media/new">
            <PlusIcon size={16} />
            Add new link
          </Link>
        </Button>
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
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-muted py-3 last-of-type:border-0">
      <Icon className="mr-2 h-4 w-4 flex-shrink-0 fill-foreground" aria-hidden="true" />

      <div className="mr-4 flex-1">
        <p className="text-sm leading-6 text-muted-foreground">{url}</p>
      </div>

      <Button variant="ghost" size="icon" asChild>
        <Link href={`/dashboard/social-media/${id}`}>
          <PencilIcon size={16} />
          <span className="sr-only">Edit</span>
        </Link>
      </Button>

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
