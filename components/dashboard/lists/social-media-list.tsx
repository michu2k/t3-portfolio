"use client";

import React, {useState} from "react";
import type {SocialMediaLink} from "@prisma/client";
import {EllipsisIcon, PencilIcon, PlusIcon, TrashIcon} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {Button} from "~/components/ui/button";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {EmptySection} from "~/components/ui/empty-section";
import {Heading} from "~/components/ui/heading";
import {Skeleton} from "~/components/ui/skeleton";
import {useToast} from "~/hooks/use-toast";
import {api} from "~/trpc/react";
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
    <article className="flex min-h-16 w-full items-center gap-3 border-b-[1px] border-solid border-muted py-2 last-of-type:border-0">
      <Icon className="size-4 flex-shrink-0 fill-foreground" aria-hidden="true" />

      <div className="flex-1">
        <p className="text-sm leading-5 text-muted-foreground">{url}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisIcon size={16} />
            <span className="sr-only">Options</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Link href={`/dashboard/social-media/${id}`}>
            <DropdownMenuItem>
              <PencilIcon size={16} />
              Edit
            </DropdownMenuItem>
          </Link>

          <DialogTrigger asChild>
            <DropdownMenuItem onClick={onClickDeleteBtn}>
              <TrashIcon size={16} />
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
};

const SocialMediaListSkeleton = () => {
  return (
    <>
      <Heading as="h2" size="sm">
        Links
      </Heading>

      <div className="flex flex-col items-start">
        <SocialMediaCardSkeleton />
        <SocialMediaCardSkeleton />
        <SocialMediaCardSkeleton />
      </div>
    </>
  );
};

const SocialMediaCardSkeleton = () => {
  return (
    <article className="flex min-h-16 w-full items-center gap-3 border-b-[1px] border-solid border-muted py-2 last-of-type:border-0">
      <Skeleton className="size-4" />

      <div className="flex-1">
        <Skeleton className="h-4 w-2/3" />
      </div>
    </article>
  );
};

export {SocialMediaList, SocialMediaListSkeleton};
